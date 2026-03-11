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
        Schema::create('opciones_respuesta', function (Blueprint $table) {
            $table->id('opcion_id');                             // Clave primaria
            $table->foreignId('pregunta_id')->constrained('preguntas')->onDelete('cascade'); // FK a preguntas
            $table->text('texto_opcion');                        // Texto de la opción
            $table->boolean('es_correcta')->default(false);      // Indica si la opción es correcta
            $table->timestamps();                                // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opciones_respuesta');
    }
};
