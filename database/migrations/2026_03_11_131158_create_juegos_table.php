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
        Schema::create('juegos', function (Blueprint $table) {
            $table->id(); // ⚠️ Esto crea 'id' como PRIMARY KEY
            $table->string('modo', 50)->nullable();  // Modo del juego
            $table->integer('temperatura')->nullable(); // Valor temporal o clima del juego
            $table->foreignId('anillo_id')->nullable()->constrained('anillos')->onDelete('set null'); // FK a anillos
            $table->string('estado', 50)->nullable();  // Estado del juego (activo, terminado...)
            $table->timestamps();                // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('juegos');
    }
};
