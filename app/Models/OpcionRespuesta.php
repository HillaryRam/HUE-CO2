<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpcionRespuesta extends Model
{
    protected $primaryKey = 'opcion_id';

    protected $fillable = ['pregunta_id', 'texto_opcion', 'es_correcta'];

    protected $casts = ['es_correcta' => 'boolean'];

    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class, 'pregunta_id');
    }
}
