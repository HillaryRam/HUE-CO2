import React from 'react';
import GameHeader from '../UI/GameHeader';
import OrbitalBoard from '../UI/OrbitalBoard';
import GlobalThermometer from '../UI/GlobalThermometer';
import ChallengeCard from '../UI/ChallengeCard';
import SectorMiniCard from '../UI/SectorMiniCard';
import { useGame } from '../Core/GameProvider';
import { motion } from 'framer-motion';

/*
Este componente es utilizado en el modo local para mostrar el tablero.
y es el que se muestra en el modo kahoot.
*/

export default function LocalDisplayBoard({ sectors, challenge, roomCode }) {
    const { timeLeft, intensity } = useGame();

    // visual test nombres de jugadores
    const mockNames = ['Carlos', 'Jhon', 'Emiliana', 'Daniel', 'Elena', 'Elena'];
    const displaySectors = sectors.map((s, i) => ({ ...s, playerName: mockNames[i] }));

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

            <div className="pt-8 px-8 flex-1 flex flex-col w-full max-w-[1600px] mx-auto min-h-0 relative z-10">
                <main className="flex-1 flex items-center justify-between gap-8 mb-8">
                    {/* Termómetro ajustado a la izquierda */}
                    <div className="pl-4">
                        <GlobalThermometer temperature={0.6} />
                    </div>

                    {/* Planetario Central */}
                    <div className="flex-1 flex justify-center">
                        <OrbitalBoard sectors={displaySectors} />
                    </div>

                    {/* Reto a la derecha */}
                    <div className="pr-4">
                        <ChallengeCard
                            challenge={challenge}
                            intensity={intensity}
                            readOnly={true}
                            sectorColor="blue"
                        />
                    </div>
                </main>
            </div>

            {/* Barra Inferior de Sectores*/}
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
