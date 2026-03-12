<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Turno extends Model
{
    protected $primaryKey = 'turno_id';

    protected $fillable = ['juego_id', 'jugador_id', 'carta_id', 'resultado', 'cambio_temp'];

    public function juego()
    {
        return $this->belongsTo(Juego::class, 'juego_id');
    }

    public function jugador()
    {
        return $this->belongsTo(Jugador::class, 'jugador_id');
    }

    public function carta()
    {
        return $this->belongsTo(Carta::class, 'carta_id');
    }
}
