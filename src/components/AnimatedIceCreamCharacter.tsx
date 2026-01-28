'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AnimatedIceCreamCharacter() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Personaje Principal - Helado Feliz */}
            <motion.div
                className="relative z-10"
                animate={{
                    y: isHovered ? [-10, -30, -10] : [0, -20, 0],
                    rotate: isHovered ? [-8, 8, -8] : [-5, 5, -5],
                }}
                transition={{
                    duration: isHovered ? 2 : 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Cuerpo del helado */}
                <div className="relative">
                    {/* Helado (bolas) */}
                    <motion.div
                        className="relative"
                        animate={{
                            scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
                        }}
                        transition={{
                            duration: isHovered ? 1.5 : 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Bola superior - Rosa con fresa */}
                        <div className="w-36 h-36 bg-gradient-to-br from-pink-300 via-pink-400 to-pink-500 rounded-full relative shadow-2xl">
                            {/* Cara feliz */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {/* Ojos grandes kawaii */}
                                <div className="flex gap-5 mb-2">
                                    <motion.div
                                        className="relative"
                                        animate={{
                                            scaleY: isHovered ? [1, 0.1, 1, 1, 1] : [1, 0.1, 1],
                                        }}
                                        transition={{
                                            duration: isHovered ? 2 : 3,
                                            repeat: Infinity,
                                            repeatDelay: isHovered ? 1 : 2,
                                        }}
                                    >
                                        <div className="w-4 h-5 bg-gray-900 rounded-full" />
                                        <div className="absolute top-0.5 left-1 w-2 h-2 bg-white rounded-full" />
                                    </motion.div>
                                    <motion.div
                                        className="relative"
                                        animate={{
                                            scaleY: isHovered ? [1, 0.1, 1, 1, 1] : [1, 0.1, 1],
                                        }}
                                        transition={{
                                            duration: isHovered ? 2 : 3,
                                            repeat: Infinity,
                                            repeatDelay: isHovered ? 1 : 2,
                                        }}
                                    >
                                        <div className="w-4 h-5 bg-gray-900 rounded-full" />
                                        <div className="absolute top-0.5 left-1 w-2 h-2 bg-white rounded-full" />
                                    </motion.div>
                                </div>

                                {/* Boca sonriente grande */}
                                <motion.div
                                    className="w-10 h-6 border-b-4 border-gray-900 rounded-full"
                                    animate={{
                                        scaleX: isHovered ? [1, 1.2, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: isHovered ? Infinity : 0,
                                    }}
                                />

                                {/* Mejillas rosadas más grandes */}
                                <motion.div
                                    className="absolute left-1 top-14 w-8 h-6 bg-pink-600/50 rounded-full blur-sm"
                                    animate={{
                                        scale: isHovered ? [1, 1.2, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: isHovered ? Infinity : 0,
                                    }}
                                />
                                <motion.div
                                    className="absolute right-1 top-14 w-8 h-6 bg-pink-600/50 rounded-full blur-sm"
                                    animate={{
                                        scale: isHovered ? [1, 1.2, 1] : 1,
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: isHovered ? Infinity : 0,
                                    }}
                                />
                            </div>

                            {/* Brillos más pronunciados */}
                            <div className="absolute top-4 left-7 w-8 h-8 bg-white/70 rounded-full blur-sm" />
                            <div className="absolute top-8 left-4 w-4 h-4 bg-white/50 rounded-full blur-sm" />

                            {/* Fresa decorativa en la parte superior */}
                            <motion.div
                                className="absolute -top-6 -right-2 text-4xl"
                                animate={{
                                    rotate: isHovered ? [0, -15, 15, 0] : [0, -10, 10, 0],
                                    y: isHovered ? [0, -5, 0] : 0,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                            >
                                🍓
                            </motion.div>
                        </div>

                        {/* Bola del medio - Amarilla (vainilla) */}
                        <div className="w-32 h-32 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 rounded-full -mt-12 mx-auto shadow-xl relative">
                            <div className="absolute top-4 left-6 w-6 h-6 bg-white/60 rounded-full blur-sm" />
                            <div className="absolute top-8 left-4 w-3 h-3 bg-white/40 rounded-full blur-sm" />

                            {/* Gotitas de salsa */}
                            <motion.div
                                className="absolute -left-2 top-8 w-3 h-4 bg-red-500 rounded-full"
                                animate={{
                                    y: isHovered ? [0, 40, 40] : 0,
                                    opacity: isHovered ? [1, 1, 0] : 1,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: isHovered ? Infinity : 0,
                                }}
                            />
                        </div>

                        {/* Bola inferior - Verde (menta) */}
                        <div className="w-28 h-28 bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-full -mt-10 mx-auto shadow-lg relative">
                            <div className="absolute top-3 left-5 w-5 h-5 bg-white/60 rounded-full blur-sm" />
                            <div className="absolute top-6 left-3 w-3 h-3 bg-white/40 rounded-full blur-sm" />
                        </div>
                    </motion.div>

                    {/* Cono con más detalles */}
                    <div className="w-24 h-36 mx-auto -mt-8 relative">
                        <div className="w-full h-full bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 clip-triangle shadow-2xl relative overflow-hidden">
                            {/* Patrón de waffle mejorado */}
                            <div className="absolute inset-0 opacity-40">
                                <div className="grid grid-cols-5 gap-0.5 h-full p-2">
                                    {[...Array(25)].map((_, i) => (
                                        <div key={i} className="bg-amber-800 rounded-sm" />
                                    ))}
                                </div>
                            </div>
                            {/* Borde del cono */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-amber-700" />
                        </div>
                    </div>
                </div>

                {/* Brazos animados más expresivos */}
                <motion.div
                    className="absolute top-36 -left-10 w-14 h-4 bg-pink-400 rounded-full shadow-lg"
                    style={{ transformOrigin: 'right center' }}
                    animate={{
                        rotate: isHovered ? [0, -30, 10, -30, 0] : [0, -20, 0],
                        y: isHovered ? [0, -5, 0, -5, 0] : 0,
                    }}
                    transition={{
                        duration: isHovered ? 1.5 : 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Mano */}
                    <div className="absolute -left-3 -top-1 w-6 h-6 bg-pink-300 rounded-full" />
                </motion.div>
                <motion.div
                    className="absolute top-36 -right-10 w-14 h-4 bg-pink-400 rounded-full shadow-lg"
                    style={{ transformOrigin: 'left center' }}
                    animate={{
                        rotate: isHovered ? [0, 30, -10, 30, 0] : [0, 20, 0],
                        y: isHovered ? [0, -5, 0, -5, 0] : 0,
                    }}
                    transition={{
                        duration: isHovered ? 1.5 : 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Mano */}
                    <div className="absolute -right-3 -top-1 w-6 h-6 bg-pink-300 rounded-full" />
                </motion.div>
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
                </>
            )}

            {/* Sombra dinámica mejorada */}
            <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/30 rounded-full blur-lg"
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
        </div>
    )
}
