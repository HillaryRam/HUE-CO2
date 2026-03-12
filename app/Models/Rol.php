<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $primaryKey = 'rol_id';

    protected $fillable = ['nombre', 'habilidades'];

    public function jugadores()
    {
        return $this->belongsToMany(Jugador::class, 'juego_jugador', 'rol_id', 'jugador_id')
                    ->withPivot('eco_fichas', 'puntuacion')
                    ->withTimestamps();
    }
}
