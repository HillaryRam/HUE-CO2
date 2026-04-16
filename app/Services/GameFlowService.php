<?php

namespace App\Services;

use App\Models\Juego;
use App\Models\Carta;
use App\Models\Turno;
use App\Events\GameStateChanged;
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
            // 1. Procesar resultados del turno anterior (si existía una carta)
            if ($juego->current_carta_id) {
                $this->processTurnResults($juego);
            }

            // 2. Incrementar turno
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
            $sectorsData = $juego->jugadores->map(function ($j) {
                return [
                    'id' => $j->pivot->rol_id,
                    'playerName' => $j->nombre,
                    'tokens' => $j->pivot->eco_fichas,
                ];
            })->toArray();

            // 5. Disparar evento para que todos los dispositivos se actualicen
            $challengeData = $this->formatChallenge($nuevaCarta, $juego);
            
            GameStateChanged::dispatch(
                $juego->room_code,
                $juego->estado === 'ended' ? 'ended' : 'challenge',
                $challengeData,
                $sectorsData,
                $nuevaCarta ? $nuevaCarta->tiempo : 0,
                $juego->current_turn
            );

            return $juego;
        });
    }

    /**
     * Procesa los votos del turno actual y aplica penalizaciones.
     */
    protected function processTurnResults(Juego $juego)
    {
        $carta = Carta::with('preguntas.opciones')->find($juego->current_carta_id);
        if (!$carta) return;

        // Obtener jugadores de la partida (asegurar que estén cargados con datos de la tabla pivote)
        $jugadores = $juego->jugadores()->get();

        foreach ($jugadores as $jugador) {
            $propia_pregunta = $carta->preguntas->first(); // Simplificación: una pregunta por carta
            
            // Buscar si el jugador votó en este turno (esto requiere una tabla de votos o buscar en Turnos)
            // Por ahora, asumimos que si no hay un registro en la tabla 'turnos' para este juego/jugador/carta, no votó.
            $voto = Turno::where([
                'juego_id' => $juego->juego_id,
                'jugador_id' => $jugador->jugador_id,
                'carta_id' => $juego->current_carta_id
            ])->first();

            $penalizacion = 0;

            if (!$voto) {
                // PENALIZACIÓN POR NO VOTAR (A TIEMPO)
                $penalizacion = 2; // Ejemplo: quitar 2 tokens
            } else {
                // Si es tipo 'test/options', verificar si es correcta
                if ($carta->tipo === 'test' && $propia_pregunta) {
                    $opcionCorrecta = $propia_pregunta->opciones->where('correcta', true)->first();
                    if ($opcionCorrecta && $voto->resultado != $opcionCorrecta->texto) {
                        $penalizacion = 1; // Ejemplo: quitar 1 token por error
                    }
                }
            }

            if ($penalizacion > 0) {
                $juego->jugadores()->updateExistingPivot($jugador->jugador_id, [
                    'eco_fichas' => max(0, $jugador->pivot->eco_fichas - $penalizacion)
                ]);
            }
        }
    }

    /**
     * Selecciona una carta aleatoria que no se haya usado todavía en este juego.
     */
    protected function pickRandomCard($anilloId)
    {
        return Carta::where('anillo_id', $anilloId)
            ->inRandomOrder()
            ->first();
    }

    /**
     * Formatea la carta para el frontend.
     */
    protected function formatChallenge(?Carta $carta, Juego $juego)
    {
        if (!$carta) return [];

        $pregunta = $carta->preguntas->first();

        return [
            'id' => $carta->carta_id,
            'type' => $carta->tipo === 'test' ? 'options' : 'open',
            'title' => $pregunta ? $pregunta->texto : $carta->texto,
            'description' => $carta->texto,
            'ring' => $juego->anillo ? $juego->anillo->nombre : 'General',
            'options' => $pregunta ? $pregunta->opciones->pluck('texto')->toArray() : [],
            'time' => $carta->tiempo ?? ($carta->tipo === 'test' ? 20 : 30),
        ];
    }
}
