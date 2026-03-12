<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Game;

class GameController extends Controller
{
    public function index()
    {
        return response()->json(Game::all());
    }

    public function show($id)
    {
        return response()->json(Game::findOrFail($id));
    }

    public function store(Request $request)
    {
        $game = Game::create([
            'name' => $request->name
        ]);

        return response()->json($game);
    }

    public function move(Request $request, $id)
    {
        $game = Game::findOrFail($id);

        // lógica del movimiento
        return response()->json([
            'message' => 'Movimiento recibido'
        ]);
    }
}
