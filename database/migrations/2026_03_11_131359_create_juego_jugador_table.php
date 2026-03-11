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
        Schema::create('juego_jugador', function (Blueprint $table) {
            $table->id('juego_jugador_id');                   // Clave primaria
            $table->foreignId('juego_id')->constrained('juegos')->onDelete('cascade'); // FK a juegos
            $table->foreignId('jugador_id')->constrained('jugadores')->onDelete('cascade'); // FK a jugadores
            $table->foreignId('rol_id')->constrained('roles')->onDelete('cascade'); // FK a roles
            $table->integer('eco_fichas')->default(0);       // Eco tokens del jugador
            $table->integer('puntuacion')->default(0);       // Puntuación del jugador
            $table->timestamps();                            // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('juego_jugador');
    }
};
