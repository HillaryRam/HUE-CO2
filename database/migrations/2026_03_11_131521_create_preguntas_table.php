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
        Schema::create('preguntas', function (Blueprint $table) {
            $table->id('pregunta_id');                         // Clave primaria
            $table->foreignId('carta_id')->constrained('cartas')->onDelete('cascade'); // FK a cartas
            $table->text('texto')->nullable();                 // Texto de la pregunta
            $table->timestamps();                              // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('preguntas');
    }
};
