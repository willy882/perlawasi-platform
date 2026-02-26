'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { FiLoader, FiChevronRight, FiShoppingBag } from 'react-icons/fi'


export default function RestaurantePage() {
    const [menu, setMenu] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('Todos')

    useEffect(() => {
        fetchMenu()
    }, [])

    async function fetchMenu() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('restaurante_menu')
                .select('*')
                .eq('available', true)
                .order('category', { ascending: true })
            if (error) throw error
            setMenu(data || [])
        } catch (err) {
            console.error('Error fetching menu:', err)
        } finally {
            setLoading(false)
        }
    }

    const categories = ['Todos', ...Array.from(new Set(menu.map(i => i.category).filter(Boolean)))] as string[]
    const filteredMenu = activeCategory === 'Todos'
        ? menu
        : menu.filter(i => i.category === activeCategory)

    const getEmoji = (cat: string) => {
        const lower = cat.toLowerCase()
        if (lower.includes('pescado')) return '🐟'
        if (lower.includes('pollo')) return '🍗'
        if (lower.includes('cerdo') || lower.includes('carne')) return '🥩'
        if (lower.includes('bebida')) return '🍹'
        if (lower.includes('extra') || lower.includes('entrada')) return '🥗'
        if (lower.includes('especial')) return '🌟'
        if (lower.includes('postre')) return '🍰'
        return '🥘'
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero_restaurante_v2.png"
                        alt="Gastronomía Perlawasi"
                        fill
                        className="object-cover scale-105"
                        priority
                        quality={100}
                    />
                </div>

                <div className="relative z-20 container-custom text-white">
                    <div className="max-w-3xl animate-slide-up">
                        <span className="inline-block px-4 py-2 bg-[#d4af37] text-white text-xs font-black rounded-full mb-6 uppercase tracking-[0.2em] shadow-lg shadow-black/20">
                            Kilómetro Cero
                        </span>
                        <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-none tracking-tighter">
                            Sabores <br /><span className="text-[#d4af37]">Ancestrales</span>
                        </h1>
                        <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-2xl font-medium">
                            Celebramos la biodiversidad de San Martín con ingredientes frescos de nuestra propia huerta orgánica. Cada plato es un tributo a nuestra tierra.
                        </p>
                        <div className="flex gap-6 flex-wrap">
                            <Link href="#menu" className="px-10 py-5 bg-[#1a3c1a] text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-emerald-900/20">
                                Explorar Menú
                            </Link>
                            <Link href="#reservar" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/20 hover:bg-white/20 rounded-full font-black uppercase tracking-widest text-xs transition-all">
                                Reservar Mesa
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menú Dinámico con Slide de Categorías */}
            <section id="menu" className="section bg-white scroll-mt-20">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
                        <div className="shrink-0">
                            <span className="text-[#1a3c1a] font-black uppercase tracking-[0.3em] text-[10px]">Experiencia Culinaria</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black mt-4 leading-none tracking-tighter">Nuestra <span className="text-gray-300">Carta</span></h2>
                        </div>

                        {/* DESLIZADOR DE CATEGORÍAS (Slide) */}
                        <div className="w-full overflow-x-auto no-scrollbar pb-2">
                            <div className="flex flex-nowrap gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${activeCategory === cat
                                            ? 'bg-[#1a3c1a] text-white shadow-xl shadow-emerald-900/20'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 space-y-6">
                            <FiLoader className="text-5xl text-emerald-600 animate-spin" />
                            <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-xs animate-pulse">Cosechando ingredientes...</p>
                        </div>
                    ) : filteredMenu.length > 0 ? (
                        <div className="grid md:grid-cols-3 gap-10 animate-fade-in px-4">
                            {filteredMenu.map((item) => (
                                <div key={item.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-soft hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-700 border border-gray-100 flex flex-col h-full">
                                    <div className="relative aspect-[5/4] overflow-hidden bg-gray-50 flex items-center justify-center">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                                onError={(e) => { (e.target as any).src = "https://via.placeholder.com/400x300?text=Imagen+No+Disponible"; }}
                                            />
                                        ) : (
                                            <div className="text-8xl group-hover:scale-125 transition-transform duration-700 select-none grayscale group-hover:grayscale-0">
                                                {getEmoji(item.category)}
                                            </div>
                                        )}
                                        <div className="absolute top-6 right-6 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                            <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-[#1a3c1a] shadow-xl">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-3xl font-display font-black text-gray-900 leading-tight group-hover:text-emerald-800 transition-colors uppercase tracking-tight">{item.name}</h3>
                                        </div>
                                        <p className="text-gray-500 mb-8 text-sm leading-relaxed font-medium line-clamp-3">
                                            {item.description || "Un sabor auténtico seleccionado especialmente de nuestra huerta orgánica directamente para tu paladar."}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-black text-gray-300 tracking-[0.2em] mb-1">Precio</span>
                                                <span className="text-3xl font-black text-gray-900 tracking-tighter">S/ {item.price}</span>
                                            </div>
                                            <Link
                                                href={`https://wa.me/51928141669?text=Hola,%20quiero%20ordenar%20${encodeURIComponent(item.name)}%20del%20Restaurante%20Perlawasi`}
                                                target="_blank"
                                                className="flex items-center gap-3 px-6 py-4 bg-emerald-50 text-emerald-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1"
                                            >
                                                <FiShoppingBag className="text-sm" /> Ordenar
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 rounded-[3rem] border-2 border-dashed border-gray-100">
                            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">Aún no hay platos en esta categoría.</p>
                            <p className="text-gray-300 text-sm mt-4 font-medium italic">Estamos preparando algo especial para ti.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
