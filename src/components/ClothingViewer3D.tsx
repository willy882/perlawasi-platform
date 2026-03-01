'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface ClothingViewerProps {
    emoji: string
    color: string
    image?: string
    isSpinning: boolean
    onSpinComplete?: () => void
}

export default function ClothingViewer3D({ emoji, color, image, isSpinning, onSpinComplete }: ClothingViewerProps) {
    const [rotation, setRotation] = useState(0)
    const [autoAngle, setAutoAngle] = useState(0)
    const animFrameRef = useRef<number | null>(null)
    const isDragging = useRef(false)
    const lastX = useRef(0)
    const viewerRef = useRef<HTMLDivElement>(null)

    // Auto-rotation suave continua
    useEffect(() => {
        let last = performance.now()
        const loop = (now: number) => {
            const delta = (now - last) / 1000
            last = now
            if (!isDragging.current && !isSpinning) {
                setAutoAngle(prev => (prev + delta * 18) % 360)
            }
            animFrameRef.current = requestAnimationFrame(loop)
        }
        animFrameRef.current = requestAnimationFrame(loop)
        return () => {
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        }
    }, [isSpinning])

    // Efecto de spin al cambiar prenda (720° rápido)
    useEffect(() => {
        if (!isSpinning) return
        let start: number | null = null
        const duration = 700
        const startAngle = autoAngle

        const spin = (timestamp: number) => {
            if (!start) start = timestamp
            const elapsed = timestamp - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setAutoAngle(startAngle + eased * 720)
            if (progress < 1) {
                requestAnimationFrame(spin)
            } else {
                onSpinComplete?.()
            }
        }
        requestAnimationFrame(spin)
    }, [isSpinning]) // eslint-disable-line

    // Drag manual
    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true
        lastX.current = e.clientX
    }
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging.current) return
        const dx = e.clientX - lastX.current
        lastX.current = e.clientX
        setAutoAngle(prev => prev + dx * 0.8)
    }
    const handleMouseUp = () => { isDragging.current = false }

    const handleTouchStart = (e: React.TouchEvent) => {
        isDragging.current = true
        lastX.current = e.touches[0].clientX
    }
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current) return
        const dx = e.touches[0].clientX - lastX.current
        lastX.current = e.touches[0].clientX
        setAutoAngle(prev => prev + dx * 0.8)
    }
    const handleTouchEnd = () => { isDragging.current = false }

    const totalAngle = rotation + autoAngle
    const wobble = Math.sin((totalAngle * Math.PI) / 180) * 5

    // Calculamos la escala basada en la rotación para efecto de profundidad
    const normalizedAngle = ((totalAngle % 360) + 360) % 360
    const scaleEffect = 1 - Math.abs(Math.sin((normalizedAngle * Math.PI) / 180)) * 0.15

    return (
        <div
            ref={viewerRef}
            className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            style={{ perspective: '1200px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Sombra proyectada en el suelo */}
            <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full blur-2xl opacity-30 transition-colors duration-700"
                style={{ backgroundColor: color }}
            />

            {/* Contenedor 3D principal */}
            <div
                style={{
                    transform: `rotateY(${totalAngle}deg) rotateX(${wobble}deg)`,
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                }}
            >
                {/* Cara frontal */}
                <div
                    className="relative flex items-center justify-center"
                    style={{
                        width: 280,
                        height: 320,
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* Fondo con color seleccionado */}
                    <div
                        className="absolute inset-0 rounded-3xl transition-colors duration-700"
                        style={{
                            background: image
                                ? `radial-gradient(ellipse at 30% 30%, ${color}22, ${color}11 60%, transparent)`
                                : `radial-gradient(ellipse at 30% 30%, ${color}dd, ${color}99 60%, ${color}44)`,
                            boxShadow: `0 20px 80px ${color}44, inset 0 1px 0 rgba(255,255,255,0.3)`,
                            border: `1px solid ${color}22`,
                        }}
                    />

                    {/* Brillo de luz */}
                    <div
                        className="absolute top-0 left-0 w-1/2 h-2/3 rounded-3xl opacity-15"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 70%)',
                        }}
                    />

                    {/* Imagen real o emoji */}
                    {image ? (
                        <div
                            className="relative z-10 w-full h-full flex items-center justify-center p-4"
                            style={{
                                transform: 'translateZ(20px)',
                                filter: `drop-shadow(0 10px 30px ${color}66)`,
                            }}
                        >
                            <Image
                                src={image}
                                alt="Producto"
                                fill
                                className="object-contain p-4"
                                style={{
                                    mixBlendMode: 'multiply',
                                }}
                                quality={90}
                            />
                            {/* Overlay de color sutil */}
                            <div
                                className="absolute inset-0 rounded-3xl transition-colors duration-700 mix-blend-color opacity-40"
                                style={{ backgroundColor: color }}
                            />
                        </div>
                    ) : (
                        <div
                            className="relative z-10 transition-all duration-500"
                            style={{
                                fontSize: 120,
                                filter: `drop-shadow(0 10px 20px ${color}88)`,
                                transform: 'translateZ(20px)',
                            }}
                        >
                            {emoji}
                        </div>
                    )}
                </div>

                {/* Cara posterior */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        width: 280,
                        height: 320,
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        background: image
                            ? `radial-gradient(ellipse at 70% 30%, ${color}22, ${color}11 60%, transparent)`
                            : `radial-gradient(ellipse at 70% 30%, ${color}bb, ${color}66 60%, ${color}22)`,
                        borderRadius: '1.5rem',
                        border: `1px solid ${color}22`,
                    }}
                >
                    {image ? (
                        <div className="relative w-full h-full p-4">
                            <Image
                                src={image}
                                alt="Producto - vista posterior"
                                fill
                                className="object-contain p-4 opacity-60"
                                style={{
                                    mixBlendMode: 'multiply',
                                    transform: 'scaleX(-1)',
                                }}
                                quality={90}
                            />
                            <div
                                className="absolute inset-0 rounded-3xl transition-colors duration-700 mix-blend-color opacity-30"
                                style={{ backgroundColor: color }}
                            />
                        </div>
                    ) : (
                        <span style={{ fontSize: 80, opacity: 0.5, filter: 'blur(1px)' }}>✦</span>
                    )}
                </div>
            </div>

            {/* Indicador de interacción */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/40 text-xs font-medium tracking-widest uppercase">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2M8 4v4h8V4M8 4h8" />
                </svg>
                Arrastra para girar
            </div>
        </div>
    )
}
