<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => ['user' => auth()->user()],
    ]);
});

// Redirección temporal para evitar el 404 si el navegador tiene la versión vieja en caché
Route::get('/login', function () {
    return redirect('/dashboard');
});

// Dashboard temporalmente público para desarrollo
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'auth' => [
            'user' => auth()->user() ?? [
                'name' => 'Invitado',
                'email' => 'invitado@example.com'
            ]
        ],
    ]);
})->name('dashboard');

// Ruta del juego local
Route::get('/juego-local', function () {
    return Inertia::render('LocalGame');
})->name('juego.local');

// Ruta de prueba Reverb (temporal)
Route::get('/fire-event', function () {
    App\Events\TestEvent::dispatch('Hello World from Reverb!');
    return 'Event fired!';
});

