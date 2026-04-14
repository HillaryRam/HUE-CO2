<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

/*
 * Canal público de sala de juego.
 * Identificado por roomCode (ej: "TEST-772").
 * No requiere autenticación para el Modo Local (Kahoot).
 * En el futuro, para Multiplayer, se convertirá en PresenceChannel autenticado.
 */
Broadcast::channel('game.{roomCode}', function () {
    return true; // Canal público — cualquier cliente puede suscribirse
});

