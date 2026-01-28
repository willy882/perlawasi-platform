'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function AnimatedIceCreamCharacter() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative cursor-pointer select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Personaje 3D Principal */}
            <motion.div
                className="relative z-10 w-[300px] h-[300px]"
                animate={{
                    y: isHovered ? [-10, -30, -10] : [0, -20, 0],
                    rotate: isHovered ? [-3, 3, -3] : [-2, 2, -2],
                    scale: isHovered ? [1, 1.05, 1] : 1,
                }}
                transition={{
                    duration: isHovered ? 2 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <Image
                    src="/images/kawaii-icecream-transparent.png"
                    alt="Personaje Kawaii de Helado"
                    width={300}
                    height={300}
                    className="w-full h-full object-contain drop-shadow-2xl"
                    priority
                />
            </motion.div>

            {/* Partículas flotantes mejoradas */}
            <motion.div
                className="absolute -top-12 -left-12 text-5xl"
                animate={{
                    y: isHovered ? [0, -40, 0] : [0, -30, 0],
                    x: [0, 15, 0],
                    rotate: [0, 360],
                    scale: isHovered ? [1, 1.3, 1] : 1,
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                ✨
            </motion.div>
            <motion.div
                className="absolute -top-8 -right-14 text-4xl"
                animate={{
                    y: [0, -25, 0],
                    x: [0, -15, 0],
                    rotate: [0, -360],
                    scale: isHovered ? [1, 1.2, 1] : 1,
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            >
                🌟
            </motion.div>
            <motion.div
                className="absolute top-24 -right-16 text-3xl"
                animate={{
                    y: [0, 20, 0],
                    x: [0, 8, 0],
                    rotate: isHovered ? [0, 180, 360] : 0,
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                }}
            >
                💫
            </motion.div>

            {/* Corazones flotantes cuando hover */}
            {isHovered && (
                <>
                    <motion.div
                        className="absolute -top-4 left-0 text-3xl"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            y: [0, -50],
                            x: [-10, 10],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        ❤️
                    </motion.div>
                    <motion.div
                        className="absolute top-10 -left-8 text-2xl"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            y: [0, -40],
                            x: [10, -10],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5,
                        }}
                    >
                        💕
                    </motion.div>
                    <motion.div
                        className="absolute top-20 right-0 text-2xl"
                        initial={{ opacity: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            y: [0, -45],
                            x: [5, -5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1,
                        }}
                    >
                        💖
                    </motion.div>
                </>
            )}

            {/* Sombra dinámica mejorada */}
            <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/30 rounded-full blur-xl"
                animate={{
                    scale: isHovered ? [1, 0.7, 1] : [1, 0.8, 1],
                    opacity: isHovered ? [0.3, 0.15, 0.3] : [0.3, 0.2, 0.3],
                }}
                transition={{
                    duration: isHovered ? 2 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Círculos decorativos de fondo */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-pink-100/30 to-purple-100/30 -z-10 blur-2xl"
                animate={{
                    scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
                    rotate: [0, 360],
                }}
                transition={{
                    scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }
                }}
            />
        </div>
    )
}
