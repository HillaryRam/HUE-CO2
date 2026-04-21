<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Carta extends Model
{
    protected $primaryKey = 'carta_id';
    protected $fillable = ['anillo_id', 'tipo', 'texto', 'tiempo', 'cambio_temp', 'puntos', 'penalizacion'];

    public function anillo()
    {
        return $this->belongsTo(Anillo::class, 'anillo_id', 'anillo_id');
    }
    public function preguntas()
    {
        return $this->hasMany(Pregunta::class, 'carta_id');
    }
    public function eventos()
    {
        return $this->hasMany(Evento::class, 'carta_id');
    }
    public function turnos()
    {
        return $this->hasMany(Turno::class, 'carta_id');
    }
}