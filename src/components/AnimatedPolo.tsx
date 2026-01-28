'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AnimatedPolo() {
    return (
        <div className="relative w-80 h-80 flex items-center justify-center perspective-1000">
            <motion.div
                className="relative w-full h-full preserve-3d"
                animate={{
                    rotateY: [0, 360], // Rotación completa en el eje Y
                    y: [0, -15, 0],    // Flotación suave vertical
                }}
                transition={{
                    rotateY: {
                        duration: 8, // Tarda 8 segundos en dar una vuelta completa
                        repeat: Infinity,
                        ease: "linear"
                    },
                    y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
                style={{
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Cara Frontal */}
                <div className="absolute inset-0 backface-visible">
                    <Image
                        src="/images/polo_mockup.png"
                        alt="Polo 3D Front"
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>

                {/* Cara Trasera (Reflejada para dar efecto de volumen al girar) */}
                <div
                    className="absolute inset-0 backface-visible"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <Image
                        src="/images/polo_mockup.png" // Usamos la misma imagen para la espalda por ahora
                        alt="Polo 3D Back"
                        fill
                        className="object-contain drop-shadow-2xl opacity-90" // Un poco más oscuro para diferenciar
                    />
                </div>
            </motion.div>

            {/* Sombra de suelo que se mueve con el objeto */}
            <motion.div
                className="absolute -bottom-10 w-40 h-8 bg-black/20 rounded-full blur-xl"
                animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    )
}
