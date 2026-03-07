'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FiShoppingBag, FiArrowRight, FiX, FiCheck, FiArrowUp } from 'react-icons/fi'
import Image from 'next/image'

// --- DATA ---
const SECTIONS = [
    {
        id: 'basicos',
        title: 'SEDA & TIERRA',
        subtitle: 'Cápsula de Esenciales',
        color: '#F9F7F2',
        accent: '#8B7355',
        products: [
            { id: 'b-1', name: 'Algodón Pima Oversized', price: 85, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80', desc: 'Tejido orgánico de 240g con acabado aterciopelado.' },
            { id: 'b-2', name: 'Polo Lino Sand', price: 95, img: 'https://images.unsplash.com/photo-1583743814966-8936f5b721fa?auto=format&fit=crop&w=1200&q=80', desc: 'Frescura ancestral para el día a día.' }
        ]
    },
    {
        id: 'alta-costura',
        title: 'CHIC AMAZÓNICO',
        subtitle: 'Selección de Autor',
        color: '#0A0A0A',
        accent: '#D4AF37',
        products: [
            { id: 'c-1', name: 'Bikini Selva Black', price: 120, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80', desc: 'Lycra reciclada de alta performance.' },
            { id: 'c-2', name: 'Lencería Bamboo', price: 110, img: 'https://images.unsplash.com/photo-1563228026-6d9990928956?auto=format&fit=crop&w=1200&q=80', desc: 'Seda de bambú y encaje galón.' }
        ]
    },
    {
        id: 'objetos',
        title: 'OBJETOS ANCESTRALES',
        subtitle: 'Objetos de Deseo',
        color: '#E2D1B3',
        accent: '#1A1A1A',
        products: [
            { id: 'o-1', name: 'Bolso Palma Tejida', price: 150, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80', desc: 'Hecho a mano por comunidades locales.' },
            { id: 'o-2', name: 'Hat San Martín', price: 180, img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&w=1200&q=80', desc: 'Paja toquilla de grado fino.' }
        ]
    }
]

export default function BoutiqueModern() {
    const [activeSection, setActiveSection] = useState(0)
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [isProductOpen, setIsProductOpen] = useState(false)
    const [added, setAdded] = useState(false)
    const containerRef = useRef(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (latest < 0.33) setActiveSection(0)
            else if (latest < 0.66) setActiveSection(1)
            else setActiveSection(2)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    const handlePurchase = () => {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div ref={containerRef} className="relative transition-colors duration-1000" style={{ backgroundColor: SECTIONS[activeSection].color }}>

            {/* --- SECTIONS CONTENT --- */}
            {SECTIONS.map((section, idx) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const sectionRef = useRef(null)
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const { scrollYProgress: sectionScroll } = useScroll({
                    target: sectionRef,
                    offset: ["start start", "end start"]
                })
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const contentOpacity = useTransform(sectionScroll, [0.1, 0.4], [1, 0])
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const contentScale = useTransform(sectionScroll, [0, 0.5], [1, 0.95])

                return (
                    <section
                        key={section.id}
                        ref={sectionRef}
                        className="relative min-h-screen flex items-center overflow-hidden py-20"
                        style={{ backgroundColor: section.color }}
                    >
                        <motion.div
                            style={{ opacity: contentOpacity, scale: contentScale }}
                            className="container-custom w-full"
                        >
                            {/*
                              2-COLUMN LAYOUT — strictly separated:
                              LEFT  → Title + Subtitle + Description + CTA
                              RIGHT → Product Images
                              Text and images NEVER share the same column space.
                            */}
                            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                                {/* ── LEFT: Editorial Title ── */}
                                <motion.div
                                    initial={{ opacity: 0, x: -40 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.9, ease: "circOut" }}
                                    className="flex flex-col justify-center gap-6 py-10 lg:py-0"
                                >
                                    <span
                                        className="text-[10px] font-black uppercase tracking-[0.6em] opacity-50"
                                        style={{ color: section.accent }}
                                    >
                                        {section.subtitle}
                                    </span>

                                    <h1
                                        className="text-[4.5rem] sm:text-[6rem] lg:text-[8rem] font-serif leading-[0.85] tracking-tighter"
                                        style={{ color: section.accent }}
                                    >
                                        {section.title.split(' ')[0]}
                                        <br />
                                        <em className="font-normal not-italic opacity-70">
                                            {section.title.split(' ').slice(1).join(' ')}
                                        </em>
                                    </h1>

                                    <p
                                        className="text-base md:text-lg font-light leading-relaxed max-w-xs"
                                        style={{ color: section.accent + 'aa' }}
                                    >
                                        Una oda a la artesanía local. Cada hilo cuenta una historia de respeto y equilibrio con el corazón de la Amazonía.
                                    </p>

                                    <button
                                        className="self-start px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-xl active:scale-95 shadow-md"
                                        style={{ backgroundColor: section.accent, color: section.color }}
                                    >
                                        Descubrir Colección
                                    </button>
                                </motion.div>

                                {/* ── RIGHT: Product Gallery ── */}
                                <div className="grid grid-cols-2 gap-5 md:gap-7">
                                    {section.products.map((p, pIdx) => (
                                        <motion.div
                                            key={p.id}
                                            initial={{ opacity: 0, y: 50 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: false, margin: "-60px" }}
                                            transition={{ duration: 0.9, delay: pIdx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                                            className="group cursor-pointer"
                                            onClick={() => { setSelectedProduct(p); setIsProductOpen(true) }}
                                        >
                                            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl">
                                                <Image
                                                    src={p.img}
                                                    alt={p.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                                                <div className="absolute bottom-5 left-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                                                    <span className="text-white text-[9px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                                                        Ver Detalle
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-3 flex justify-between items-center px-1">
                                                <div>
                                                    <h3 className="text-[10px] font-black uppercase tracking-wider" style={{ color: section.accent }}>{p.name}</h3>
                                                    <p className="text-[10px] mt-0.5 opacity-40" style={{ color: section.accent }}>S/ {p.price}</p>
                                                </div>
                                                <div
                                                    className="w-7 h-7 rounded-full border flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity"
                                                    style={{ borderColor: section.accent }}
                                                >
                                                    <FiArrowRight className="text-xs" style={{ color: section.accent }} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                            </div>
                        </motion.div>

                        {/* Decorative section number */}
                        <motion.span
                            style={{ opacity: contentOpacity, color: section.accent }}
                            className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-[25vw] md:text-[15vw] font-serif opacity-[0.04] select-none pointer-events-none leading-none"
                        >
                            0{idx + 1}
                        </motion.span>
                    </section>
                )
            })}

            {/* --- MODAL DE PRODUCTO --- */}
            <AnimatePresence>
                {isProductOpen && selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-end p-4 md:p-10"
                    >
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsProductOpen(false)} />

                        <motion.div
                            initial={{ x: '100%', rotate: 10 }}
                            animate={{ x: 0, rotate: 0 }}
                            exit={{ x: '100%', rotate: -10 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="relative w-full max-w-xl h-full bg-white rounded-[3rem] shadow-3xl overflow-hidden flex flex-col"
                        >
                            <button onClick={() => setIsProductOpen(false)} className="absolute top-8 right-8 z-10 p-4 rounded-full bg-black/5 hover:bg-black/10 transition-all">
                                <FiX className="text-2xl" />
                            </button>

                            <div className="flex-1 overflow-y-auto p-10 md:p-16 no-scrollbar">
                                <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden mb-10 shadow-xl">
                                    <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-3">Colección Maestra</span>
                                        <h2 className="text-4xl font-serif text-gray-900 leading-none">{selectedProduct.name}</h2>
                                        <p className="text-2xl font-bold mt-3">S/ {selectedProduct.price}</p>
                                    </div>

                                    <p className="text-base text-gray-500 font-light leading-relaxed italic">
                                        &ldquo;{selectedProduct.desc}&rdquo;
                                        <span className="block mt-2 not-italic text-sm">Cada pieza es única, confeccionada con materiales que respetan el ciclo de la vida amazónica.</span>
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 py-6 border-y border-gray-100">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Composición</p>
                                            <p className="text-sm">Algodón Pima / Lino</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Tallas</p>
                                            <div className="flex gap-2">
                                                {['S', 'M', 'L'].map(s => (
                                                    <span key={s} className="w-8 h-8 rounded-lg flex items-center justify-center border text-[10px] font-bold hover:bg-black hover:text-white cursor-pointer transition-colors">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        * Producción limitada. Envío nacional certificado. Packaging 100% libre de plásticos.
                                    </p>
                                </div>
                            </div>

                            <div className="p-8 md:px-16 md:pb-12 bg-white border-t border-gray-50 flex items-center gap-4">
                                <button
                                    onClick={handlePurchase}
                                    className={`flex-1 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-all duration-700 ${added ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-gray-800'}`}
                                >
                                    {added ? <FiCheck /> : <FiShoppingBag />}
                                    {added ? 'Añadido ✓' : 'Adquirir Pieza'}
                                </button>
                                <a
                                    href={`https://wa.me/51928141669?text=Hola,%20busco%20asesoría%20sobre%20${encodeURIComponent(selectedProduct.name)}`}
                                    target="_blank"
                                    className="p-5 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all"
                                >
                                    <FiArrowRight />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- BACK TO TOP --- */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: activeSection > 0 ? 1 : 0 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-black/10 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all hover:bg-black hover:text-white z-40"
            >
                <FiArrowUp />
            </motion.button>
        </div>
    )
}
