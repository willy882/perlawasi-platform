'use client'

import React, { useState, useEffect } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiCheckCircle, FiXCircle, FiLoader, FiCoffee, FiShoppingBag
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminCafe() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [showNewCat, setShowNewCat] = useState(false)

    useEffect(() => { fetchProducts() }, [])

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('cafe_cacao')
                .select('*')
                .order('created_at', { ascending: false })
            if (error) throw error
            setProducts(data || [])
        } catch (error: any) {
            toast.error('Error al cargar catálogo: ' + error.message)
        } finally { setLoading(false) }
    }

    const handleOpenModal = (product: any = null) => {
        setEditingProduct(product)
        setShowNewCat(false)
        setShowModal(true)
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)
        try {
            const category = formData.get('category') === 'NEW' ? formData.get('new_category') : formData.get('category')
            const productData: any = {
                name: formData.get('name'),
                category: category,
                price: parseFloat(formData.get('price') as string),
                stock: parseInt(formData.get('stock') as string),
                description: formData.get('description'),
                image_url: formData.get('image_url')
            }

            if (editingProduct?.id) {
                const { error } = await supabase
                    .from('cafe_cacao')
                    .update(productData)
                    .eq('id', editingProduct.id)
                if (error) throw error
                toast.success('Producto actualizado exitosamente ✨')
            } else {
                const { error } = await supabase
                    .from('cafe_cacao')
                    .insert([productData])
                if (error) throw error
                toast.success('Producto gourmet guardado ☕')
            }

            setShowModal(false)
            fetchProducts()
        } catch (error: any) {
            toast.error('Error al guardar: ' + error.message)
        } finally { setSaving(false) }
    }

    const filtered = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const categoriesList = Array.from(new Set(products.map(p => p.category).filter(Boolean)))
    if (categoriesList.length === 0) categoriesList.push('Café Grano', 'Cacao Puro', 'Chocolates', 'Subproductos')

    return (
        <div className="space-y-8 animate-fade-in px-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-display font-black text-gray-900 leading-none">Café & Cacao</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium italic">Gestión de productos gourmet de origen andino-amazónico.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-6 py-3.5 bg-orange-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-orange-900/20 hover:bg-black transition-all"
                >
                    <FiPlus /> Nuevo Producto
                </button>
            </div>

            <div className="max-w-lg relative">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm focus:ring-4 focus:ring-orange-500/10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-orange-950/5 overflow-hidden text-left">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-widest">
                            <th className="px-8 py-6">Producto</th>
                            <th className="px-8 py-6">Variedad</th>
                            <th className="px-8 py-6">Stock</th>
                            <th className="px-8 py-6">Precio</th>
                            <th className="px-8 py-6 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan={5} className="px-8 py-20 text-center"><FiLoader className="inline-block animate-spin text-orange-600 text-2xl" /></td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 italic font-medium">No hay productos gourmet registrados.</td></tr>
                        ) : (
                            filtered.map(p => (
                                <tr key={p.id} className="group hover:bg-orange-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 overflow-hidden border border-orange-100 flex items-center justify-center shrink-0">
                                                {p.image_url ? (
                                                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <FiCoffee size={24} />
                                                )}
                                            </div>
                                            <p className="font-bold text-gray-900">{p.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                                        <span className="bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full">{p.category}</span>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-600">{p.stock} uds.</td>
                                    <td className="px-8 py-6 font-black text-gray-900 text-lg uppercase tracking-tighter">S/ {p.price}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button onClick={() => handleOpenModal(p)} className="p-3 bg-white text-gray-400 hover:text-orange-600 rounded-xl border border-gray-100 shadow-sm transition-all"><FiEdit2 size={16} /></button>
                                            <button onClick={async () => {
                                                if (confirm('¿Eliminar producto gourmet?')) {
                                                    await supabase.from('cafe_cacao').delete().eq('id', p.id);
                                                    fetchProducts();
                                                    toast.success('Eliminado');
                                                }
                                            }} className="p-3 bg-white text-gray-400 hover:text-red-600 rounded-xl border border-gray-100 shadow-sm transition-all"><FiTrash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 animate-slide-up max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h3 className="text-3xl font-black text-gray-900">{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                                <p className="text-gray-400 text-sm mt-3 font-medium italic">Actualiza la oferta gourmet de Perlawasi.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition-colors"><FiXCircle size={24} /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nombre del Producto</label>
                                <input name="name" type="text" defaultValue={editingProduct?.name} required placeholder="Ej: Café Geisha 250g" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-transparent focus:border-orange-500 border outline-none text-sm font-bold transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Categoría / Variedad</label>
                                <div className="space-y-3">
                                    <select name="category" defaultValue={editingProduct?.category} onChange={(e) => setShowNewCat(e.target.value === 'NEW')} className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer">
                                        {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
                                        <option value="NEW" className="text-orange-600 font-bold">+ Crear Nueva...</option>
                                    </select>
                                    {showNewCat && <input name="new_category" required type="text" placeholder="Ej: Chocolates Premium" className="w-full px-6 py-4 bg-orange-50 border border-orange-100 rounded-2xl outline-none text-sm font-bold animate-fade-in" />}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Precio S/</label>
                                    <input name="price" type="number" step="0.5" defaultValue={editingProduct?.price} required placeholder="0.00" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Stock</label>
                                    <input name="stock" type="number" defaultValue={editingProduct?.stock} required placeholder="0" className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-bold" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">URL Imagen (Directo)</label>
                                <input name="image_url" type="text" defaultValue={editingProduct?.image_url} placeholder="https://..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none text-sm font-bold" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Descripción / Notas de Cata</label>
                                <textarea name="description" defaultValue={editingProduct?.description} rows={3} placeholder="Detalla el proceso o notas de sabor..." className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-transparent focus:border-orange-500 border outline-none text-sm font-bold resize-none transition-all" />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-200 transition-all">Cancelar</button>
                                <button type="submit" disabled={saving} className="flex-[2] py-5 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-orange-900/20 hover:bg-black transition-all flex items-center justify-center gap-3">
                                    {saving ? <FiLoader className="animate-spin text-lg" /> : <><FiCheckCircle className="text-lg" /> {editingProduct ? 'Actualizar Producto' : 'Guardar Producto'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
