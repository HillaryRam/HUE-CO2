<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Jugador;
use Illuminate\Http\Request;

class JugadorController extends Controller
{
    // GET /api/jugadores
    public function index()
    {
        return response()->json(Jugador::all());
    }

    // GET /api/jugadores/{id}
    public function show($id)
    {
        $jugador = Jugador::with(['juegos'])->findOrFail($id);
        return response()->json($jugador);
    }

    // PUT /api/jugadores/{id}
    public function update(Request $request, $id)
    {
        $jugador = Jugador::findOrFail($id);

        $request->validate([
            'usuario' => 'sometimes|string|max:50',
            'email'   => 'sometimes|email|unique:jugadores,email,' . $id . ',jugador_id',
        ]);

        $jugador->update($request->only(['usuario', 'email']));

        return response()->json([
            'message' => 'Jugador actualizado',
            'jugador' => $jugador,
        ]);
    }

    // DELETE /api/jugadores/{id}
    public function destroy($id)
    {
        $jugador = Jugador::findOrFail($id);
        $jugador->delete();

        return response()->json(['message' => 'Jugador eliminado']);
    }
}
