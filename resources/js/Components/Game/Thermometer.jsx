import React from 'react';
import { motion } from 'motion/react';

export function Thermometer({ temp }) {
    const percentage = ((temp + 0.5) / 1.0) * 100;
    const clamped = Math.max(0, Math.min(100, percentage));

    let color = 'bg-emerald-500';
    if (temp >= 0.3) color = 'bg-red-500';
    else if (temp > 0) color = 'bg-orange-500';
    else if (temp < -0.2) color = 'bg-blue-500';

    return (
        <div className="flex flex-col items-center bg-stone-200 p-4 rounded-t-full rounded-b-3xl shadow-[0_15px_30px_rgba(0,0,0,0.4)] border-4 border-stone-400 relative w-28">
            <div className="absolute top-3 w-3 h-3 rounded-full bg-stone-400 shadow-inner border border-stone-500"></div>

            <h3 className="font-black text-stone-500 mb-2 mt-4 uppercase text-[10px] tracking-widest text-center">Temp</h3>

            <div className={`text-xl font-black mb-4 ${temp > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                {temp > 0 ? '+' : ''}{temp.toFixed(1)}º
            </div>

            <div className="relative w-8 h-64 bg-stone-300 rounded-full overflow-hidden border-4 border-stone-400 shadow-inner mb-6">
                <div className="absolute top-1/2 w-full h-1 bg-stone-500 z-10"></div>
                <div className="absolute top-0 w-full h-1 bg-red-500 z-10"></div>
                <div className="absolute bottom-0 w-full h-1 bg-blue-500 z-10"></div>

                <motion.div
                    className={`absolute bottom-0 w-full ${color}`}
                    initial={{ height: '50%' }}
                    animate={{ height: `${clamped}%` }}
                    transition={{ duration: 0.5, type: 'spring' }}
                />
            </div>

            <div className="absolute bottom-3 w-3 h-3 rounded-full bg-stone-400 shadow-inner border border-stone-500"></div>
        </div>
    );
}
