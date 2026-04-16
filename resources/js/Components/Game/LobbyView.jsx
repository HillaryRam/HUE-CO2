import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, ShieldCheck, ArrowRight, Zap, Loader2 } from 'lucide-react';
import { ROLES } from '../../data/gameData';

export function LobbyView({ roomCode, players = [], onStart, isHost = true }) {
    // Mapear los sectores para ver cuáles están ocupados
    const sectors = ROLES.map(role => ({
        ...role,
        isOccupied: players.some(p => p.rol_id === role.id || p.sector_id === role.id),
        playerName: players.find(p => p.rol_id === role.id || p.sector_id === role.id)?.name || 'Esperando...'
    }));

    const occupiedCount = sectors.filter(s => s.isOccupied).length;

    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col items-center justify-center p-6 text-[#1c1917]">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl bg-white border-4 border-[#e7e5e4] rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
            >
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black mb-2 tracking-tight">Sala de Espera</h1>
                        <p className="text-[#a8a29e] font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                            <Users className="w-5 h-5" /> {occupiedCount} de 6 Sectores Listos
                        </p>
                    </div>

                    <div className="bg-[#1c1917] text-white px-8 py-4 rounded-3xl text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-1">Código de Sala</p>
                        <p className="text-3xl font-black tracking-[0.2em]">{roomCode}</p>
                    </div>
                </div>

                {/* Grid de Sectores */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                    {sectors.map((sector) => (
                        <div 
                            key={sector.id}
                            className={`p-5 rounded-2xl border-4 transition-all duration-300 flex flex-col items-center gap-3
                                ${sector.isOccupied 
                                    ? 'bg-white border-[#1c1917] shadow-[0_8px_0_0_#1c1917]' 
                                    : 'bg-[#f5f5f4] border-[#e7e5e4] opacity-50'}`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center
                                ${sector.isOccupied ? 'bg-[#1c1917] text-white' : 'bg-[#d6d3d1] text-white'}`}>
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest">{sector.name}</p>
                                <p className="font-bold text-xs truncate max-w-[120px]">
                                    {sector.playerName}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Acción Principal */}
                <div className="flex flex-col items-center gap-4">
                    {isHost ? (
                        <button
                            onClick={onStart}
                            disabled={occupiedCount === 0}
                            className={`w-full max-w-sm py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all
                                ${occupiedCount > 0 
                                    ? 'bg-[#87AF4C] hover:bg-[#769a42] text-white shadow-[0_8px_0_0_#5f7b35] active:translate-y-2 active:shadow-none' 
                                    : 'bg-[#e7e5e4] text-[#a8a29e] cursor-not-allowed'}`}
                        >
                            {occupiedCount === 0 ? (
                                <> <Loader2 className="w-6 h-6 animate-spin" /> Esperando Jugadores... </>
                            ) : (
                                <> Comenzar Partida <ArrowRight className="w-6 h-6" /> </>
                            )}
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 text-[#1c1917] font-black animate-pulse">
                            <Zap className="w-6 h-6 text-amber-500 fill-current" />
                            Esperando que el Host inicie...
                        </div>
                    )}
                </div>

                {/* Decoración Sugestiva */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#f0fdf4] rounded-full -z-10" />
            </motion.div>
        </div>
    );
}
