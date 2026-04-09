import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, UserCircle } from 'lucide-react';

export default function Welcome({ auth }) {

    // Función para entrar como invitado
    const handleGuest = () => {
        //Lo que hace es redirigir al usuario a la ruta /jugar sin iniciar sesión
        //no jurda partidas, osea invitado
        router.get('/jugar');
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-[#44403c] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <Head title="HUE-CO2" />


            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#dcfce7] rounded-full blur-[120px] opacity-40 -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#fef3c7] rounded-full blur-[120px] opacity-40 -z-10" />
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm text-center"
            >
                <div className="w-36 h-36 flex items-center justify-center mx-auto mb-4">
                    <img src="/images/DPEC_logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-5xl font-black tracking-tighter text-[#1c1917] mb-1 uppercase">HUE-CO2</h1>
                <p className="text-[#87AF4C] font-bold uppercase tracking-[0.2em] text-[10px] mb-12">Danza por el cambio</p>

                <div className="space-y-4">
                    {auth?.user ? (
                        // Si el usuario ya está logueado, se ve un botón directo al Dashboard
                        <Link
                            href={route('dashboard')}
                            className="w-full bg-[#87AF4C] text-white p-5 rounded-2xl shadow-lg hover:bg-[#15803d] transition-all font-black text-lg flex items-center justify-center gap-3"
                        >
                            Ir al Portal de Juego
                        </Link>
                    ) : (
                        // Si NO está logueado, mostramos Login / Registro / Invitado
                        <>
                            <Link
                                href={route('login')}
                                className="w-full bg-white border-4 border-[#e7e5e4] text-[#1c1917] p-5 rounded-2xl shadow-sm hover:border-[#87AF4C] transition-all font-black text-lg flex items-center justify-center gap-3"
                            >
                                <LogIn className="w-5 h-5" /> Iniciar Sesión
                            </Link>

                            <Link
                                href={route('register')}
                                className="w-full bg-white border-4 border-[#e7e5e4] text-[#1c1917] p-5 rounded-2xl shadow-sm hover:border-[#87AF4C] transition-all font-black text-lg flex items-center justify-center gap-3"
                            >
                                <UserPlus className="w-5 h-5" /> Registrarse
                            </Link>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
                                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#fafaf9] px-2 text-stone-400 font-bold">o también</span></div>
                            </div>

                            <button
                                onClick={handleGuest}
                                className="w-full bg-[#1c1917] text-white p-5 rounded-2xl shadow-lg hover:bg-stone-800 transition-all font-black text-lg flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <UserCircle className="w-6 h-6 text-[#87AF4C]" /> Modo Invitado
                            </button>
                        </>
                    )}
                </div>

                <p className="mt-8 text-[10px] text-[#a8a29e] font-bold uppercase tracking-widest italic">
                    Lo que hacemos <br /> cuenta <span className="text-[#87AF4C]">y mucho</span>
                </p>
            </motion.div>
        </div>
    );
}
