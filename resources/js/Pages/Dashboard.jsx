import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { PlusCircle, Gamepad2, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MatchHistory from '@/Components/Dashboard/MatchHistory';

// Importación de componentes modulares
import { HostAuthView } from '../Components/GuestPortal/HostAuthView';
import { ModeSelectionView } from '../Components/GuestPortal/ModeSelectionView';
import { LobbyView } from '../Components/GuestPortal/LobbyView';
import axios from 'axios';

export default function Dashboard() {
    const [view, setView] = useState('main'); // main, host_auth, select_mode, lobby
    const [mode, setMode] = useState(null);
    const [selectedPlayers, setSelectedPlayers] = useState(null);
    const [roomCode, setRoomCode] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const navigateTo = (newView) => {
        setView(newView);
        if (newView === 'main') {
            setSelectedPlayers(null);
            setMode(null);
        }
    };

    const handleSelectMode = async (selectedMode) => {
        try {
            setIsCreating(true);
            setMode(selectedMode);

            const response = await axios.post('/juego/crear', {
                modo: selectedMode,
                anillo_id: 1
            });

            if (response.data?.juego?.room_code) {
                setRoomCode(response.data.juego.room_code);
                setView('lobby');
            } else {
                throw new Error('No se recibió el código de sala');
            }
        } catch (error) {
            console.error('Error al crear sala:', error);
            const msg = error.response?.data?.message || error.response?.data?.error || error.message;
            alert('Error al crear la sala: ' + msg);
        } finally {
            setIsCreating(false);
        }
    };

    const startLocalGame = (params = {}) => {
        // Redirigir a la nueva pantalla del tablero premium
        router.get(`/tablero/${roomCode}`, { 
            mode: params.mode || mode 
        });
    };

    const joinRoom = (e) => {
        e.preventDefault();
        router.post('/rooms/join', { code: roomCode });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard | HUE-CO2" />

            <div className="py-8 md:py-12 flex flex-col items-center min-h-[60vh] justify-center relative overflow-hidden">
                
                <AnimatePresence mode="wait">
                    {view === 'main' && (
                        <motion.div 
                            key="main"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col md:flex-row gap-8 w-full max-w-5xl px-4 md:px-6"
                        >
                            {/* Tarjeta: Crear Sala */}
                            <div className="flex-1 bg-white border-4 border-[#e7e5e4] p-10 rounded-[3rem] shadow-xl flex flex-col items-center group hover:border-[#87AF4C] transition-all duration-300">
                                <div className="w-20 h-20 bg-[#f0fdf4] text-[#87AF4C] rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <PlusCircle className="w-10 h-10" />
                                </div>

                                <h2 className="text-3xl font-black mb-4 text-[#1c1917] tracking-tight text-center">Ser Anfitrión</h2>
                                <p className="text-[#a8a29e] text-center mb-10 text-sm font-bold uppercase tracking-widest leading-relaxed">
                                    Crea una sala nueva,<br />lidera el tablero principal<br />y coordina los sectores.
                                </p>

                                <button
                                    onClick={() => navigateTo('host_auth')}
                                    className="w-full py-5 bg-[#87AF4C] hover:bg-[#769a42] text-white rounded-2xl font-black text-xl shadow-[0_8px_0_0_#5f7b35] active:shadow-none active:translate-y-2 transition-all flex items-center justify-center gap-3"
                                >
                                    Crear Partida <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Tarjeta: Unirse a Sala */}
                            <div className="flex-1 bg-white border-4 border-[#e7e5e4] p-10 rounded-[3rem] shadow-xl flex flex-col items-center group hover:border-[#1c1917] transition-all duration-300">
                                <div className="w-20 h-20 bg-[#f5f5f4] text-[#1c1917] rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <Gamepad2 className="w-10 h-10" />
                                </div>

                                <h2 className="text-3xl font-black mb-4 text-[#1c1917] tracking-tight text-center">Unirse a Partida</h2>
                                <p className="text-[#a8a29e] text-center mb-10 text-sm font-bold uppercase tracking-widest leading-relaxed">
                                    ¡Entra en acción!<br />Usa el código PIN para<br />conectar tu dispositivo.
                                </p>

                                <form onSubmit={joinRoom} className="w-full flex flex-col gap-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="000 000"
                                            value={roomCode}
                                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                            className="w-full px-6 py-5 bg-[#f5f5f4] border-4 border-[#e7e5e4] rounded-2xl text-center font-black text-2xl uppercase focus:border-[#1c1917] focus:outline-none transition-colors placeholder:text-[#d6d3d1] tracking-[0.2em]"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-5 bg-[#1c1917] hover:bg-[#292524] text-white rounded-2xl font-black text-xl shadow-[0_8px_0_0_#000] active:shadow-none active:translate-y-2 transition-all"
                                    >
                                        Conectar
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {view === 'host_auth' && (
                        <HostAuthView 
                            key="host" 
                            isGuest={false}
                            onBack={() => navigateTo('main')}
                            onSelectMode={() => navigateTo('select_mode')}
                        />
                    )}

                    {view === 'select_mode' && (
                        <ModeSelectionView 
                            key="select"
                            onBack={() => navigateTo('host_auth')}
                            onSelectMode={handleSelectMode}
                            isLoading={isCreating}
                        />
                    )}

                    {view === 'lobby' && (
                        <LobbyView 
                            key="lobby"
                            mode={mode}
                            roomCode={roomCode}
                            selectedPlayers={selectedPlayers}
                            setSelectedPlayers={setSelectedPlayers}
                            onBack={() => navigateTo('select_mode')}
                            onStartGame={startLocalGame}
                        />
                    )}
                </AnimatePresence>

                {/* Historial de Partidas - Solo se muestra en el menú principal */}
                {view === 'main' && <MatchHistory />}

                {/* Footer */}
                <div className="mt-16 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    <img src="/images/DPEC_logo.png" alt="Logo" className="w-12 h-12 object-contain" />
                    <div className="h-8 w-1 bg-[#e7e5e4] rounded-full"></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a8a29e]">Lo que hacemos cuenta y mucho</p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

