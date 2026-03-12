<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class JuegoJugador extends Pivot
{
    protected $table = 'juego_jugador';
    protected $primaryKey = 'juego_jugador_id';

    protected $fillable = ['juego_id', 'jugador_id', 'rol_id', 'eco_fichas', 'puntuacion'];

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'rol_id');
    }
}
