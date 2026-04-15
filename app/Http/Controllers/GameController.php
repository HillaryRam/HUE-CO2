<?php

namespace App\Http\Controllers;

use App\Events\GameStateChanged;
use App\Events\PlayerVoted;
use App\Events\ProposalSubmitted;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * GameController
 *
 * Maneja las acciones de juego en tiempo real.
 * Cada endpoint recibe datos del MobileController (frontend),
 * valida y dispara el evento Reverb correspondiente.
 */
class GameController extends Controller
{
    /**
     * POST /api/game/{roomCode}/vote
     * Un jugador envía su voto (opciones ABCD, slider o validación).
     */
    public function vote(Request $request, string $roomCode): JsonResponse
    {
        $validated = $request->validate([
            'sector_id'   => 'required|string',
            'player_name' => 'required|string|max:50',
            'answer'      => 'required',
            'type'        => 'required|in:options,slider,validate',
        ]);

        PlayerVoted::dispatch(
            roomCode:   $roomCode,
            sectorId:   $validated['sector_id'],
            playerName: $validated['player_name'],
            answer:     $validated['answer'],
            type:       $validated['type']
        );

        return response()->json(['status' => 'ok']);
    }

    /**
     * POST /api/game/{roomCode}/proposal
     * Un jugador envía una propuesta de texto libre.
     * La pantalla grande cambia a modo 'validate'.
     */
    public function proposal(Request $request, string $roomCode): JsonResponse
    {
        $validated = $request->validate([
            'sector_id'     => 'required|string',
            'player_name'   => 'required|string|max:50',
            'proposal_text' => 'required|string|max:1000',
        ]);

        ProposalSubmitted::dispatch(
            roomCode:     $roomCode,
            sectorId:     $validated['sector_id'],
            playerName:   $validated['player_name'],
            proposalText: $validated['proposal_text']
        );

        return response()->json(['status' => 'ok']);
    }

    /**
     * POST /api/game/{roomCode}/advance
     * El host avanza el juego al siguiente reto o estado.
     * (Solo disponible para el organizador/admin de la sala)
     */
    public function advance(Request $request, string $roomCode): JsonResponse
    {
        $validated = $request->validate([
            'state'      => 'required|in:challenge,waiting,results,ended',
            'challenge'  => 'nullable|array',
            'time_left'  => 'nullable|integer|min:0|max:300',
            'turn_number'=> 'nullable|integer|min:1',
        ]);

        GameStateChanged::dispatch(
            roomCode:   $roomCode,
            state:      $validated['state'],
            challenge:  $validated['challenge'] ?? [],
            timeLeft:   $validated['time_left'] ?? 90,
            turnNumber: $validated['turn_number'] ?? 1
        );

        return response()->json(['status' => 'ok']);
    }
}
