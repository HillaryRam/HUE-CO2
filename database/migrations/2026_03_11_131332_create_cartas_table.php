<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cartas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anillo_id')->constrained('anillos');
            $table->string('tipo'); // 'pregunta' o 'evento'
            $table->text('texto');
            $table->integer('tiempo')->nullable();
            $table->decimal('cambio_temp', 3, 1)->nullable(); // solo para eventos
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cartas');
    }
};