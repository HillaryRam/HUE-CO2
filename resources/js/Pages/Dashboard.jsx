import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gray-900 text-white">
                <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center">
                    <span className="text-green-400 font-bold text-xl">HUE-CO2</span>
                    <span className="text-gray-300">Hola, {auth.user?.name || 'Invitado'}</span>
                </nav>
                <div className="max-w-4xl mx-auto py-12 px-6">
                    <h2 className="text-3xl font-bold text-green-400 mb-6">Dashboard</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-xl font-semibold mb-2">🎮 Nueva Partida</h3>
                            <p className="text-gray-400 mb-4">Crea una sala y comparte el código con tus compañeros.</p>
                            <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold transition">
                                Crear sala
                            </button>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-xl font-semibold mb-2">🔑 Unirse</h3>
                            <p className="text-gray-400 mb-4">¿Tienes un código PIN? Únete a una partida existente.</p>
                            <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white px-6 py-2 rounded-lg font-semibold transition">
                                Unirse con PIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
