'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { FiLoader, FiSun, FiDroplet, FiCheck, FiChevronRight } from 'react-icons/fi'

type Category = 'interior' | 'exterior' | 'suculentas' | 'aromaticas' | 'ornamentales' | 'huerta'

interface Plant {
    id: string; name: string; scientific: string; price: number; emoji: string
    bg: string; accent: string; difficulty: string; light: string; water: string
    env: string; petFriendly: boolean; category: string;
    info: string; care: string; tags: string[]; image_url?: string;
}

const CATS = [
    { id: 'interior', label: 'Interior', icon: '🪴' },
    { id: 'exterior', label: 'Exterior', icon: '🌳' },
    { id: 'suculentas', label: 'Suculentas', icon: '🌵' },
    { id: 'ornamentales', label: 'Ornamentales', icon: '🌺' },
    { id: 'huerta', label: 'Huerta', icon: '🌿' },
]

export default function PlantasPage() {
    const [activeCategory, setActiveCategory] = useState('Todos')
    const [plants, setPlants] = useState<Plant[]>([])
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
    const [activeTab, setActiveTab] = useState<'info' | 'care'>('info')
    const [loading, setLoading] = useState(true)
    const [qty, setQty] = useState(1)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        fetchLivePlants()
    }, [])

    async function fetchLivePlants() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('plantas')
                .select('*')
                .order('name', { ascending: true })

            if (error) throw error

            if (data) {
                const formatted = data.map(p => ({
                    id: p.id,
                    name: p.name,
                    scientific: p.scientific_name || '',
                    price: Number(p.price),
                    emoji: p.emoji || '🌿',
                    image_url: p.image_url,
                    bg: p.bg || '#f9fff9',
                    accent: p.accent || '#1a3c1a',
                    difficulty: p.difficulty || 'Fácil',
                    light: p.light || 'Media',
                    water: p.water || 'Medio',
                    env: p.env || p.category || 'Interior',
                    petFriendly: p.pet_friendly || false,
                    category: p.category || 'interior',
                    info: p.description || 'Una especie única para tu colección botánica.',
                    care: p.care_instructions || 'Requiere cuidados estándar según su especie.',
                    tags: p.tags || []
                }))
                setPlants(formatted)
                if (formatted.length > 0) setSelectedPlant(formatted[0])
            }
        } catch (e) {
            console.error('Error:', e)
        } finally {
            setLoading(false)
        }
    }

    const categories = ['Todos', ...Array.from(new Set(plants.map(p => p.category)))]
    const filtered = activeCategory === 'Todos' ? plants : plants.filter(p => p.category === activeCategory)

    const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 2000) }

    return (
        <div className="min-h-screen bg-[#fcfdfc] text-neutral-900 font-sans">
            {/* HERO SELECTO */}
            <section className="relative h-[60vh] flex items-center overflow-hidden bg-[#1a3c1a]">
                <div className="absolute inset-0 opacity-40">
                    <Image src="/images/plantas_hero_bg.png" alt="Vivero Perlawasi" fill className="object-cover" priority />
                </div>
                <div className="container-custom relative z-10 text-white">
                    <span className="inline-block px-4 py-2 bg-emerald-500/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-emerald-500/30">
                        Vivero de Autor
                    </span>
                    <h1 className="text-6xl md:text-9xl font-display font-black leading-none tracking-tighter mb-6">
                        NATURA <br /><span className="text-emerald-400">VIVA.</span>
                    </h1>
                    <p className="max-w-xl text-lg text-emerald-50/70 font-medium">
                        Curaduría botánica de especies amazónicas y ornamentales. Llevamos la arquitectura de la selva a tu hogar.
                    </p>
                </div>
            </section>

            {/* CATÁLOGO DINÁMICO */}
            <section className="section">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                        <div>
                            <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px]">Catálogo Completo</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black mt-4 leading-none tracking-tighter">Nuestras <br /><span className="text-neutral-300">Especies</span></h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat: any) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                                        ? 'bg-[#1a3c1a] text-white shadow-xl shadow-emerald-900/20'
                                        : 'bg-white text-neutral-400 border border-neutral-100 hover:bg-neutral-50'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 gap-4">
                            <FiLoader className="text-5xl text-emerald-600 animate-spin" />
                            <p className="text-neutral-400 font-black uppercase tracking-[0.5em] text-xs">Cargando Vivero...</p>
                        </div>
                    ) : filtered.length > 0 ? (
                        <div className="grid lg:grid-cols-12 gap-10">
                            {/* Lista Lateral */}
                            <div className="lg:col-span-4 space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                {filtered.map(plant => (
                                    <button
                                        key={plant.id}
                                        onClick={() => { setSelectedPlant(plant); setQty(1) }}
                                        className={`w-full flex items-center gap-5 p-5 rounded-[2.5rem] transition-all duration-500 text-left border-2 ${selectedPlant?.id === plant.id
                                            ? 'bg-white border-emerald-600 shadow-2xl scale-[1.02]'
                                            : 'bg-transparent border-transparent hover:bg-white hover:border-neutral-100'
                                            }`}
                                    >
                                        <div className="w-20 h-20 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center overflow-hidden border border-emerald-100 shrink-0">
                                            {plant.image_url ? (
                                                <img src={plant.image_url} alt={plant.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-4xl">{plant.emoji}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-black text-neutral-900 uppercase tracking-tight truncate leading-tight">{plant.name}</p>
                                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-1 italic truncate">{plant.scientific}</p>
                                            <p className="text-lg font-black text-neutral-900 mt-2 tracking-tighter">S/ {plant.price}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Detalle Central */}
                            <div className="lg:col-span-8">
                                {selectedPlant && (
                                    <div className="bg-white rounded-[4rem] p-10 md:p-16 border border-neutral-100 shadow-2xl sticky top-10 animate-fade-in">
                                        <div className="grid md:grid-cols-2 gap-12">
                                            {/* Imagen Principal */}
                                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-neutral-50 border border-neutral-100 group">
                                                {selectedPlant.image_url ? (
                                                    <img src={selectedPlant.image_url} alt={selectedPlant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10rem] group-hover:scale-110 transition-transform duration-1000">
                                                        {selectedPlant.emoji}
                                                    </div>
                                                )}
                                                <div className="absolute top-8 left-8">
                                                    <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-800 shadow-xl border border-white">
                                                        {selectedPlant.category}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Datos Técnicos */}
                                            <div className="flex flex-col">
                                                <h3 className="text-5xl font-display font-black text-neutral-900 tracking-tighter leading-none mb-4 uppercase">{selectedPlant.name}</h3>
                                                <p className="text-emerald-600 font-heading font-black italic uppercase tracking-widest text-xs mb-8">{selectedPlant.scientific}</p>

                                                <div className="grid grid-cols-2 gap-4 mb-10">
                                                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                                        <FiSun className="text-emerald-600 mb-2" />
                                                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Luz</p>
                                                        <p className="text-xs font-black text-neutral-800 uppercase">{selectedPlant.light}</p>
                                                    </div>
                                                    <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100">
                                                        <FiDroplet className="text-emerald-600 mb-2" />
                                                        <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Riego</p>
                                                        <p className="text-xs font-black text-neutral-800 uppercase">{selectedPlant.water}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-6 flex-grow">
                                                    <div className="flex gap-4 border-b border-neutral-100">
                                                        <button onClick={() => setActiveTab('info')} className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'info' ? 'text-emerald-700 border-b-2 border-emerald-700' : 'text-neutral-300'}`}>Descripción</button>
                                                        <button onClick={() => setActiveTab('care')} className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'care' ? 'text-emerald-700 border-b-2 border-emerald-700' : 'text-neutral-300'}`}>Cuidados</button>
                                                    </div>
                                                    <p className="text-sm font-medium text-neutral-500 leading-relaxed italic">
                                                        {activeTab === 'info' ? selectedPlant.info : selectedPlant.care}
                                                    </p>
                                                </div>

                                                <div className="mt-10 pt-10 border-t border-neutral-100 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <p className="text-[10px] font-black text-neutral-300 uppercase tracking-widest mb-1">Inversión Especie</p>
                                                        <p className="text-4xl font-black text-neutral-900 tracking-tighter">S/ {selectedPlant.price}</p>
                                                    </div>
                                                    <a
                                                        href={`https://wa.me/51928141669?text=Hola,%20quiero%20consultar%20por%20esta%20especie:%20${encodeURIComponent(selectedPlant.name)}`}
                                                        target="_blank"
                                                        className="px-8 py-5 bg-[#1a3c1a] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-emerald-900/40 hover:bg-black transition-all transform hover:-translate-y-1"
                                                    >
                                                        Consultar Venta
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-40 border-2 border-dashed border-neutral-100 rounded-[4rem]">
                            <p className="text-neutral-300 font-black uppercase tracking-[0.5em] text-xs">Vivero en preparación...</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
