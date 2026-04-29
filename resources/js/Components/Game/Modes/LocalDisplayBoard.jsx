import React, { useState, useEffect } from 'react';
import { Clock, LogOut } from 'lucide-react';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import SectorMiniCard from '../UI/SectorMiniCard';
import { useGame } from '../Core/GameProvider';
import { useGameChannel } from '../../../hooks/useGameChannel';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function LocalDisplayBoard({ sectors, challenge, roomCode, turnNumber = 1, onNextChallenge }) {
    const { timeLeft, setTimeLeft, intensity, setIntensity } = useGame();

    // ── WebSocket: Escuchar eventos de la sala ──────────────────────────────
    const { votes, proposal, isConnected } = useGameChannel(roomCode, 'host', 'Pantalla');

    // Cuando llega una propuesta, transformar el reto al modo validate
    const [activeChallenge, setActiveChallenge] = useState(challenge);
    useEffect(() => {
        if (proposal) {
            setActiveChallenge(prev => ({
                ...prev,
                type:     'validate',
                proposal: proposal.text,
            }));
        }
    }, [proposal]);

    // Sincronizar si el challenge cambia desde el padre (el host avanza de reto)
    useEffect(() => {
        if (challenge) {
            setActiveChallenge(challenge);
            if (challenge.time) {
                setTimeLeft(challenge.time);
            }
        }
    }, [challenge]);

    // ── Temporizador Automático ──────────────────────────────────────────
    useEffect(() => {
        if (timeLeft === 0 && activeChallenge?.type !== 'waiting') {
            console.log('[HUE-CO2] Tiempo agotado. Avanzando turno...');
            handleAdvance();
        }
    }, [timeLeft]);

    const isLocalGame = roomCode && roomCode.startsWith('LOCAL_');

    const handleAdvance = async () => {
        try {
            if (isLocalGame) {
                if (onNextChallenge) onNextChallenge();
                return;
            }
            await axios.post(`/api/game/${roomCode}/advance`);
        } catch (error) {
            console.error('[HUE-CO2] Error al avanzar turno:', error);
        }
    };

    // Sectores procesados para UI
    const displaySectors = sectors.map((s) => ({
        ...s,
        hasVoted: !!votes[s.id],
    }));

    const activeSectorId = activeChallenge?.activeSectorId;
    const activeSector = sectors.find(s => s.id === activeSectorId);

    return (
        <div className="h-screen w-full bg-[#f8fafc] flex flex-col font-sans p-0 overflow-hidden relative">
            {/* Fondo decorativo */}
            <div className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle at 50% 0%, #f1f5f9 0%, transparent 60%)' }} />

            {/* Cabecera Superior */}
            <div className="pt-4 px-10 w-full z-50">
                <div className="flex items-center justify-between">
                    {/* Código Sala */}
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">
                            SALA: <span className="text-slate-900 ml-1">{roomCode || "--- ---"}</span>
                        </span>
                    </div>

                    {/* Banner de Turno Activo */}
                    <AnimatePresence mode="wait">
                        {activeSector && (
                            <motion.div 
                                key={activeSector.id}
                                initial={{ y: -15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 15, opacity: 0 }}
                                className="bg-amber-50 border-2 border-amber-200 px-6 py-2 rounded-xl shadow-sm flex items-center gap-3"
                            >
                                <div className="text-amber-600 font-black text-[10px] uppercase tracking-widest">Turno:</div>
                                <div className="text-amber-900 font-black text-base">{activeSector.playerName}</div>
                                <div className="px-2 py-0.5 bg-amber-200 text-amber-800 rounded-md text-[9px] font-bold uppercase">{activeSector.id}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tiempo y Salir */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-slate-100">
                            <Clock className="w-4 h-4 text-slate-300" />
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Tiempo</span>
                                <span className={`font-black text-xl tabular-nums leading-tight ${timeLeft < 30 ? 'text-rose-500 animate-pulse' : 'text-slate-800'}`}>
                                    {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                                </span>
                            </div>
                        </div>
                        <button className="bg-white p-3 rounded-xl border border-slate-100 text-slate-400 hover:text-rose-500 transition-colors shadow-sm">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido Central */}
            <main className="flex-1 flex items-center justify-between px-[5vw] gap-[2vw]">
                {/* Termómetro */}
                <div className="flex-none">
                    <GlobalThermometer temperature={intensity} />
                </div>

                {/* Orbital Board */}
                <div className="flex-1 flex justify-center items-center">
                    <OrbitalBoard 
                        sectors={displaySectors} 
                        turnNumber={turnNumber} 
                        activeSectorId={activeSectorId}
                    />
                </div>

                {/* Carta de Reto */}
                <div className="flex-none">
                    <ChallengeCard
                        challenge={activeChallenge}
                        intensity={intensity}
                        setIntensity={setIntensity}
                        onApply={handleAdvance}
                        readOnly={!isLocalGame}
                    />
                </div>
            </main>

            {/* Footer con Sectores */}
            <footer className="bg-white border-t border-slate-200 p-6">
                <div className="max-w-[1600px] mx-auto flex justify-between gap-4">
                    {displaySectors.map((sector, idx) => (
                        <SectorMiniCard 
                            key={sector.id} 
                            sector={sector} 
                            index={idx}
                            isActive={sector.id === activeSectorId}
                        />
                    ))}
                </div>
            </footer>
        </div>
    );
}
