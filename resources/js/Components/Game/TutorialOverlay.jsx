import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const TUTORIAL_STEPS = [
    { title: '¡Bienvenido a HUE-CO2!', content: 'Tu objetivo es salvar el planeta completando 5 anillos de desafío antes de que la temperatura global suba demasiado.' },
    { title: 'Selección de Roles', content: 'Cada jugador asume un rol con habilidades únicas. Para empezar, te recomendamos jugar con todos los roles.' },
    { title: 'Comenzar', content: 'Haz clic en "Jugar con todos los roles" o selecciona algunos y pulsa "Comenzar Misión" para ir al tablero.' },
    { title: 'El Tablero', content: 'Este es el centro de mando. Aquí gestionarás los recursos y tomarás decisiones.' },
    { title: 'Termómetro Global', content: 'Muestra la salud del planeta. Si llega a +0.5ºC, ¡el juego termina en derrota! Cada fallo o evento no mitigado subirá la temperatura.' },
    { title: 'Eco-Tokens (ET)', content: 'Son la "moneda" del juego. Los ganas cada turno y al acertar preguntas. Se usan para activar habilidades.' },
    { title: 'Anillos de Desafío', content: 'Debes superar 3 retos para completar un anillo y avanzar al siguiente. Al completar un anillo, la temperatura baja -0.1ºC.' },
    { title: 'Cartas de Reto y Eventos', content: 'En cada turno aparecerá un reto o un evento climático. Debatid en equipo y elegid la mejor opción.' },
    { title: 'Habilidades de Equipo', content: 'Usa tus Eco-Tokens para activar estas habilidades. Algunas te salvan de eventos, otras te ayudan a responder preguntas o bajar la temperatura.' },
    { title: '¡Buena Suerte!', content: 'El destino del planeta está en vuestras manos. ¡A jugar!' }
];

export function TutorialOverlay({ step, onNext, onSkip }) {
    const current = TUTORIAL_STEPS[step];
    if (!current) return null;

    return (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-stone-900 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] max-w-md w-full pointer-events-auto border-t-8 border-emerald-500 relative overflow-hidden"
                >
                    {/* Inner Texture */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <h3 className="text-3xl font-black text-emerald-400 mb-4 uppercase tracking-tighter drop-shadow-md relative z-10">{current.title}</h3>
                    <p className="text-stone-300 mb-8 font-medium leading-relaxed relative z-10">{current.content}</p>
                    <div className="flex justify-between items-center relative z-10">
                        <button onClick={onSkip} className="text-stone-500 hover:text-stone-300 font-bold text-xs uppercase tracking-widest transition-colors">Saltar Tutorial</button>
                        {step !== 2 && (
                            <button onClick={onNext} className="px-8 py-3 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-emerald-500 transition-all shadow-[0_5px_15px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 border-b-4 border-emerald-800">
                                {step === TUTORIAL_STEPS.length - 1 ? 'Entendido' : 'Siguiente'}
                            </button>
                        )}
                        {step === 2 && (
                            <span className="text-emerald-500 font-bold text-xs uppercase tracking-widest animate-pulse">Haz clic en el botón para continuar...</span>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
