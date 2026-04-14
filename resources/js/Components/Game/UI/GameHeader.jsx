import React from 'react';
import { motion } from 'framer-motion';
import { Clock, LogOut } from 'lucide-react';

export default function GameHeader({ roomCode, timeLeft, onExit }) {
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8 relative z-50 px-2"
        >
            {/* Sala Online */}
            <div className="bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-white flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
                    SALA: <span className="text-slate-900">{roomCode}</span>
                </span>
            </div>

            {/* Tiempo y Salida */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-white">
                    <Clock className="w-5 h-5 text-slate-400" strokeWidth={2.5} />
                    <span className={`font-black text-2xl tabular-nums tracking-tighter ${timeLeft < 30 ? 'text-rose-500 animate-pulse' : 'text-slate-700'}`}>
                        {formatTime(timeLeft)}
                    </span>
                </div>
                <button 
                    onClick={onExit}
                    className="bg-white/80 backdrop-blur-md p-3 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-white text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all hover:scale-105 active:scale-95"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </motion.div>
    );
}
