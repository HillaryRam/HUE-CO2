<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Jugador extends Model
{
    use HasApiTokens;
    protected $table = 'jugadores';
    protected $primaryKey = 'jugador_id';
    protected $fillable = ['usuario', 'email', 'contrasena'];

    protected $hidden = ['contrasena'];

    public function juegos()
    {
        return $this->belongsToMany(Juego::class, 'juego_jugador', 'jugador_id', 'juego_id')
                    ->withPivot('rol_id', 'eco_fichas', 'puntuacion')
                    ->withTimestamps();
    }

    public function turnos()
    {
        return $this->hasMany(Turno::class, 'jugador_id');
    }
}
