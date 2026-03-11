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
        Schema::create('anillos', function (Blueprint $table) {
            $table->id('anillo_id');          // Clave primaria
            $table->string('nombre', 50);     // Nombre del anillo
            $table->integer('orden')->nullable(); // Orden de aparición o prioridad
            $table->timestamps();             // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anillos');
    }
};
