'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiCheckCircle, FiLoader, FiXCircle, FiCamera, FiLink
} from 'react-icons/fi'
import { supabase, uploadImage } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminCerveceria() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [showNewCat, setShowNewCat] = useState(false)
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [currentImageUrl, setCurrentImageUrl] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => { fetchProducts() }, [])

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data, error } = await supabase.from('cerveceria').select('*').order('created_at', { ascending: false })
            if (error) throw error
            setProducts(data || [])
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally { setLoading(false) }
    }

    const handleOpenModal = (product: any = null) => {
        setEditingProduct(product)
        setCurrentImageUrl(product?.image_url || '')
        setShowNewCat(false)
        setShowModal(true)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        try {
            setUploading(true)
            toast.loading('Subiendo imagen...', { id: 'upload' })
            const url = await uploadImage(file, 'products')
            setCurrentImageUrl(url)
            toast.success('¡Imagen subida!', { id: 'upload' })
        } catch (error: any) {
            toast.error('Error al subir: ' + error.message, { id: 'upload' })
        } finally { setUploading(false) }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)
        try {
            const category = formData.get('category') === 'NEW' ? formData.get('new_category') : formData.get('category')
            const productData = {
                name: formData.get('name'),
                category,
                price: parseFloat(formData.get('price') as string),
                stock: parseInt(formData.get('stock') as string),
                description: formData.get('description'),
                image_url: currentImageUrl || null
            }

            if (editingProduct?.id) {
                const { error } = await supabase.from('cerveceria').update(productData).eq('id', editingProduct.id)
                if (error) throw error
                toast.success('Cerveza actualizada 🍺')
            } else {
                const { error } = await supabase.from('cerveceria').insert([productData])
                if (error) throw error
                toast.success('Cerveza guardada 🍺')
            }
            setShowModal(false)
            fetchProducts()
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally { setSaving(false) }
    }

    const filtered = products.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)))
    if (categories.length === 0) categories.push('IPA', 'Porter', 'Lager', 'Golden Ale')

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-display font-black text-gray-900 leading-none">Cervecería Artesanal</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium italic">Craft beer del Amazonas.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-6 py-3.5 bg-amber-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-amber-900/20 hover:bg-black transition-all">
                    <FiPlus /> Nueva Cerveza
                </button>
            </div>

            <div className="max-w-md relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Buscar cerveza..." className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden text-left">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-widest">
                            <th className="px-8 py-5">Producto</th>
                            <th className="px-8 py-5">Estilo</th>
                            <th className="px-8 py-5">Stock</th>
                            <th className="px-8 py-5">Precio</th>
                            <th className="px-8 py-5 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan={5} className="py-20 text-center"><FiLoader className="inline-block animate-spin" /></td></tr>
                        ) : filtered.length === 0 ? (
                            <tr><td colSpan={5} className="px-8 py-20 text-center text-gray-400 italic">No hay cervezas.</td></tr>
                        ) : (
                            filtered.map(p => (
                                <tr key={p.id} className="group hover:bg-amber-50/30 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            {p.image_url ? (
                                                <img src={p.image_url} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">🍺</div>
                                            )}
                                            <p className="font-bold text-gray-900">{p.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 uppercase tracking-widest font-bold">{p.category}</td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-600">{p.stock} uds</td>
                                    <td className="px-8 py-6 font-black text-gray-900">S/ {p.price}</td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleOpenModal(p)} className="p-2.5 text-amber-600 hover:bg-amber-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><FiEdit2 /></button>
                                            <button onClick={async () => { if (confirm('¿Eliminar?')) { await supabase.from('cerveceria').delete().eq('id', p.id); fetchProducts() } }} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><FiTrash2 /></button>
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
                    <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 animate-slide-up max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-black text-gray-900">
                                {editingProduct?.id ? 'Editar Cerveza' : 'Nueva Cerveza Artesanal'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-2 bg-gray-100 text-gray-400 rounded-full hover:bg-gray-200 transition-all">
                                <FiXCircle size={22} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-5">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Nombre de la Cerveza</label>
                                <input name="name" type="text" required defaultValue={editingProduct?.name} placeholder="Ej: IPA Amazónica" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none font-bold" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Estilo</label>
                                <select name="category" defaultValue={editingProduct?.category} onChange={(e) => setShowNewCat(e.target.value === 'NEW')} className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none font-bold appearance-none">
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    <option value="NEW">+ Nuevo Estilo...</option>
                                </select>
                                {showNewCat && <input name="new_category" required type="text" placeholder="Ej: IPA, Porter, Lager..." className="w-full px-5 py-3.5 bg-amber-50 rounded-2xl outline-none font-bold animate-fade-in" />}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Precio S/</label>
                                    <input name="price" type="number" step="1" required defaultValue={editingProduct?.price} placeholder="0.00" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none font-bold" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Stock</label>
                                    <input name="stock" type="number" required defaultValue={editingProduct?.stock} placeholder="0" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none font-bold" />
                                </div>
                            </div>

                            {/* Imagen */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Imagen del Producto</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="border-4 border-dashed border-gray-100 rounded-[2rem] p-6 bg-gray-50 hover:bg-amber-50 hover:border-amber-200 cursor-pointer text-center transition-all group overflow-hidden relative min-h-[140px] flex flex-col items-center justify-center"
                                >
                                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                                    {uploading ? (
                                        <FiLoader className="animate-spin text-3xl text-amber-500" />
                                    ) : currentImageUrl ? (
                                        <img src={currentImageUrl} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-[1.8rem]" alt="preview" />
                                    ) : (
                                        <div className="text-gray-300 group-hover:text-amber-400 transition-colors">
                                            <FiCamera className="text-4xl mx-auto mb-2" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Subir desde dispositivo</p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-2xl">
                                    <FiLink className="text-gray-400 shrink-0" />
                                    <input
                                        type="text"
                                        value={currentImageUrl}
                                        onChange={(e) => setCurrentImageUrl(e.target.value)}
                                        placeholder="O pega aquí el enlace de la imagen..."
                                        className="bg-transparent border-none outline-none text-xs w-full font-bold text-gray-500 placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Descripción / Notas de Cata</label>
                                <textarea name="description" rows={3} defaultValue={editingProduct?.description} placeholder="Detalla el amargor, cuerpo y aromas..." className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none text-sm font-bold resize-none" />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase text-[10px] tracking-widest">Cancelar</button>
                                <button type="submit" disabled={saving || uploading} className="flex-[2] py-4 bg-amber-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg flex items-center justify-center gap-2">
                                    {saving ? <FiLoader className="animate-spin" /> : <><FiCheckCircle /> {editingProduct?.id ? 'Actualizar Cerveza' : 'Guardar Cerveza 🍺'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
