import React from 'react';
import { Award, Users, Recycle, Sparkles, Lightbulb, Cpu, ShieldCheck, AlertTriangle, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Importación de sub-componentes especializados
import ResultsHeader from './Results/ResultsHeader';
import ThermometerPanel from './Results/ThermometerPanel';
import SectorsHall from './Results/SectorsHall';

// Configuración de datos de juego (fuera del componente para mayor limpieza)
const GAME_RESULTS_CONFIG = {
    victory: {
        title: "¡Equilibrio Logrado!",
        subtitle: "Habéis demostrado que la cooperación global puede enfriar el planeta. El futuro es sostenible.",
        finalTemp: -0.2,
        reduction: 1.2,
        statusColor: "text-emerald-600",
        bgColor: "bg-emerald-50",
        accentColor: "bg-emerald-500",
        landColor: "bg-emerald-400",
        icon: <Sparkles className="text-amber-400 w-12 h-12" />,
        tag: "MISIÓN COMPLETADA"
    },
    neutral: {
        title: "Mantenimiento Crítico",
        subtitle: "El planeta no ha empeorado, pero tampoco ha mejorado. Estamos en un equilibrio frágil.",
        finalTemp: 0.8,
        reduction: 0.0,
        statusColor: "text-amber-600",
        bgColor: "bg-amber-50",
        accentColor: "bg-amber-400",
        landColor: "bg-yellow-200",
        icon: <Minus className="text-amber-500 w-12 h-12" />,
        tag: "SIN CAMBIOS"
    },
    defeat: {
        title: "Colapso Climático",
        subtitle: "La temperatura ha superado los límites de seguridad. La falta de consenso ha pasado factura.",
        finalTemp: 1.4,
        reduction: -0.4,
        statusColor: "text-rose-600",
        bgColor: "bg-rose-50",
        accentColor: "bg-rose-500",
        landColor: "bg-amber-800",
        icon: <AlertTriangle className="text-rose-500 w-12 h-12" />,
        tag: "LÍMITE SUPERADO"
    }
};

const getRoleIcon = (role) => {
    switch (role) {
        case 'Motor Social': return <Users />;
        case 'El Analista': return <Cpu />;
        case 'El Innovador': return <Lightbulb />;
        case 'El Regulador': return <ShieldCheck />;
        case 'El Regenerador': return <Recycle />;
        default: return <Award />;
    }
};

export default function EndgameResults({
    outcome = 'victory',
    finalTemp,
    reduction,
    playerStats,
    onBackToPortal
}) {
    const current = GAME_RESULTS_CONFIG[outcome];
    const displayTemp = finalTemp ?? current.finalTemp;
    const displayReduction = reduction ?? current.reduction;

    // Stats por defecto si no hay reales
    const defaultSectors = [
        { id: 'ciudadania', name: 'Ciudadanía', role: 'Motor Social', icon: <Users />, border: 'border-violet-300', stat: '42 ET Generados', label: 'Máxima Energía', isMVP: true },
        { id: 'tech', name: 'Gigantes Tech', role: 'El Analista', icon: <Cpu />, border: 'border-indigo-300', stat: '5 Crisis Evitadas', label: 'Mejor Prevención' },
        { id: 'ciencia', name: 'Ciencia e I+D', role: 'El Innovador', icon: <Lightbulb />, border: 'border-cyan-300', stat: '3 Anillos Liderados', label: 'Gran Innovador' },
    ];

    const sectorsToDisplay = playerStats ? playerStats.map(p => ({
        ...p,
        icon: getRoleIcon(p.role),
        border: 'border-slate-300'
    })) : defaultSectors;

    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-[#44403c] flex flex-col items-center overflow-hidden relative p-4 md:p-8">
            {/* Fondo Dinámico Optimizado (Radial Gradient) */}
            <div className={`absolute inset-0 pointer-events-none -z-10 opacity-20 transition-all duration-1000`}
                style={{
                    background: `radial-gradient(circle at 50% -20%, ${outcome === 'victory' ? '#6ee7b7' : outcome === 'neutral' ? '#fcd34d' : '#fb7185'} 0%, transparent 70%)`
                }}
            />
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={outcome}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full max-w-7xl flex flex-col items-center"
                >
                    <ResultsHeader current={current} />

                    <main className="w-full flex flex-col lg:flex-row gap-8 mt-12 mb-16 relative z-10 h-full">
                        <ThermometerPanel
                            outcome={outcome}
                            current={current}
                            displayTemp={displayTemp}
                            displayReduction={displayReduction}
                        />

                        <SectorsHall
                            sectors={sectorsToDisplay}
                            onBackToPortal={onBackToPortal}
                        />
                    </main>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
