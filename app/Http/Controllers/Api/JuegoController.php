<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Juego;
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
            'estado'      => 'activo',
        ]);

        // Añadir al jugador que crea la partida
        if ($request->user()) {
            $juego->jugadores()->attach($request->user()->jugador_id, [
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

    // POST /api/juegos/{id}/unirse
    public function unirse(Request $request, $id)
    {
        $juego = Juego::findOrFail($id);

        $jugadorId = $request->user()->jugador_id;

        if ($juego->jugadores()->where('jugador_id', $jugadorId)->exists()) {
            return response()->json(['message' => 'Ya estás en esta partida'], 409);
        }

        $juego->jugadores()->attach($jugadorId, [
            'rol_id'     => $request->rol_id ?? null,
            'eco_fichas' => 12,
            'puntuacion' => 0,
        ]);

        return response()->json([
            'message' => 'Te has unido a la partida',
            'juego'   => $juego->load('jugadores'),
        ]);
    }
}
