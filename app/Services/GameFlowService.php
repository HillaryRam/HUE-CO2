<?php

namespace App\Services;

use App\Models\Juego;
use App\Models\Carta;
use App\Models\Turno;
use App\Models\Participante;
use App\Events\GameStateChanged;
use App\Events\TurnResultBroadcast;
use Illuminate\Support\Facades\DB;

class GameFlowService
{
    /**
     * Avanza el estado del juego al siguiente turno.
     * Calcula penalizaciones, actualiza tokens y selecciona nueva carta.
     */
    public function advanceTurn(Juego $juego)
    {
        return DB::transaction(function () use ($juego) {
            $turnResults = [];

            // 1. Procesar resultados del turno anterior (si existía una carta)
            if ($juego->current_carta_id) {
                $turnResults = $this->processTurnResults($juego);
            }

            // 2. Si es el primer turno y estamos en modo 'small', repartimos los roles
            if ($juego->current_turn === 0 && $juego->modo === 'small') {
                $participantes = $juego->participantes;
                $numParticipantes = $participantes->count();
                
                if ($numParticipantes > 0 && $numParticipantes < 6) {
                    $rolesIds = \Illuminate\Support\Facades\DB::table('roles')->pluck('rol_id')->toArray();
                    shuffle($rolesIds);
                    
                    \Illuminate\Support\Facades\DB::table('juego_participante')
                        ->where('juego_id', $juego->juego_id)
                        ->delete();
                    
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
                    \Illuminate\Support\Facades\DB::table('juego_participante')->insert($inserts);
                    
                    // Recargar participantes para reflejar los nuevos roles
                    $juego->load('participantes');
                }
            }

            // 3. Incrementar turno
            $juego->current_turn += 1;

            // 3. Seleccionar nueva carta del anillo actual
            $nuevaCarta = $this->pickRandomCard($juego->anillo_id);
            
            if ($nuevaCarta) {
                $juego->current_carta_id = $nuevaCarta->carta_id;
                $juego->estado = 'playing';
            } else {
                $juego->estado = 'ended';
            }

            $juego->last_turn_at = now();
            $juego->save();

            // 4. Obtener estado de los sectores para el tablero
            $sectorsData = $juego->participantes->map(function ($p) {
                // Obtener el slug del rol
                $rol = DB::table('roles')->where('rol_id', $p->pivot->rol_id)->first();
                return [
                    'id' => $rol ? $rol->slug : 'ciudadania',
                    'playerName' => $p->usuario,
                    'tokens' => $p->pivot->eco_fichas,
                ];
            })->toArray();

            // 5. Disparar evento para que todos los dispositivos se actualicen
            $challengeData = $this->formatChallenge($nuevaCarta, $juego);
            
            // Notificar a los móviles sobre sus resultados individuales del turno que acaba de terminar
            if (!empty($turnResults)) {
                TurnResultBroadcast::dispatch($juego->room_code, $turnResults);
            }

            GameStateChanged::dispatch(
                $juego->room_code,
                $juego->estado === 'ended' ? 'ended' : 'challenge',
                $challengeData,
                $sectorsData,
                $nuevaCarta ? ($nuevaCarta->tiempo ?? 90) : 0,
                $juego->current_turn
            );

            return $juego;
        });
    }

    /**
     * Procesa los votos del turno actual y aplica penalizaciones.
     * Retorna un array con el feedback para cada participante.
     */
    protected function processTurnResults(Juego $juego)
    {
        $carta = Carta::with('preguntas.opciones')->find($juego->current_carta_id);
        if (!$carta) return [];

        $jugadores = $juego->participantes()->get();
        $feedbackMap = [];

        foreach ($jugadores as $jugador) {
            $propia_pregunta = $carta->preguntas->first();
            
            $voto = Turno::where([
                'juego_id' => $juego->juego_id,
                'participante_id' => $jugador->participante_id,
                'carta_id' => $juego->current_carta_id
            ])->first();

            $tokensGanados = 0;
            $penalizacion = 0;
            $mensaje = "";
            $esCorrecto = false;

            if (!$voto) {
                $penalizacion = 2; 
                $mensaje = "¡Te quedaste sin tiempo! -2 EcoFichas";
            } else {
                if ($carta->tipo === 'pregunta' && $propia_pregunta) {
                    $opcionCorrecta = $propia_pregunta->opciones->where('correcta', true)->first();
                    
                    // Lógica según tipo de pregunta (simplificada para ABC)
                    if ($opcionCorrecta && $voto->resultado == $opcionCorrecta->texto) {
                        $tokensGanados = $carta->puntos > 0 ? $carta->puntos : 2;
                        $mensaje = "¡Excelente! Respuesta correcta. +" . $tokensGanados . " EcoFichas";
                        $esCorrecto = true;
                    } else {
                        $penalizacion = $carta->penalizacion > 0 ? $carta->penalizacion : 1;
                        $mensaje = "¡Ups! No es correcto. -" . $penalizacion . " EcoFichas";
                    }
                } else {
                    // Es un evento
                    $mensaje = "Evento procesado. " . $carta->texto;
                    $esCorrecto = true;
                }
            }

            if ($penalizacion > 0 || $tokensGanados > 0) {
                $nuevasFichas = max(0, $jugador->pivot->eco_fichas - $penalizacion + $tokensGanados);
                $juego->participantes()->updateExistingPivot($jugador->participante_id, [
                    'eco_fichas' => $nuevasFichas
                ]);
            }

            $feedbackMap[$jugador->participante_id] = [
                'success' => $esCorrecto,
                'message' => $mensaje,
                'tokens'  => $tokensGanados - $penalizacion,
            ];
        }

        return $feedbackMap;
    }

    protected function pickRandomCard($anilloId)
    {
        return Carta::where('anillo_id', $anilloId)
            ->inRandomOrder()
            ->first();
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
