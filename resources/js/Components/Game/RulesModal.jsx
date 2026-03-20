import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Target, AlertTriangle, Leaf, Users } from 'lucide-react';



export function RulesModal({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-stone-900 border-4 border-stone-700 rounded-3xl shadow-2xl z-50 p-6 md:p-8 text-stone-200"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-stone-800 hover:bg-stone-700 rounded-full transition-colors text-stone-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex items-center gap-3 mb-8 text-emerald-400">
                            <BookOpen size={32} />
                            <h2 className="text-3xl font-black uppercase tracking-widest text-white">Reglas del Juego</h2>
                        </div>

                        <div className="space-y-8">
                            {/* Objetivo */}
                            <section className="bg-stone-800/50 p-6 rounded-2xl border border-stone-700">
                                <div className="flex items-center gap-3 mb-4 text-amber-400">
                                    <Target size={24} />
                                    <h3 className="text-xl font-bold uppercase tracking-wider">Objetivo Principal</h3>
                                </div>
                                <p className="text-stone-300 leading-relaxed">
                                    Completar los 5 anillos de la economía circular antes de que la temperatura global alcance los <strong className="text-red-400">+0.5ºC</strong> de penalización. Si la temperatura llega a ese límite, el juego termina en derrota.
                                </p>
                            </section>

                            {/* Dinámica de Turnos */}
                            <section>
                                <h3 className="text-lg font-bold uppercase tracking-wider text-stone-400 mb-4 border-b border-stone-700 pb-2">Dinámica de Turnos</h3>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <div className="mt-1 bg-stone-800 p-2 rounded-lg text-emerald-400 h-fit">
                                            <Leaf size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Desafíos</h4>
                                            <p className="text-stone-400 text-sm">En cada turno, se presentará un desafío relacionado con el anillo actual. Responder correctamente avanza el progreso del anillo y otorga Eco-Tokens (ET). Responder mal aumenta la temperatura global.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="mt-1 bg-stone-800 p-2 rounded-lg text-red-400 h-fit">
                                            <AlertTriangle size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Eventos Climáticos</h4>
                                            <p className="text-stone-400 text-sm">A partir del tercer anillo, pueden ocurrir eventos climáticos aleatorios. Estos eventos aumentan drásticamente la temperatura a menos que se mitiguen o bloqueen usando habilidades de los especialistas.</p>
                                        </div>
                                    </li>
                                    <li className="flex gap-4">
                                        <div className="mt-1 bg-stone-800 p-2 rounded-lg text-blue-400 h-fit">
                                            <Users size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-1">Especialistas y Eco-Tokens</h4>
                                            <p className="text-stone-400 text-sm">Cada jugador tiene un rol con habilidades únicas. Estas habilidades cuestan Eco-Tokens (ET), que se generan pasivamente cada turno o al acertar desafíos. Usa las habilidades estratégicamente para sobrevivir.</p>
                                        </div>
                                    </li>
                                </ul>
                            </section>
                        </div>

                        <div className="mt-8 pt-6 border-t border-stone-700 text-center">
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-widest rounded-xl transition-colors shadow-lg"
                            >
                                Entendido
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
