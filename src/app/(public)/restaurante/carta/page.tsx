'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { FiMinus, FiPlus, FiShoppingCart, FiArrowLeft, FiImage } from 'react-icons/fi'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface MenuItem {
    id: string
    name: string
    category: string
    price: number
    description: string
    image_url: string
}

export default function CartaVirtual() {
    const [dishes, setDishes] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState<{ item: MenuItem, quantity: number }[]>([])
    const [activeCategory, setActiveCategory] = useState<string>('Todos')
    const [categories, setCategories] = useState<string[]>([])

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
                .order('category')
                .order('name')

            if (error) throw error

            const fetchedDishes = data || []
            setDishes(fetchedDishes)

            // Extract distinct categories
            const cats = Array.from(new Set(fetchedDishes.map((d: any) => d.category)))
            setCategories(['Todos', ...cats])
        } catch (error: any) {
            toast.error('Error al cargar la carta: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const addToCart = (item: MenuItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.item.id === item.id)
            if (existing) {
                return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, { item, quantity: 1 }]
        })
        toast.success(`Agregado: ${item.name}`, { duration: 1500, icon: '🛒' })
    }

    const removeFromCart = (id: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.item.id === id)
            if (existing && existing.quantity > 1) {
                return prev.map(i => i.item.id === id ? { ...i, quantity: i.quantity - 1 } : i)
            }
            return prev.filter(i => i.item.id !== id)
        })
    }

    const getQuantity = (id: string) => {
        return cart.find(i => i.item.id === id)?.quantity || 0
    }

    const totalCart = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0)
    const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0)

    const sendOrderWhatsApp = () => {
        if (cart.length === 0) return

        let text = `Hola Perlawasi, me gustaría realizar un pedido de la carta:\n\n`
        cart.forEach(c => {
            text += `- ${c.quantity}x ${c.item.name} (S/ ${c.item.price * c.quantity})\n`
        })
        text += `\n*TOTAL: S/ ${totalCart.toFixed(2)}*\n\nPor favor, confirmen mi pedido.`

        const wpUrl = `https://wa.me/51928141669?text=${encodeURIComponent(text)}`
        window.open(wpUrl, '_blank')
    }

    const filteredDishes = activeCategory === 'Todos' ? dishes : dishes.filter(d => d.category === activeCategory)

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Cabecera */}
            <div className="bg-emerald-600 text-white sticky top-0 z-40 shadow-md">
                <div className="container px-4 mx-auto py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/restaurante" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <FiArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold font-display uppercase tracking-widest leading-none">Carta Virtual</h1>
                            <p className="text-xs text-emerald-100 font-medium tracking-widest uppercase mt-1">Restaurante Perlawasi</p>
                        </div>
                    </div>
                </div>

                {/* Categories */}
                {!loading && categories.length > 0 && (
                    <div className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-2 bg-emerald-700/50 shadow-inner">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeCategory === cat
                                        ? 'bg-white text-emerald-700 shadow-md'
                                        : 'bg-emerald-600/50 text-emerald-50 hover:bg-emerald-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="container px-4 mx-auto py-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
                        <div className="animate-spin text-4xl mb-4">🍽️</div>
                        <p className="font-bold uppercase tracking-widest text-sm animate-pulse">Cargando delicias...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDishes.map((dish) => (
                            <div key={dish.id} className="bg-white rounded-[2rem] overflow-hidden shadow-soft flex flex-col group border border-gray-100">
                                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden flex items-center justify-center">
                                    {dish.image_url ? (
                                        <img src={dish.image_url} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="text-6xl text-gray-300 group-hover:scale-110 transition-transform duration-500"><FiImage /></div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2 gap-4">
                                        <h3 className="text-xl font-bold font-display text-gray-900 leading-tight">{dish.name}</h3>
                                        <span className="text-xl font-bold text-emerald-500 whitespace-nowrap">S/ {dish.price}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-6 flex-grow">{dish.description}</p>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                        {getQuantity(dish.id) > 0 ? (
                                            <div className="flex items-center gap-4 bg-emerald-50 rounded-full px-4 py-2 w-full justify-between">
                                                <button onClick={() => removeFromCart(dish.id)} className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm hover:bg-emerald-100 transition-colors">
                                                    <FiMinus />
                                                </button>
                                                <span className="font-bold text-lg text-emerald-800">{getQuantity(dish.id)}</span>
                                                <button onClick={() => addToCart(dish)} className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm hover:bg-emerald-700 transition-colors">
                                                    <FiPlus />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => addToCart(dish)}
                                                className="w-full bg-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg"
                                            >
                                                Agregar al Pedido
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Floating Cart */}
            {cartCount > 0 && (
                <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 animate-slide-up">
                    <div className="bg-gray-900 text-white rounded-full p-2 pl-6 pr-2 shadow-2xl flex items-center gap-6 max-w-md w-full border border-gray-800">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{cartCount} {cartCount === 1 ? 'producto' : 'productos'}</span>
                            <span className="font-bold text-lg">S/ {totalCart.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={sendOrderWhatsApp}
                            className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex-grow flex justify-center items-center gap-2 transition-colors ml-auto"
                        >
                            <FiShoppingCart /> Pedir por WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
