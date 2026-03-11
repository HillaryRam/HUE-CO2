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
        Schema::create('jugadores', function (Blueprint $table) {
            $table->id('jugador_id');                  // Clave primaria
            $table->string('usuario', 50);             // Nombre de usuario
            $table->string('email', 100)->unique();    // Email único
            $table->string('contrasena', 255);         // Contraseña
            $table->timestamps();                       // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jugadores');            // Elimina la tabla al hacer rollback
    }
};
