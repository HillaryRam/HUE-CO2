import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido" />
            <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
                <div className="text-center max-w-2xl px-6">
                    <h1 className="text-5xl font-bold mb-4 text-green-400">HUE-CO2</h1>
                    <p className="text-xl text-gray-300 mb-2">
                        El juego cooperativo sobre cambio climático y economía circular
                    </p>
                    <p className="text-gray-400 mb-8">
                        Lidera tu sector, responde desafíos y salva el planeta antes de que la temperatura llegue a 0°.
                    </p>

                    <div className="flex gap-4 justify-center">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition"
                            >
                                Ir al Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href="/register"
                                    className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-semibold px-8 py-3 rounded-lg transition"
                                >
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
