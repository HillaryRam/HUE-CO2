import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Snowflake } from 'lucide-react';

export default function GlobalThermometer({ temperature = 0.5 }) {
    // Normalizamos el valor para el visual (de -0.5 a +1.5 suele ser el rango del juego)
    const fillPercent = Math.max(0, Math.min(100, (temperature + 0.5) * 50));

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-[64px] h-full max-h-[380px] bg-white/80 backdrop-blur-md rounded-full p-2 flex flex-col items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white shrink-0 z-20"
        >
            <div className="flex flex-col items-center gap-1 mt-2">
                <Flame className="text-rose-500 w-8 h-8" strokeWidth={2.5} />
                <span className="text-[9px] font-black text-rose-500 uppercase tracking-tighter">+1.5°</span>
            </div>

            <div className="w-10 flex-1 bg-slate-50/50 rounded-full my-4 flex flex-col relative border border-slate-100 overflow-hidden shadow-inner">
                {/* Llenado reactivo */}
                <motion.div 
                    initial={{ height: "50%" }}
                    animate={{ height: `${fillPercent}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                    className={`absolute bottom-0 left-0 right-0 ${temperature > 1 ? 'bg-rose-500' : temperature > 0.5 ? 'bg-amber-400' : 'bg-sky-400'} shadow-[0_0_15px_rgba(0,0,0,0.1)]`}
                />
                
                {/* Marcas de medición */}
                <div className="absolute inset-0 flex flex-col justify-evenly py-6 items-center z-10 pointer-events-none opacity-20">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-6 h-[2px] rounded-full bg-slate-900"></div>
                    ))}
                </div>

                {/* Línea de equilibrio (0.0°C) */}
                <div className="absolute bottom-[25%] left-0 right-0 h-[2px] bg-slate-900/20 z-20 border-t border-dashed border-slate-400" title="Equilibrio" />
            </div>

            <div className="flex flex-col items-center gap-1 mb-2">
                <span className="text-[9px] font-black text-sky-500 uppercase tracking-tighter">-0.5°</span>
                <Snowflake className="text-sky-500 w-8 h-8" strokeWidth={2.5} />
            </div>
        </motion.div>
    );
}
