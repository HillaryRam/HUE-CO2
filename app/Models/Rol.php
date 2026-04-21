<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $primaryKey = 'rol_id';

    protected $fillable = ['nombre', 'habilidades'];

    public function participantes()
    {
        return $this->belongsToMany(Participante::class, 'juego_participante', 'rol_id', 'participante_id')
                    ->withPivot('eco_fichas', 'puntuacion')
                    ->withTimestamps();
    }
}
