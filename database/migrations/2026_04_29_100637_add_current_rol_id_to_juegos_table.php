<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('juegos', function (Blueprint $table) {
            $table->unsignedBigInteger('current_rol_id')->nullable()->after('current_turn');
            $table->foreign('current_rol_id')->references('rol_id')->on('roles')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('juegos', function (Blueprint $table) {
            $table->dropForeign(['current_rol_id']);
            $table->dropColumn('current_rol_id');
        });
    }
};
