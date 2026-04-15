import React from 'react';
import { motion } from 'framer-motion';
import { Coins, CheckCircle2 } from 'lucide-react';

export default function SectorEcoStats({ sectors, votedSectors = {} }) {
    return (
        <div className="flex flex-wrap lg:flex-nowrap gap-3 w-full max-w-6xl mx-auto px-4 mt-8">
            {sectors.map((sector, idx) => {
                const isVoted = votedSectors[sector.id];
                return (
                    <motion.div 
                        key={sector.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * idx }}
                        className={`flex-1 min-w-[140px] bg-white border-2 ${isVoted ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'border-slate-100'} rounded-[2rem] p-4 flex flex-col items-center gap-2 transition-all relative overflow-hidden`}
                    >
                        {/* Indicador de voto */}
                        {isVoted && (
                            <div className="absolute top-3 right-3 text-emerald-500">
                                <CheckCircle2 size={14} strokeWidth={3} />
                            </div>
                        )}

                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${sector.bg} ${sector.text} mb-1`}>
                           {/* Icono simplificado para la barra */}
                           <div className="w-6 h-6">
                               {sector.icon || '○'}
                           </div>
                        </div>

                        <div className="text-center">
                            <div className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-0.5 truncate max-w-[100px]">
                                {sector.name}
                            </div>
                            <div className="flex items-center justify-center gap-1.5 font-black text-lg text-slate-800 tabular-nums">
                                <Coins size={14} className="text-amber-400" />
                                {sector.tokens}
                            </div>
                        </div>

                        {/* Barra de progreso de tokens (visual) */}
                        <div className="w-full h-1 bg-slate-50 rounded-full mt-1 overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, (sector.tokens / 5) * 100)}%` }}
                                className={`h-full ${sector.accent || 'bg-slate-400'}`}
                            />
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
