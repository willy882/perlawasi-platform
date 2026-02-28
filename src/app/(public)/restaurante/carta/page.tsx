'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { FiMinus, FiPlus, FiShoppingCart, FiArrowLeft, FiImage, FiX, FiTrash2, FiSend } from 'react-icons/fi'
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
    const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([])
    const [activeCategory, setActiveCategory] = useState<string>('Todos')
    const [categories, setCategories] = useState<string[]>([])
    const [showCartPanel, setShowCartPanel] = useState(false)

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
                return prev.map(i =>
                    i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, { item, quantity: 1 }]
        })
        toast.success(`Agregado: ${item.name}`, { duration: 1500, icon: '🛒' })
    }

    const removeFromCart = (id: string) => {
        setCart(prev => {
            const existing = prev.find(i => i.item.id === id)
            if (existing && existing.quantity > 1) {
                return prev.map(i =>
                    i.item.id === id ? { ...i, quantity: i.quantity - 1 } : i
                )
            }
            return prev.filter(i => i.item.id !== id)
        })
    }

    const deleteFromCart = (id: string) => {
        setCart(prev => prev.filter(i => i.item.id !== id))
        toast('Plato eliminado del pedido', { icon: '🗑️', duration: 1500 })
    }

    const clearCart = () => {
        setCart([])
        setShowCartPanel(false)
        toast('Pedido vaciado', { icon: '🧹', duration: 1500 })
    }

    const getQuantity = (id: string) => {
        return cart.find(i => i.item.id === id)?.quantity || 0
    }

    const totalCart = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0)
    const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0)

    const sendOrderWhatsApp = () => {
        if (cart.length === 0) return

        let text = `Hola Perlawasi, me gustaría realizar un pedido de la carta:\n\n`
        cart.forEach(c => {
            text += `- ${c.quantity}x ${c.item.name} (S/ ${(c.item.price * c.quantity).toFixed(2)})\n`
        })
        text += `\n*TOTAL: S/ ${totalCart.toFixed(2)}*\n\nPor favor, confirmen mi pedido.`

        const wpUrl = `https://wa.me/51928141669?text=${encodeURIComponent(text)}`
        window.open(wpUrl, '_blank')
    }

    const filteredDishes =
        activeCategory === 'Todos'
            ? dishes
            : dishes.filter(d => d.category === activeCategory)

    return (
        <div className="min-h-screen bg-gray-50 pb-32">
            {/* Cabecera */}
            <div className="bg-emerald-600 text-white sticky top-0 z-40 shadow-md">
                <div className="container px-4 mx-auto py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/restaurante"
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <FiArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold font-display uppercase tracking-widest leading-none">
                                Carta Virtual
                            </h1>
                            <p className="text-xs text-emerald-100 font-medium tracking-widest uppercase mt-1">
                                Restaurante Perlawasi
                            </p>
                        </div>
                    </div>

                    {/* Icono carrito en cabecera */}
                    {cartCount > 0 && (
                        <button
                            onClick={() => setShowCartPanel(true)}
                            className="relative p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                        >
                            <FiShoppingCart size={22} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        </button>
                    )}
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

            {/* Lista de platos */}
            <div className="container px-4 mx-auto py-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-emerald-600">
                        <div className="animate-spin text-4xl mb-4">🍽️</div>
                        <p className="font-bold uppercase tracking-widest text-sm animate-pulse">
                            Cargando delicias...
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDishes.map(dish => (
                            <div
                                key={dish.id}
                                className="bg-white rounded-[2rem] overflow-hidden shadow-soft flex flex-col group border border-gray-100"
                            >
                                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden flex items-center justify-center">
                                    {dish.image_url ? (
                                        <img
                                            src={dish.image_url}
                                            alt={dish.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="text-6xl text-gray-300 group-hover:scale-110 transition-transform duration-500">
                                            <FiImage />
                                        </div>
                                    )}
                                    {/* Badge de cantidad */}
                                    {getQuantity(dish.id) > 0 && (
                                        <div className="absolute top-4 right-4 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                            {getQuantity(dish.id)}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2 gap-4">
                                        <h3 className="text-xl font-bold font-display text-gray-900 leading-tight">
                                            {dish.name}
                                        </h3>
                                        <span className="text-xl font-bold text-emerald-500 whitespace-nowrap">
                                            S/ {dish.price}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-6 flex-grow">
                                        {dish.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                                        {getQuantity(dish.id) > 0 ? (
                                            <div className="flex items-center gap-4 bg-emerald-50 rounded-full px-4 py-2 w-full justify-between">
                                                <button
                                                    onClick={() => removeFromCart(dish.id)}
                                                    className="w-8 h-8 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-sm hover:bg-emerald-100 transition-colors"
                                                >
                                                    <FiMinus />
                                                </button>
                                                <span className="font-bold text-lg text-emerald-800">
                                                    {getQuantity(dish.id)}
                                                </span>
                                                <button
                                                    onClick={() => addToCart(dish)}
                                                    className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm hover:bg-emerald-700 transition-colors"
                                                >
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

            {/* ==================== PANEL DE RESUMEN DEL PEDIDO ==================== */}
            {showCartPanel && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center">
                    {/* Fondo oscuro */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowCartPanel(false)}
                    />

                    {/* Panel deslizable */}
                    <div className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] shadow-2xl animate-slide-up max-h-[85vh] flex flex-col">
                        {/* Cabecera del panel */}
                        <div className="flex items-center justify-between px-8 pt-8 pb-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-2xl font-display font-bold text-gray-900">
                                    Tu Pedido
                                </h2>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
                                    {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={clearCart}
                                    className="p-2 text-red-400 hover:bg-red-50 rounded-full transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-1"
                                    title="Vaciar pedido"
                                >
                                    <FiTrash2 size={16} /> Vaciar
                                </button>
                                <button
                                    onClick={() => setShowCartPanel(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <FiX size={22} className="text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Lista de productos en el pedido */}
                        <div className="flex-1 overflow-y-auto px-8 py-4 space-y-4">
                            {cart.length === 0 ? (
                                <div className="text-center py-12 text-gray-400">
                                    <p className="text-4xl mb-4">🛒</p>
                                    <p className="font-bold uppercase tracking-widest text-sm">
                                        Tu pedido está vacío
                                    </p>
                                </div>
                            ) : (
                                cart.map(entry => (
                                    <div
                                        key={entry.item.id}
                                        className="flex items-center gap-4 bg-gray-50 rounded-2xl p-4 group"
                                    >
                                        {/* Imagen mini */}
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                                            {entry.item.image_url ? (
                                                <img
                                                    src={entry.item.image_url}
                                                    alt={entry.item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300 text-2xl">
                                                    🍽️
                                                </div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-900 text-sm leading-tight truncate">
                                                {entry.item.name}
                                            </h4>
                                            <p className="text-emerald-600 font-bold text-sm mt-1">
                                                S/ {(entry.item.price * entry.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        {/* Controles de cantidad */}
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <button
                                                onClick={() => removeFromCart(entry.item.id)}
                                                className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
                                            >
                                                <FiMinus size={14} />
                                            </button>
                                            <span className="font-bold text-gray-900 w-6 text-center text-sm">
                                                {entry.quantity}
                                            </span>
                                            <button
                                                onClick={() => addToCart(entry.item)}
                                                className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 transition-colors"
                                            >
                                                <FiPlus size={14} />
                                            </button>
                                        </div>

                                        {/* Botón eliminar */}
                                        <button
                                            onClick={() => deleteFromCart(entry.item.id)}
                                            className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
                                            title="Eliminar del pedido"
                                        >
                                            <FiTrash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer del panel */}
                        {cart.length > 0 && (
                            <div className="border-t border-gray-100 px-8 py-6 space-y-4">
                                {/* Resumen de totales */}
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">
                                        Total del Pedido
                                    </span>
                                    <span className="text-3xl font-bold text-gray-900">
                                        S/ {totalCart.toFixed(2)}
                                    </span>
                                </div>

                                {/* Botón enviar por WhatsApp */}
                                <button
                                    onClick={sendOrderWhatsApp}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-colors shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40"
                                >
                                    <FiSend size={18} />
                                    Confirmar y Enviar por WhatsApp
                                </button>

                                <p className="text-center text-[10px] text-gray-400 font-medium tracking-wider">
                                    Se abrirá WhatsApp con el resumen de tu pedido
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ==================== BARRA FLOTANTE INFERIOR ==================== */}
            {cartCount > 0 && !showCartPanel && (
                <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 animate-slide-up">
                    <button
                        onClick={() => setShowCartPanel(true)}
                        className="bg-gray-900 text-white rounded-full p-2 pl-6 pr-2 shadow-2xl flex items-center gap-6 max-w-md w-full border border-gray-800 hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                        <div className="flex flex-col text-left">
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                                {cartCount}{' '}
                                {cartCount === 1 ? 'producto' : 'productos'}
                            </span>
                            <span className="font-bold text-lg">
                                S/ {totalCart.toFixed(2)}
                            </span>
                        </div>
                        <div className="bg-emerald-500 text-white px-6 py-4 rounded-full font-bold uppercase tracking-widest text-sm flex justify-center items-center gap-2 ml-auto">
                            <FiShoppingCart /> Ver Pedido
                        </div>
                    </button>
                </div>
            )}
        </div>
    )
}
