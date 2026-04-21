<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Limpieza: Eliminar tabla games redundante
        Schema::dropIfExists('games');

        // 2. Usuarios: Añadir username y role
        Schema::table('users', function (Blueprint $table) {
            $table->string('username')->nullable()->unique()->after('name');
            $table->string('role')->default('jugador')->after('password');
        });

        // 3. Participantes: Renombrar y ajustar jugadores
        Schema::rename('jugadores', 'participantes');
        Schema::table('participantes', function (Blueprint $table) {
            $table->renameColumn('jugador_id', 'participante_id');
            $table->string('email')->nullable()->change();
            $table->string('contrasena')->nullable()->change();
            $table->foreignId('user_id')->nullable()->after('participante_id')->constrained('users')->onDelete('set null');
        });

        // 4. Juego Participante: Renombrar y corregir rol_id
        Schema::rename('juego_jugador', 'juego_participante');
        Schema::table('juego_participante', function (Blueprint $table) {
            $table->renameColumn('jugador_id', 'participante_id');
            $table->dropColumn('rol_id');
        });
        Schema::table('juego_participante', function (Blueprint $table) {
            $table->foreignId('rol_id')->nullable()->after('participante_id')->constrained('roles', 'rol_id')->onDelete('set null');
        });

        // 5. Turnos: Actualizar referencia
        Schema::table('turnos', function (Blueprint $table) {
            $table->renameColumn('jugador_id', 'participante_id');
        });

        // 6. Gamificación: Cartas y Preguntas
        Schema::table('cartas', function (Blueprint $table) {
            $table->integer('puntos')->default(0)->after('texto');
            $table->integer('penalizacion')->default(0)->after('puntos');
        });

        Schema::table('preguntas', function (Blueprint $table) {
            $table->string('tipo_pregunta')->default('options')->after('texto'); // options, slider, free
            $table->integer('rango_min')->nullable()->after('tipo_pregunta');
            $table->integer('rango_max')->nullable()->after('rango_min');
        });
    }

    public function down(): void
    {
        // Nota: El rollback es complejo por los renombres, pero intentamos revertir lo básico
        Schema::table('preguntas', function (Blueprint $table) {
            $table->dropColumn(['tipo_pregunta', 'rango_min', 'rango_max']);
        });

        Schema::table('cartas', function (Blueprint $table) {
            $table->dropColumn(['puntos', 'penalizacion']);
        });

        Schema::table('turnos', function (Blueprint $table) {
            $table->renameColumn('participante_id', 'jugador_id');
        });

        Schema::table('juego_participante', function (Blueprint $table) {
            $table->dropForeign(['rol_id']);
            $table->dropColumn('rol_id');
            $table->renameColumn('participante_id', 'jugador_id');
        });

        Schema::rename('juego_participante', 'juego_jugador');
        
        Schema::table('participantes', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
            $table->renameColumn('participante_id', 'jugador_id');
        });

        Schema::rename('participantes', 'jugadores');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['username', 'role']);
        });
    }
};
