<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'auth' => ['user' => auth()->user()],
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'auth' => ['user' => auth()->user()],
        ]);
    })->name('dashboard');
});

// Ruta de prueba Reverb (temporal)
Route::get('/fire-event', function () {
    App\Events\TestEvent::dispatch('Hello World from Reverb!');
    return 'Event fired!';
});
