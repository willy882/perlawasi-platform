'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMinus, FiPlus, FiShoppingBag, FiInfo, FiDroplet, FiSun, FiMapPin, FiHeart, FiX } from 'react-icons/fi'

interface Plant {
    id: string
    name: string
    scientific: string
    price: number
    emoji: string
    bgColor: string
    accentColor: string
    difficulty: string
    light: string
    water: string
    category: string
    image_url?: string
    description?: string
    thumbnails: string[]
    tags: string[]
    tabs: {
        info: string
        care: string
        more: string
    }
}

// Brand colors from Buho logo
const BUHO_GREEN = '#1B4332'
const BUHO_ORANGE = '#F97316'
const BUHO_LIGHT = '#F0FDF4'

export default function PlantasView({ initialPlants }: { initialPlants: any[] }) {
    const [selectedPlant, setSelectedPlant] = useState<Plant>(initialPlants[0] || {} as Plant)
    const [qty, setQty] = useState(1)
    const [activeTab, setActiveTab] = useState<'info' | 'care' | 'more'>('info')
    const [added, setAdded] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState('Todas')

    // Separar por tipos
    const floraPlants = initialPlants.filter(p => !['SUSTRATOS', 'NUTRIENTES', 'SUSTRATO', 'NUTRIENTE'].includes(p.category?.toUpperCase()))
    const accessoryProducts = initialPlants.filter(p => ['SUSTRATOS', 'NUTRIENTES', 'SUSTRATO', 'NUTRIENTE'].includes(p.category?.toUpperCase()))

    // Categorías únicas solo para la sección de Flora
    const categories = ['Todas', ...Array.from(new Set(floraPlants.map(p => p.category).filter(Boolean)))]

    // Plantas filtradas (Flora)
    const filteredFlora = activeCategory === 'Todas'
        ? floraPlants
        : floraPlants.filter(p => p.category === activeCategory)

    if (initialPlants.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: BUHO_LIGHT }}>
                <p className="text-gray-400 italic">No hay plantas disponibles en este momento.</p>
            </div>
        )
    }

    const handleSelectPlant = (plant: Plant) => {
        setSelectedPlant(plant)
        setQty(1)
        setActiveTab('info')
        setModalOpen(true)
    }

    const handleAddToCart = () => {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="min-h-screen text-gray-900 font-sans" style={{ backgroundColor: BUHO_LIGHT }}>

            {/* ══════════ HERO ══════════ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: BUHO_GREEN }}>

                {/* Background image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Naturaleza Amazónica"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${BUHO_GREEN}cc 0%, ${BUHO_GREEN}99 50%, ${BUHO_GREEN} 100%)` }} />
                </div>

                {/* Floating botanical decorations */}
                <motion.div
                    animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-24 right-[8%] text-[14rem] opacity-10 pointer-events-none hidden lg:block"
                >🦋</motion.div>
                <motion.div
                    animate={{ y: [0, 22, 0], rotate: [0, -6, 0] }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-32 left-[6%] text-[10rem] opacity-10 pointer-events-none hidden lg:block"
                >🌿</motion.div>

                {/* Hero Content */}
                <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {/* Buho Logo Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center mb-10"
                        >
                            <div className="relative w-36 h-36 md:w-48 md:h-48 drop-shadow-2xl bg-white rounded-full p-1">
                                <Image
                                    src="/images/buho.png"
                                    alt="Buho Plantas & Mariposas"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>

                        {/* Pill badge */}
                        <div className="inline-flex items-center gap-3 border border-white/20 px-8 py-3 rounded-full mb-10 shadow-lg"
                            style={{ backgroundColor: BUHO_ORANGE + '22', backdropFilter: 'blur(12px)' }}>
                            <span className="w-2.5 h-2.5 rounded-full animate-pulse shadow-lg" style={{ backgroundColor: BUHO_ORANGE }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/90">Plantas & Mariposas · Perlawasi</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-5xl sm:text-7xl md:text-[9rem] font-black leading-[0.85] tracking-tighter mb-8 drop-shadow-2xl">
                            EL ALMA<br />
                            <span className="italic font-serif font-light" style={{ color: BUHO_ORANGE }}>Botánica</span>
                        </h1>

                        <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto font-light leading-relaxed mb-12">
                            Transformamos espacios en oasis vibrantes con especies nativas cultivadas bajo los latidos de la selva virgen peruana.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                            <Link
                                href="#coleccion"
                                className="group flex items-center gap-3 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all hover:scale-105 active:scale-95 shadow-2xl text-white"
                                style={{ backgroundColor: BUHO_ORANGE, boxShadow: `0 20px 40px ${BUHO_ORANGE}44` }}
                            >
                                Explorar Reserva <FiShoppingBag className="text-lg" />
                            </Link>
                            <Link
                                href="#guias"
                                className="px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/20 transition-all border border-white/25 backdrop-blur-md"
                            >
                                Guía de Cuidados
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
                >
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-white/40">Desliza para sentir</span>
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                        className="w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/40 to-white/0"
                    />
                </motion.div>
            </section>

            {/* ══════════ STATS STRIP ══════════ */}
            <section className="border-y" style={{ borderColor: BUHO_ORANGE + '30', backgroundColor: BUHO_GREEN }}>
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: BUHO_ORANGE + '20' }}>
                        {[
                            { num: '80+', label: 'Especies Nativas' },
                            { num: '100%', label: 'Cultivadas en Selva' },
                            { num: '🦋', label: 'Mariposas Incluidas' },
                            { num: '0km', label: 'Distancia al Origen' },
                        ].map((stat, i) => (
                            <div key={i} className="py-8 px-6 text-center group">
                                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: BUHO_ORANGE }}>{stat.num}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CATÁLOGO INTERACTIVO ══════════ */}
            <section id="coleccion" className="py-20 md:py-32 px-4 md:px-6" style={{ backgroundColor: BUHO_LIGHT }}>
                <div className="max-w-7xl mx-auto">

                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="h-px w-12" style={{ backgroundColor: BUHO_ORANGE }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: BUHO_ORANGE }}>Portfolio Curado</span>
                            <div className="h-px w-12" style={{ backgroundColor: BUHO_ORANGE }} />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black leading-tight" style={{ color: BUHO_GREEN }}>Nuestra Reserva</h2>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-2 mt-8">
                            {categories.map((cat: any) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                        ? 'text-white shadow-lg'
                                        : 'bg-white text-gray-400 hover:bg-gray-50 border border-gray-100'
                                        }`}
                                    style={activeCategory === cat ? { backgroundColor: BUHO_ORANGE } : {}}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Plant Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredFlora.map((plant: any, i: number) => (
                            <motion.div
                                key={plant.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-60px" }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                                onClick={() => handleSelectPlant(plant)}
                                className="group cursor-pointer"
                            >
                                <div
                                    className="relative rounded-3xl overflow-hidden shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2"
                                    style={{ backgroundColor: plant.bgColor || '#d1fae5' }}
                                >
                                    {/* Plant Image */}
                                    <div className="aspect-[4/3] flex items-center justify-center text-[6rem] relative overflow-hidden">
                                        {plant.image_url ? (
                                            <img src={plant.image_url} alt={plant.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="group-hover:scale-110 transition-transform duration-500">{plant.emoji}</span>
                                        )}
                                        {/* Hover overlay */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
                                            style={{ backgroundColor: BUHO_GREEN + 'cc' }}
                                        >
                                            <span className="text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full border border-white/30">Ver Detalle</span>
                                        </div>
                                    </div>

                                    {/* Card footer */}
                                    <div className="p-5 bg-white">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h3 className="font-black text-base" style={{ color: BUHO_GREEN }}>{plant.name}</h3>
                                                <p className="text-[10px] italic text-gray-400 mt-0.5">{plant.scientific || plant.category}</p>
                                            </div>
                                            <span className="font-black text-sm mt-0.5" style={{ color: BUHO_ORANGE }}>S/ {plant.price}</span>
                                        </div>
                                        <div className="mt-3 flex gap-2">
                                            {plant.tags?.slice(0, 2).map((tag: string, ti: number) => (
                                                <span key={ti} className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full"
                                                    style={{ backgroundColor: BUHO_ORANGE + '15', color: BUHO_ORANGE }}>
                                                    {tag}
                                                </span>
                                            ))}
                                         </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ══════════ SECCIÓN SUSTRATOS (Dynamic) ══════════ */}
                    {accessoryProducts.length > 0 && (
                        <div className="mt-40">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-12" style={{ backgroundColor: BUHO_ORANGE }} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: BUHO_ORANGE }}>Especializados</span>
                                    <div className="h-px w-12" style={{ backgroundColor: BUHO_ORANGE }} />
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: BUHO_GREEN }}>Suelo & Nutrición</h2>
                                <p className="text-gray-400 mt-4 text-sm max-w-lg mx-auto italic font-medium">Sustratos y abonos orgánicos diseñados para potenciar el crecimiento de tus especies.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {accessoryProducts.map((sub, si) => (
                                    <motion.div
                                        key={sub.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        onClick={() => handleSelectPlant(sub)}
                                        className="bg-white rounded-[2.5rem] p-8 border border-gray-100 hover:shadow-2xl transition-all cursor-pointer group"
                                    >
                                        <div className="aspect-square flex items-center justify-center text-6xl mb-6 bg-gray-50 rounded-3xl group-hover:bg-emerald-50 transition-colors">
                                            {sub.image_url ? (
                                                <img src={sub.image_url} alt={sub.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="drop-shadow-lg">{sub.emoji || '🟤'}</span>
                                            )}
                                        </div>
                                        <div className="text-center">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{sub.category}</span>
                                            <h4 className="font-bold text-lg mt-3 text-gray-900">{sub.name}</h4>
                                            <div className="mt-4 font-black text-xl text-orange-500">S/ {sub.price}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* ══════════ FEATURE SECTION ══════════ */}
            <section id="guias" className="py-20 md:py-32 relative overflow-hidden" style={{ backgroundColor: BUHO_GREEN }}>
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                        alt="bg"
                        fill
                        className="object-cover grayscale"
                    />
                </div>
                <div className="container px-6 mx-auto relative z-10">
                    <div className="max-w-xl mb-16">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4 block" style={{ color: BUHO_ORANGE }}>Filosofía & Cuidados</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">EL RITMO DE LA NATURALEZA</h2>
                        <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
                            No solo vendemos plantas — entregamos compañeros de vida adaptados a tu entorno.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: <FiInfo />, title: 'Adaptabilidad', desc: 'Cada ejemplar pasa por un proceso de aclimatación previo a su entrega.' },
                            { icon: <FiDroplet />, title: 'Nutrición Orgánica', desc: 'Utilizamos sustratos premium enriquecidos con humus de montaña.' },
                            { icon: <FiMapPin />, title: 'Origen Ético', desc: 'Producción sostenible respetando los ciclos de la Amazonía peruana.' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="group p-8 md:p-10 rounded-3xl border transition-all duration-500 hover:scale-[1.02]"
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: BUHO_ORANGE + '25', backdropFilter: 'blur(16px)' }}
                            >
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: BUHO_ORANGE + '20', color: BUHO_ORANGE }}>
                                    {item.icon}
                                </div>
                                <h4 className="text-lg font-black text-white mb-3 uppercase tracking-tight">{item.title}</h4>
                                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════ CTA WHATSAPP ══════════ */}
            <section className="py-20 md:py-32" style={{ backgroundColor: BUHO_LIGHT }}>
                <div className="container px-6 mx-auto">
                    <div className="rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden"
                        style={{ backgroundColor: BUHO_GREEN }}>
                        {/* Orange glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-20"
                            style={{ backgroundColor: BUHO_ORANGE }} />

                        <div className="relative z-10">
                            {/* Buho mini logo */}
                            <div className="flex justify-center mb-8">
                                <div className="relative w-24 h-24 bg-white rounded-full p-1 shadow-xl">
                                    <Image src="/images/buho.png" alt="Buho" fill className="object-contain" />
                                </div>
                            </div>

                            <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                                ¿BUSCAS UNA <br />
                                <span style={{ color: BUHO_ORANGE }}>ESPECIE RARA?</span>
                            </h2>
                            <p className="text-lg text-white/50 max-w-2xl mx-auto mb-10 font-light px-4">
                                Nuestro equipo de botánicos te ayudará a encontrar esa pieza única que falta en tu colección.
                            </p>
                            <a
                                href="https://wa.me/51928141669?text=Hola,%20busco%20asesoría%20botánica%20especializada"
                                className="inline-flex items-center gap-4 px-10 py-5 md:px-14 md:py-6 rounded-2xl font-black uppercase tracking-widest text-[11px] text-white transition-all hover:scale-105 active:scale-95 shadow-2xl"
                                style={{ backgroundColor: BUHO_ORANGE, boxShadow: `0 20px 50px ${BUHO_ORANGE}44` }}
                            >
                                Hablar con un Botánico 🦉
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════ PRODUCT MODAL ══════════ */}
            <AnimatePresence>
                {modalOpen && selectedPlant && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 md:p-10"
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />

                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: "spring", damping: 26 }}
                            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/5 hover:bg-black/10 transition-all"
                            >
                                <FiX className="text-xl" />
                            </button>

                            <div className="flex-1 overflow-y-auto">
                                {/* Image */}
                                <div className="aspect-[16/9] relative flex items-center justify-center text-[9rem]"
                                    style={{ backgroundColor: selectedPlant.bgColor || '#d1fae5' }}>
                                    {selectedPlant.image_url ? (
                                        <img src={selectedPlant.image_url} alt={selectedPlant.name} className="w-full h-full object-cover" />
                                    ) : (
                                        selectedPlant.emoji
                                    )}
                                </div>

                                <div className="p-8 md:p-12 space-y-6">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 block" style={{ color: BUHO_ORANGE }}>
                                            {selectedPlant.difficulty} · {selectedPlant.category}
                                        </span>
                                        <h3 className="text-3xl md:text-4xl font-black" style={{ color: BUHO_GREEN }}>{selectedPlant.name}</h3>
                                        <p className="text-sm italic text-gray-400 mt-1">{selectedPlant.scientific}</p>
                                    </div>

                                    {/* Care grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl" style={{ backgroundColor: BUHO_GREEN + '08' }}>
                                            <FiSun className="mb-2 text-lg" style={{ color: BUHO_ORANGE }} />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Exposición</p>
                                            <p className="text-xs font-bold">{selectedPlant.light}</p>
                                        </div>
                                        <div className="p-4 rounded-2xl" style={{ backgroundColor: BUHO_GREEN + '08' }}>
                                            <FiDroplet className="mb-2 text-lg" style={{ color: BUHO_ORANGE }} />
                                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hidratación</p>
                                            <p className="text-xs font-bold">{selectedPlant.water}</p>
                                        </div>
                                    </div>

                                    {/* Tabs */}
                                    <div>
                                        <div className="flex gap-6 border-b border-gray-100 mb-4">
                                            {(['info', 'care', 'more'] as const).map(tab => (
                                                <button
                                                    key={tab}
                                                    onClick={() => setActiveTab(tab)}
                                                    className={`pb-3 text-[10px] font-black uppercase tracking-widest border-b-2 -mb-px transition-all ${activeTab === tab ? 'border-current' : 'text-gray-300 border-transparent'}`}
                                                    style={activeTab === tab ? { color: BUHO_GREEN, borderColor: BUHO_ORANGE } : {}}
                                                >
                                                    {tab === 'info' ? 'Info' : tab === 'care' ? 'Cuidados' : 'Más'}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed">{selectedPlant.tabs?.[activeTab]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 md:px-12 md:pb-10 bg-white border-t border-gray-50 flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex items-center gap-4 rounded-2xl px-5 py-3 border border-gray-100 w-full sm:w-auto justify-between sm:justify-center">
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2 text-gray-400 hover:text-black"><FiMinus /></button>
                                    <span className="font-black text-lg w-5 text-center">{qty}</span>
                                    <button onClick={() => setQty(q => q + 1)} className="p-2 text-gray-400 hover:text-black"><FiPlus /></button>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full sm:flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all shadow-lg text-white"
                                    style={{ backgroundColor: added ? '#16a34a' : BUHO_GREEN }}
                                >
                                    <FiShoppingBag />
                                    {added ? 'Añadido ✓' : `Añadir · S/ ${selectedPlant.price * qty}`}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
