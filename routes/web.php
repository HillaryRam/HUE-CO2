<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => ['user' => auth()->user()],
    ]);
});

// Ruta pública para los invitados (Portal de entrada al juego)
Route::get('/jugar', function () {
    return Inertia::render('GuestPortal');
})->name('guest.portal');

// Dashboard (Ahora protegido por Auth de Breeze)
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Perfil de usuario (Estándar de Breeze)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Ruta del juego local (Mantiene su funcionamiento)
Route::get('/juego-local', function () {
    return Inertia::render('LocalGame');
})->name('juego.local');

// Ruta de prueba Reverb (temporal)
Route::get('/fire-event', function () {
    App\Events\TestEvent::dispatch('Hello World from Reverb!');
    return 'Event fired!';
});

require __DIR__.'/auth.php';
