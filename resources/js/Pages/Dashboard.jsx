import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [roomCode, setRoomCode] = useState('');

    const createRoom = () => {
        router.post('/rooms/create');
    };

    const joinRoom = (e) => {
        e.preventDefault();
        router.post('/rooms/join', { code: roomCode });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Portal de Juego
                </h2>
            }
        >
            <Head title="Dashboard - Elige un modo" />

            <div className="py-12 flex flex-col items-center">
                <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl px-4">
                    {/* Crear Sala */}
                    <div className="flex-1 bg-white p-8 rounded-3xl border-4 border-stone-200 flex flex-col items-center shadow-lg">
                        <h2 className="text-2xl font-black mb-4 text-stone-900">Crear Partida</h2>
                        <p className="text-stone-500 text-center mb-6 text-sm font-medium">
                            Crea una sala nueva. Tú serás el anfitrión y verás el tablero principal.
                        </p>
                        <button
                            onClick={createRoom}
                            className="w-full py-4 bg-[#16a34a] hover:bg-[#15803d] text-white rounded-2xl font-black text-lg shadow-[0_4px_0_0_#166534] active:shadow-none active:translate-y-1 transition-all"
                        >
                            Crear Sala
                        </button>
                    </div>

                    {/* Unirse a Sala */}
                    <div className="flex-1 bg-white p-8 rounded-3xl border-4 border-stone-200 flex flex-col items-center shadow-lg">
                        <h2 className="text-2xl font-black mb-4 text-stone-900">Unirse a Partida</h2>
                        <p className="text-stone-500 text-center mb-6 text-sm font-medium">
                            Únete a una sala existente usando el código del anfitrión.
                        </p>
                        <form onSubmit={joinRoom} className="w-full flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="CÓDIGO"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                className="w-full px-4 py-4 bg-stone-100 border-4 border-stone-200 rounded-2xl text-center font-black text-2xl uppercase focus:border-[#87AF4C] focus:outline-none transition-colors"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full py-4 bg-[#1c1917] hover:bg-stone-800 text-white rounded-2xl font-black text-lg shadow-[0_4px_0_0_#000] active:shadow-none active:translate-y-1 transition-all"
                            >
                                Unirse
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
