import React from 'react';
import { motion } from 'motion/react';
import { Globe2, AlertOctagon } from 'lucide-react';

export function GameOver({ win, onRestart }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-stone-900 text-white relative overflow-hidden font-sans">
            {/* Table Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #444 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="text-center max-w-2xl z-10 bg-stone-800 p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-t-8 border-stone-700 relative"
            >
                {/* Inner Texture */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] rounded-[3rem]"></div>

                {win ? (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="inline-block"
                        >
                            <Globe2 size={120} className="mx-auto text-emerald-500 mb-8 drop-shadow-[0_0_30px_rgba(16,185,129,0.6)]" />
                        </motion.div>
                        <h1 className="text-6xl md:text-7xl font-black mb-6 text-emerald-400 uppercase tracking-tighter drop-shadow-lg">¡Misión Cumplida!</h1>
                        <p className="text-xl text-stone-300 mb-12 font-medium leading-relaxed">
                            Habéis logrado cerrar el ciclo de la economía circular y estabilizar la temperatura global. El planeta tiene un futuro gracias a vuestra colaboración.
                        </p>
                    </>
                ) : (
                    <>
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block"
                        >
                            <AlertOctagon size={120} className="mx-auto text-red-500 mb-8 drop-shadow-[0_0_30px_rgba(239,68,68,0.6)]" />
                        </motion.div>
                        <h1 className="text-6xl md:text-7xl font-black mb-6 text-red-500 uppercase tracking-tighter drop-shadow-lg">Punto de No Retorno</h1>
                        <p className="text-xl text-stone-300 mb-12 font-medium leading-relaxed">
                            La temperatura global ha superado el límite crítico de +0.5ºC. Los ecosistemas han colapsado. Debemos aprender de nuestros errores y volver a intentarlo.
                        </p>
                    </>
                )}

                <button
                    onClick={onRestart}
                    className="px-12 py-6 bg-stone-100 text-stone-900 font-black uppercase tracking-widest rounded-full text-xl hover:bg-white transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 border-b-4 border-stone-400"
                >
                    Jugar de Nuevo
                </button>
            </motion.div>
        </div>
    );
}
