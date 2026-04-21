<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PreguntasTestSeeder extends Seeder
{
    public function run(): void
    {
        // Limpiar tablas para evitar errores de duplicidad
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('opciones_respuesta')->truncate();
        DB::table('preguntas')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // ─────────────────────────────────────────────
        // DEFINICIÓN DE PREGUNTAS POR SECTOR Y TIPO
        // ─────────────────────────────────────────────
        
        $data = [
            // --- AGUA (IDs: 1, 2, 3, 4, 5, 6) ---
            1 => [
                'texto' => '¿Qué porcentaje aproximado del agua del planeta es agua dulce disponible para consumo humano?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => '50%', 'correcta' => false],
                    ['texto' => '25%', 'correcta' => false],
                    ['texto' => '10%', 'correcta' => false],
                    ['texto' => '1%', 'correcta' => true],
                ],
            ],
            2 => [
                'texto' => '¿Qué porcentaje de reducción en el consumo de agua debería exigirse a la industria agrícola?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 0,
                'rango_max' => 100,
            ],
            3 => [
                'texto' => 'Propón una medida concreta que pueda aplicar tu ciudad para reducir el desperdicio de agua potable.',
                'tipo_pregunta' => 'free',
            ],
            4 => [
                'texto' => '¿Cuál de las siguientes prácticas ayuda más a reducir el consumo de agua en la agricultura?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'Regar en horas de más calor', 'correcta' => false],
                    ['texto' => 'Usar riego por goteo', 'correcta' => true],
                    ['texto' => 'Plantar especies sedientas', 'correcta' => false],
                    ['texto' => 'Limpiar con manguera', 'correcta' => false],
                ],
            ],
            5 => [
                'texto' => '¿Qué nivel de ahorro de agua por hogar consideras justo incentivar con rebajas fiscales?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 0,
                'rango_max' => 100,
            ],
            6 => [
                'texto' => '¿Cómo concienciarías a los vecinos para que no malgasten agua en verano?',
                'tipo_pregunta' => 'free',
            ],

            // --- PLÁSTICO (IDs: 11, 12, 13, 14, 15, 16) ---
            11 => [
                'texto' => '¿Cuál de los siguientes plásticos es más fácil de reciclar habitualmente?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'LDPE', 'correcta' => false],
                    ['texto' => 'EPS', 'correcta' => false],
                    ['texto' => 'PVC', 'correcta' => false],
                    ['texto' => 'PET', 'correcta' => true],
                ],
            ],
            12 => [
                'texto' => '¿Qué porcentaje de los envases de plástico debería ser reciclado obligatoriamente por ley?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 0,
                'rango_max' => 100,
            ],
            13 => [
                'texto' => 'Diseña una campaña rápida para reducir el uso de plástico en tu oficina o centro.',
                'tipo_pregunta' => 'free',
            ],
            14 => [
                'texto' => '¿Cuál de las siguientes acciones refleja mejor el concepto de economía circular?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'Comprar y tirar', 'correcta' => false],
                    ['texto' => 'Reutilizar y reciclar', 'correcta' => true],
                    ['texto' => 'Producir más rápido', 'correcta' => false],
                    ['texto' => 'Usar energía fósil', 'correcta' => false],
                ],
            ],
            15 => [
                'texto' => '¿Qué impuesto (en céntimos) pondrías a cada bolsa de plástico no biodegradable?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 0,
                'rango_max' => 50,
            ],
            16 => [
                'texto' => '¿Qué alternativa al plástico propondrías para los envases de comida a domicilio?',
                'tipo_pregunta' => 'free',
            ],

            // --- DATOS (IDs: 21, 22, 23, 24, 25, 26) ---
            21 => [
                'texto' => '¿Por qué los centros de datos consumen tanta energía?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'Están lejos', 'correcta' => false],
                    ['texto' => 'Refrigeración y servidores', 'correcta' => true],
                    ['texto' => 'Solo usan solar', 'correcta' => false],
                    ['texto' => 'No guardan nada', 'correcta' => false],
                ],
            ],
            22 => [
                'texto' => '¿Qué porcentaje de energía renovable deberían usar los gigantes tecnológicos por contrato?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 0,
                'rango_max' => 100,
            ],
            23 => [
                'texto' => 'Propón una estrategia para que una empresa tech reduzca su huella de carbono digital.',
                'tipo_pregunta' => 'free',
            ],
            24 => [
                'texto' => '¿Cuál de estas acciones ayuda a reducir la huella digital personal?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'No borrar correos', 'correcta' => false],
                    ['texto' => 'Borrar archivos innecesarios', 'correcta' => true],
                    ['texto' => 'Descargar todo', 'correcta' => false],
                    ['texto' => 'Siempre encendido', 'correcta' => false],
                ],
            ],
            25 => [
                'texto' => '¿Cuántos años de vida útil mínima debería garantizarse para un smartphone por ley?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 1,
                'rango_max' => 10,
            ],
            26 => [
                'texto' => '¿Cómo fomentarías el "derecho a reparar" frente a la obsolescencia programada?',
                'tipo_pregunta' => 'free',
            ],

            // --- ENERGÍA (IDs: 31, 32, 33, 34, 35, 36, 37) ---
            31 => [
                'texto' => '¿Cuál de estas fuentes produce menos emisiones de CO₂ en su ciclo de vida?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'Carbón', 'correcta' => false],
                    ['texto' => 'Gas natural', 'correcta' => false],
                    ['texto' => 'Solar fotovoltaica', 'correcta' => true],
                    ['texto' => 'Petróleo', 'correcta' => false],
                ],
            ],
            32 => [
                'texto' => '¿Qué porcentaje de la red eléctrica nacional debería ser renovable para el 2030?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 0,
                'rango_max' => 100,
            ],
            33 => [
                'texto' => 'Describe un plan de acción para que tu comunidad reduzca el consumo eléctrico un 20%.',
                'tipo_pregunta' => 'free',
            ],
            34 => [
                'texto' => '¿Qué sector consume más energía a nivel global hoy?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'Transporte', 'correcta' => true],
                    ['texto' => 'Educación', 'correcta' => false],
                    ['texto' => 'Agricultura urbana', 'correcta' => false],
                    ['texto' => 'Reciclaje', 'correcta' => false],
                ],
            ],
            35 => [
                'texto' => '¿Qué temperatura mínima (en grados) pondrías para el aire acondicionado en edificios públicos?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 18,
                'rango_max' => 30,
            ],
            36 => [
                'texto' => '¿Qué opinas del transporte compartido frente al vehículo privado?',
                'tipo_pregunta' => 'free',
            ],
            37 => [
                'texto' => '¿Qué hábito ayuda a disminuir más el consumo de energía en casa?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'Dejar cargadores puestos', 'correcta' => false],
                    ['texto' => 'Usar bici o transporte público', 'correcta' => true],
                    ['texto' => 'Siempre el ascensor', 'correcta' => false],
                    ['texto' => 'Nada, da igual', 'correcta' => false],
                ],
            ],

            // --- ROPA (IDs: 42, 43, 44, 45, 46, 47) ---
            42 => [
                'texto' => '¿Por qué la industria de la moda rápida ("fast fashion") es tan contaminante?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'Produce poco', 'correcta' => false],
                    ['texto' => 'Residuos y consumo masivo', 'correcta' => true],
                    ['texto' => 'Todo es reciclado', 'correcta' => false],
                    ['texto' => 'Ropa duradera', 'correcta' => false],
                ],
            ],
            43 => [
                'texto' => '¿Qué porcentaje de impuesto aplicarías a las marcas que no usen materiales reciclados?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 0,
                'rango_max' => 50,
            ],
            44 => [
                'texto' => 'Propón una alternativa sostenible al modelo actual de comprar ropa barata cada mes.',
                'tipo_pregunta' => 'free',
            ],
            45 => [
                'texto' => '¿Qué práctica reduce más el impacto ambiental de tu armario?',
                'tipo_pregunta' => 'options',
                'opciones' => [
                    ['texto' => 'Comprar barato siempre', 'correcta' => false],
                    ['texto' => 'Donar, reparar o intercambiar', 'correcta' => true],
                    ['texto' => 'Usarlo solo una vez', 'correcta' => false],
                    ['texto' => 'No reciclar nunca', 'correcta' => false],
                ],
            ],
            46 => [
                'texto' => '¿Cuántas prendas de ropa nuevas consideras aceptable comprar al año para ser sostenible?',
                'tipo_pregunta' => 'slider',
                'rango_min' => 0,
                'rango_max' => 24,
            ],
            47 => [
                'texto' => '¿Cómo convencerías a alguien para comprar en una tienda de segunda mano?',
                'tipo_pregunta' => 'free',
            ],
        ];

        // ── INSERTAR TODO ────────────────────────────
        foreach ($data as $carta_id => $p) {
            $pregunta_id = DB::table('preguntas')->insertGetId([
                'carta_id'      => $carta_id,
                'texto'         => $p['texto'],
                'tipo_pregunta' => $p['tipo_pregunta'],
                'rango_min'     => $p['rango_min'] ?? null,
                'rango_max'     => $p['rango_max'] ?? null,
                'created_at'    => now(),
                'updated_at'    => now(),
            ]);

            if ($p['tipo_pregunta'] === 'options' && isset($p['opciones'])) {
                foreach ($p['opciones'] as $o) {
                    DB::table('opciones_respuesta')->insert([
                        'pregunta_id' => $pregunta_id,
                        'texto'       => $o['texto'],
                        'correcta'    => $o['correcta'],
                        'created_at'  => now(),
                        'updated_at'  => now(),
                    ]);
                }
            }
        }
    }
}