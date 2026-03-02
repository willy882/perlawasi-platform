'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FiMinus, FiPlus, FiShoppingBag, FiInfo, FiDroplet, FiSun, FiMapPin, FiHeart } from 'react-icons/fi'

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

export default function PlantasClient({ initialPlants }: { initialPlants: any[] }) {
    const [selectedPlant, setSelectedPlant] = useState<Plant>(initialPlants[0] || {} as Plant)
    const [qty, setQty] = useState(1)
    const [activeTab, setActiveTab] = useState<'info' | 'care' | 'more'>('info')
    const [added, setAdded] = useState(false)

    if (initialPlants.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-400 italic">No hay plantas disponibles en este momento.</p>
            </div>
        )
    }

    const handleSelectPlant = (plant: Plant) => {
        setSelectedPlant(plant)
        setQty(1)
        setActiveTab('info')
    }

    const handleAddToCart = () => {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    return (
        <div className="min-h-screen bg-[#FBFDFB] text-gray-900 font-sans selection:bg-green-100 italic-none">
            {/* HERO SELECTO */}
            <section className="relative h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-[#f0fdf4] via-[#fdfaf1] to-[#eff6ff]">
                <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] text-[40rem] rotate-12 filter blur-3xl opacity-20">🌿</div>
                    <div className="absolute bottom-[-10%] left-[-10%] text-[30rem] -rotate-12 filter blur-3xl opacity-10">🍃</div>
                </div>

                <div className="container px-6 mx-auto relative z-10">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-green-100 px-6 py-2.5 rounded-full mb-8 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-800">Vivero Boutique Perlawasi</span>
                        </div>
                        <h1 className="text-6xl md:text-[8rem] font-display font-black leading-[0.9] tracking-tighter mb-8 text-gray-900">
                            EL ALMA <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 to-emerald-500">BOTÁNICA</span>
                        </h1>
                        <p className="text-xl text-gray-600/80 max-w-xl leading-relaxed font-light mb-12">
                            Curaduría exclusiva de especies amazónicas cultivadas bajo los ritmos naturales de la selva de San Martín. Pureza, diseño y vida para tu espacio.
                        </p>
                        <div className="flex gap-6 flex-wrap">
                            <Link href="#coleccion" className="bg-green-900 text-white px-12 py-5 rounded-2xl font-bold hover:bg-black transition-all shadow-2xl hover:scale-105 active:scale-95">
                                Ver Colección
                            </Link>
                            <Link href="#guias" className="bg-white/50 backdrop-blur-md border border-green-100 text-green-900 px-12 py-5 rounded-2xl font-bold hover:bg-white transition-all">
                                Guía de Estilo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATALOGO INTERACTIVO */}
            <section id="coleccion" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">

                        {/* Selector Lateral */}
                        <div className="lg:col-span-4 space-y-8">
                            <div>
                                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-2">Portfolio Curado</h2>
                                <p className="text-3xl font-display font-bold">Nuestra Reserva</p>
                            </div>

                            <div className="space-y-3">
                                {initialPlants.map((plant) => (
                                    <button
                                        key={plant.id}
                                        onClick={() => handleSelectPlant(plant)}
                                        className={`w-full group flex items-center gap-6 p-5 rounded-[2rem] transition-all duration-500 text-left border ${selectedPlant.id === plant.id
                                            ? 'bg-white border-green-100 shadow-xl shadow-green-900/5 rotate-1'
                                            : 'border-transparent hover:bg-white/50'
                                            }`}
                                    >
                                        <div className="w-20 h-20 rounded-[1.5rem] bg-gray-50 overflow-hidden flex items-center justify-center text-4xl transition-transform duration-500 group-hover:scale-110 shadow-inner"
                                            style={{ backgroundColor: plant.bgColor }}>
                                            {plant.image_url ? (
                                                <img src={plant.image_url} alt={plant.name} className="w-full h-full object-cover" />
                                            ) : plant.emoji}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-bold transition-colors ${selectedPlant.id === plant.id ? 'text-green-800' : 'text-gray-400'}`}>
                                                {plant.name}
                                            </p>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-gray-300 mt-1">{plant.category}</p>
                                            <p className="text-sm font-bold text-green-600 mt-2">S/ {plant.price}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Visor de Producto ( Mucho Flow ) */}
                        <div className="lg:col-span-8">
                            <div className="bg-white rounded-[4rem] p-8 lg:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-gray-50 overflow-hidden relative">
                                {/* Decoración de fondo */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />

                                <div className="grid md:grid-cols-2 gap-16 relative z-10">
                                    {/* Imagen Focus */}
                                    <div className="flex flex-col gap-6">
                                        <div className="aspect-[3/4] rounded-[3rem] overflow-hidden bg-gray-50 shadow-inner flex items-center justify-center text-[12rem] relative group"
                                            style={{ backgroundColor: selectedPlant.bgColor }}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                                            <span className="group-hover:scale-110 transition-transform duration-1000 transform-gpu">
                                                {selectedPlant.image_url ? (
                                                    <img src={selectedPlant.image_url} alt={selectedPlant.name} className="w-full h-full object-cover" />
                                                ) : selectedPlant.emoji}
                                            </span>

                                            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-4 bg-white/80 backdrop-blur-md rounded-2xl text-green-900 shadow-lg">
                                                    <FiHeart />
                                                </button>
                                                <span className="px-4 py-2 bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-xl">Zoom 1.0x</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            {selectedPlant.thumbnails.map((t, i) => (
                                                <div key={i} className="flex-1 aspect-square bg-gray-50 rounded-2xl flex items-center justify-center text-2xl border border-gray-100 hover:border-green-300 transition-colors cursor-pointer">
                                                    {t.includes('/') ? <img src={t} className="w-full h-full object-cover rounded-2xl" /> : t}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Detalle Flow */}
                                    <div className="flex flex-col h-full">
                                        <div className="mb-10">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-green-600 bg-green-50 px-3 py-1 rounded-lg mb-4 inline-block">
                                                {selectedPlant.difficulty} · Difficulty
                                            </span>
                                            <h3 className="text-4xl font-display font-black tracking-tight mb-2 uppercase">{selectedPlant.name}</h3>
                                            <p className="text-sm italic text-gray-400 font-serif">{selectedPlant.scientific}</p>
                                        </div>

                                        {/* Care Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-10">
                                            <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100">
                                                <FiSun className="text-green-600 mb-3 text-xl" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Exposure</p>
                                                <p className="text-xs font-bold leading-tight">{selectedPlant.light}</p>
                                            </div>
                                            <div className="p-5 rounded-3xl bg-gray-50 border border-gray-100">
                                                <FiDroplet className="text-green-600 mb-3 text-xl" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Hydration</p>
                                                <p className="text-xs font-bold leading-tight">{selectedPlant.water}</p>
                                            </div>
                                        </div>

                                        {/* Tabs Info */}
                                        <div className="flex-1 mb-10">
                                            <div className="flex gap-8 border-b border-gray-100 mb-6">
                                                {(['info', 'care', 'more'] as const).map(tab => (
                                                    <button
                                                        key={tab}
                                                        onClick={() => setActiveTab(tab)}
                                                        className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 -mb-px ${activeTab === tab ? 'text-green-800 border-green-800' : 'text-gray-300 border-transparent hover:text-gray-500'}`}
                                                    >
                                                        {tab}
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed italic-none">
                                                {selectedPlant.tabs[activeTab]}
                                            </p>
                                        </div>

                                        {/* Checkout Row */}
                                        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center gap-6">
                                            <div className="flex items-center gap-6 bg-gray-50 px-6 py-4 rounded-3xl border border-gray-100">
                                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="text-gray-400 hover:text-black"><FiMinus /></button>
                                                <span className="font-bold text-lg w-4 text-center">{qty}</span>
                                                <button onClick={() => setQty(q => q + 1)} className="text-gray-400 hover:text-black"><FiPlus /></button>
                                            </div>

                                            <button
                                                onClick={handleAddToCart}
                                                className={`flex-1 py-5 rounded-3xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl ${added ? 'bg-green-500 text-white animate-bounce' : 'bg-green-900 text-white hover:bg-black shadow-green-900/10'}`}
                                            >
                                                <FiShoppingBag /> {added ? 'Done' : `Añadir · S/ ${selectedPlant.price * qty}`}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURE SECTION - GLASSMORPHISM */}
            <section id="guias" className="py-32 relative bg-black overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-fixed opacity-30 grayscale" />
                <div className="container px-6 mx-auto relative z-10">
                    <div className="max-w-xl mb-24">
                        <span className="text-green-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Care & Philosophy</span>
                        <h2 className="text-5xl md:text-7xl font-display font-black text-white mb-8 leading-[0.9]">EL RITMO DE LA NATURALEZA</h2>
                        <p className="text-white/50 text-xl font-light leading-relaxed">No solo vendemos plantas, entregamos compañeros de vida adaptados a tu entorno.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <FiInfo />, title: 'Adaptabilidad', desc: 'Cada ejemplar pasa por un proceso de aclimatación previo a su entrega.' },
                            { icon: <FiDroplet />, title: 'Nutrición Orgánica', desc: 'Utilizamos sustratos premium enriquecidos con humus de montaña.' },
                            { icon: <FiMapPin />, title: 'Origen Ético', desc: 'Producción sostenible respetando los ciclos de la Amazonía.' },
                        ].map((item, i) => (
                            <div key={i} className="group p-10 rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                                <div className="w-16 h-16 rounded-2xl bg-green-400/20 flex items-center justify-center text-green-400 text-2xl mb-8 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">{item.title}</h4>
                                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA WHATSAPP */}
            <section className="py-32 bg-[#FBFDFB]">
                <div className="container px-6 mx-auto">
                    <div className="bg-gradient-to-br from-[#f0fdf4] to-white rounded-[4rem] p-12 lg:p-32 text-center border border-green-50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,#dcfce7,transparent)] opacity-50" />
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-[6rem] font-display font-black tracking-tighter leading-none mb-12">¿BUSCAS UNA <br /> <span className="text-green-600">ESPECIE RARA?</span></h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-light">Nuestro equipo de botánicos te ayudará a encontrar esa pieza única que falta en tu colección personal.</p>
                            <a href="https://wa.me/51928141669?text=Hola,%20busco%20asesoría%20botánica%20especializada"
                                className="inline-flex items-center gap-4 bg-green-900 text-white px-16 py-6 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-black transition-all hover:scale-105">
                                Hablar con un Botánico <span className="text-xl">🪴</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
