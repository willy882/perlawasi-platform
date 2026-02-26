'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { FiLoader, FiChevronRight, FiCheckCircle } from 'react-icons/fi'

export default function CerveceriaPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState('Todos')

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('cerveceria')
                .select('*')
                .order('name', { ascending: true })
            if (error) throw error
            setProducts(data || [])
        } catch (err) {
            console.error('Error fetching beer:', err)
        } finally {
            setLoading(false)
        }
    }

    const categories = ['Todos', ...Array.from(new Set(products.map(i => i.category).filter(Boolean)))] as string[]
    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(i => i.category === activeCategory)

    const getColor = (cat: string) => {
        const lower = cat.toLowerCase()
        if (lower.includes('gold') || lower.includes('rubia')) return 'from-yellow-400 to-yellow-200'
        if (lower.includes('red') || lower.includes('roja')) return 'from-red-600 to-red-400'
        if (lower.includes('ipa') || lower.includes('amber')) return 'from-amber-600 to-amber-400'
        if (lower.includes('stout') || lower.includes('negra')) return 'from-gray-900 to-gray-700'
        return 'from-amber-500 to-yellow-500'
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Video Background */}
            <section className="relative h-[80vh] flex items-center overflow-hidden bg-[#FFB300]">
                {/* Fondo de Video */}
                <div className="absolute inset-0 z-0 scale-105">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="/videos/hero_cerveceria.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                <div className="relative z-20 container-custom text-white">
                    <div className="max-w-4xl animate-slide-up">
                        <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md text-[#FFB300] text-[10px] font-black rounded-full mb-8 uppercase tracking-[0.3em] border border-white/20">
                            Cebada & Montaña
                        </span>
                        <h1 className="text-7xl md:text-9xl font-display font-black mb-8 leading-none tracking-tighter italic uppercase text-white drop-shadow-2xl">
                            Maestría <br /> <span className="text-[#FFB300]">Líquida</span>
                        </h1>
                        <p className="text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl font-medium">
                            Cervezas artesanales inspiradas en la pureza de la Amazonía. Elaboradas con agua de manantial y lúpulos premium.
                        </p>
                        <div className="flex gap-6 flex-wrap">
                            <Link href="#carta" className="px-12 py-5 bg-[#FFB300] text-black rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-2xl">
                                Explorar Carta
                            </Link>
                            <Link href="/reservar" className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                                Visitar Taproom
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beer Grid */}
            <section id="carta" className="section bg-black text-white scroll-mt-20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#FFB300]/10 blur-[10rem] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />

                <div className="container-custom relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-[#FFB300] font-black uppercase tracking-[0.3em] text-[10px]">Ediciones de Autor</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black mt-4 italic tracking-tighter uppercase">Nuestras Variedades</h2>
                        </div>

                        {/* Categories Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest border ${activeCategory === cat
                                            ? 'bg-[#FFB300] text-black border-[#FFB300] shadow-xl shadow-amber-500/20'
                                            : 'bg-transparent text-gray-500 border-white/20 hover:border-[#FFB300] hover:text-[#FFB300]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 space-y-6">
                            <FiLoader className="text-6xl text-[#FFB300] animate-spin" />
                            <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Enfriando los barriles...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredProducts.map((beer, i) => (
                                <div key={beer.id} className="group bg-white/5 backdrop-blur-sm rounded-[3rem] overflow-hidden border border-white/10 hover:border-[#FFB300]/50 transition-all duration-700 flex flex-col h-full">
                                    <div className="relative aspect-square overflow-hidden flex items-center justify-center bg-zinc-900 border-b border-white/5">
                                        {beer.image_url ? (
                                            <img
                                                src={beer.image_url}
                                                alt={beer.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${getColor(beer.category || '')} flex items-center justify-center text-9xl transition-transform group-hover:scale-110 duration-700 select-none opacity-80`}>
                                                🍺
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-10 left-10">
                                            <span className="px-5 py-2 bg-[#FFB300] text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                                {beer.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-10 flex-1 flex flex-col">
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-3xl font-display font-black group-hover:text-[#FFB300] transition-colors">{beer.name}</h3>
                                                <span className="text-sm font-black text-[#FFB300] bg-[#FFB300]/10 px-3 py-1 rounded-lg">5.5% VOL</span>
                                            </div>
                                            <p className="text-gray-400 mb-8 text-sm leading-relaxed font-medium line-clamp-3">
                                                {beer.description || "Una cerveza con carácter, elaborada con maltas seleccionadas y agua de manantial de las montañas de San Martín."}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-8 border-t border-white/10">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-1">Precio Botella</span>
                                                <span className="text-4xl font-black text-white italic tracking-tighter">S/ {beer.price}</span>
                                            </div>
                                            <a
                                                href={`https://wa.me/51928141669?text=Hola,%20quiero%20pedir%20la%20cerveza%20${encodeURIComponent(beer.name)}`}
                                                target="_blank"
                                                className="w-16 h-16 bg-[#FFB300] rounded-2xl flex items-center justify-center text-black hover:bg-white transition-all transform hover:rotate-6 shadow-xl shadow-amber-500/10"
                                            >
                                                <FiChevronRight className="text-2xl" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredProducts.length === 0 && (
                        <div className="text-center py-40 rounded-[4rem] border-2 border-dashed border-white/10">
                            <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs underline underline-offset-8 decoration-[#FFB300]">
                                Barriles agotados en esta categoría.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Brewing Ritual - Interactive Style */}
            <section className="section bg-[#F9F6F2]">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div>
                                <span className="text-[#FFB300] font-black uppercase tracking-[0.3em] text-[10px]">Taproom Experience</span>
                                <h2 className="text-5xl md:text-6xl font-display font-black text-gray-900 mt-4 leading-[0.9] italic tracking-tighter uppercase font-outline-2">Ritual de <br /> Fermentación</h2>
                                <p className="text-gray-600 text-lg mt-8 leading-relaxed font-medium">
                                    Nuestra cervecería es un santuario donde el tiempo se detiene. Utilizamos agua pura de manantial y procesos de maduración prolongada para garantizar un sabor auténtico y profundo.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { title: "Maduración Lenta", desc: "Mínimo 30 días de guarda.", icon: "⏳" },
                                    { title: "Pureza Total", desc: "Agua de manantial natural.", icon: "💧" }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-white rounded-3xl shadow-soft hover:shadow-xl transition-all border border-gray-100 group">
                                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                                        <h4 className="font-black text-xs uppercase tracking-widest text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-xs text-gray-400 font-bold">{item.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <Link href="/reservar" className="inline-flex items-center gap-4 px-12 py-5 bg-black text-white rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#FFB300] hover:text-black transition-all shadow-xl">
                                Reservar Cata Guiada <FiChevronRight />
                            </Link>
                        </div>

                        <div className="relative h-[700px] rounded-[5rem] overflow-hidden group shadow-2xl">
                            <img src="https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt="Brewing" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                            <div className="absolute bottom-12 left-12 right-12 p-10 bg-white/10 backdrop-blur-md rounded-[3rem] border border-white/20">
                                <p className="text-white text-lg font-black italic tracking-widest uppercase">"La cerveza es la prueba de que la naturaleza nos ama."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-[#FFB300]">
                <div className="container-custom text-center">
                    <h2 className="text-6xl md:text-9xl font-display font-black mb-12 text-black tracking-tighter italic uppercase text-shadow">¿Sed de algo real?</h2>
                    <div className="flex gap-6 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20hacer%20un%20pedido%20de%20pack%20de%20cervezas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-16 py-6 bg-black text-white rounded-2xl text-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                            Pedir Pack Degustación
                        </a>
                        <Link href="/" className="px-16 py-6 bg-white text-black rounded-2xl text-xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
