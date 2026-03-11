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
        Schema::create('cartas', function (Blueprint $table) {
            $table->id('carta_id');                          // Clave primaria
            $table->foreignId('anillo_id')->constrained('anillos')->onDelete('cascade'); // FK a anillos
            $table->string('tipo', 50);                       // Tipo de carta
            $table->text('texto')->nullable();                // Texto de la carta
            $table->integer('tiempo')->nullable();            // Tiempo asociado a la carta
            $table->timestamps();                             // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cartas');
    }
};
