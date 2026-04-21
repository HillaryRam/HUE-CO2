<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Participante;
use Illuminate\Http\Request;

class ParticipanteController extends Controller
{
    // GET /api/participantes
    public function index()
    {
        return response()->json(Participante::all());
    }

    // GET /api/participantes/{id}
    public function show($id)
    {
        $participante = Participante::with(['juegos'])->findOrFail($id);
        return response()->json($participante);
    }

    // PUT /api/participantes/{id}
    public function update(Request $request, $id)
    {
        $participante = Participante::findOrFail($id);

        $request->validate([
            'usuario' => 'sometimes|string|max:50',
            'email'   => 'sometimes|email|unique:participantes,email,' . $id . ',participante_id',
        ]);

        $participante->update($request->only(['usuario', 'email']));

        return response()->json([
            'message' => 'Participante actualizado',
            'participante' => $participante,
        ]);
    }

    // DELETE /api/participantes/{id}
    public function destroy($id)
    {
        $participante = Participante::findOrFail($id);
        $participante->delete();

        return response()->json(['message' => 'Participante eliminado']);
    }
}
