<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\AuthController;

Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
});

Route::get('/games', [GameController::class, 'index']);
Route::get('/games/{id}', [GameController::class, 'show']);
Route::post('/games', [GameController::class, 'store']);
Route::post('/games/{id}/move', [GameController::class, 'move']);
