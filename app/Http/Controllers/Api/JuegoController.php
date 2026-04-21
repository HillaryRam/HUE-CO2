<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Juego;
use App\Models\Participante;
use Illuminate\Http\Request;

class JuegoController extends Controller
{
    // GET /api/juegos
    public function index()
    {
        $juegos = Juego::with(['anillo', 'participantes'])->get();
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

        // Añadir al participante que crea la partida (Host)
        if ($request->user()) {
            $participante = Participante::create([
                'user_id' => $request->user()->id,
                'usuario' => $request->user()->username ?? $request->user()->name,
            ]);

            $juego->participantes()->attach($participante->participante_id, [
                'rol_id'      => $request->rol_id ?? null,
                'eco_fichas'  => 12,
                'puntuacion'  => 0,
            ]);
        }

        return response()->json([
            'message' => 'Juego creado correctamente',
            'juego'   => $juego->load(['anillo', 'participantes']),
        ], 201);
    }

    // GET /api/juegos/{id}
    public function show($id)
    {
        $juego = Juego::with(['anillo', 'participantes', 'turnos.carta'])->findOrFail($id);
        return response()->json($juego);
    }

    // PUT /api/juegos/{id}
    public function update(Request $request, $id)
    {
        $juego = Juego::findOrFail($id);

        $juego->update($request->only(['modo', 'temperatura', 'anillo_id', 'estado']));

        return response()->json([
            'message' => 'Juego actualizado',
            'juego'   => $juego->load(['anillo', 'participantes']),
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
            'rol_id'    => 'nullable|integer|exists:roles,rol_id',
            'usuario'   => 'required_unless:auth,true|string|max:50', // Nombre para invitados
        ]);

        $juego = Juego::where('room_code', $request->room_code)->firstOrFail();

        // Crear el participante
        $participanteData = [
            'usuario' => $request->usuario,
        ];

        if ($request->user()) {
            $participanteData['user_id'] = $request->user()->id;
            $participanteData['usuario'] = $request->user()->username ?? $request->user()->name;
        }

        $participante = Participante::create($participanteData);

        $juego->participantes()->attach($participante->participante_id, [
            'rol_id'     => $request->rol_id,
            'eco_fichas' => 12,
            'puntuacion' => 0,
        ]);

        return response()->json([
            'message' => 'Te has unido a la partida',
            'participante' => $participante,
            'juego'   => $juego->load('participantes'),
        ]);
    }
}
