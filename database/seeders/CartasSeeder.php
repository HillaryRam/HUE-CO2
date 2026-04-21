<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartasSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Limpiar tablas para evitar duplicados si se corre varias veces
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('cartas')->truncate();
        DB::table('preguntas')->truncate();
        DB::table('opciones_respuesta')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // ─────────────────────────────────────────────
        // DEFINICIÓN DE CONTENIDO (Ejemplo unificado)
        // ─────────────────────────────────────────────
        $anillos = [
            1 => [ // AGUA
                'preguntas' => [
                    [
                        'texto' => '¿Qué porcentaje aproximado del agua del planeta es agua dulce disponible para consumo humano?',
                        'puntos' => 3, 'penalizacion' => 1, 'tipo_pregunta' => 'options',
                        'opciones' => [
                            ['texto' => '50%', 'correcta' => false],
                            ['texto' => '25%', 'correcta' => false],
                            ['texto' => '10%', 'correcta' => false],
                            ['texto' => '1%', 'correcta' => true],
                        ]
                    ],
                    [
                        'texto' => '¿Cuál de las siguientes prácticas ayuda más a reducir el consumo de agua en la agricultura?',
                        'puntos' => 2, 'penalizacion' => 1, 'tipo_pregunta' => 'options',
                        'opciones' => [
                            ['texto' => 'Regar en horas de más calor', 'correcta' => false],
                            ['texto' => 'Usar riego por goteo', 'correcta' => true],
                            ['texto' => 'Plantar especies con alto consumo', 'correcta' => false],
                        ]
                    ],
                ],
                'eventos' => [
                    [
                        'texto' => 'Sequía extrema. Los sectores de Agricultura pierden EcoFichas.',
                        'cambio_temp' => 0.2, 'penalizacion' => 2
                    ],
                ]
            ],
            2 => [ // PLÁSTICO
                'preguntas' => [
                    [
                        'texto' => '¿Cuál es el plástico más fácil de reciclar?',
                        'puntos' => 2, 'penalizacion' => 1, 'tipo_pregunta' => 'options',
                        'opciones' => [
                            ['texto' => 'PVC', 'correcta' => false],
                            ['texto' => 'PET', 'correcta' => true],
                            ['texto' => 'Poliestireno', 'correcta' => false],
                        ]
                    ]
                ],
                'eventos' => [
                    [
                        'texto' => 'Nueva ley prohíbe plásticos de un solo uso.',
                        'cambio_temp' => -0.1, 'puntos' => 2
                    ]
                ]
            ]
            // ... Se pueden añadir más siguiendo este patrón
        ];

        foreach ($anillos as $anilloId => $contenido) {
            // Insertar Preguntas
            foreach ($contenido['preguntas'] as $p) {
                $cartaId = DB::table('cartas')->insertGetId([
                    'anillo_id' => $anilloId,
                    'tipo' => 'pregunta',
                    'texto' => $p['texto'],
                    'tiempo' => 20,
                    'puntos' => $p['puntos'],
                    'penalizacion' => $p['penalizacion'],
                    'created_at' => now(), 'updated_at' => now(),
                ]);

                $preguntaId = DB::table('preguntas')->insertGetId([
                    'carta_id' => $cartaId,
                    'texto' => $p['texto'],
                    'tipo_pregunta' => $p['tipo_pregunta'],
                    'created_at' => now(), 'updated_at' => now(),
                ]);

                foreach ($p['opciones'] as $o) {
                    DB::table('opciones_respuesta')->insert([
                        'pregunta_id' => $preguntaId,
                        'texto' => $o['texto'],
                        'correcta' => $o['correcta'],
                        'created_at' => now(), 'updated_at' => now(),
                    ]);
                }
            }

            // Insertar Eventos
            foreach ($contenido['eventos'] as $e) {
                DB::table('cartas')->insert([
                    'anillo_id' => $anilloId,
                    'tipo' => 'evento',
                    'texto' => $e['texto'],
                    'cambio_temp' => $e['cambio_temp'],
                    'puntos' => $e['puntos'] ?? 0,
                    'penalizacion' => $e['penalizacion'] ?? 0,
                    'created_at' => now(), 'updated_at' => now(),
                ]);
            }
        }
    }
}