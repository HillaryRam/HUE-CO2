import React, { useState, useEffect } from 'react';
import GameHeader from '../UI/GameHeader';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import SectorMiniCard from '../UI/SectorMiniCard';
import { useGame } from '../Core/GameProvider';
import { useGameChannel } from '../../../hooks/useGameChannel';

/*
Tablero de visualización para el Modo Local (Kahoot).
Se muestra en la pantalla grande — solo lectura, sin interacción del usuario.
Se suscribe al canal Reverb para mostrar en tiempo real:
 - Cuántos jugadores/sectores han votado ya (conteo en la MiniCard)
 - La propuesta de texto enviada por un jugador (cambia ChallengeCard a modo validate)
*/

export default function LocalDisplayBoard({ sectors, challenge, roomCode }) {
    const { timeLeft, intensity } = useGame();

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
        setActiveChallenge(challenge);
    }, [challenge]);
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

            <GameHeader
                roomCode={roomCode || "6 5 4 8 9 0"}
                timeLeft={timeLeft}
                onExit={() => alert('Salir')}
            />

            {/* Indicador de Conexión + Votos en tiempo real */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
                <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                {activeChallenge?.type !== 'waiting' && voteCount > 0 && (
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-100">
                        Votos: {voteCount}/{totalCount}
                    </span>
                )}
            </div>

            <div className="pt-8 px-8 flex-1 flex flex-col w-full max-w-[1600px] mx-auto min-h-0 relative z-10">
                <main className="flex-1 flex items-center justify-between gap-8 mb-8">
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
                        />
                    </div>
                </main>
            </div>

            {/* Barra Inferior de Sectores */}
            <footer className="w-full bg-white border-t border-neutral-200 p-6 mt-auto shadow-sm relative z-10">
                <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-4 w-full">
                    {displaySectors.map((sector, idx) => (
                        <SectorMiniCard key={sector.id} sector={sector} index={idx} />
                    ))}
                </div>
            </footer>
        </div>
    );
}

