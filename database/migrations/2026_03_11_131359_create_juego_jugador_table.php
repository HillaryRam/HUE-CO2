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
            $table->id('juego_jugador_id');
            $table->foreignId('juego_id')->constrained('juegos', 'juego_id')->cascadeOnDelete();
            $table->foreignId('jugador_id')->constrained('jugadores', 'jugador_id')->cascadeOnDelete();
            $table->timestamps();
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
