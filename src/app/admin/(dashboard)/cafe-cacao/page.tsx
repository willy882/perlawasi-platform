'use client'

import React, { useState, useEffect } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiCheckCircle, FiLoader, FiCoffee, FiShoppingBag
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminCafe() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [products, setProducts] = useState<any[]>([])

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        try {
            setLoading(true)
            // Reutilizamos la tabla de productos si fuera general, pero aquí asumo una gestión similar a plantas
            // Si no existe tabla específica, usaremos 'plantas' con categoría 'Cafe' por ahora o crear una si fuera necesario.
            // Pero según el esquema SQL inicial, solo creé 'plantas' y 'productos_ropa'.
            // Vamos a usar 'plantas' filtrada por categoría para Café si el usuario no especificó otra tabla.
            const { data, error } = await supabase
                .from('plantas')
                .select('*')
                .eq('category', 'Cafe & Cacao')
                .order('created_at', { ascending: false })

            if (error) throw error
            setProducts(data || [])
        } catch (error: any) {
            toast.error('Error al cargar productos de café: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)

        try {
            const newProduct = {
                name: formData.get('name'),
                category: 'Cafe & Cacao',
                price: parseFloat(formData.get('price') as string),
                stock: parseInt(formData.get('stock') as string),
                description: formData.get('description'),
                status: 'In Stock'
            }

            const { error } = await supabase.from('plantas').insert([newProduct])
            if (error) throw error

            toast.success('Producto de café guardado ☕')
            setShowModal(false)
            fetchProducts()
        } catch (error: any) {
            toast.error('Error al guardar: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const filtered = products.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-display font-black text-gray-900 leading-none">Café & Cacao</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium italic">Gestión de productos gourmet de origen.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-orange-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-orange-900/20 hover:bg-orange-700 transition-all"
                >
                    <FiPlus /> Nuevo Producto
                </button>
            </div>

            <div className="max-w-md relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar café o cacao..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em]">
                                <th className="px-8 py-5">Producto</th>
                                <th className="px-8 py-5">Stock</th>
                                <th className="px-8 py-5">Precio</th>
                                <th className="px-8 py-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={4} className="px-8 py-20 text-center"><FiLoader className="inline-block animate-spin" /></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={4} className="px-8 py-20 text-center text-gray-400 italic">No hay productos.</td></tr>
                            ) : (
                                filtered.map((p) => (
                                    <tr key={p.id} className="group hover:bg-orange-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center"><FiCoffee /></div>
                                                <p className="font-bold text-gray-900">{p.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-bold text-gray-600">{p.stock} uds.</td>
                                        <td className="px-8 py-6 font-black text-gray-900">S/ {p.price}</td>
                                        <td className="px-8 py-6 text-right">
                                            <button onClick={async () => {
                                                if (confirm('¿Eliminar?')) {
                                                    await supabase.from('plantas').delete().eq('id', p.id)
                                                    fetchProducts()
                                                }
                                            }} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><FiTrash2 /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 animate-slide-up">
                        <h3 className="text-2xl font-black mb-8 text-gray-900">Agregar Producto Gourmet</h3>
                        <form onSubmit={handleSave} className="space-y-6">
                            <input name="name" type="text" required placeholder="Nombre (ej: Café Geisha 250g)" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent focus:border-orange-500 outline-none text-sm font-bold" />
                            <div className="grid grid-cols-2 gap-4">
                                <input name="price" type="number" step="0.5" required placeholder="Precio S/" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent focus:border-orange-500 outline-none text-sm font-bold" />
                                <input name="stock" type="number" required placeholder="Stock" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent focus:border-orange-500 outline-none text-sm font-bold" />
                            </div>
                            <textarea name="description" rows={3} placeholder="Descripción del tueste o proceso..." className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent focus:border-orange-500 outline-none text-sm font-bold resize-none" />
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-xs">Cancelar</button>
                                <button type="submit" disabled={saving} className="flex-[2] py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-orange-900/20">{saving ? 'Guardando...' : 'Guardar Producto ☕'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
