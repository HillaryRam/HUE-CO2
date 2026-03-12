<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Turno;
use App\Models\Juego;
use Illuminate\Http\Request;

class TurnoController extends Controller
{
    // GET /api/juegos/{juego_id}/turnos
    public function index($juego_id)
    {
        $turnos = Turno::with(['jugador', 'carta'])
            ->where('juego_id', $juego_id)
            ->orderBy('created_at')
            ->get();

        return response()->json($turnos);
    }

    // POST /api/juegos/{juego_id}/turnos
    public function store(Request $request, $juego_id)
    {
        $request->validate([
            'jugador_id' => 'required|exists:jugadores,jugador_id',
            'carta_id'   => 'required|exists:cartas,carta_id',
            'resultado'  => 'nullable|string',
            'cambio_temp'=> 'nullable|integer',
        ]);

        $turno = Turno::create([
            'juego_id'    => $juego_id,
            'jugador_id'  => $request->jugador_id,
            'carta_id'    => $request->carta_id,
            'resultado'   => $request->resultado,
            'cambio_temp' => $request->cambio_temp ?? 0,
        ]);

        // Actualizar temperatura del juego
        if ($request->cambio_temp) {
            $juego = Juego::findOrFail($juego_id);
            $juego->increment('temperatura', $request->cambio_temp);
        }

        return response()->json([
            'message' => 'Turno registrado',
            'turno'   => $turno->load(['jugador', 'carta']),
        ], 201);
    }

    // GET /api/turnos/{id}
    public function show($id)
    {
        $turno = Turno::with(['jugador', 'carta.preguntas.opciones', 'juego'])->findOrFail($id);
        return response()->json($turno);
    }
}
