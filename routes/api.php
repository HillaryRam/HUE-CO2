<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\JuegoController;
use App\Http\Controllers\Api\AnilloController;
use App\Http\Controllers\Api\TurnoController;
use App\Http\Controllers\Api\CartaController;
use App\Http\Controllers\Api\JugadorController;
use App\Http\Controllers\GameController;

// ── Rutas públicas ──────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

// Anillos y cartas (lectura pública para Unity)
Route::get('/anillos',                          [AnilloController::class, 'index']);
Route::get('/anillos/{id}',                     [AnilloController::class, 'show']);
Route::get('/anillos/{anillo_id}/carta-aleatoria', [CartaController::class, 'cartaAleatoria']);
Route::get('/cartas',                           [CartaController::class, 'index']);
Route::get('/cartas/{id}',                      [CartaController::class, 'show']);

// ── Rutas de Juego en Tiempo Real (públicas, identificadas por roomCode) ──
Route::post('/game/{roomCode}/vote',     [GameController::class, 'vote']);
Route::post('/game/{roomCode}/proposal', [GameController::class, 'proposal']);
Route::post('/game/{roomCode}/advance',  [GameController::class, 'advance']);

// ── Rutas protegidas (requieren token) ──────────────────────
Route::middleware('auth:sanctum')->group(function () {

    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Jugadores
    Route::get('/jugadores',       [JugadorController::class, 'index']);
    Route::get('/jugadores/{id}',  [JugadorController::class, 'show']);
    Route::put('/jugadores/{id}',  [JugadorController::class, 'update']);
    Route::delete('/jugadores/{id}', [JugadorController::class, 'destroy']);

    // Juegos
    Route::get('/juegos',              [JuegoController::class, 'index']);
    Route::post('/juegos',             [JuegoController::class, 'store']);
    Route::get('/juegos/{id}',         [JuegoController::class, 'show']);
    Route::put('/juegos/{id}',         [JuegoController::class, 'update']);
    Route::delete('/juegos/{id}',      [JuegoController::class, 'destroy']);
    Route::post('/juegos/{id}/unirse', [JuegoController::class, 'unirse']);

    // Turnos
    Route::get('/juegos/{juego_id}/turnos',  [TurnoController::class, 'index']);
    Route::post('/juegos/{juego_id}/turnos', [TurnoController::class, 'store']);
    Route::get('/turnos/{id}',               [TurnoController::class, 'show']);

    // Admin - Anillos y Cartas (escritura protegida)
    Route::post('/anillos',         [AnilloController::class, 'store']);
    Route::put('/anillos/{id}',     [AnilloController::class, 'update']);
    Route::delete('/anillos/{id}',  [AnilloController::class, 'destroy']);
    Route::post('/cartas',          [CartaController::class, 'store']);
    Route::put('/cartas/{id}',      [CartaController::class, 'update']);
    Route::delete('/cartas/{id}',   [CartaController::class, 'destroy']);
});
