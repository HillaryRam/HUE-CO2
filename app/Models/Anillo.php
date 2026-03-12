<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Anillo extends Model
{
    protected $primaryKey = 'anillo_id';

    protected $fillable = ['nombre', 'orden'];

    public function cartas()
    {
        return $this->hasMany(Carta::class, 'anillo_id');
    }

    public function juegos()
    {
        return $this->hasMany(Juego::class, 'anillo_id');
    }
}
