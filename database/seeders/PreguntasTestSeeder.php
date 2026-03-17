<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PreguntasTestSeeder extends Seeder
{
    public function run(): void
    {
        // ─────────────────────────────────────────────
        // PREGUNTAS Y OPCIONES (solo cartas tipo pregunta)
        // Las IDs dependen del orden de inserción arriba
        // ─────────────────────────────────────────────
        $preguntas = [

            // ── AGUA ─────────────────────────────────
            1 => [ // Porcentaje agua dulce
                'texto' => '¿Qué porcentaje aproximado del agua del planeta es agua dulce disponible para consumo humano?',
                'opciones' => [
                    ['texto' => '50%', 'correcta' => false],
                    ['texto' => '25%', 'correcta' => false],
                    ['texto' => '10%', 'correcta' => false],
                    ['texto' => '1%', 'correcta' => true],
                ],
            ],
            2 => [ // Riego por goteo
                'texto' => '¿Cuál de las siguientes prácticas ayuda más a reducir el consumo de agua en la agricultura?',
                'opciones' => [
                    ['texto' => 'Regar en horas de más calor', 'correcta' => false],
                    ['texto' => 'Usar riego por goteo', 'correcta' => true],
                    ['texto' => 'Plantar especies que consumen mucha agua', 'correcta' => false],
                    ['texto' => 'Limpiar los campos con manguera', 'correcta' => false],
                ],
            ],
            3 => [ // Agricultura y agua
                'texto' => '¿Cuál de estas actividades genera mayor consumo de agua a nivel global?',
                'opciones' => [
                    ['texto' => 'Transporte público', 'correcta' => false],
                    ['texto' => 'Producción de alimentos y agricultura', 'correcta' => true],
                    ['texto' => 'Energía solar', 'correcta' => false],
                    ['texto' => 'Reciclaje de papel', 'correcta' => false],
                ],
            ],
            4 => [ // Biodiversidad y agua
                'texto' => '¿Qué efecto puede tener la contaminación del agua sobre la biodiversidad?',
                'opciones' => [
                    ['texto' => 'Incrementa el número de especies', 'correcta' => false],
                    ['texto' => 'Reduce la disponibilidad de nutrientes', 'correcta' => false],
                    ['texto' => 'Provoca la muerte de especies y pérdida de hábitats', 'correcta' => true],
                    ['texto' => 'Mejora la calidad del agua', 'correcta' => false],
                ],
            ],
            5 => [ // Aguas grises
                'texto' => '¿Qué medida puede aplicar una ciudad para gestionar mejor el consumo de agua?',
                'opciones' => [
                    ['texto' => 'Implementar sistemas de reciclaje de aguas grises', 'correcta' => true],
                    ['texto' => 'Aumentar el uso de agua potable en parques', 'correcta' => false],
                    ['texto' => 'Construir piscinas públicas más grandes', 'correcta' => false],
                    ['texto' => 'Abastecer toda el agua mediante transporte de camiones', 'correcta' => false],
                ],
            ],
            6 => [ // Cambio climático y agua
                'texto' => '¿Cómo puede el cambio climático afectar el acceso al agua potable?',
                'opciones' => [
                    ['texto' => 'Aumentando la disponibilidad de agua en todas las regiones', 'correcta' => false],
                    ['texto' => 'Provocando sequías y escasez en algunas zonas', 'correcta' => true],
                    ['texto' => 'Eliminando los problemas de contaminación', 'correcta' => false],
                    ['texto' => 'Garantizando agua dulce ilimitada', 'correcta' => false],
                ],
            ],

            // ── PLÁSTICO ──────────────────────────────
            11 => [ // PET reciclable
                'texto' => '¿Cuál de los siguientes plásticos es más fácil de reciclar en la mayoría de los sistemas de reciclaje urbanos?',
                'opciones' => [
                    ['texto' => 'Polietileno de baja densidad (LDPE)', 'correcta' => false],
                    ['texto' => 'Poliestireno expandido (EPS)', 'correcta' => false],
                    ['texto' => 'PVC', 'correcta' => false],
                    ['texto' => 'Polietileno tereftalato (PET)', 'correcta' => true],
                ],
            ],
            12 => [ // Botella PET degradación
                'texto' => '¿Cuál de los siguientes productos de plástico tarda más en degradarse en el medio ambiente?',
                'opciones' => [
                    ['texto' => 'Bolsa de plástico biodegradable', 'correcta' => false],
                    ['texto' => 'Botella de PET', 'correcta' => true],
                    ['texto' => 'Bolsa de papel', 'correcta' => false],
                    ['texto' => 'Envase de cartón', 'correcta' => false],
                ],
            ],
            13 => [ // Economía circular
                'texto' => '¿Cuál de las siguientes acciones refleja mejor el concepto de economía circular?',
                'opciones' => [
                    ['texto' => 'Comprar productos de usar y tirar y desecharlos rápidamente', 'correcta' => false],
                    ['texto' => 'Reutilizar, reciclar y reducir el consumo de recursos', 'correcta' => true],
                    ['texto' => 'Aumentar la producción sin considerar residuos', 'correcta' => false],
                    ['texto' => 'Depender únicamente de la energía fósil', 'correcta' => false],
                ],
            ],
            14 => [ // Microplásticos oceanos
                'texto' => '¿Cuál es la consecuencia más grave de los microplásticos en los océanos?',
                'opciones' => [
                    ['texto' => 'Generan energía limpia', 'correcta' => false],
                    ['texto' => 'Contaminan la cadena alimentaria', 'correcta' => true],
                    ['texto' => 'Mejoran la biodiversidad', 'correcta' => false],
                    ['texto' => 'Absorben el CO₂ de la atmósfera', 'correcta' => false],
                ],
            ],
            15 => [ // Vidrio reutilizable
                'texto' => '¿Qué alternativa sostenible al plástico es más efectiva para reducir residuos?',
                'opciones' => [
                    ['texto' => 'Usar botellas de vidrio reutilizables', 'correcta' => true],
                    ['texto' => 'Usar bolsas plásticas de colores', 'correcta' => false],
                    ['texto' => 'Comprar productos en envases individuales', 'correcta' => false],
                    ['texto' => 'Usar solo plástico reciclado', 'correcta' => false],
                ],
            ],
            16 => [ // Separar residuos
                'texto' => '¿Qué acción ayuda más a reducir la contaminación por plásticos en casa?',
                'opciones' => [
                    ['texto' => 'Tirar todo el plástico al contenedor de orgánicos', 'correcta' => false],
                    ['texto' => 'Separar residuos y reciclar correctamente', 'correcta' => true],
                    ['texto' => 'Comprar solo productos importados', 'correcta' => false],
                    ['texto' => 'Usar bolsas nuevas cada vez', 'correcta' => false],
                ],
            ],

            // ── DATOS / PANTALLAS ─────────────────────
            21 => [ // Centros de datos
                'texto' => '¿Por qué los centros de datos consumen tanta energía?',
                'opciones' => [
                    ['texto' => 'Porque funcionan solo unas horas al día', 'correcta' => false],
                    ['texto' => 'Por la refrigeración y mantenimiento de servidores', 'correcta' => true],
                    ['texto' => 'Porque usan energía solar únicamente', 'correcta' => false],
                    ['texto' => 'Porque no almacenan información', 'correcta' => false],
                ],
            ],
            22 => [ // Huella digital
                'texto' => '¿Cuál de estas acciones ayuda a reducir la huella digital de los usuarios?',
                'opciones' => [
                    ['texto' => 'Mantener el correo lleno de correos antiguos', 'correcta' => false],
                    ['texto' => 'Borrar archivos y correos innecesarios', 'correcta' => true],
                    ['texto' => 'Descargar archivos de gran tamaño sin usar', 'correcta' => false],
                    ['texto' => 'Dejar todos los dispositivos encendidos constantemente', 'correcta' => false],
                ],
            ],
            23 => [ // Basura electrónica
                'texto' => '¿Qué problema ambiental genera principalmente la electrónica de consumo?',
                'opciones' => [
                    ['texto' => 'Destrucción de bosques', 'correcta' => false],
                    ['texto' => 'Basura electrónica y metales tóxicos', 'correcta' => true],
                    ['texto' => 'Emisión de oxígeno', 'correcta' => false],
                    ['texto' => 'Disminución de energía solar', 'correcta' => false],
                ],
            ],
            24 => [ // Responsabilidad tech
                'texto' => '¿Qué responsabilidad tienen las empresas tecnológicas respecto al ciclo de vida de los dispositivos?',
                'opciones' => [
                    ['texto' => 'Solo venderlos y olvidarse', 'correcta' => false],
                    ['texto' => 'Garantizar reparación, reciclaje y fin de vida sostenible', 'correcta' => true],
                    ['texto' => 'Fabricarlos siempre más baratos', 'correcta' => false],
                    ['texto' => 'Cambiarlos cada año por modelos nuevos', 'correcta' => false],
                ],
            ],
            25 => [ // Streaming y almacenamiento
                'texto' => '¿Cuál de las siguientes prácticas reduce la contaminación digital indirecta?',
                'opciones' => [
                    ['texto' => 'Apagar las notificaciones', 'correcta' => false],
                    ['texto' => 'Usar menos streaming y optimizar almacenamiento', 'correcta' => true],
                    ['texto' => 'Comprar más dispositivos', 'correcta' => false],
                    ['texto' => 'Mantener todos los archivos en la nube sin control', 'correcta' => false],
                ],
            ],
            26 => [ // Reparar dispositivos
                'texto' => '¿Qué estrategia puede usar un usuario para prolongar la vida útil de sus dispositivos electrónicos?',
                'opciones' => [
                    ['texto' => 'Actualizarlos solo cuando fallen', 'correcta' => false],
                    ['texto' => 'Repararlos y reutilizarlos', 'correcta' => true],
                    ['texto' => 'Comprar siempre el modelo más reciente', 'correcta' => false],
                    ['texto' => 'Evitar cargarlos completamente', 'correcta' => false],
                ],
            ],

            // ── ENERGÍA ───────────────────────────────
            31 => [ // Solar fotovoltaica
                'texto' => '¿Cuál de estas fuentes de energía produce menos emisiones de CO₂ en su ciclo de vida?',
                'opciones' => [
                    ['texto' => 'Carbón', 'correcta' => false],
                    ['texto' => 'Gas natural', 'correcta' => false],
                    ['texto' => 'Solar fotovoltaica', 'correcta' => true],
                    ['texto' => 'Petróleo', 'correcta' => false],
                ],
            ],
            32 => [ // Apagar electrónicos
                'texto' => '¿Qué medida ayuda más a reducir el consumo energético en los hogares?',
                'opciones' => [
                    ['texto' => 'Dejar las luces encendidas todo el día', 'correcta' => false],
                    ['texto' => 'Apagar equipos electrónicos cuando no se usan', 'correcta' => true],
                    ['texto' => 'Usar bombillas incandescentes', 'correcta' => false],
                    ['texto' => 'Mantener el aire acondicionado encendido todo el tiempo', 'correcta' => false],
                ],
            ],
            33 => [ // Renovables vs fósiles
                'texto' => '¿Cuál es la principal ventaja de las energías renovables frente a los combustibles fósiles?',
                'opciones' => [
                    ['texto' => 'Son más caras', 'correcta' => false],
                    ['texto' => 'Generan menos emisiones contaminantes', 'correcta' => true],
                    ['texto' => 'Son más contaminantes', 'correcta' => false],
                    ['texto' => 'Producen electricidad solo por la noche', 'correcta' => false],
                ],
            ],
            34 => [ // Transporte mayor consumo
                'texto' => '¿Qué sector consume más energía a nivel global?',
                'opciones' => [
                    ['texto' => 'Transporte y movilidad', 'correcta' => true],
                    ['texto' => 'Educación', 'correcta' => false],
                    ['texto' => 'Agricultura urbana', 'correcta' => false],
                    ['texto' => 'Reciclaje de plásticos', 'correcta' => false],
                ],
            ],
            35 => [ // Empresas tech eficiencia
                'texto' => '¿Qué acción puede tomar una empresa tecnológica para reducir su huella energética?',
                'opciones' => [
                    ['texto' => 'Mantener siempre encendidos los servidores', 'correcta' => false],
                    ['texto' => 'Optimizar la eficiencia de sus centros de datos', 'correcta' => true],
                    ['texto' => 'Comprar servidores más grandes sin control', 'correcta' => false],
                    ['texto' => 'Aumentar el consumo eléctrico para mayor velocidad', 'correcta' => false],
                ],
            ],
            36 => [ // Transporte público y bici
                'texto' => '¿Qué hábito cotidiano ayuda a disminuir el consumo de energía?',
                'opciones' => [
                    ['texto' => 'Dejar cargadores conectados sin usar', 'correcta' => false],
                    ['texto' => 'Usar transporte público o bicicleta', 'correcta' => true],
                    ['texto' => 'Usar siempre ascensores aunque sean pocos pisos', 'correcta' => false],
                    ['texto' => 'Mantener electrodomésticos encendidos todo el tiempo', 'correcta' => false],
                ],
            ],
            37 => [ // BlaBlacar / transporte compartido
                'texto' => '¿Qué ventaja ambiental tienen los servicios de transporte compartido como BlaBlaCar frente al vehículo privado?',
                'opciones' => [
                    ['texto' => 'Reducen el número de vehículos en circulación y las emisiones de CO₂', 'correcta' => true],
                    ['texto' => 'Consumen más combustible por persona', 'correcta' => false],
                    ['texto' => 'No tienen ningún impacto ambiental', 'correcta' => false],
                    ['texto' => 'Solo benefician a las empresas de transporte', 'correcta' => false],
                ],
            ],

            // ── ROPA ──────────────────────────────────
            41 => [ // Fast fashion contaminante
                'texto' => '¿Por qué la industria de la moda rápida ("fast fashion") es tan contaminante?',
                'opciones' => [
                    ['texto' => 'Porque produce poca ropa', 'correcta' => false],
                    ['texto' => 'Porque genera grandes cantidades de residuos y consumo de recursos', 'correcta' => true],
                    ['texto' => 'Porque usa solo materiales reciclados', 'correcta' => false],
                    ['texto' => 'Porque vende ropa duradera', 'correcta' => false],
                ],
            ],
            42 => [ // Reutilizar ropa
                'texto' => '¿Qué práctica de los consumidores puede reducir el impacto ambiental de la ropa?',
                'opciones' => [
                    ['texto' => 'Comprar solo ropa barata y nueva', 'correcta' => false],
                    ['texto' => 'Reutilizar, intercambiar o donar prendas', 'correcta' => true],
                    ['texto' => 'Usar prendas solo una vez', 'correcta' => false],
                    ['texto' => 'Evitar el reciclaje textil', 'correcta' => false],
                ],
            ],
            43 => [ // Agua textil
                'texto' => '¿Cuál es la consecuencia principal del uso intensivo de agua en la industria textil?',
                'opciones' => [
                    ['texto' => 'Mejora la biodiversidad', 'correcta' => false],
                    ['texto' => 'Escasez de agua y contaminación', 'correcta' => true],
                    ['texto' => 'Producción de energía limpia', 'correcta' => false],
                    ['texto' => 'Reducción de microplásticos', 'correcta' => false],
                ],
            ],
            44 => [ // Materiales sostenibles
                'texto' => '¿Qué alternativa puede usar la industria para producir ropa más sostenible?',
                'opciones' => [
                    ['texto' => 'Materiales biodegradables o reciclados', 'correcta' => true],
                    ['texto' => 'Mayor cantidad de químicos para teñir telas', 'correcta' => false],
                    ['texto' => 'Fabricación rápida sin control', 'correcta' => false],
                    ['texto' => 'Usar siempre algodón importado sin certificación', 'correcta' => false],
                ],
            ],
            45 => [ // Moda circular
                'texto' => '¿Qué es la "moda circular"?',
                'opciones' => [
                    ['texto' => 'Comprar y tirar prendas cada semana', 'correcta' => false],
                    ['texto' => 'Reutilizar, reparar y reciclar ropa para minimizar residuos', 'correcta' => true],
                    ['texto' => 'Usar ropa de colores circulares', 'correcta' => false],
                    ['texto' => 'Fabricar solo ropa nueva de alta calidad', 'correcta' => false],
                ],
            ],
            46 => [ // Larga duración
                'texto' => '¿Qué acción del consumidor ayuda más a reducir la huella ambiental de la ropa?',
                'opciones' => [
                    ['texto' => 'Comprar siempre ropa nueva', 'correcta' => false],
                    ['texto' => 'Elegir prendas de larga duración y materiales sostenibles', 'correcta' => true],
                    ['texto' => 'Evitar lavar la ropa', 'correcta' => false],
                    ['texto' => 'Comprar ropa barata sin importar la procedencia', 'correcta' => false],
                ],
            ],
        ];

        foreach ($preguntas as $carta_id => $pregunta) {
            $pregunta_id = DB::table('preguntas')->insertGetId([
                'carta_id' => $carta_id,
                'texto' => $pregunta['texto'],
            ]);

            foreach ($pregunta['opciones'] as $opcion) {
                DB::table('opciones_respuesta')->insert([
                    'pregunta_id' => $pregunta_id,
                    'texto' => $opcion['texto'],
                    'correcta' => $opcion['correcta'],
                ]);
            }
        }
    }
}