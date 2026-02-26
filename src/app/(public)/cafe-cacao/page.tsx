'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { FiLoader, FiChevronRight, FiCheckCircle } from 'react-icons/fi'

export default function CafeCacaoPage() {
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
                .from('cafe_cacao')
                .select('*')
                .order('name', { ascending: true })
            if (error) throw error
            setProducts(data || [])
        } catch (err) {
            console.error('Error fetching coffee & cacao:', err)
        } finally {
            setLoading(false)
        }
    }

    const categories = ['Todos', ...Array.from(new Set(products.map(i => i.category).filter(Boolean)))] as string[]
    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(i => i.category === activeCategory)

    const getEmoji = (cat: string) => {
        const lower = cat.toLowerCase()
        if (lower.includes('cafe') || lower.includes('café')) return '☕'
        if (lower.includes('cacao') || lower.includes('chocolate')) return '🍫'
        if (lower.includes('ritual') || lower.includes('caja')) return '🎁'
        return '🤎'
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dark Premium */}
            <section className="relative h-[80vh] flex items-center overflow-hidden bg-[#2A1A18]">
                {/* Fondo de Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover opacity-60 contrast-[1.1] brightness-[0.8]"
                    >
                        <source src="/videos/hero_cafe_cacao.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a100f] via-transparent to-black/40" />
                </div>

                <div className="relative z-20 container-custom text-white">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <span className="inline-block px-6 py-2 bg-[#8B4513] text-white text-[10px] font-black rounded-full mb-8 uppercase tracking-[0.3em] shadow-xl">
                            Herencia & Aroma
                        </span>
                        <h1 className="text-7xl md:text-9xl font-display font-black mb-8 leading-none italic uppercase tracking-tighter">
                            Café & <span className="text-[#D2691E]">Cacao</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto font-medium italic">
                            "Dos tesoros peruanos unidos en una experiencia sensorial que honra la tierra y el tiempo."
                        </p>
                        <div className="flex gap-6 justify-center flex-wrap">
                            <Link href="#productos" className="px-12 py-5 bg-white text-black rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-[#D2691E] hover:text-white transition-all shadow-2xl">
                                Explorar Colección
                            </Link>
                            <Link href="#degustacion" className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-white/20 transition-all">
                                Reservar Degustación
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dual Origin Story */}
            <section className="section bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D2691E]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="container-custom relative z-10">
                    <div className="grid md:grid-cols-2 gap-20">
                        {/* Café */}
                        <div className="space-y-8 group">
                            <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-500">☕</div>
                            <h2 className="text-5xl font-display font-black italic uppercase tracking-tighter decoration-[#8B4513] underline underline-offset-8">Café de Altura</h2>
                            <p className="text-gray-600 text-xl leading-relaxed font-medium">
                                Granos cultivados a más de 1,500 metros en las montañas de San Martín. Cada taza cuenta la historia de un suelo volcánico y un clima místico.
                            </p>
                            <div className="space-y-4 pt-4">
                                {['Tostado artesanal lento', 'Notas frutales y achocolatadas', 'Comercio justo directo'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <FiCheckCircle className="text-[#8B4513] text-xl" />
                                        <span className="text-gray-800 font-bold uppercase tracking-widest text-xs">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cacao */}
                        <div className="space-y-8 group">
                            <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-500">🍫</div>
                            <h2 className="text-5xl font-display font-black italic uppercase tracking-tighter decoration-[#D2691E] underline underline-offset-8">Cacao Ancestral</h2>
                            <p className="text-gray-600 text-xl leading-relaxed font-medium">
                                Cacao fino de aroma transformado bajo la filosofía "Bean-to-Bar". Preservamos la pureza del grano para ofrecer un chocolate verdaderamente medicinal.
                            </p>
                            <div className="space-y-4 pt-4">
                                {['100% Origen San Martín', 'Procesado a baja temperatura', 'Sin conservantes químicos'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <FiCheckCircle className="text-[#D2691E] text-xl" />
                                        <span className="text-gray-800 font-bold uppercase tracking-widest text-xs">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dynamic Products Grid */}
            <section id="productos" className="section bg-[#F9F6F2] scroll-mt-20">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-[#8B4513] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Tesoria de la Tierra</span>
                            <h2 className="text-5xl md:text-7xl font-display font-black italic tracking-tighter uppercase leading-none">Nuestra Selección</h2>
                        </div>

                        {/* Categories Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-2xl text-[10px] font-black transition-all uppercase tracking-widest border ${activeCategory === cat
                                            ? 'bg-[#8B4513] text-white border-[#8B4513] shadow-xl shadow-amber-900/20'
                                            : 'bg-transparent text-gray-500 border-gray-200 hover:border-[#8B4513] hover:text-[#8B4513]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 space-y-6">
                            <FiLoader className="text-6xl text-[#8B4513] animate-spin" />
                            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Tostando los granos...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredProducts.map((item) => (
                                <div key={item.id} className="group bg-white rounded-[3.5rem] overflow-hidden shadow-soft hover:shadow-strong transition-all duration-700 flex flex-col h-full border border-gray-50">
                                    <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center bg-gray-50">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className="text-[10rem] transition-transform group-hover:scale-110 duration-700 select-none">
                                                {getEmoji(item.category || '')}
                                            </div>
                                        )}
                                        <div className="absolute top-8 right-8">
                                            <span className="px-5 py-2 bg-[#8B4513]/90 backdrop-blur-md text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-12 flex-1 flex flex-col">
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-display font-black group-hover:text-[#D2691E] transition-colors mb-4 italic tracking-tighter uppercase">{item.name}</h3>
                                            <p className="text-gray-500 mb-8 text-sm leading-relaxed font-medium line-clamp-3">
                                                {item.description || "Un producto premium que refleja la esencia del territorio, procesado artesanalmente para preservar cada matiz de sabor."}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-8 border-t border-gray-100">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] mb-1">Precio</span>
                                                <span className="text-3xl font-black text-[#8B4513] italic tracking-tighter">S/ {item.price}</span>
                                            </div>
                                            <a
                                                href={`https://wa.me/51928141669?text=Hola,%20quiero%20ordenar%20el%20producto%20${encodeURIComponent(item.name)}`}
                                                target="_blank"
                                                className="w-16 h-16 bg-[#8B4513] rounded-3xl flex items-center justify-center text-white hover:bg-black transition-all transform hover:rotate-6 shadow-xl"
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
                        <div className="text-center py-40 bg-white rounded-[4rem] border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 font-black uppercase tracking-[0.5em] text-xs">Agotado temporalmente en esta categoría.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Degustación Guiada */}
            <section id="degustacion" className="section bg-[#1a0f0e] text-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <div>
                                <span className="text-[#D2691E] font-black uppercase tracking-[0.3em] text-[10px]">Cultura & Sabor</span>
                                <h2 className="text-5xl md:text-7xl font-display font-black mt-4 italic tracking-tighter uppercase font-outline-2 leading-none">El Despertar <br /> de los Sentidos</h2>
                                <p className="text-white/70 text-xl mt-8 leading-relaxed font-medium italic">
                                    No solo servimos café; educamos paladares. Nuestra degustación gratuita es un viaje que te lleva desde la semilla hasta el alma del producto.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { title: "Maridaje", desc: "Café + Chocolate", icon: "💎" },
                                    { title: "Técnica", desc: "Métodos de extracción", icon: "⚗️" }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 group hover:bg-white/10 transition-all">
                                        <div className="text-4xl mb-4 opacity-50">{item.icon}</div>
                                        <h4 className="font-black text-xs uppercase tracking-widest text-[#D2691E] mb-2">{item.title}</h4>
                                        <p className="text-xs text-white/50 font-bold">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[600px] rounded-[5rem] overflow-hidden group shadow-[0_0_100px_rgba(210,105,30,0.1)]">
                            <img src="https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=2064&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt="Tostado" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f0e] via-transparent to-transparent opacity-60" />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-[#D2691E]">
                <div className="container-custom text-center text-white">
                    <h2 className="text-5xl md:text-9xl font-display font-black mb-12 italic tracking-tighter uppercase leading-none text-shadow">Descubre la <br /> Herencia</h2>
                    <div className="flex gap-6 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20hacer%20un%20pedido%20de%20café%20y%20cacao"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-16 py-6 bg-black text-white rounded-2xl text-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
                            Contactar por WhatsApp
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
