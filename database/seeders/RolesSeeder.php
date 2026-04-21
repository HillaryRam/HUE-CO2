<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->insert([
            ['nombre' => 'Industria Textil', 'slug' => 'textil',     'habilidades' => 'Reduce el impacto de cartas de Ropa. Puede reciclar materiales.'],
            ['nombre' => 'Ciencia e I+D',    'slug' => 'ciencia',    'habilidades' => 'Puede neutralizar una carta negativa por turno. Bonus en cartas de Datos.'],
            ['nombre' => 'Gigantes Tech',    'slug' => 'tech',       'habilidades' => 'Gestiona cartas de Datos y Energía con ventaja. Puede compartir recursos.'],
            ['nombre' => 'Sector Primario',  'slug' => 'primario',   'habilidades' => 'Reduce impacto en cartas de Agua. Genera eco-fichas extra al acertar.'],
            ['nombre' => 'Sector Público',   'slug' => 'publico',    'habilidades' => 'Puede bloquear una carta de evento por partida. Bonus en coordinación.'],
            ['nombre' => 'Ciudadanía',       'slug' => 'ciudadania', 'habilidades' => 'Voto extra en decisiones grupales. Puede redistribuir eco-fichas.'],
        ]);
    }
}