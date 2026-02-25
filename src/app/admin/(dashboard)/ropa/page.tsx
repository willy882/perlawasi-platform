'use client'

import React, { useState, useEffect } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiFilter, FiDownload, FiCheckCircle, FiXCircle,
    FiLoader, FiTag, FiBox
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminRopa() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [showNewCat, setShowNewCat] = useState(false)

    useEffect(() => { fetchProducts() }, [])

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data, error } = await supabase.from('productos_ropa').select('*').order('created_at', { ascending: false })
            if (error) throw error
            setProducts(data || [])
        } finally { setLoading(false) }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)
        try {
            const category = formData.get('category') === 'NEW' ? formData.get('new_category') : formData.get('category')
            const newProduct = {
                name: formData.get('name'),
                category: category,
                price: parseFloat(formData.get('price') as string),
                stock: parseInt(formData.get('stock') as string),
                description: formData.get('description'),
                sizes: (formData.get('sizes') as string).split(',').map(s => s.trim().toUpperCase())
            }
            const { error } = await supabase.from('productos_ropa').insert([newProduct])
            if (error) throw error
            toast.success('Producto guardado 👕')
            setShowModal(false)
            fetchProducts()
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally { setSaving(false) }
    }

    const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))
    if (categories.length === 0) categories.push('Camisetas', 'Pantalones', 'Accesorios')

    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-display font-black text-gray-900 leading-none">Boutique Perlawasi</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium italic">Gestión de ropa y accesorios exclusivos.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3.5 bg-[#1a3c1a] text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/20 hover:bg-black hover:-translate-y-0.5 transition-all"
                    >
                        <FiPlus /> Nuevo Producto
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o categoría..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em]">
                                <th className="px-8 py-5">Producto</th>
                                <th className="px-8 py-5">Categoría</th>
                                <th className="px-8 py-5">Tallas</th>
                                <th className="px-8 py-5">Stock</th>
                                <th className="px-8 py-5">Precio</th>
                                <th className="px-8 py-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <FiLoader className="inline-block animate-spin text-emerald-500 text-3xl mb-2" />
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sincronizando Boutique...</p>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <p className="text-gray-400 text-sm font-medium italic">No se encontraron productos.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((p) => (
                                    <tr key={p.id} className="group hover:bg-emerald-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                                    <FiTag />
                                                </div>
                                                <p className="font-bold text-gray-900">{p.name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                                            {p.category}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex gap-1">
                                                {p.sizes?.map((s: string) => (
                                                    <span key={s} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-md border border-gray-200 uppercase">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-black ${p.stock <= 5 ? 'text-red-500' : 'text-gray-700'}`}>
                                                    {p.stock} uds.
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-black text-gray-900">
                                            S/ {p.price}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                                                    <FiEdit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        if (confirm('¿Eliminar este producto?')) {
                                                            const { error } = await supabase.from('productos_ropa').delete().eq('id', p.id)
                                                            if (error) toast.error('Error al eliminar')
                                                            else { toast.success('Producto eliminado'); fetchProducts() }
                                                        }
                                                    }}
                                                    className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up">
                        <div className="p-10">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Nuevo Producto Boutique</h3>
                            <p className="text-gray-400 text-sm mb-8 font-medium">Agrega prendas exclusivas de la colección Perlawasi.</p>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Nombre del Producto</label>
                                        <input name="name" type="text" required placeholder="Ej: Polo Algodón Orgánico" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Categoría</label>
                                        <div className="space-y-2">
                                            <select
                                                name="category"
                                                onChange={(e) => setShowNewCat(e.target.value === 'NEW')}
                                                className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold appearance-none"
                                            >
                                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                                <option value="NEW" className="text-emerald-600 font-bold">+ Crear Nueva Categoría...</option>
                                            </select>
                                            {showNewCat && (
                                                <input name="new_category" type="text" required placeholder="Ej: Artesanía, Calzado..." className="w-full px-5 py-3.5 bg-emerald-50 border-emerald-100 rounded-2xl outline-none text-sm font-bold animate-fade-in" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Precio (S/)</label>
                                        <input name="price" type="number" step="0.10" required placeholder="00.00" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Stock Inicial</label>
                                        <input name="stock" type="number" required placeholder="0" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Tallas (Separar por comas)</label>
                                        <input name="sizes" type="text" placeholder="S, M, L, XL" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Descripción</label>
                                    <textarea name="description" rows={3} placeholder="Detalles del material, estilo..." className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold resize-none" />
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-8 py-4 bg-gray-100 text-gray-600 rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-[2] px-8 py-4 bg-[#1a3c1a] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-black shadow-xl shadow-emerald-900/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <FiLoader className="animate-spin" /> : 'Guardar Producto 👕'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
