<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('turnos', function (Blueprint $table) {
            $table->id('turno_id');                             // Clave primaria
            $table->foreignId('juego_id')->constrained('juegos')->onDelete('cascade');       // FK a juegos
            $table->foreignId('jugador_id')->constrained('jugadores')->onDelete('cascade');  // FK a jugadores
            $table->foreignId('carta_id')->constrained('cartas')->onDelete('cascade');       // FK a cartas
            $table->string('resultado', 255)->nullable();        // Resultado del turno
            $table->integer('cambio_temp')->nullable();         // Cambio de temperatura
            $table->timestamps();                               // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turnos');
    }
};
