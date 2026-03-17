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
        Schema::create('eventos', function (Blueprint $table) {
            $table->id('evento_id');                                 // Clave primaria
            $table->foreignId('carta_id')->constrained('cartas', 'carta_id')->onDelete('cascade'); // FK a cartas
            $table->text('efecto');                           // Descripción del efecto del evento
            $table->timestamps();                             // created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos');
    }
};
