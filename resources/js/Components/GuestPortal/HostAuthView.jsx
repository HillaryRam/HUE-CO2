import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, User, Globe, ArrowRight } from 'lucide-react';

export function HostAuthView({ onBack, onSelectMode, isGuest = true }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="w-full max-w-md bg-white border-4 border-[#e7e5e4] p-10 rounded-[3rem] shadow-2xl"
        >
            <button
                onClick={onBack}
                className="mb-6 text-[#a8a29e] hover:text-[#1c1917] flex items-center gap-1 font-bold text-sm"
            >
                <ChevronLeft className="w-4 h-4" /> Atrás
            </button>
            <h2 className="text-2xl font-black mb-2 text-center text-[#1c1917]">¿Cómo quieres jugar?</h2>
            <p className="text-center text-[#78716c] text-sm font-medium mb-6 px-4">
                {isGuest
                    ? <>Como invitado, el progreso <br /> de esta partida no se guardará.</>
                    : <>Tu progreso y estadísticas <br /> se guardarán en tu perfil de usuario.</>
                }
            </p>

            <div className="space-y-4 mt-6">
                <button
                    onClick={onSelectMode}
                    className="w-full flex items-center justify-between p-6 bg-[#f0fdf4] border-4 border-[#E3EFD2] hover:border-[#87AF4C] rounded-2xl transition-all group"
                >
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <User className="text-[#87AF4C] w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-black text-[#1c1917]">Modo Local</div>
                            <div className="text-[10px] text-[#87AF4C] font-bold uppercase tracking-widest mt-1">Una sola pantalla</div>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#87AF4C] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button
                    onClick={onSelectMode}
                    className="w-full flex items-center justify-between p-6 bg-[#f5f5f4] border-4 border-transparent hover:border-[#e7e5e4] rounded-2xl transition-all group"
                >
                    <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Globe className="text-[#a8a29e] w-6 h-6" />
                        </div>
                        <div>
                            <div className="font-black text-[#1c1917]">Modo Online</div>
                            <div className="text-[10px] text-[#a8a29e] font-bold uppercase tracking-widest mt-1">Cada uno en su casa</div>
                        </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#a8a29e] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </div>
        </motion.div>
    );
}
