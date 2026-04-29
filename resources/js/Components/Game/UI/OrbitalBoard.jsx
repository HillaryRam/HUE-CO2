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

export default function OrbitalBoard({ sectors, turnNumber = 1, activeSectorId = null }) {

    return (
        <div className="flex-1 relative flex items-center justify-center aspect-square max-w-[300px] lg:max-w-[430px] max-h-[300px] lg:max-h-[430px]">
            {/* Glow de Fondo */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,_#e9d5ff_0%,_transparent_70%)] opacity-30 animate-pulse" />

            <div className="relative w-full h-full flex items-center justify-center rounded-full bg-[radial-gradient(circle,_#D4AAE2_20%,_#642E7E_100%)] shadow-[0_0_60px_rgba(100,46,126,0.4)] border-8 border-white/20">
                
                {/* SVG para los Anillos segmentados */}
                <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full transform -rotate-90">
                    {/* Anillos decorativos de fondo */}
                    <circle cx="250" cy="250" r="80" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <circle cx="250" cy="250" r="115" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <circle cx="250" cy="250" r="150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    <circle cx="250" cy="250" r="185" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    
                    {/* Anillo base (blanco tenue) */}
                    <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
                    
                    {/* SECCIONES DEL ANILLO (Un arco por sector) */}
                    {sectors.map((s, i) => {
                        const totalSectors = sectors.length || 1;
                        const arcLength = 360 / totalSectors;
                        const gap = 4; // grados de separación
                        const startAngle = (i * arcLength) + (gap / 2);
                        const endAngle = ((i + 1) * arcLength) - (gap / 2);
                        
                        const r = 220;
                        const circum = 2 * Math.PI * r;
                        const dashArray = (arcLength / 360) * circum;
                        const dashOffset = (startAngle / 360) * circum;

                        // El progreso individual (puntuacion) llena su sección del arco
                        // Asumimos que 6 aciertos completan el arco
                        const progress = Math.min((s.points || 0) / 6, 1);
                        const progressDashArray = progress * dashArray;

                        const isActive = s.id === activeSectorId;

                        return (
                            <g key={`arc-${s.id}`}>
                                {/* Fondo del arco del sector */}
                                <circle 
                                    cx="250" cy="250" r={r} 
                                    fill="none" 
                                    stroke="rgba(255,255,255,0.3)" 
                                    strokeWidth={isActive ? 12 : 8}
                                    strokeDasharray={`${dashArray} ${circum - dashArray}`}
                                    strokeDashoffset={-dashOffset}
                                    strokeLinecap="round"
                                />
                                {/* Progreso real del sector */}
                                <motion.circle 
                                    initial={{ strokeDasharray: `0 ${circum}` }}
                                    animate={{ strokeDasharray: `${progressDashArray} ${circum - progressDashArray}` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    cx="250" cy="250" r={r} 
                                    fill="none" 
                                    stroke={isActive ? "#fbbf24" : "#60a5fa"} 
                                    strokeWidth={isActive ? 12 : 8}
                                    strokeDashoffset={-dashOffset}
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]"
                                />
                            </g>
                        );
                    })}
                </svg>

                {/* Tierra en el Centro */}
                <motion.img
                    animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    src="/images/earth_icon.png"
                    alt="Tierra"
                    className="z-10 w-[100px] h-[100px] lg:w-[130px] lg:h-[130px] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                />

                {/* NODOS ORBITANDO */}
                {sectors.map((p, i) => {
                    const totalSectors = sectors.length || 1;
                    const arcLength = 360 / totalSectors;
                    const angle = (i * arcLength + arcLength / 2) * (Math.PI / 180);

                    const radiusPercent = 44; 
                    const x = 50 + radiusPercent * Math.cos(angle);
                    const y = 50 + radiusPercent * Math.sin(angle);

                    const isActive = p.id === activeSectorId;

                    return (
                        <motion.div
                            key={p.id}
                            initial={{ scale: 0 }}
                            animate={{ 
                                scale: isActive ? 1.2 : 1,
                                boxShadow: isActive ? "0 0 30px rgba(251,191,36,0.6)" : "0 4px 10px rgba(0,0,0,0.2)"
                            }}
                            className={`absolute w-12 h-12 lg:w-14 lg:h-14 -ml-6 -mt-6 lg:-ml-7 lg:-mt-7 rounded-full ${p.bg} ${p.text} flex items-center justify-center z-20 shadow-lg border-2 ${isActive ? 'border-yellow-400' : p.border} transition-all duration-500`}
                            style={{ left: `${x}%`, top: `${y}%` }}
                        >
                            <div className="w-7 h-7 lg:w-8 lg:h-8">
                                {getRoleIcon(p.iconName, p.id)}
                            </div>
                            
                            {/* Halo de actividad si es su turno */}
                            {isActive && (
                                <div className="absolute inset-0 rounded-full animate-ping opacity-40 bg-yellow-400" />
                            )}
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
}
