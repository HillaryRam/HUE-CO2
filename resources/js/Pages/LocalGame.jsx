import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { Setup } from '../Components/Game/Setup';
import { GameBoard } from '../Components/Game/GameBoard';
import EndgameResults from '../Components/Endgame/EndgameResults';
import { TutorialOverlay } from '../Components/Game/TutorialOverlay';
import { ROLES } from '../data/gameData';

export default function LocalGame() {
    const [gameState, setGameState] = useState('setup'); // setup, playing, ended
    const [players, setPlayers] = useState([]);
    const [isWin, setIsWin] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);

    const [gameMode, setGameMode] = useState('solo');
    const [myRole, setMyRole] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        
        if (mode === 'solo') {
            setGameMode('solo');
            handleStart(ROLES.map(r => r.id));
        } else if (mode === 'small') {
            setGameMode('small');
            // Asignar un rol aleatorio para el bloque izquierdo
            const randomRole = ROLES[Math.floor(Math.random() * ROLES.length)];
            setMyRole(randomRole);
            handleStart(ROLES.map(r => r.id));
        }
    }, []);

    const handleStart = (selectedPlayers) => {
        setPlayers(selectedPlayers);
        setGameState('playing');
        setShowTutorial(true);
    };

    const handleEnd = (win) => {
        setIsWin(win);
        setGameState('ended');
    };

    const handleRestart = () => {
        setPlayers([]);
        setGameState('setup');
    };

    return (
        <>
            <Head title="Modo Local | Economía Circular" />

            <div className="min-h-screen bg-stone-900 text-stone-100 font-sans selection:bg-emerald-500/30">
                {gameState === 'setup' && <Setup onStart={handleStart} />}

                {gameState === 'playing' && (
                    <>
                        <GameBoard 
                            players={players} 
                            onEnd={handleEnd} 
                            tutorialStep={showTutorial ? 0 : -1} 
                            gameMode={gameMode}
                            myRole={myRole}
                        />
                        {showTutorial && <TutorialOverlay onComplete={() => setShowTutorial(false)} />}
                    </>
                )}

                {gameState === 'ended' && (
                    <EndgameResults 
                        outcome={isWin ? 'victory' : 'defeat'} 
                        onBackToPortal={handleRestart} 
                    />
                )}
            </div>
        </>
    );
}