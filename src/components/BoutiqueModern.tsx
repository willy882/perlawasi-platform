'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FiShoppingBag, FiArrowRight, FiX, FiCheck, FiSun, FiDroplet, FiWind } from 'react-icons/fi'
import Image from 'next/image'

// ─── Brand Palette ───────────────────────────────────────────────
const OCEAN = '#0C4A6E'   // deep ocean blue
const CORAL = '#F97316'   // warm coral / sun
const SAND = '#FEF9EF'   // sandy white
const AQUA = '#06B6D4'   // turquoise water
const FOAM = '#F0F9FF'   // sea foam / near-white

// ─── Section visual config (no products here) ────────────────────
const SECTION_CONFIG = [
    { id: 'swim', label: '01', title: 'SWIM', subtitle: 'Trajes de Baño & Bikinis', tagline: 'Hechos para el agua. Diseñados para brillar.', bg: OCEAN, accent: '#ffffff', pill: CORAL },
    { id: 'cover', label: '02', title: 'COVER UPS', subtitle: 'Pareos & Vestidos de Playa', tagline: 'Del agua a la arena sin perder el estilo.', bg: SAND, accent: OCEAN, pill: OCEAN },
    { id: 'accesorios', label: '03', title: 'ACCESORIOS', subtitle: 'Sombreros, Bolsas & Más', tagline: 'Cada accesorio, una historia de artesanía.', bg: AQUA, accent: '#ffffff', pill: OCEAN },
]

// ─── Fallback products (when DB is empty for a section) ───────────
const FALLBACK: Record<string, any[]> = {
    swim: [
        { id: 'f-s1', name: 'Bikini Selva Coral', price: 120, description: 'Lycra reciclada UPF 50+, corte brasileño.', image_url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?w=900&q=80', sizes: ['XS', 'S', 'M', 'L'] },
        { id: 'f-s2', name: 'Traje Entero Azul', price: 145, description: 'Elegancia del océano en tejido técnico.', image_url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&q=80', sizes: ['S', 'M', 'L'] },
    ],
    cover: [
        { id: 'f-c1', name: 'Pareo Amazónico', price: 75, description: 'Viscosa de bambú estampada artesanalmente.', image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=900&q=80', sizes: ['Único'] },
        { id: 'f-c2', name: 'Vestido Lino Arena', price: 95, description: 'Lino 100% natural. Del río al restaurante.', image_url: 'https://images.unsplash.com/photo-1559386484-97dfc0e15539?w=900&q=80', sizes: ['S', 'M', 'L', 'XL'] },
    ],
    accesorios: [
        { id: 'f-a1', name: 'Sombrero Paja Toquilla', price: 180, description: 'El más fino del Perú. Grado 4.', image_url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=900&q=80', sizes: ['S', 'M', 'L'] },
        { id: 'f-a2', name: 'Bolso Palma de Mar', price: 150, description: 'Tejido de palma natural con cierre de concha.', image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80', sizes: ['Único'] },
    ],
}

// ─── Component ───────────────────────────────────────────────────
export default function BoutiqueModern({ initialProducts = [] }: { initialProducts?: any[] }) {
    // Build sections from DB products, falling back to mocks when empty
    const SECTIONS = SECTION_CONFIG.map(cfg => {
        const dbItems = initialProducts.filter(p => p.section === cfg.id)
        const products = (dbItems.length > 0 ? dbItems : FALLBACK[cfg.id]).slice(0, 4)
        return { ...cfg, products }
    })


    const [activeSection, setActiveSection] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [added, setAdded] = useState(false)
    const [qty, setQty] = useState(1)
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

    useEffect(() => {
        const unsub = scrollYProgress.on('change', v => {
            if (v < 0.33) setActiveSection(0)
            else if (v < 0.66) setActiveSection(1)
            else setActiveSection(2)
        })
        return () => unsub()
    }, [scrollYProgress])

    const openProduct = (p: any) => {
        setSelectedProduct(p)
        setIsDrawerOpen(true)
        setQty(1)
        setAdded(false)
    }

    const handleBuy = () => {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const current = SECTIONS[activeSection]

    return (
        <div ref={containerRef} className="relative">

            {/* ── Sticky mini-nav dots ─────────────────────────────── */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
                {SECTIONS.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => {
                            const el = document.getElementById(`section-${s.id}`)
                            el?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${activeSection === i ? 'scale-150' : 'opacity-40'}`}
                        style={{ backgroundColor: activeSection === i ? CORAL : '#fff', boxShadow: activeSection === i ? `0 0 12px ${CORAL}` : 'none' }}
                    />
                ))}
            </div>

            {/* ═══════════════════════════════════════════════════════
                HERO — cinematic opener
            ═══════════════════════════════════════════════════════ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: OCEAN }}>
                {/* Background ocean image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
                        alt="Playa"
                        fill
                        className="object-cover opacity-30"
                        priority
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${OCEAN}99 0%, ${OCEAN}cc 60%, ${OCEAN} 100%)` }} />
                </div>

                {/* Animated waves */}
                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path fill={OCEAN} fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L0,120Z" />
                    </svg>
                </div>

                {/* Perlamayo Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-6 left-8 z-20"
                >
                    <div className="relative w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-xl border border-white/20">
                        <Image src="/images/punto.png" alt="Perlamayo" fill className="object-contain p-1" />
                    </div>
                </motion.div>

                {/* Hero text */}
                <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        <div
                            className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/20 mb-8 text-[10px] font-black uppercase tracking-[0.5em]"
                            style={{ backgroundColor: CORAL + '22', backdropFilter: 'blur(10px)' }}
                        >
                            <FiSun className="text-base" style={{ color: CORAL }} />
                            Colección Playa · Perlawasi
                        </div>

                        <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-8">
                            BAJO<br />
                            <span className="font-serif font-normal italic" style={{ color: AQUA }}>el sol</span>
                        </h1>

                        <p className="text-base md:text-xl text-white/60 max-w-xl mx-auto font-light leading-relaxed mb-12">
                            Ropa de playa y accesorios elaborados en la Amazonía peruana. Del río a la orilla, con estilo y conciencia.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#section-swim"
                                className="px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] text-white transition-all hover:scale-105 shadow-2xl"
                                style={{ backgroundColor: CORAL, boxShadow: `0 16px 40px ${CORAL}55` }}
                            >
                                Ver Colección
                            </a>
                            <a href="https://wa.me/51928141669?text=Hola,%20quiero%20información%20sobre%20ropa%20de%20playa"
                                target="_blank"
                                className="px-12 py-5 rounded-full font-black uppercase tracking-widest text-[10px] border border-white/25 hover:bg-white/10 transition-all"
                            >
                                Consultar Tallas
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative floating icons */}
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 left-[8%] text-6xl opacity-20 hidden lg:block pointer-events-none">🌊</motion.div>
                <motion.div animate={{ y: [0, 18, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/3 right-[10%] text-5xl opacity-20 hidden lg:block pointer-events-none">🐚</motion.div>
                <motion.div animate={{ y: [0, -14, 0], rotate: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-1/4 left-[12%] text-4xl opacity-15 hidden lg:block pointer-events-none">🏄</motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                PRODUCT SECTIONS
            ═══════════════════════════════════════════════════════ */}
            {SECTIONS.map((section, idx) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const sectionRef = useRef(null)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const { scrollYProgress: sp } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(sp, [0.1, 0.45], [1, 0])
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(sp, [0, 0.5], [1, 0.96])

                const isLight = section.bg === SAND || section.bg === FOAM

                return (
                    <section
                        key={section.id}
                        id={`section-${section.id}`}
                        ref={sectionRef}
                        className="relative min-h-screen flex items-center py-24 overflow-hidden"
                        style={{ backgroundColor: section.bg }}
                    >
                        {/* Light wave divider top */}
                        {idx > 0 && (
                            <div className="absolute top-0 left-0 right-0 z-0 opacity-30">
                                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                                    <path fill={isLight ? AQUA : '#fff'} fillOpacity="0.15"
                                        d="M0,32L60,37.3C120,43,240,53,360,53.3C480,53,600,43,720,37.3C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,0L0,0Z" />
                                </svg>
                            </div>
                        )}

                        <motion.div
                            style={{ opacity, scale }}
                            className="container-custom w-full relative z-10"
                        >
                            {/* Section label */}
                            <div className="flex items-center gap-4 mb-10">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40" style={{ color: section.accent }}>
                                    {section.label} /
                                </span>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40" style={{ color: section.accent }}>
                                    {section.subtitle}
                                </span>
                            </div>

                            {/* 2-column layout: LEFT = title+text, RIGHT = products */}
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                                {/* ── LEFT: Title & CTA ── */}
                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.9, ease: 'circOut' }}
                                    className="flex flex-col gap-6"
                                >
                                    <h2
                                        className="text-[4.5rem] sm:text-[6rem] lg:text-[8rem] font-black tracking-tighter leading-[0.88]"
                                        style={{ color: section.accent }}
                                    >
                                        {section.title}
                                    </h2>

                                    <p className="text-base md:text-lg leading-relaxed max-w-xs" style={{ color: section.accent + 'aa' }}>
                                        {section.tagline}
                                    </p>

                                    {/* Feature pills */}
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { icon: <FiSun />, text: 'UPF 50+' },
                                            { icon: <FiDroplet />, text: 'Secado Rápido' },
                                            { icon: <FiWind />, text: 'Peso Pluma' },
                                        ].map((f, fi) => (
                                            <span key={fi} className="flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-wider" style={{ backgroundColor: section.pill + '22', color: section.pill, border: `1px solid ${section.pill}33` }}>
                                                {f.icon} {f.text}
                                            </span>
                                        ))}
                                    </div>

                                    <button
                                        className="self-start px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-2xl active:scale-95 shadow-md mt-2 text-white"
                                        style={{ backgroundColor: section.pill, boxShadow: `0 12px 30px ${section.pill}40` }}
                                        onClick={() => openProduct(section.products[0])}
                                    >
                                        Explorar {section.title}
                                    </button>
                                </motion.div>

                                {/* ── RIGHT: Product Cards ── */}
                                <div className="grid grid-cols-2 gap-5 md:gap-7">
                                    {section.products.map((p, pi) => (
                                        <motion.div
                                            key={p.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, margin: '-60px' }}
                                            transition={{ duration: 0.8, delay: pi * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                            onClick={() => openProduct(p)}
                                            className="group cursor-pointer"
                                        >
                                            {/* Card img */}
                                            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl">
                                                <Image src={p.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'} alt={p.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {/* Hover CTA */}
                                                <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                                                    <span className="text-white text-[9px] font-black uppercase tracking-widest bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/25">
                                                        Ver Detalle
                                                    </span>
                                                </div>
                                                {/* Price badge */}
                                                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-[9px] font-black" style={{ backgroundColor: CORAL, color: '#fff' }}>
                                                    S/ {p.price}
                                                </div>
                                            </div>
                                            {/* Name */}
                                            <div className="mt-3 px-1 flex items-center justify-between">
                                                <h3 className="text-[10px] font-black uppercase tracking-wide" style={{ color: section.accent }}>{p.name}</h3>
                                                <div className="w-6 h-6 rounded-full border flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity" style={{ borderColor: section.accent }}>
                                                    <FiArrowRight className="text-[10px]" style={{ color: section.accent }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative section number */}
                        <span
                            className="absolute bottom-4 left-6 text-[20vw] font-black opacity-[0.04] select-none pointer-events-none leading-none"
                            style={{ color: section.accent }}
                        >
                            {section.label}
                        </span>
                    </section>
                )
            })}

            {/* ═══════════════════════════════════════════════════════
                CLOSING CTA SECTION
            ═══════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-36 relative overflow-hidden" style={{ backgroundColor: OCEAN }}>
                <div className="absolute inset-0 opacity-10">
                    <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80" alt="ocean" fill className="object-cover" />
                </div>
                <div className="container px-6 mx-auto relative z-10 text-center">
                    {/* Perlamayo logo */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-32 h-32 bg-white/95 rounded-full p-4 shadow-2xl">
                            <Image src="/images/punto.png" alt="Perlamayo" fill className="object-contain p-2" />
                        </div>
                    </div>

                    <div className="inline-flex gap-2 mb-6">
                        {'🌊🐚☀️🏖️🌴'.split('').map((e, i) => (
                            <motion.span key={i} animate={{ y: [0, -8, 0] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} className="text-2xl">
                                {e}
                            </motion.span>
                        ))}
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6">
                        ¿TU LOOK DE<br />
                        <span style={{ color: CORAL }}>PLAYA PERFECTO?</span>
                    </h2>
                    <p className="text-white/50 text-base md:text-xl max-w-xl mx-auto font-light mb-10 px-4">
                        Nuestros asesores de moda te ayudan a armar el look ideal para tu escapada.
                    </p>
                    <a
                        href="https://wa.me/51928141669?text=Hola,%20quiero%20armar%20mi%20look%20de%20playa%20con%20LIL"
                        target="_blank"
                        className="inline-flex items-center gap-4 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
                        style={{ backgroundColor: CORAL, boxShadow: `0 20px 50px ${CORAL}55` }}
                    >
                        <FiShoppingBag className="text-xl" />
                        Armar Mi Look Ahora
                    </a>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                PRODUCT DRAWER
            ═══════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {isDrawerOpen && selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-10"
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />

                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                            className="relative w-full max-w-lg bg-white md:rounded-[2.5rem] rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <button onClick={() => setIsDrawerOpen(false)} className="absolute top-5 right-5 z-10 p-3 rounded-full bg-black/5 hover:bg-black/10">
                                <FiX />
                            </button>

                            {/* Product image */}
                            <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                                <Image src={selectedProduct.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'} alt={selectedProduct.name} fill className="object-cover" />
                                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${OCEAN}cc 0%, transparent 60%)` }} />
                                <div className="absolute bottom-6 left-6">
                                    <h3 className="text-2xl font-black text-white">{selectedProduct.name}</h3>
                                    <p className="text-white/60 text-sm mt-1">S/ {selectedProduct.price}</p>
                                </div>
                            </div>

                            {/* Product details */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6">
                                {/* Feature icons */}
                                <div className="flex gap-4">
                                    {[
                                        { icon: <FiSun />, label: 'UPF 50+' },
                                        { icon: <FiDroplet />, label: 'Impermeable' },
                                        { icon: <FiWind />, label: 'Ligero' },
                                    ].map((f, fi) => (
                                        <div key={fi} className="flex-1 flex flex-col items-center gap-2 p-3 rounded-2xl" style={{ backgroundColor: OCEAN + '0a' }}>
                                            <span style={{ color: CORAL }}>{f.icon}</span>
                                            <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">{f.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed">{selectedProduct.description}</p>

                                {/* Sizes */}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Talla</p>
                                    <div className="flex gap-2">
                                        {(selectedProduct.sizes && selectedProduct.sizes.length > 0 ? selectedProduct.sizes : ['ÚNICA']).map((s: string) => (
                                            <button key={s} className="min-w-[40px] px-3 h-10 rounded-xl border text-[10px] font-black hover:border-current hover:text-white transition-all flex items-center justify-center"
                                                style={{ borderColor: OCEAN + '33', color: OCEAN }}
                                                onMouseEnter={e => { (e.target as HTMLElement).style.backgroundColor = OCEAN; (e.target as HTMLElement).style.color = '#fff'; }}
                                                onMouseLeave={e => { (e.target as HTMLElement).style.backgroundColor = 'transparent'; (e.target as HTMLElement).style.color = OCEAN; }}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-xs text-gray-300">* Envío nacional certificado. Packaging eco-friendly. Producción limitada.</p>
                            </div>

                            {/* Footer */}
                            <div className="p-6 md:px-10 border-t border-gray-50 flex items-center gap-4 bg-white">
                                <div className="flex items-center gap-3 border border-gray-100 rounded-2xl px-4 py-3">
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black">−</button>
                                    <span className="font-black w-4 text-center">{qty}</span>
                                    <button onClick={() => setQty(q => q + 1)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black">+</button>
                                </div>
                                <button
                                    onClick={handleBuy}
                                    className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all text-white"
                                    style={{ backgroundColor: added ? '#16a34a' : OCEAN }}
                                >
                                    {added ? <FiCheck /> : <FiShoppingBag />}
                                    {added ? 'Añadido ✓' : `Añadir · S/ ${selectedProduct.price * qty}`}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
