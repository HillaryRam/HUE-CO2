<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Carta;
use Illuminate\Http\Request;

class CartaController extends Controller
{
    // GET /api/cartas
    public function index(Request $request)
    {
        $query = Carta::with(['anillo', 'preguntas.opciones', 'eventos']);

        if ($request->has('anillo_id')) {
            $query->where('anillo_id', $request->anillo_id);
        }

        if ($request->has('tipo')) {
            $query->where('tipo', $request->tipo);
        }

        return response()->json($query->get());
    }

    // GET /api/cartas/{id}
    public function show($id)
    {
        $carta = Carta::with(['anillo', 'preguntas.opciones', 'eventos'])->findOrFail($id);
        return response()->json($carta);
    }

    // GET /api/anillos/{anillo_id}/carta-aleatoria
    public function cartaAleatoria($anillo_id)
    {
        $carta = Carta::with(['preguntas.opciones', 'eventos'])
            ->where('anillo_id', $anillo_id)
            ->inRandomOrder()
            ->firstOrFail();

        return response()->json($carta);
    }

    // POST /api/cartas
    public function store(Request $request)
    {
        $request->validate([
            'anillo_id' => 'required|exists:anillos,anillo_id',
            'tipo' => 'required|string|max:50',
            'texto' => 'nullable|string',
            'tiempo' => 'nullable|integer',
        ]);

        $carta = Carta::create($request->only(['anillo_id', 'tipo', 'texto', 'tiempo']));

        return response()->json([
            'message' => 'Carta creada',
            'carta' => $carta,
        ], 201);
    }

    // PUT /api/cartas/{id}
    public function update(Request $request, $id)
    {
        $carta = Carta::findOrFail($id);
        $carta->update($request->only(['anillo_id', 'tipo', 'texto', 'tiempo']));

        return response()->json([
            'message' => 'Carta actualizada',
            'carta' => $carta,
        ]);
    }

    // DELETE /api/cartas/{id}
    public function destroy($id)
    {
        $carta = Carta::findOrFail($id);
        $carta->delete();

        return response()->json(['message' => 'Carta eliminada']);
    }
}
