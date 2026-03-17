<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpcionRespuesta extends Model
{
    protected $table = 'opciones_respuesta';
    protected $primaryKey = 'opcion_id';

    protected $fillable = ['pregunta_id', 'texto', 'correcta'];

    protected $casts = ['correcta' => 'boolean'];

    public function pregunta()
    {
        return $this->belongsTo(Pregunta::class, 'pregunta_id');
    }
}
