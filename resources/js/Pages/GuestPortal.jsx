import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AnimatePresence } from 'framer-motion';

// Importación de componentes modulares
import { MainMenuView } from '../Components/GuestPortal/MainMenuView';
import { HostAuthView } from '../Components/GuestPortal/HostAuthView';
import { ModeSelectionView } from '../Components/GuestPortal/ModeSelectionView';
import { LobbyView } from '../Components/GuestPortal/LobbyView';
import { JoinView } from '../Components/GuestPortal/JoinView';
import MobileController from '../Components/Game/Modes/MobileController';
import axios from 'axios';

export default function GuestPortal({ pin = null }) {
    const [view, setView] = useState(pin ? 'join' : 'main');
    const [mode, setMode] = useState(null);
    const [roomCode, setRoomCode] = useState(pin ? pin.toString() : null);
    const [selectedPlayers, setSelectedPlayers] = useState(null);
    const [myPlayerName, setMyPlayerName] = useState('');
    const [myRole, setMyRole] = useState(null);

    const navigateTo = (newView) => {
        setView(newView);
        setSelectedPlayers(null); // Reset selection when moving back or changing views
    };

    const handleSelectMode = (selectedMode) => {
        setMode(selectedMode);
        setView('lobby');
    };

    const startLocalGame = (params = {}) => {
        router.get('/juego-local', params);
    };

    const handleConnect = async (data) => {
        try {
            const cleanPin = data.pin.replace(/\s/g, '');
            const response = await axios.post('/api/juegos/join', {
                room_code: cleanPin,
                usuario: data.nickname
            });
            
            setRoomCode(cleanPin);
            setMyPlayerName(data.nickname);
            // Por ahora, si se une con éxito, vamos al mando (MobileController)
            // En un flujo real, aquí elegiría rol si no se le asigna uno
            setView('playing'); 
        } catch (error) {
            console.error('Error al conectar:', error);
            const errorMsg = error.response?.data?.error || error.response?.data?.message || 'No se pudo conectar. Revisa el PIN.';
            alert(errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-[#44403c] flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
            <Head title="Portal de Invitado | HUE-CO2" />

            {/* Fondo Orgánico Optimizado (Sin blurs pesados) */}
            <div className="absolute inset-0 pointer-events-none -z-10 opacity-30" 
                style={{ 
                    background: 'radial-gradient(circle at 10% 10%, #dcfce7 0%, transparent 40%), radial-gradient(circle at 90% 90%, #fef3c7 0%, transparent 40%)'
                }} 
            />

            {/* Logo Mini (Sticky top left) */}
            {view !== 'main' && (
                <div className="absolute top-6 left-6 flex items-center gap-2 opacity-50 z-20">
                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/images/DPEC_logo.png" alt="Logo" className="w-full h-full object-contain" loading="eager" />
                    </div>
                    <span className="font-black text-sm">HUE-CO2</span>
                </div>
            )}

            <AnimatePresence mode="wait">
                {/* VISTA 1: MAIN MENU */}
                {view === 'main' && (
                    <MainMenuView 
                        key="main" 
                        onNavigate={navigateTo} 
                    />
                )}

                {/* VISTA 1.5: OPCIONES DE ANFITRIÓN */}
                {view === 'host_auth' && (
                    <HostAuthView 
                        key="host" 
                        isGuest={true}
                        onBack={() => navigateTo('main')} 
                        onSelectMode={() => navigateTo('select_mode')} 
                    />
                )}

                {/* VISTA 2: SELECCIÓN DE MODO */}
                {view === 'select_mode' && (
                    <ModeSelectionView 
                        key="select" 
                        onBack={() => navigateTo('host_auth')} 
                        onSelectMode={handleSelectMode} 
                    />
                )}

                {/* VISTA 3: LOBBY */}
                {view === 'lobby' && (
                    <LobbyView 
                        key="lobby" 
                        mode={mode}
                        selectedPlayers={selectedPlayers}
                        setSelectedPlayers={setSelectedPlayers}
                        onBack={() => navigateTo('select_mode')}
                        onStartGame={startLocalGame}
                    />
                )}

                {/* VISTA 4: UNIRSE CON PIN */}
                {view === 'join' && (
                    <JoinView 
                        key="join"
                        onBack={() => navigateTo('main')}
                        onConnect={handleConnect}
                        initialPin={roomCode}
                    />
                )}

                {/* VISTA 5: MANDO DE JUEGO (MOBILE) */}
                {view === 'playing' && (
                    <div className="fixed inset-0 z-50 bg-white">
                        <MobileController 
                            roomCode={roomCode}
                            playerName={myPlayerName}
                            role={myRole || { id: 'ciudadania', name: 'Ciudadanía' }}
                            gameState="lobby"
                        />
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}