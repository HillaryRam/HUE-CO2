import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Star, Hexagon, Heart, Moon, Droplet } from 'lucide-react';

export default function ChallengeCard({ 
    challenge, 
    intensity, 
    setIntensity, 
    onApply, 
    readOnly = false,
    sectorColor = 'blue' 
}) {
    // Definimos los esquemas de color para 3D Card Principal
    const colorMap = {
        violet: { base: 'bg-violet-600', outline: 'outline-violet-600', gradient: 'from-violet-400/20 to-violet-700/0' },
        emerald: { base: 'bg-emerald-600', outline: 'outline-emerald-600', gradient: 'from-emerald-400/20 to-emerald-700/0' },
        rose: { base: 'bg-rose-600', outline: 'outline-rose-600', gradient: 'from-rose-400/20 to-rose-700/0' },
        blue: { base: 'bg-blue-600', outline: 'outline-blue-600', gradient: 'from-blue-400/20 to-cyan-700/0' },
        indigo: { base: 'bg-indigo-600', outline: 'outline-indigo-600', gradient: 'from-indigo-400/20 to-indigo-700/0' },
        fuchsia: { base: 'bg-fuchsia-600', outline: 'outline-fuchsia-600', gradient: 'from-fuchsia-400/20 to-fuchsia-700/0' },
    };

    const activeColor = colorMap[sectorColor] || colorMap.blue;

    const renderOptionsGrid = () => {
        const optionStyles = [
            { light: 'bg-rose-500', dark: 'bg-rose-700', icon: <Star fill="white" size={24} color="white" /> },
            { light: 'bg-amber-400', dark: 'bg-amber-700', icon: <Hexagon fill="white" size={24} color="white" /> },
            { light: 'bg-emerald-500', dark: 'bg-emerald-700', icon: <Heart fill="white" size={24} color="white" /> },
            { light: 'bg-blue-500', dark: 'bg-blue-700', icon: <Moon fill="white" size={24} color="white" /> }
        ];

        return (
            <div className="grid grid-cols-2 gap-x-3 gap-y-4 w-full mt-auto pb-4">
                {challenge.options?.map((opt, idx) => {
                    const style = optionStyles[idx];
                    return (
                        <div key={idx} className="relative flex flex-col h-[125px] w-full group cursor-pointer active:scale-95 transition-transform">
                            {/* Layer 3D: Sombra trasera */}
                            <div className={`absolute inset-0 top-1.5 rounded-xl ${style.dark}`}></div>
                            
                            {/* Card Superior */}
                            <div className="relative flex flex-col h-[calc(100%-6px)] z-10 w-full drop-shadow-sm">
                                {/* Header del Botón con Icono */}
                                <div className={`h-[56px] w-full ${style.light} rounded-t-xl border-b-[0.83px] border-${style.dark?.split('-')[1]}-700 flex items-center justify-center`}>
                                    <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
                                        {style.icon}
                                    </div>
                                </div>
                                {/* Área de Texto */}
                                <div className="flex-1 bg-stone-100 rounded-b-xl border-x border-b border-gray-300 px-3 py-2 flex items-center justify-center group-hover:bg-white transition-colors">
                                    <span className="text-stone-500 text-[10px] md:text-[11px] font-semibold text-center leading-snug line-clamp-3">
                                        {opt}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[340px] lg:w-[400px] h-[600px] relative shrink-0"
        >
            {/* Sombra 3D General de la Tarjeta Principal */}
            <div className={`absolute inset-0 top-[10px] ${activeColor.base} rounded-[2rem]`}></div>

            {/* Contenedor Principal (Capa Superior) */}
            <div className={`absolute inset-0 h-[calc(100%-10px)] bg-white rounded-[2rem] outline outline-[2.5px] outline-offset-[-2.5px] ${activeColor.outline} flex flex-col p-6 overflow-hidden`}>
                
                {/* Degradado superior */}
                <div className={`absolute bg-gradient-to-b ${activeColor.gradient} inset-0 pointer-events-none rounded-[2rem] z-0`}></div>

                <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Sector y Turno */}
                    <div className="flex items-center justify-between mb-6">
                        <div className={`flex items-center gap-2 ${activeColor.base.replace('bg-', 'text-')} font-bold text-sm uppercase tracking-wider`}>
                            <Droplet size={20} strokeWidth={2.5} /> {challenge.sectorName || 'Anillo del agua'}
                        </div>
                        <div className="px-2.5 py-1 bg-neutral-100 rounded-md shadow-inner">
                            <span className="text-stone-500 text-[10px] font-bold uppercase tracking-widest">
                                Turno: {challenge.turn || '3/15'}
                            </span>
                        </div>
                    </div>

                    {/* Títulos */}
                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="text-black text-2xl font-bold tracking-tight leading-none">
                            {challenge.title}
                        </h2>
                        <p className="text-stone-500 text-sm font-medium leading-relaxed">
                            {challenge.description}
                        </p>
                    </div>

                    {/* Contenido Dinámico (Opciones vs Slider) */}
                    <div className="flex-1 flex flex-col justify-end">
                        {challenge.type === 'options' ? (
                            renderOptionsGrid()
                        ) : (
                            <div className="flex flex-col items-center pb-8">
                                <motion.div 
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    key={intensity}
                                    className="relative mb-8 mt-4"
                                >
                                    <div className={`${activeColor.base} text-white font-black text-5xl px-8 py-4 rounded-3xl shadow-xl`}>
                                        {intensity}%
                                    </div>
                                    <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 ${activeColor.base} rotate-45`}></div>
                                </motion.div>

                                {!readOnly && (
                                    <div className="w-full mb-8">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={intensity}
                                            onChange={(e) => setIntensity(parseInt(e.target.value))}
                                            className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-current transition-all"
                                            style={{
                                                background: `linear-gradient(to right, currentColor ${intensity}%, #f1f5f9 ${intensity}%)`,
                                                color: activeColor.base.replace('bg-', '#').replace('600', '500')
                                            }}
                                        />
                                        <div className="flex justify-between mt-3 px-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mínimo</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Máximo</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Botón de Aplicar (Solo para tipo Slider y NO readOnly) */}
                        {!readOnly && (!challenge.type || challenge.type === 'slider') && (
                            <div className="mt-4">
                                <button
                                    onClick={onApply}
                                    className={`w-full py-4 ${activeColor.base} text-white rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-2`}
                                >
                                    Aplicar <Zap className="w-4 h-4 text-emerald-300" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
