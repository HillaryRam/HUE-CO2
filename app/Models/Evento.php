<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $fillable = ['carta_id', 'efecto'];

    public function carta()
    {
        return $this->belongsTo(Carta::class, 'carta_id');
    }
}
