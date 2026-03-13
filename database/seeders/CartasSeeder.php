<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CartasSeeder extends Seeder
{
    public function run(): void
    {
        // ─────────────────────────────────────────────
        // CARTAS
        // anillo_id: 1=Agua, 2=Plástico, 3=Datos, 4=Energía, 5=Ropa
        // cambio_temp solo se usa en eventos (null en preguntas)
        // ─────────────────────────────────────────────
        $cartas = [

            // ── AGUA (anillo 1) ──────────────────────
            ['anillo_id' => 1, 'tipo' => 'pregunta', 'texto' => '¿Qué porcentaje aproximado del agua del planeta es agua dulce disponible para consumo humano?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 1, 'tipo' => 'pregunta', 'texto' => '¿Cuál de las siguientes prácticas ayuda más a reducir el consumo de agua en la agricultura?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 1, 'tipo' => 'pregunta', 'texto' => '¿Cuál de estas actividades genera mayor consumo de agua a nivel global?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 1, 'tipo' => 'pregunta', 'texto' => '¿Qué efecto puede tener la contaminación del agua sobre la biodiversidad?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 1, 'tipo' => 'pregunta', 'texto' => '¿Qué medida puede aplicar una ciudad para gestionar mejor el consumo de agua?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 1, 'tipo' => 'pregunta', 'texto' => '¿Cómo puede el cambio climático afectar el acceso al agua potable?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 1, 'tipo' => 'evento', 'texto' => 'Sequía extrema en varias regiones. Los sectores de Agricultura y Ciudadanía pierden 2 Eco-Tokens cada uno.', 'tiempo' => null, 'cambio_temp' => 0.2],
            ['anillo_id' => 1, 'tipo' => 'evento', 'texto' => 'Se implementa riego por goteo en toda la agricultura nacional. La temperatura baja gracias a la reducción del desperdicio hídrico.', 'tiempo' => null, 'cambio_temp' => -0.2],
            ['anillo_id' => 1, 'tipo' => 'evento', 'texto' => 'Contaminación de acuíferos por vertidos industriales. El Sector Primario pierde 3 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => 0.1],
            ['anillo_id' => 1, 'tipo' => 'evento', 'texto' => 'Nueva red de reciclaje de aguas grises en las ciudades. El Sector Público gana 2 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => -0.1],

            // ── PLÁSTICO (anillo 2) ──────────────────
            ['anillo_id' => 2, 'tipo' => 'pregunta', 'texto' => '¿Cuál de los siguientes plásticos es más fácil de reciclar en la mayoría de los sistemas de reciclaje urbanos?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 2, 'tipo' => 'pregunta', 'texto' => '¿Cuál de los siguientes productos de plástico tarda más en degradarse en el medio ambiente?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 2, 'tipo' => 'pregunta', 'texto' => '¿Cuál de las siguientes acciones refleja mejor el concepto de economía circular?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 2, 'tipo' => 'pregunta', 'texto' => '¿Cuál es la consecuencia más grave de los microplásticos en los océanos?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 2, 'tipo' => 'pregunta', 'texto' => '¿Qué alternativa sostenible al plástico es más efectiva para reducir residuos?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 2, 'tipo' => 'pregunta', 'texto' => '¿Qué acción ayuda más a reducir la contaminación por plásticos en casa?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 2, 'tipo' => 'evento', 'texto' => 'Vertido masivo de plásticos en el océano detectado. La cadena alimentaria se ve afectada. Temperatura sube y Ciudadanía pierde 2 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => 0.2],
            ['anillo_id' => 2, 'tipo' => 'evento', 'texto' => 'Los Gigantes Tech lanzan packaging 100% biodegradable. La temperatura baja y el equipo gana 3 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => -0.2],
            ['anillo_id' => 2, 'tipo' => 'evento', 'texto' => 'Nueva ley prohíbe plásticos de un solo uso. El Sector Público gana 2 Eco-Tokens pero la Industria Textil pierde 1.', 'tiempo' => null, 'cambio_temp' => -0.1],
            ['anillo_id' => 2, 'tipo' => 'evento', 'texto' => 'Campaña de reciclaje viral en redes sociales. Ciudadanía y Gigantes Tech ganan 1 Eco-Token cada uno.', 'tiempo' => null, 'cambio_temp' => -0.1],

            // ── DATOS / PANTALLAS (anillo 3) ─────────
            ['anillo_id' => 3, 'tipo' => 'pregunta', 'texto' => '¿Por qué los centros de datos consumen tanta energía?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 3, 'tipo' => 'pregunta', 'texto' => '¿Cuál de estas acciones ayuda a reducir la huella digital de los usuarios?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 3, 'tipo' => 'pregunta', 'texto' => '¿Qué problema ambiental genera principalmente la electrónica de consumo?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 3, 'tipo' => 'pregunta', 'texto' => '¿Qué responsabilidad tienen las empresas tecnológicas respecto al ciclo de vida de los dispositivos?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 3, 'tipo' => 'pregunta', 'texto' => '¿Cuál de las siguientes prácticas reduce la contaminación digital indirecta?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 3, 'tipo' => 'pregunta', 'texto' => '¿Qué estrategia puede usar un usuario para prolongar la vida útil de sus dispositivos electrónicos?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 3, 'tipo' => 'evento', 'texto' => 'Gran empresa tech inaugura centro de datos sin energía renovable. Los Gigantes Tech pierden 2 Eco-Tokens y la temperatura sube.', 'tiempo' => null, 'cambio_temp' => 0.2],
            ['anillo_id' => 3, 'tipo' => 'evento', 'texto' => 'Campaña de reciclaje de dispositivos electrónicos. Ciencia e I+D y Gigantes Tech ganan 2 Eco-Tokens cada uno.', 'tiempo' => null, 'cambio_temp' => -0.1],
            ['anillo_id' => 3, 'tipo' => 'evento', 'texto' => 'Explosión de basura electrónica en países en vías de desarrollo. Temperatura sube y Ciudadanía pierde 1 Eco-Token.', 'tiempo' => null, 'cambio_temp' => 0.1],
            ['anillo_id' => 3, 'tipo' => 'evento', 'texto' => 'IA optimiza el consumo energético de los servidores globales. La temperatura baja y Ciencia e I+D gana 3 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => -0.2],

            // ── ENERGÍA (anillo 4) ───────────────────
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Cuál de estas fuentes de energía produce menos emisiones de CO₂ en su ciclo de vida?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Qué medida ayuda más a reducir el consumo energético en los hogares?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Cuál es la principal ventaja de las energías renovables frente a los combustibles fósiles?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Qué sector consume más energía a nivel global?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Qué acción puede tomar una empresa tecnológica para reducir su huella energética?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Qué hábito cotidiano ayuda a disminuir el consumo de energía?', 'tiempo' => 30, 'cambio_temp' => null],
            // Sugerencia del jefe: transporte compartido
            ['anillo_id' => 4, 'tipo' => 'pregunta', 'texto' => '¿Qué ventaja ambiental tienen los servicios de transporte compartido como BlaBlaCar frente al vehículo privado?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 4, 'tipo' => 'evento', 'texto' => 'Apagón masivo por sobrecarga de la red eléctrica. Sector Público y Ciudadanía pierden 1 Eco-Token cada uno.', 'tiempo' => null, 'cambio_temp' => 0.1],
            ['anillo_id' => 4, 'tipo' => 'evento', 'texto' => 'Gran parque eólico offshore inaugurado. La temperatura baja y el equipo gana 3 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => -0.3],
            ['anillo_id' => 4, 'tipo' => 'evento', 'texto' => 'Subida del precio de los combustibles fósiles. El transporte privado colapsa. Ciudadanía pierde 2 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => 0.2],
            ['anillo_id' => 4, 'tipo' => 'evento', 'texto' => 'Boom del transporte compartido y bicicletas eléctricas en las ciudades. Ciudadanía y Sector Público ganan 2 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => -0.2],

            // ── ROPA (anillo 5) ──────────────────────
            ['anillo_id' => 5, 'tipo' => 'pregunta', 'texto' => '¿Por qué la industria de la moda rápida ("fast fashion") es tan contaminante?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 5, 'tipo' => 'pregunta', 'texto' => '¿Qué práctica de los consumidores puede reducir el impacto ambiental de la ropa?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 5, 'tipo' => 'pregunta', 'texto' => '¿Cuál es la consecuencia principal del uso intensivo de agua en la industria textil?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 5, 'tipo' => 'pregunta', 'texto' => '¿Qué alternativa puede usar la industria para producir ropa más sostenible?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 5, 'tipo' => 'pregunta', 'texto' => '¿Qué es la "moda circular"?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 5, 'tipo' => 'pregunta', 'texto' => '¿Qué acción del consumidor ayuda más a reducir la huella ambiental de la ropa?', 'tiempo' => 30, 'cambio_temp' => null],
            ['anillo_id' => 5, 'tipo' => 'evento', 'texto' => 'Una gran marca de fast fashion lanza una nueva colección de 50 millones de prendas. Industria Textil pierde 2 Eco-Tokens y la temperatura sube.', 'tiempo' => null, 'cambio_temp' => 0.2],
            ['anillo_id' => 5, 'tipo' => 'evento', 'texto' => 'Movimiento de intercambio de ropa se vuelve viral. Ciudadanía gana 3 Eco-Tokens y la temperatura baja.', 'tiempo' => null, 'cambio_temp' => -0.2],
            ['anillo_id' => 5, 'tipo' => 'evento', 'texto' => 'Vertido de tintes tóxicos en río por fábrica textil. Sector Primario y Ciudadanía pierden 1 Eco-Token cada uno.', 'tiempo' => null, 'cambio_temp' => 0.1],
            ['anillo_id' => 5, 'tipo' => 'evento', 'texto' => 'Nueva certificación textil sostenible adoptada por las principales marcas. Industria Textil gana 2 Eco-Tokens.', 'tiempo' => null, 'cambio_temp' => -0.1],
        ];

        DB::table('cartas')->insert($cartas);

    }
}