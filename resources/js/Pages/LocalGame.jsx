import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Setup } from '../Components/Game/Setup';
import { GameBoard } from '../Components/Game/GameBoard';
import { GameOver } from '../Components/Game/GameOver';
import { TutorialOverlay } from '../Components/Game/TutorialOverlay';

export default function LocalGame() {
    const [gameState, setGameState] = useState('setup'); // setup, playing, ended
    const [players, setPlayers] = useState([]);
    const [isWin, setIsWin] = useState(false);
    const [showTutorial, setShowTutorial] = useState(false);

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
                        <GameBoard players={players} onEnd={handleEnd} tutorialStep={showTutorial ? 0 : -1} />
                        {showTutorial && <TutorialOverlay onComplete={() => setShowTutorial(false)} />}
                    </>
                )}

                {gameState === 'ended' && (
                    <GameOver win={isWin} onRestart={handleRestart} />
                )}
            </div>
        </>
    );
}