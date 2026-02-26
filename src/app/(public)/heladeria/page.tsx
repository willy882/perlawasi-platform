'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { FiLoader, FiChevronRight, FiCheckCircle } from 'react-icons/fi'
import AnimatedIceCreamCharacter from '@/components/AnimatedIceCreamCharacter'

export default function HeladeriaPage() {
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
                .from('heladeria')
                .select('*')
                .order('name', { ascending: true })
            if (error) throw error
            setProducts(data || [])
        } catch (err) {
            console.error('Error fetching ice cream:', err)
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
        if (lower.includes('copa')) return '🍨'
        if (lower.includes('barquillo')) return '🍦'
        if (lower.includes('paleta')) return '🍧'
        if (lower.includes('postre')) return '🍰'
        return '🍦'
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Pink/Red Vibrant */}
            <section className="relative h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-pink-500 via-red-400 to-orange-400">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 text-9xl animate-float">🍦</div>
                    <div className="absolute bottom-20 right-20 text-9xl animate-float" style={{ animationDelay: '1s' }}>🍨</div>
                    <div className="absolute top-1/2 left-1/3 text-7xl animate-float" style={{ animationDelay: '0.5s' }}>🍧</div>
                </div>

                <div className="relative z-20 container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white text-center lg:text-left animate-slide-up">
                            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full mb-6 uppercase tracking-[0.2em]">
                                Felicidad en Cada Bocado
                            </span>
                            <h1 className="text-6xl md:text-8xl font-display font-black mb-6 leading-tight uppercase italic tracking-tighter">
                                Sabores <br /> Vibrantes
                            </h1>
                            <p className="text-2xl text-white/95 mb-10 leading-relaxed font-medium">
                                Heladería artesanal que celebra las frutas amazónicas. Frescura natural en cada cucharada.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                <Link href="#sabores" className="px-10 py-5 bg-white text-pink-600 rounded-2xl text-lg font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                                    Explorar Carta
                                </Link>
                                <a href="https://wa.me/51928141669" className="px-10 py-5 bg-pink-900/30 backdrop-blur-sm text-white border border-white/30 rounded-2xl text-lg font-black uppercase tracking-widest hover:bg-pink-900/50 transition-all">
                                    Pedidos Directos
                                </a>
                            </div>
                        </div>

                        <div className="hidden lg:flex justify-center items-center">
                            <AnimatedIceCreamCharacter />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sabores Destacados */}
            <section id="sabores" className="section bg-white scroll-mt-20">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-pink-600 font-black uppercase tracking-[0.3em] text-[10px]">Naturaleza pura</span>
                        <h2 className="text-5xl md:text-7xl font-display font-black mt-4 mb-8 text-gray-900 tracking-tighter italic">Nuestra Colección</h2>

                        {/* Categories Filter */}
                        <div className="flex flex-wrap justify-center gap-2 mt-10">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-8 py-3 rounded-2xl text-xs font-black transition-all uppercase tracking-widest ${activeCategory === cat
                                            ? 'bg-pink-600 text-white shadow-xl shadow-pink-200 scale-105'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-4">
                            <FiLoader className="text-5xl text-pink-500 animate-spin" />
                            <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-xs">Preparando la frescura...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {filteredProducts.map((item) => (
                                <div key={item.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-soft hover:shadow-strong transition-all duration-700 border border-gray-100/50 flex flex-col h-full">
                                    <div className="relative aspect-[4/5] overflow-hidden flex items-center justify-center bg-gray-50">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className="text-9xl group-hover:scale-125 transition-transform duration-700 select-none">
                                                {getEmoji(item.category || '')}
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="absolute top-6 right-6">
                                            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-pink-600 shadow-xl border border-pink-50">
                                                {item.category}
                                            </span>
                                        </div>
                                        {item.stock <= 5 && item.stock > 0 && (
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                                    Últimos {item.stock}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-10 flex-1 flex flex-col">
                                        <div className="flex-1">
                                            <h3 className="text-3xl font-display font-black mb-4 text-gray-900 group-hover:text-pink-600 transition-colors">{item.name}</h3>
                                            <p className="text-gray-500 mb-8 text-sm leading-relaxed font-medium">
                                                {item.description || "Un sabor único elaborado artesanalmente con la mejor selección de frutos regionales."}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] uppercase font-black text-gray-300 tracking-[0.2em] mb-1">Precio Unitario</span>
                                                <span className="text-3xl font-black text-pink-600 italic">S/ {item.price}</span>
                                            </div>
                                            <Link
                                                href={`https://wa.me/51928141669?text=Hola,%20quiero%20pedir%20el%20helado%20${encodeURIComponent(item.name)}%20frente%20a%20la%20laguna`}
                                                target="_blank"
                                                className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 hover:bg-pink-600 hover:text-white transition-all transform hover:rotate-6 shadow-sm hover:shadow-xl hover:shadow-pink-200"
                                            >
                                                <FiChevronRight className="text-2xl" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && filteredProducts.length === 0 && (
                        <div className="text-center py-32 rounded-[3.5rem] border-2 border-dashed border-gray-100">
                            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">
                                No hay sabores disponibles en esta categoría por ahora.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Combos Especiales - Hardcoded for marketing as they are distinct packages */}
            <section className="section bg-pink-50">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-10 items-center">
                        <div className="bg-gradient-to-br from-pink-600 to-red-500 rounded-[4rem] p-16 text-white text-center md:text-left relative overflow-hidden">
                            <div className="absolute -right-20 -bottom-20 text-[20rem] opacity-10 rotate-12">🍨</div>
                            <div className="relative z-10">
                                <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Promoción Limitada</span>
                                <h2 className="text-5xl font-display font-black mb-6 tracking-tighter italic">Combo Familiar Perlawasi</h2>
                                <p className="text-white/80 text-lg mb-10 max-w-lg font-medium">
                                    Disfruta de la máxima frescura en grupo. Incluye 1L de helado a elección + 4 barquillos artesanales + toppings regionales.
                                </p>
                                <div className="flex items-center gap-6">
                                    <span className="text-5xl font-black italic">S/ 45</span>
                                    <a href="https://wa.me/51928141669?text=Hola,%20quiero%20el%20Combo%20Familiar%20de%20Helados" className="px-10 py-5 bg-white text-pink-600 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all text-sm">
                                        Ordenar Ahora
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[4rem] p-16 border border-pink-100 flex flex-col justify-center">
                            <h3 className="text-4xl font-display font-black mb-8 tracking-tighter italic text-gray-900">¿Por qué artesanal?</h3>
                            <div className="space-y-6">
                                {[
                                    "Sin saborizantes artificiales",
                                    "Frutas 100% orgánicas locales",
                                    "Procesado en pequeños lotes diarias",
                                    "Bajo en azúcar, alto en sabor"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-all">
                                            <FiCheckCircle className="text-xl" />
                                        </div>
                                        <span className="font-black uppercase tracking-widest text-xs text-gray-500">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-32 bg-white">
                <div className="container-custom">
                    <div className="relative rounded-[4rem] overflow-hidden bg-black py-24 px-10 text-center">
                        <div className="absolute inset-0 opacity-40">
                            <img src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Helados" />
                        </div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-6xl md:text-8xl font-display font-black text-white mb-10 tracking-tighter italic uppercase">
                                Vive la <br /> <span className="text-pink-500">Frescura</span>
                            </h2>
                            <Link href="/" className="px-12 py-6 bg-pink-600 text-white rounded-2xl text-xl font-black uppercase tracking-widest hover:bg-white hover:text-pink-600 transition-all shadow-2xl">
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
