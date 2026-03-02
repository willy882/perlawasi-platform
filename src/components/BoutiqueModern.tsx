'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { FiShoppingBag, FiArrowRight, FiX, FiCheck, FiArrowUp } from 'react-icons/fi'
import Image from 'next/image'

// --- DATA ---
const SECTIONS = [
    {
        id: 'basics',
        title: 'SILK & LAND',
        subtitle: 'The Essentials Capsule',
        color: '#F9F7F2',
        accent: '#8B7355',
        products: [
            { id: 'b-1', name: 'Algodón Pima Oversized', price: 85, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80', desc: 'Tejido orgánico de 240g con acabado aterciopelado.' },
            { id: 'b-2', name: 'Polo Lino Sand', price: 95, img: 'https://images.unsplash.com/photo-1583743814966-8936f5b721fa?auto=format&fit=crop&w=1200&q=80', desc: 'Frescura ancestral para el día a día.' }
        ]
    },
    {
        id: 'couture',
        title: 'AMAZON CHIC',
        subtitle: 'The Couture Selection',
        color: '#0A0A0A',
        accent: '#D4AF37',
        products: [
            { id: 'c-1', name: 'Bikini Selva Black', price: 120, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80', desc: 'Lycra reciclada de alta performance.' },
            { id: 'c-2', name: 'Lencería Bamboo', price: 110, img: 'https://images.unsplash.com/photo-1563228026-6d9990928956?auto=format&fit=crop&w=1200&q=80', desc: 'Seda de bambú y encaje galón.' }
        ]
    },
    {
        id: 'objects',
        title: 'ANCESTRAL OBJECTS',
        subtitle: 'Objects of Desire',
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

    // Controlar el cambio de sección basado en el scroll
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
        <div ref={containerRef} className="relative min-h-[300vh] transition-colors duration-1000" style={{ backgroundColor: SECTIONS[activeSection].color }}>

            {/* --- FIXED HEADER --- */}
            <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference p-10 flex justify-between items-center text-white">
                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Boutique Perla · 24</span>
                <nav className="hidden md:flex gap-12 text-[10px] font-bold uppercase tracking-widest">
                    {SECTIONS.map((s, i) => (
                        <button key={s.id} onClick={() => window.scrollTo({ top: window.innerHeight * i * 1, behavior: 'smooth' })} className={activeSection === i ? 'opacity-100' : 'opacity-30'}>
                            {s.id}
                        </button>
                    ))}
                </nav>
            </header>

            {/* --- SECTIONS CONTENT --- */}
            {SECTIONS.map((section, idx) => (
                <section key={section.id} className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <div className="container-custom grid lg:grid-cols-2 gap-24 items-center">

                        {/* TEXT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="space-y-12"
                        >
                            <div className="space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.6em] opacity-40" style={{ color: section.accent }}>{section.subtitle}</span>
                                <h1 className="text-8xl md:text-[12rem] font-serif leading-[0.8] tracking-tighter" style={{ color: section.accent }}>
                                    {section.title.split(' ')[0]} <br />
                                    <span className="italic">{section.title.split(' ')[1] || ''}</span>
                                </h1>
                            </div>

                            <p className="text-xl font-light max-w-md leading-relaxed" style={{ color: section.accent + '99' }}>
                                Una oda a la artesanía local. Cada hilo cuenta una historia de respeto y equilibrio con el corazón de la Amazonía.
                            </p>

                            <div className="flex gap-4">
                                <button className="px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all hover:px-16"
                                    style={{ backgroundColor: section.accent, color: section.color }}>
                                    Descubrir Colección
                                </button>
                            </div>
                        </motion.div>

                        {/* PRODUCT GALLERY FOCUS */}
                        <div className="grid grid-cols-2 gap-10">
                            {section.products.map((p, pIdx) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: pIdx * 0.2 }}
                                    className="group cursor-pointer"
                                    onClick={() => { setSelectedProduct(p); setIsProductOpen(true); }}
                                >
                                    <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-700 group-hover:scale-[0.98]">
                                        <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                        <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                                            <span className="text-white text-[10px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
                                                Ver Pieza
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-end">
                                        <div>
                                            <h3 className="text-xs font-black uppercase tracking-widest" style={{ color: section.accent }}>{p.name}</h3>
                                            <p className="text-[10px] mt-1 opacity-50" style={{ color: section.accent }}>S/ {p.price}</p>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity" style={{ borderColor: section.accent }}>
                                            <FiArrowRight style={{ color: section.accent }} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* DECORATIVE NUMBERS */}
                    <span className="absolute bottom-10 right-10 text-[20vw] font-serif opacity-[0.03] select-none" style={{ color: section.accent }}>
                        0{idx + 1}
                    </span>
                </section>
            ))}

            {/* --- MODAL DE PRODUCTO (FLOW DRAWER) --- */}
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
                            <button onClick={() => setIsProductOpen(false)} className="absolute top-10 right-10 z-10 p-4 rounded-full bg-black/5 hover:bg-black/10 transition-all">
                                <FiX className="text-2xl" />
                            </button>

                            <div className="flex-1 overflow-y-auto p-12 md:p-20 no-scrollbar">
                                <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden mb-12 shadow-xl">
                                    <Image src={selectedProduct.img} alt={selectedProduct.name} fill className="object-cover" />
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 block mb-4">Masterpiece Collection</span>
                                        <h2 className="text-5xl font-serif text-gray-900 leading-none">{selectedProduct.name}</h2>
                                        <p className="text-2xl font-bold mt-4">S/ {selectedProduct.price}</p>
                                    </div>

                                    <p className="text-lg text-gray-500 font-light leading-relaxed italic">
                                        "{selectedProduct.desc}"
                                        Cada pieza es única, confeccionada con materiales que respetan el ciclo de la vida amazónica.
                                    </p>

                                    <div className="grid grid-cols-2 gap-8 py-8 border-y border-gray-100">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Composición</p>
                                            <p className="text-sm">Algodón Pima / Lino</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Tallas</p>
                                            <div className="flex gap-2">
                                                {['S', 'M', 'L'].map(s => <span key={s} className="w-8 h-8 rounded-lg flex items-center justify-center border text-[10px] font-bold">{s}</span>)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            * Producción limitada. Envío nacional certificado. Packaging 100% libre de plásticos.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-12 md:px-20 md:pb-16 bg-white border-t border-gray-50 flex items-center gap-6">
                                <button
                                    onClick={handlePurchase}
                                    className={`flex-1 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 transition-all duration-1000 ${added ? 'bg-green-600 text-white' : 'bg-black text-white hover:bg-primary-600'}`}
                                >
                                    {added ? <FiCheck /> : <FiShoppingBag />}
                                    {added ? 'Añadido' : 'Adquirir Pieza'}
                                </button>
                                <a href={`https://wa.me/51928141669?text=Hola,%20busco%20asesoría%20sobre%20${selectedProduct.name}`} target="_blank" className="p-6 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all">
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
                className="fixed bottom-10 right-10 w-16 h-16 rounded-full mix-blend-difference border border-white/20 text-white flex items-center justify-center transition-all hover:bg-white hover:text-black"
            >
                <FiArrowUp />
            </motion.button>
        </div>
    )
}
