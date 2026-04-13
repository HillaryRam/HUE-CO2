import React, { useState, useEffect } from 'react';
import {
    Award,
    Users,
    Recycle,
    ArrowRight,
    Sparkles,
    ArrowDownCircle,
    Flame,
    Snowflake,
    Lightbulb,
    Cpu,
    ShieldCheck,
    AlertTriangle,
    TrendingUp,
    Minus
} from 'lucide-react';

export default function EndgameResults({
    outcome = 'victory',
    finalTemp,
    reduction,
    playerStats,
    onBackToPortal
}) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        setShowContent(false);
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, [outcome]);

    // Configuración de datos según el resultado
    const gameData = {
        victory: {
            title: "¡Equilibrio Logrado!",
            subtitle: "Habéis demostrado que la cooperación global puede enfriar el planeta. El futuro es sostenible.",
            finalTemp: -0.2,
            reduction: 1.2,
            statusColor: "text-emerald-600",
            bgColor: "bg-emerald-50",
            accentColor: "bg-emerald-500",
            planetStyle: "bg-blue-500 shadow-[0_0_50px_rgba(16,185,129,0.4)]",
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
            planetStyle: "bg-blue-400 shadow-[0_0_50px_rgba(251,191,36,0.3)]",
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
            planetStyle: "bg-orange-600 shadow-[0_0_50px_rgba(244,63,94,0.4)]",
            landColor: "bg-amber-800",
            icon: <AlertTriangle className="text-rose-500 w-12 h-12" />,
            tag: "LÍMITE SUPERADO"
        }
    };

    const current = gameData[outcome];

    const displayTemp = finalTemp ?? current.finalTemp;
    const displayReduction = reduction ?? current.reduction;

    // Si no se pasan stats reales, usamos estos de prueba
    const defaultSectors = [
        { id: 'ciudadania', name: 'Ciudadanía', role: 'Motor Social', icon: <Users />, color: 'bg-violet-100 text-violet-700', border: 'border-violet-300', stat: '42 ET Generados', label: 'Máxima Energía', isMVP: true },
        { id: 'tech', name: 'Gigantes Tech', role: 'El Analista', icon: <Cpu />, color: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-300', stat: '5 Crisis Evitadas', label: 'Mejor Prevención' },
        { id: 'ciencia', name: 'Ciencia e I+D', role: 'El Innovador', icon: <Lightbulb />, color: 'bg-cyan-100 text-cyan-700', border: 'border-cyan-300', stat: '3 Anillos Liderados', label: 'Gran Innovador' },
    ];

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

    const sectorsToDisplay = playerStats ? playerStats.map(p => ({
        ...p,
        icon: getRoleIcon(p.role),
        color: 'bg-slate-100 text-slate-700',
        border: 'border-slate-300'
    })) : defaultSectors;

    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-[#44403c] flex flex-col items-center overflow-hidden relative p-6">

            {/* Fondos dinámicos */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
            <div className={`absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-1000 ${outcome === 'victory' ? 'bg-emerald-300' : outcome === 'neutral' ? 'bg-amber-200' : 'bg-rose-400'}`} />

            {/* HEADER DE RESULTADOS */}
            <header className={`w-full max-w-6xl mt-8 flex flex-col items-center text-center transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>

                {/* Planeta Central Reactivo */}
                <div className={`w-32 h-32 rounded-full relative flex items-center justify-center transition-all duration-1000 mb-8 border-4 border-white ${current.planetStyle} overflow-hidden`}>
                    <div className={`absolute w-20 h-14 ${current.landColor} rounded-full -top-2 -left-2 opacity-60`}></div>
                    <div className={`absolute w-16 h-20 ${current.landColor} rounded-full bottom-2 -right-4 opacity-60`}></div>
                    <div className="relative z-10">{current.icon}</div>
                </div>

                <div className={`inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 border-slate-100 shadow-sm mb-4 ${current.statusColor}`}>
                    {current.tag}
                </div>

                <h1 className={`text-6xl md:text-7xl font-black tracking-tighter mb-4 transition-colors duration-500 ${current.statusColor}`}>
                    {current.title}
                </h1>
                <p className="text-xl text-[#78716c] font-medium max-w-2xl leading-relaxed">
                    {current.subtitle}
                </p>
            </header>

            {/* DASHBOARD CENTRAL */}
            <main className={`w-full max-w-6xl flex flex-col lg:flex-row gap-8 mt-12 transition-all duration-1000 delay-300 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

                {/* PANEL IZQUIERDO: El Termómetro Final */}
                <div className="flex-1 bg-white border-4 border-slate-100 rounded-[3rem] p-10 shadow-xl relative overflow-hidden flex flex-col items-center justify-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5f5f4] rounded-full blur-3xl -mr-20 -mt-20 opacity-50" />

                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a8a29e] mb-10 text-center">Informe del Termómetro Global</h3>

                    {/* Termómetro Horizontal (Diseño Limpio) */}
                    <div className="flex items-center gap-6 mb-10 w-full max-w-md">
                        <div className="flex flex-col items-center gap-1">
                            <Flame className="w-7 h-7 text-rose-400" />
                            <span className="font-black text-rose-500 text-sm">+1.5°C</span>
                        </div>

                        <div className="flex-1 h-10 bg-slate-50 rounded-full overflow-hidden border-2 border-slate-100 shadow-inner relative flex">
                            {/* Marcas */}
                            <div className="absolute inset-0 flex justify-evenly items-center w-full z-10 pointer-events-none opacity-20">
                                {[...Array(9)].map((_, i) => (
                                    <div key={i} className="w-[1px] h-full bg-slate-900"></div>
                                ))}
                            </div>

                            {/* Llenado dinámico */}
                            <div className="h-full w-full flex">
                                <div className={`h-full transition-all duration-2000 ease-out ${outcome === 'defeat' ? 'bg-rose-500' : outcome === 'neutral' ? 'bg-amber-400' : 'bg-emerald-400'}`}
                                    style={{ width: `${Math.max(10, (displayTemp + 0.5) * 50)}%` }} />
                            </div>

                            {/* Línea de equilibrio (0.0°C) */}
                            <div className="absolute top-0 bottom-0 left-[25%] w-1 bg-slate-900/10 z-20" />
                        </div>

                        <div className="flex flex-col items-center gap-1">
                            <Snowflake className="w-7 h-7 text-sky-400" />
                            <span className="font-black text-sky-500 text-sm">-0.5°C</span>
                        </div>
                    </div>

                    {/* Estadísticas Clave */}
                    <div className="grid grid-cols-2 gap-4 w-full">
                        <div className={`rounded-3xl p-6 text-center shadow-sm border-2 ${current.bgColor} ${current.statusColor.replace('text-', 'border-').replace('600', '200')}`}>
                            <div className="text-4xl font-black mb-1 tabular-nums">{displayTemp > 0 ? '+' : ''}{displayTemp.toFixed(1)}°C</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Temperatura Final</div>
                        </div>

                        <div className={`rounded-3xl p-6 text-center shadow-sm border-2 ${outcome === 'victory' ? 'bg-sky-50 border-sky-200 text-sky-600' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                            <div className="text-4xl font-black mb-1 flex items-center justify-center gap-2 tabular-nums">
                                {outcome === 'victory' ? <ArrowDownCircle className="w-8 h-8" /> : outcome === 'defeat' ? <TrendingUp className="w-8 h-8" /> : <Minus className="w-8 h-8" />}
                                {Math.abs(displayReduction).toFixed(1)}°C
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-70">
                                {displayReduction > 0 ? 'Reducción Lograda' : displayReduction < 0 ? 'Calentamiento Extra' : 'Variación Neta'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* PANEL DERECHO: Destacados por Sector */}
                <div className="flex-1 flex flex-col gap-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#a8a29e] mb-2 px-2 flex items-center gap-2">
                        <Award className="w-5 h-5" /> Cuadro de Honor Cooperativo
                    </h3>

                    {sectorsToDisplay.map((sector, idx) => (
                        <div key={sector.id} className="bg-white border-2 border-slate-100 rounded-[2rem] p-5 flex items-center gap-6 shadow-sm hover:-translate-y-1 transition-all group">
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 ${sector.border} shadow-inner bg-white group-hover:scale-110 transition-transform`}>
                                {sector.icon && React.isValidElement(sector.icon) ? React.cloneElement(sector.icon, { className: "w-8 h-8" }) : null}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-black text-xl text-[#1c1917] leading-none">{sector.name}</span>
                                    {sector.isMVP && <span className="bg-[#84cc16] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">MVP</span>}
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-2">{sector.role}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-black text-lg leading-none mb-1">{sector.stat}</div>
                                <div className="text-[10px] font-black uppercase tracking-tighter opacity-40">{sector.label}</div>
                            </div>
                        </div>
                    ))}

                    {/* Botones de Acción Final */}
                    <div className="mt-auto grid grid-cols-2 gap-4 pt-4">
                        <button className="bg-white border-2 border-slate-200 text-[#78716c] py-4 rounded-2xl font-black text-sm hover:border-slate-400 hover:text-[#1c1917] transition-all">
                            Ver Gráficas de Impacto
                        </button>
                        <button onClick={onBackToPortal} className="bg-slate-900 text-white py-4 rounded-2xl font-black text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                            Volver al Portal <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </main>

        </div>
    );
}