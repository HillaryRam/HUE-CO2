import React, { useState, useEffect } from 'react';
import { Clock, LogOut } from 'lucide-react';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import SectorMiniCard from '../UI/SectorMiniCard';
import { useGame } from '../Core/GameProvider';
import { useGameChannel } from '../../../hooks/useGameChannel';
import axios from 'axios';

/*
Tablero de visualización para el Modo Local (Kahoot).
Se muestra en la pantalla grande — solo lectura, sin interacción del usuario.
Se suscribe al canal Reverb para mostrar en tiempo real:
 - Cuántos jugadores/sectores han votado ya (conteo en la MiniCard)
 - La propuesta de texto enviada por un jugador (cambia ChallengeCard a modo validate)
*/

export default function LocalDisplayBoard({ sectors, challenge, roomCode, turnNumber = 1 }) {
    const { timeLeft, setTimeLeft, intensity } = useGame();

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

    const handleAdvance = async () => {
        try {
            await axios.post(`/api/game/${roomCode}/advance`);
        } catch (error) {
            console.error('[HUE-CO2] Error al avanzar turno:', error);
        }
    };
    // ───────────────────────────────────────────────────────────────────────

    // Inyectar datos de jugadores (en producción, vendrán del servidor)
    const mockNames = ['Carlos', 'Jhon', 'Emiliana', 'Daniel', 'Elena', 'Sara'];
    const displaySectors = sectors.map((s, i) => ({
        ...s,
        playerName: mockNames[i],
        // Marcar si ya votaron — compara con los votos recibidos por Reverb
        hasVoted: !!votes[s.id],
    }));

    const voteCount  = Object.keys(votes).length;
    const totalCount = sectors.length;

    return (
        <div className="h-screen w-full bg-[#f8fafc] flex flex-col font-sans p-0 overflow-hidden relative">
            {/* Fondo decorativo sutil */}
            <div className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: 'radial-gradient(circle at 50% 0%, #f1f5f9 0%, transparent 60%)' }} />

            {/* Cabecera integrada en el layout principal */}
            {/* Cabecera integrada en el layout principal */}
            <div className="pt-4 lg:pt-6 px-8 w-full max-w-[1750px] mx-auto z-50">
                <div className="flex items-end justify-between mb-2 lg:mb-3">
                    {/* Columna 1: Sala Online (Encima del Termómetro) */}
                    <div className="flex-none">
                        <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
                            <span className="text-[11px] font-black text-slate-400 tracking-[0.3em] uppercase">
                                SALA: <span className="text-slate-900 ml-1">{roomCode || "6 5 4 8 9 0"}</span>
                            </span>
                        </div>
                    </div>

                    {/* Columna 2: Espacio Central (Encima del Planeta) */}
                    <div className="flex-1 flex justify-center">
                        {/* Espacio reservado para mantener simetría con el OrbitalBoard */}
                    </div>

                    {/* Columna 3: Tiempo y Controles (Encima de la carta de reto) */}
                    <div className="flex-none pr-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50">
                                <Clock className="w-6 h-6 text-slate-300" strokeWidth={2.5} />
                                <div className="flex flex-col -gap-1">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tiempo</span>
                                    <span className={`font-black text-3xl tabular-nums tracking-tighter leading-none ${timeLeft < 30 ? 'text-rose-500 animate-pulse' : 'text-slate-800'}`}>
                                        {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}{timeLeft % 60}
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => alert('Salir')}
                                className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-100 transition-all group shrink-0"
                                title="Salir del juego"
                            >
                                <LogOut className="w-6 h-6 transition-transform group-hover:scale-110" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Indicador de Conexión + Votos en tiempo real */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
                <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                {activeChallenge?.type !== 'waiting' && voteCount > 0 && (
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-100">
                        Votos: {voteCount}/{totalCount}
                    </span>
                )}
            </div>

            <div className="px-8 flex-1 flex flex-col w-full max-w-[1750px] mx-auto min-h-0 relative z-10">
                <main className="flex-1 flex items-center justify-between gap-4 lg:gap-6 mb-2 min-h-0 overflow-hidden">
                    {/* Termómetro */}
                    <GlobalThermometer temperature={0.0} />

                    {/* Planetario Central */}
                    <div className="flex-1 flex justify-center">
                        <OrbitalBoard sectors={displaySectors} />
                    </div>

                    {/* Reto — reacciona al tipo activo (puede cambiar a 'validate' al recibir propuesta) */}
                    <div className="pr-4">
                        <ChallengeCard
                            challenge={activeChallenge}
                            intensity={intensity}
                            readOnly={true}
                            sectorColor="blue"
                            isCompact={true}
                        />
                    </div>
                </main>
            </div>

            {/* Barra Inferior de Sectores */}
            <footer className="w-full bg-white border-t border-neutral-200 p-3 lg:p-4 mt-auto shadow-sm relative z-10">
                <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-2 lg:gap-3 w-full">
                    {displaySectors.map((sector, idx) => (
                        <SectorMiniCard key={sector.id} sector={sector} index={idx} />
                    ))}
                </div>
            </footer>
        </div>
    );
}

