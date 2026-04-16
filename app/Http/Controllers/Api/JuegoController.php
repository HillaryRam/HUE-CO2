<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Juego;
use App\Models\Jugador;
use Illuminate\Http\Request;

class JuegoController extends Controller
{
    // GET /api/juegos
    public function index()
    {
        $juegos = Juego::with(['anillo', 'jugadores'])->get();
        return response()->json($juegos);
    }

    // POST /api/juegos
    public function store(Request $request)
    {
        $request->validate([
            'modo'       => 'required|string|max:50',
            'anillo_id'  => 'nullable|exists:anillos,anillo_id',
        ]);

        $juego = Juego::create([
            'modo'        => $request->modo,
            'temperatura' => 0,
            'anillo_id'   => $request->anillo_id,
            'estado'      => 'lobby',
            'room_code'   => strtoupper(substr(bin2hex(random_bytes(3)), 0, 6)),
        ]);

        // Añadir al jugador que crea la partida
        if ($request->user()) {
            // Vincular el usuario autenticado (Breeze) con un perfil de Jugador
            $jugador = Jugador::firstOrCreate(
                ['email' => $request->user()->email],
                ['usuario' => $request->user()->name, 'contrasena' => '']
            );

            $juego->jugadores()->attach($jugador->jugador_id, [
                'rol_id'      => $request->rol_id ?? null,
                'eco_fichas'  => 12,
                'puntuacion'  => 0,
            ]);
        }

        return response()->json([
            'message' => 'Juego creado correctamente',
            'juego'   => $juego->load(['anillo', 'jugadores']),
        ], 201);
    }

    // GET /api/juegos/{id}
    public function show($id)
    {
        $juego = Juego::with(['anillo', 'jugadores.juegos', 'turnos.carta'])->findOrFail($id);
        return response()->json($juego);
    }

    // PUT /api/juegos/{id}
    public function update(Request $request, $id)
    {
        $juego = Juego::findOrFail($id);

        $juego->update($request->only(['modo', 'temperatura', 'anillo_id', 'estado']));

        return response()->json([
            'message' => 'Juego actualizado',
            'juego'   => $juego->load(['anillo', 'jugadores']),
        ]);
    }

    // DELETE /api/juegos/{id}
    public function destroy($id)
    {
        $juego = Juego::findOrFail($id);
        $juego->delete();

        return response()->json(['message' => 'Juego eliminado']);
    }

    // POST /api/juegos/join
    public function unirse(Request $request)
    {
        $request->validate([
            'room_code' => 'required|string|exists:juegos,room_code',
            'rol_id'    => 'nullable|string',
        ]);

        $juego = Juego::where('room_code', $request->room_code)->firstOrFail();
        $jugadorId = null;

        // Si es un jugador autenticado o invitado
        if ($request->user()) {
            $jugador = Jugador::firstOrCreate(
                ['email' => $request->user()->email],
                ['usuario' => $request->user()->name, 'contrasena' => '']
            );
            $jugadorId = $jugador->jugador_id;
        }

        if ($jugadorId) {
            $juego->jugadores()->attach($jugadorId, [
                'rol_id'     => $request->rol_id,
                'eco_fichas' => 12,
                'puntuacion' => 0,
            ]);
        }

        return response()->json([
            'message' => 'Te has unido a la partida',
            'juego'   => $juego->load('jugadores'),
        ]);
    }
}
