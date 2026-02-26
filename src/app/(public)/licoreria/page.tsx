'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { FiLoader, FiChevronRight, FiCheckCircle } from 'react-icons/fi'

export default function LicoreriaPage() {
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
                .from('licoreria')
                .select('*')
                .order('name', { ascending: true })
            if (error) throw error
            setProducts(data || [])
        } catch (err) {
            console.error('Error fetching spirits:', err)
        } finally {
            setLoading(false)
        }
    }

    const categories = ['Todos', ...Array.from(new Set(products.map(i => i.category).filter(Boolean)))] as string[]
    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(i => i.category === activeCategory)

    const getGradient = (cat: string) => {
        const lower = cat.toLowerCase()
        if (lower.includes('cacao') || lower.includes('macerado')) return 'from-amber-950 via-stone-900 to-black'
        if (lower.includes('destilado') || lower.includes('gin')) return 'from-slate-900 via-blue-950 to-black'
        if (lower.includes('ron') || lower.includes('caña')) return 'from-orange-950 via-red-950 to-black'
        return 'from-stone-900 via-zinc-950 to-black'
    }

    const getAccent = (cat: string) => {
        const lower = cat.toLowerCase()
        if (lower.includes('cacao') || lower.includes('macerado')) return '#D4AF37'
        if (lower.includes('destilado') || lower.includes('gin')) return '#7dd3fc'
        if (lower.includes('ron') || lower.includes('caña')) return '#fb923c'
        return '#D4AF37'
    }

    return (
        <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">
            {/* HER HERO PERSONALIZADO */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#061a06]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/licoreria_hero_bg.png"
                        alt="Fondo Perlamayo"
                        fill
                        className="object-cover opacity-60 scale-105"
                        priority
                        quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#080808]" />
                </div>

                <div className="relative z-20 text-center px-6 max-w-5xl mx-auto animate-fade-in">
                    <div className="mb-6">
                        <span className="block text-sm md:text-base text-white/50 font-black tracking-[0.5em] uppercase mb-6">
                            Licores de la Selva
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-black leading-none tracking-tighter uppercase italic"
                            style={{
                                background: 'linear-gradient(to bottom, #ffffff 0%, #D4AF37 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
                            }}>
                            PERLAMAYO
                        </h1>
                    </div>

                    <p className="text-lg md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-medium italic">
                        "El espíritu indomable de la Amazonía, capturado en gotas de oro líquido."
                    </p>

                    <div className="flex gap-6 justify-center flex-wrap">
                        <Link href="#coleccion"
                            className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-12 py-5 text-sm font-black hover:bg-white transition-all duration-500 rounded-full shadow-[0_10px_40px_rgba(212,175,55,0.3)] uppercase tracking-widest">
                            Explorar Reserva
                        </Link>
                        <a href="https://wa.me/51928141669"
                            className="inline-flex items-center gap-3 border-2 border-white/20 text-white px-12 py-5 text-sm font-black hover:bg-white/10 transition-all rounded-full uppercase tracking-widest backdrop-blur-md">
                            Consultar Sommelier
                        </a>
                    </div>
                </div>
            </section>

            {/* BARRA DE ESTADÍSTICAS */}
            <section className="border-y border-white/5 bg-[#0a0a0a] relative z-30">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                        {[
                            { num: '06', label: 'Meses de Reposo' },
                            { num: '250', label: 'Botellas por Lote' },
                            { num: '100%', label: 'Botánicos Nativos' },
                            { num: '72h', label: 'Maceración Fría' },
                        ].map((stat, i) => (
                            <div key={i} className="py-12 px-8 text-center group hover:bg-white/[0.02] transition-colors">
                                <div className="text-4xl md:text-6xl font-display font-black text-[#D4AF37] mb-2 tracking-tighter italic">{stat.num}</div>
                                <div className="text-white/30 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* COLECCIÓN DE AUTOR */}
            <section id="coleccion" className="py-32 bg-[#080808] scroll-mt-20">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-10">
                        <div className="max-w-2xl">
                            <span className="text-[#D4AF37] font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Tesoro Regional</span>
                            <h2 className="text-5xl md:text-8xl font-display font-black italic tracking-tighter uppercase leading-none">Colección <br /> de Autor</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-full text-[10px] font-black transition-all uppercase tracking-widest border ${activeCategory === cat
                                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-xl shadow-amber-500/10'
                                            : 'bg-transparent text-white/40 border-white/10 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-40 animate-pulse">
                            <FiLoader className="text-6xl text-[#D4AF37] animate-spin mb-6" />
                            <p className="text-white/30 font-black uppercase tracking-[0.5em] text-[10px]">Destilando excelencia...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                            {filteredProducts.map((item) => (
                                <div key={item.id} className="group relative">
                                    <div className="absolute -top-4 -left-4 z-10">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/10 bg-black shadow-2xl backdrop-blur-md text-[#D4AF37]">
                                            {item.category}
                                        </span>
                                    </div>

                                    <div className={`relative aspect-[2/3] bg-gradient-to-b ${getGradient(item.category || '')} rounded-[3rem] border border-white/5 overflow-hidden transition-all duration-700 group-hover:-translate-y-4 group-hover:border-[#D4AF37]/30 shadow-2xl`}>
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-9xl group-hover:rotate-12 transition-transform duration-700">
                                                🥃
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-8 left-8 right-8 text-center">
                                            <span className="text-2xl font-black italic text-white/90">S/ {item.price}</span>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center space-y-2">
                                        <h3 className="text-3xl font-display font-black text-white group-hover:text-[#D4AF37] transition-colors tracking-tighter italic">{item.name}</h3>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: getAccent(item.category || '') }}>40% ABV • 500ML</p>
                                        <p className="text-gray-500 text-xs font-medium leading-relaxed max-w-[200px] mx-auto line-clamp-2">
                                            {item.description || "Un destilado excepcional con notas profundas de la selva alta."}
                                        </p>
                                        <div className="pt-6">
                                            <a href={`https://wa.me/51928141669?text=Hola,%20quiero%20consultar%20por%20el%20licor%20${encodeURIComponent(item.name)}`} className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37] hover:text-white transition-colors border-b border-[#D4AF37]/20 pb-1">
                                                Consultar Reserva <FiChevronRight />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredProducts.length === 0 && (
                        <div className="text-center py-40 border-2 border-dashed border-white/5 rounded-[4rem]">
                            <p className="text-white/20 font-black uppercase tracking-[0.5em] text-[10px]">Cava temporalmente agotada.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* SECCIÓN MÍSTICA (HISTORIA) */}
            <section className="py-24 relative overflow-hidden bg-black">
                <div className="container-custom">
                    <div className="bg-zinc-900/50 rounded-[4rem] p-16 md:p-24 border border-white/5 relative overflow-hidden group">
                        <div className="absolute -right-20 -bottom-20 text-[30rem] opacity-[0.02] -rotate-12 group-hover:scale-110 transition-transform duration-[3s]">🏺</div>

                        <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
                            <div className="space-y-10">
                                <div>
                                    <span className="text-[#D4AF37] font-black uppercase tracking-[0.4em] text-[10px] block mb-6">El Secreto de la Amazonía</span>
                                    <h2 className="text-6xl md:text-[5.5rem] font-display font-black leading-[0.85] italic tracking-tighter uppercase">Maceración <br /> Ancestral</h2>
                                </div>
                                <p className="text-gray-400 text-xl leading-relaxed italic font-medium">
                                    En Perlamayo, no solo destilamos alcohol; extraemos la esencia de las montañas. Cada baya, cada raíz y cada pétalo es procesado bajo la luna para preservar su energía vital.
                                </p>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <h4 className="text-[#D4AF37] font-black uppercase tracking-widest text-xs">Triple Filtro</h4>
                                        <p className="text-gray-500 text-sm font-bold">Pureza cristalina en cada gota.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[#D4AF37] font-black uppercase tracking-widest text-xs">Roble Selva</h4>
                                        <p className="text-gray-500 text-sm font-bold">Añejado bajo temperaturas tropicales.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden rotate-2 group-hover:rotate-0 transition-transform duration-700">
                                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2s]" alt="Alambique" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="py-40 relative">
                <div className="container-custom text-center">
                    <h2 className="text-7xl md:text-[11rem] font-display font-black mb-16 italic tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
                        Noche de <br /> <span className="bg-[#D4AF37] px-8 text-black inline-block -rotate-2">Selección</span>
                    </h2>
                    <div className="flex gap-8 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20reservar%20una%20cata%20de%20licores"
                            className="px-16 py-7 bg-white text-black rounded-full text-xl font-black uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-all shadow-[0_20px_60px_rgba(255,255,255,0.1)]">
                            Reservar Cata Privada ✦
                        </a>
                        <Link href="/"
                            className="px-16 py-7 border-2 border-white/10 text-white rounded-full text-xl font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
