<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Anillo;
use Illuminate\Http\Request;

class AnilloController extends Controller
{
    // GET /api/anillos
    public function index()
    {
        $anillos = Anillo::orderBy('orden')->get();
        return response()->json($anillos);
    }

    // GET /api/anillos/{id}
    public function show($id)
    {
        $anillo = Anillo::with(['cartas.preguntas.opciones', 'cartas.eventos'])->findOrFail($id);
        return response()->json($anillo);
    }

    // POST /api/anillos
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:50',
            'orden'  => 'nullable|integer',
        ]);

        $anillo = Anillo::create($request->only(['nombre', 'orden']));

        return response()->json([
            'message' => 'Anillo creado',
            'anillo'  => $anillo,
        ], 201);
    }

    // PUT /api/anillos/{id}
    public function update(Request $request, $id)
    {
        $anillo = Anillo::findOrFail($id);
        $anillo->update($request->only(['nombre', 'orden']));

        return response()->json([
            'message' => 'Anillo actualizado',
            'anillo'  => $anillo,
        ]);
    }

    // DELETE /api/anillos/{id}
    public function destroy($id)
    {
        $anillo = Anillo::findOrFail($id);
        $anillo->delete();

        return response()->json(['message' => 'Anillo eliminado']);
    }
}
