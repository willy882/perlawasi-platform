'use client'

import { motion } from 'framer-motion'

export default function AnimatedIceCreamCharacter() {
    return (
        <div className="relative">
            {/* Personaje Principal - Helado Feliz */}
            <motion.div
                className="relative z-10"
                animate={{
                    y: [0, -20, 0],
                    rotate: [-5, 5, -5],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {/* Cuerpo del helado (cono) */}
                <div className="relative">
                    {/* Helado (bolas) */}
                    <motion.div
                        className="relative"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Bola superior - Rosa */}
                        <div className="w-32 h-32 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full relative shadow-2xl">
                            {/* Cara feliz */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {/* Ojos */}
                                <div className="flex gap-4 mb-2">
                                    <motion.div
                                        className="w-3 h-3 bg-gray-800 rounded-full"
                                        animate={{
                                            scaleY: [1, 0.1, 1],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatDelay: 2,
                                        }}
                                    />
                                    <motion.div
                                        className="w-3 h-3 bg-gray-800 rounded-full"
                                        animate={{
                                            scaleY: [1, 0.1, 1],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatDelay: 2,
                                        }}
                                    />
                                </div>
                                {/* Sonrisa */}
                                <div className="w-8 h-4 border-b-4 border-gray-800 rounded-full" />

                                {/* Mejillas rosadas */}
                                <div className="absolute left-2 top-12 w-6 h-4 bg-pink-500/40 rounded-full blur-sm" />
                                <div className="absolute right-2 top-12 w-6 h-4 bg-pink-500/40 rounded-full blur-sm" />
                            </div>

                            {/* Brillo */}
                            <div className="absolute top-4 left-6 w-6 h-6 bg-white/60 rounded-full blur-sm" />
                        </div>

                        {/* Bola del medio - Amarilla */}
                        <div className="w-28 h-28 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full -mt-10 mx-auto shadow-xl relative">
                            <div className="absolute top-3 left-5 w-5 h-5 bg-white/50 rounded-full blur-sm" />
                        </div>

                        {/* Bola inferior - Verde (menta) */}
                        <div className="w-24 h-24 bg-gradient-to-br from-green-200 to-green-300 rounded-full -mt-8 mx-auto shadow-lg relative">
                            <div className="absolute top-2 left-4 w-4 h-4 bg-white/50 rounded-full blur-sm" />
                        </div>
                    </motion.div>

                    {/* Cono */}
                    <div className="w-20 h-32 mx-auto -mt-6 relative">
                        <div className="w-full h-full bg-gradient-to-b from-amber-600 to-amber-700 clip-triangle shadow-xl relative overflow-hidden">
                            {/* Patrón de waffle */}
                            <div className="absolute inset-0 opacity-30">
                                <div className="grid grid-cols-4 gap-1 h-full p-2">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className="bg-amber-800 rounded-sm" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Brazos animados */}
                <motion.div
                    className="absolute top-32 -left-8 w-12 h-3 bg-pink-400 rounded-full"
                    style={{ transformOrigin: 'right center' }}
                    animate={{
                        rotate: [0, -20, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-32 -right-8 w-12 h-3 bg-pink-400 rounded-full"
                    style={{ transformOrigin: 'left center' }}
                    animate={{
                        rotate: [0, 20, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Partículas flotantes alrededor */}
            <motion.div
                className="absolute -top-10 -left-10 text-4xl"
                animate={{
                    y: [0, -30, 0],
                    x: [0, 10, 0],
                    rotate: [0, 360],
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
                className="absolute -top-5 -right-10 text-3xl"
                animate={{
                    y: [0, -20, 0],
                    x: [0, -10, 0],
                    rotate: [0, -360],
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
                className="absolute top-20 -right-12 text-2xl"
                animate={{
                    y: [0, 15, 0],
                    x: [0, 5, 0],
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

            {/* Sombra */}
            <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black/20 rounded-full blur-md"
                animate={{
                    scale: [1, 0.8, 1],
                    opacity: [0.2, 0.1, 0.2],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    )
}
