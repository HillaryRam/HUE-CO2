<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Jugador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // POST /api/register
    public function register(Request $request)
    {
        $request->validate([
            'usuario' => 'required|string|max:50',
            'email' => 'required|email|unique:jugadores,email',
            'contrasena' => 'required|string|min:6',
        ]);

        $jugador = Jugador::create([
            'usuario' => $request->usuario,
            'email' => $request->email,
            'contrasena' => Hash::make($request->contrasena),
        ]);

        $token = $jugador->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Jugador registrado correctamente',
            'jugador' => $jugador,
            'token' => $token,
        ], 201);
    }

    // POST /api/login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'contrasena' => 'required|string',
        ]);

        $jugador = Jugador::where('email', $request->email)->first();

        if (!$jugador || !Hash::check($request->contrasena, $jugador->contrasena)) {
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $jugador->createToken('api-token')->plainTextToken;

        return response()->json([
            'message' => 'Login correcto',
            'jugador' => $jugador,
            'token' => $token,
        ]);
    }

    // POST /api/logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    // GET /api/me
    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
