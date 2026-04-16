import React from 'react';
import { motion } from 'framer-motion';
import { 
    Users, Cpu, Shirt, FlaskConical, Tractor, Scale, Hexagon 
} from 'lucide-react';

const getRoleIcon = (iconName, id) => {
    if (id === 'tech') return <Cpu className="w-full h-full" />;
    if (id === 'primario') return <Tractor className="w-full h-full" />;
    if (id === 'publico') return <Scale className="w-full h-full" />;

    switch (iconName) {
        case 'Shirt': return <Shirt className="w-full h-full" />;
        case 'FlaskConical': return <FlaskConical className="w-full h-full" />;
        case 'Users': return <Users className="w-full h-full" />;
        default: return <Hexagon className="w-full h-full" />;
    }
};

export default function OrbitalBoard({ sectors }) {


    return (
        <div className="flex-1 relative flex items-center justify-center aspect-square max-w-[350px] lg:max-w-[480px]">
            {/* Glow de Fondo */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_#e9d5ff_0%,_transparent_70%)] opacity-30 animate-pulse" />

            <div className="relative w-full h-full flex items-center justify-center rounded-full bg-[radial-gradient(circle,_#D4AAE2_20%,_#642E7E_100%)] shadow-[0_0_60px_rgba(100,46,126,0.4)] border-8 border-white/20">
                
                {/* SVG para los Anillos */}
                <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full transform -rotate-90 opacity-60">
                    <circle cx="250" cy="250" r="80" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    <circle cx="250" cy="250" r="115" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    <circle cx="250" cy="250" r="150" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    <circle cx="250" cy="250" r="185" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    <circle cx="250" cy="250" r="220" fill="none" stroke="#3b82f6" strokeWidth="8" />
                </svg>

                {/* Tierra en el Centro con animación de flotación */}
                <motion.img
                    animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    src="/images/earth_icon.png"
                    alt="Tierra"
                    className="z-10 w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    style={{ willChange: "transform" }}
                />

                {/* NODOS ORBITANDO EL ANILLO AZUL (r=220) */}
                {sectors.map((p, i) => {
                    const baseAngle = (i * 60 - 30);
                    const currentAngle = baseAngle * (Math.PI / 180);

                    const radiusPercent = 44; // Corresponde al radio 220 en el SVG de 500
                    const x = 50 + radiusPercent * Math.cos(currentAngle);
                    const y = 50 + radiusPercent * Math.sin(currentAngle);

                    return (
                        <motion.div
                            key={p.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`absolute w-12 h-12 lg:w-14 lg:h-14 -ml-6 -mt-6 lg:-ml-7 lg:-mt-7 rounded-full ${p.bg} ${p.text} flex items-center justify-center z-20 shadow-lg border-2 ${p.border} transition-colors duration-500`}
                            style={{ 
                                left: `${x}%`, 
                                top: `${y}%`,
                                willChange: "left, top"
                            }}
                        >
                            <div className="w-7 h-7 lg:w-8 lg:h-8">
                                {getRoleIcon(p.iconName, p.id)}
                            </div>
                            
                            {/* Halo de actividad */}
                            {p.tokens > 0 && (
                                <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${p.bg}`} />
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
}
