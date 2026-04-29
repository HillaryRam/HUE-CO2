<?php

namespace App\Services;

use App\Models\Juego;
use App\Models\Carta;
use App\Models\Turno;
use App\Events\GameStateChanged;
use App\Events\TurnResultBroadcast;
use Illuminate\Support\Facades\DB;

class GameFlowService
{
    /**
     * Avanza el estado del juego al siguiente paso (Reto -> Resultados -> Siguiente Reto)
     */
    public function advanceTurn(Juego $juego)
    {
        return DB::transaction(function () use ($juego) {
            $turnResults = [];

            // ── FASE A: Mostrar Resultados del turno actual ──────────────────
            if ($juego->estado === 'playing' || $juego->estado === 'challenge') {
                $turnResults = $this->processTurnResults($juego);
                
                // Calcular impacto en temperatura
                // Si el sector activo acertó, la temperatura baja un poco; si falló o no respondió, sube.
                $acierto = collect($turnResults)->where('correct', true)->count() > 0;
                if ($acierto) {
                    $juego->temperatura = max(-1.0, $juego->temperatura - 0.05);
                } else {
                    $juego->temperatura = min(1.0, $juego->temperatura + 0.15);
                }

                $juego->estado = 'results';
                $juego->save();

                $this->broadcastState($juego, $turnResults);
                return $juego;
            }

            // ── FASE B: Preparar el Siguiente Reto ───────────────────────────
            
            // Inicializar roles si es el primer turno
            if ($juego->current_turn === 0 && $juego->modo === 'small') {
                $this->initializeSmallModeRoles($juego);
            }

            $juego->current_turn += 1;
            
            // Rotar al siguiente sector activo
            $this->selectNextActiveSector($juego);

            // Seleccionar nueva carta
            $nuevaCarta = $this->pickRandomCard($juego->anillo_id);
            
            if ($nuevaCarta) {
                $juego->current_carta_id = $nuevaCarta->carta_id;
                $juego->estado = 'playing';
            } else {
                $juego->estado = 'ended';
            }

            $juego->last_turn_at = now();
            $juego->save();

            $this->broadcastState($juego);

            return $juego;
        });
    }

    /**
     * Asigna roles aleatorios a los participantes en partidas pequeñas
     */
    protected function initializeSmallModeRoles(Juego $juego)
    {
        $participantes = $juego->participantes;
        $numParticipantes = $participantes->count();
        
        if ($numParticipantes > 0) {
            $rolesIds = DB::table('roles')->pluck('rol_id')->toArray();
            shuffle($rolesIds);
            
            DB::table('juego_participante')->where('juego_id', $juego->juego_id)->delete();
            
            $inserts = [];
            $pIndex = 0;
            foreach ($rolesIds as $rol_id) {
                $p = $participantes[$pIndex % $numParticipantes];
                $inserts[] = [
                    'juego_id' => $juego->juego_id,
                    'participante_id' => $p->participante_id,
                    'rol_id' => $rol_id,
                    'eco_fichas' => 12,
                    'puntuacion' => 0,
                ];
                $pIndex++;
            }
            DB::table('juego_participante')->insert($inserts);
            $juego->load('participantes');
        }
    }

    /**
     * Selecciona el rol ID que debe responder en este turno (Sentido Horario)
     */
    protected function selectNextActiveSector(Juego $juego)
    {
        $clockwiseOrder = ['textil', 'ciencia', 'tech', 'primario', 'publico', 'ciudadania'];
        
        $rolesAsignadosSlugs = DB::table('juego_participante')
            ->join('roles', 'juego_participante.rol_id', '=', 'roles.rol_id')
            ->where('juego_id', $juego->juego_id)
            ->pluck('roles.slug')
            ->unique()
            ->toArray();

        $ordenPartida = array_values(array_filter($clockwiseOrder, function($slug) use ($rolesAsignadosSlugs) {
            return in_array($slug, $rolesAsignadosSlugs);
        }));

        if (!empty($ordenPartida)) {
            $index = ($juego->current_turn - 1) % count($ordenPartida);
            $activeSlug = $ordenPartida[$index];
            $activeRol = DB::table('roles')->where('slug', $activeSlug)->first();
            $juego->current_rol_id = $activeRol ? $activeRol->rol_id : null;
        }
    }

    /**
     * Centraliza el envío de información a los clientes
     */
    protected function broadcastState(Juego $juego, array $turnResults = [])
    {
        $activeRol = DB::table('roles')->where('rol_id', $juego->current_rol_id)->first();
        $activeSectorSlug = $activeRol ? $activeRol->slug : null;

        $sectorsData = $juego->participantes->map(function ($p) {
            $rol = DB::table('roles')->where('rol_id', $p->pivot->rol_id)->first();
            return [
                'id' => $rol ? $rol->slug : 'ciudadania',
                'playerName' => $p->usuario,
                'tokens' => $p->pivot->eco_fichas,
                'points' => $p->pivot->puntuacion,
            ];
        })->toArray();

        $carta = Carta::find($juego->current_carta_id);
        $challengeData = $this->formatChallenge($carta, $juego);
        $challengeData['activeSectorId'] = $activeSectorSlug;

        if (!empty($turnResults)) {
            TurnResultBroadcast::dispatch($juego->room_code, $turnResults);
        }

        GameStateChanged::dispatch(
            $juego->room_code,
            $juego->estado === 'ended' ? 'ended' : ($juego->estado === 'results' ? 'results' : 'challenge'),
            $challengeData,
            $sectorsData,
            $carta ? ($carta->tiempo ?? 90) : 0,
            $juego->current_turn,
            $juego->temperatura,
            collect($turnResults)->where('correct', true)->count() > 0 // lastTurnCorrect
        );
    }

    protected function processTurnResults(Juego $juego)
    {
        $carta = Carta::with('preguntas.opciones')->find($juego->current_carta_id);
        if (!$carta) return [];

        $jugadores = $juego->participantes()->get();
        $feedbackMap = [];

        foreach ($jugadores as $jugador) {
            $esSuTurno = ($jugador->pivot->rol_id == $juego->current_rol_id);
            if (!$esSuTurno) continue;

            $voto = Turno::where([
                'juego_id' => $juego->juego_id,
                'participante_id' => $jugador->participante_id,
                'carta_id' => $juego->current_carta_id
            ])->first();

            $tokensGanados = 0; $puntosGanados = 0; $penalizacion = 0; $esCorrecto = false;

            if (!$voto) {
                $penalizacion = 2;
                $mensaje = "¡Tiempo agotado! -2 EcoFichas";
            } else {
                $pregunta = $carta->preguntas->first();
                if (($carta->tipo === 'pregunta' || $carta->tipo === 'pregunta') && $pregunta) {
                    // Buscar la opción marcada como correcta
                    $opcionCorrecta = $pregunta->opciones->where('correcta', 1)->first() 
                                   ?? $pregunta->opciones->where('correcta', true)->first();
                    
                    $valRecibida = trim((string)$voto->resultado);
                    $valEsperada = trim((string)($opcionCorrecta->texto ?? ''));
                    $sonIguales = (strcasecmp($valRecibida, $valEsperada) === 0);

                    \Log::info("[HUE-CO2] Validando Turno - Jugador: {$jugador->participante_id}, Recibido: '{$valRecibida}', Esperado: '{$valEsperada}', Resultado: " . ($sonIguales ? 'TRUE' : 'FALSE'));

                    if ($opcionCorrecta && $sonIguales) {
                        $tokensGanados = $carta->puntos > 0 ? $carta->puntos : 2;
                        $puntosGanados = 1;
                        $mensaje = "¡Correcto! +{$tokensGanados} EcoFichas";
                        $esCorrecto = true;
                    } else {
                        $penalizacion = $carta->penalizacion > 0 ? $carta->penalizacion : 1;
                        $mensaje = "¡Incorrecto! -{$penalizacion} EcoFichas";
                    }
                } else {
                    $mensaje = "Evento procesado.";
                    $esCorrecto = true; $puntosGanados = 1;
                }
            }

            $nuevasFichas = max(0, $jugador->pivot->eco_fichas - $penalizacion + $tokensGanados);
            $nuevaPuntuacion = $jugador->pivot->puntuacion + $puntosGanados;

            DB::table('juego_participante')
                ->where('juego_id', $juego->juego_id)
                ->where('participante_id', $jugador->participante_id)
                ->where('rol_id', $jugador->pivot->rol_id)
                ->update(['eco_fichas' => $nuevasFichas, 'puntuacion' => $nuevaPuntuacion]);

            $feedbackMap[$jugador->participante_id] = [
                'correct' => $esCorrecto,
                'message' => $mensaje,
                'tokens' => $nuevasFichas,
                'points' => $nuevaPuntuacion
            ];
        }
        return $feedbackMap;
    }

    protected function pickRandomCard($anilloId)
    {
        return Carta::where('anillo_id', $anilloId)->inRandomOrder()->first();
    }

    protected function formatChallenge(?Carta $carta, Juego $juego)
    {
        if (!$carta) return [];
        $pregunta = $carta->preguntas->first();
        return [
            'id' => $carta->carta_id,
            'type' => $pregunta ? $pregunta->tipo_pregunta : 'options',
            'title' => $pregunta ? $pregunta->texto : $carta->texto,
            'description' => $carta->texto,
            'ring' => $juego->anillo ? $juego->anillo->nombre : 'General',
            'options' => $pregunta ? $pregunta->opciones->pluck('texto')->toArray() : [],
            'time' => $carta->tiempo ?? 20,
            'puntos' => $carta->puntos,
            'penalizacion' => $carta->penalizacion,
        ];
    }
}
