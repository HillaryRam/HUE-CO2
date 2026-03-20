import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth }) {
    const [roomCode, setRoomCode] = useState('');

    const createRoom = () => {
        // Aquí harías una petición a tu backend para crear una sala
        // y luego redirigir al juego como "host"
        router.post('/rooms/create');
    };

    const joinRoom = (e) => {
        e.preventDefault();
        // Redirigir al juego como "player" con el código de la sala
        router.post('/rooms/join', { code: roomCode });
    };

    return (
        <div className="min-h-screen bg-stone-900 text-white flex flex-col items-center justify-center p-4">
            <Head title="Dashboard - Elige un modo" />

            <h1 className="text-3xl font-bold mb-8">Bienvenido, {auth.user.name}</h1>

            <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl">
                {/* Crear Sala */}
                <div className="flex-1 bg-stone-800 p-8 rounded-2xl border border-stone-700 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Crear Partida</h2>
                    <p className="text-stone-400 text-center mb-6 text-sm">
                        Crea una sala nueva. Tú serás el anfitrión y verás el tablero principal.
                    </p>
                    <button
                        onClick={createRoom}
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-colors"
                    >
                        Crear Sala
                    </button>
                </div>

                {/* Unirse a Sala */}
                <div className="flex-1 bg-stone-800 p-8 rounded-2xl border border-stone-700 flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Unirse a Partida</h2>
                    <p className="text-stone-400 text-center mb-6 text-sm">
                        Únete a una sala existente usando el código del anfitrión.
                    </p>
                    <form onSubmit={joinRoom} className="w-full flex flex-col gap-3">
                        <input
                            type="text"
                            placeholder="Código de la sala"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                            className="w-full px-4 py-3 bg-stone-900 border border-stone-600 rounded-xl text-center font-mono text-xl uppercase"
                            required
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-colors"
                        >
                            Unirse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}