'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiCheckCircle, FiXCircle, FiLoader,
    FiImage, FiTag, FiBox, FiUpload
} from 'react-icons/fi'
import { supabase, uploadImage } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminRopa() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [products, setProducts] = useState<any[]>([])
    const [showNewCat, setShowNewCat] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => { fetchProducts() }, [])

    async function fetchProducts() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('productos_ropa')
                .select('*')
                .order('created_at', { ascending: false })
            if (error) throw error
            setProducts(data || [])
        } catch (error: any) {
            toast.error('Error al cargar colección: ' + error.message)
        } finally { setLoading(false) }
    }

    const handleOpenModal = (product: any = null) => {
        setEditingProduct(product)
        setShowNewCat(false)
        setShowModal(true)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setUploading(true)
            toast.loading('Subiendo imagen...', { id: 'uploading' })
            const url = await uploadImage(file, 'products')

            if (editingProduct) {
                setEditingProduct({ ...editingProduct, image_url: url })
            } else {
                setEditingProduct({ image_url: url })
            }

            toast.success('Imagen subida correctamente ✨', { id: 'uploading' })
        } catch (error: any) {
            toast.error('Error al subir: ' + error.message, { id: 'uploading' })
        } finally {
            setUploading(false)
        }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)

        try {
            const category = (formData.get('category') === 'NEW' ? formData.get('new_category') : formData.get('category')) as string

            const colorsRaw = formData.get('colors') as string
            let colorsArray = []
            if (colorsRaw) {
                colorsArray = colorsRaw.split(',').map(c => {
                    const [name, hex] = c.split(':').map(s => s.trim())
                    return { name: name || 'Color', hex: hex || '#D4AF37' }
                })
            }

            const productData: any = {
                name: formData.get('name'),
                category: category,
                price: parseFloat(formData.get('price') as string),
                stock: parseInt(formData.get('stock') as string),
                description: formData.get('description'),
                material: formData.get('material'),
                emoji: formData.get('emoji') || '👕',
                image_url: formData.get('image_url'),
                sizes: (formData.get('sizes') as string)?.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) || [],
                colors: colorsArray
            }

            if (editingProduct?.id) {
                const { error } = await supabase
                    .from('productos_ropa')
                    .update(productData)
                    .eq('id', editingProduct.id)
                if (error) throw error
                toast.success('Colección actualizada ✨')
            } else {
                const { error } = await supabase
                    .from('productos_ropa')
                    .insert([productData])
                if (error) throw error
                toast.success('Nueva prenda publicada 👕')
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
    if (categoriesList.length === 0) categoriesList.push('Camisetas', 'Pantalones', 'Vestidos', 'Accesorios', 'Calzado')

    return (
        <div className="space-y-8 animate-fade-in px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-display font-black text-gray-900 leading-none tracking-tight">Boutique Perlawasi</h2>
                    <p className="text-gray-500 mt-3 text-sm font-medium italic">Gestión de la colección de moda consciente.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-8 py-4 bg-[#1a3c1a] text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-900/20 hover:bg-black transition-all"
                >
                    <FiPlus /> Añadir Nueva Prenda
                </button>
            </div>

            <div className="max-w-xl relative">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por prenda, tela o categoría..."
                    className="w-full pl-14 pr-4 py-4.5 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] border-b border-gray-100">
                                <th className="px-10 py-7">Prenda / Material</th>
                                <th className="px-10 py-7">Categoría</th>
                                <th className="px-10 py-7">Disponibilidad</th>
                                <th className="px-10 py-7 text-right">Precio</th>
                                <th className="px-10 py-7 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="px-10 py-32 text-center"><FiLoader className="inline-block animate-spin text-emerald-600 text-3xl" /></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="px-10 py-32 text-center text-gray-400 font-medium italic">No hay artículos en el catálogo.</td></tr>
                            ) : (
                                filtered.map((p) => (
                                    <tr key={p.id} className="group hover:bg-emerald-50/20 transition-all duration-300">
                                        <td className="px-10 py-7">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 shrink-0">
                                                    {p.image_url ? (
                                                        <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-4xl grayscale opacity-30">{p.emoji || '👕'}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg leading-tight uppercase tracking-tight">{p.name}</p>
                                                    <p className="text-xs text-gray-400 mt-1 font-black tracking-widest uppercase">{p.material || 'Material s/n'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7 font-bold">
                                            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded-full tracking-widest">{p.category}</span>
                                        </td>
                                        <td className="px-10 py-7 font-bold text-gray-600">{p.stock} uds.</td>
                                        <td className="px-10 py-7 text-right font-black text-gray-900 text-xl tracking-tighter uppercase">S/ {p.price}</td>
                                        <td className="px-10 py-7 text-right">
                                            <div className="flex justify-end gap-3 transition-all">
                                                <button onClick={() => handleOpenModal(p)} className="p-3.5 bg-white text-emerald-600 rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1"><FiEdit2 size={18} /></button>
                                                <button onClick={async () => { if (confirm('¿Eliminar artículo?')) { await supabase.from('productos_ropa').delete().eq('id', p.id); fetchProducts(); toast.success('Producto eliminado'); } }} className="p-3.5 bg-white text-red-500 rounded-xl border border-red-50 shadow-sm hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1"><FiTrash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal CRUD */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] p-12 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto border border-white/20">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-4xl font-black text-gray-900 leading-none tracking-tighter">{editingProduct?.id ? 'Editar Prenda' : 'Nueva Prenda'}</h3>
                                <p className="text-gray-400 text-sm mt-3 font-medium italic">Colección Premium Perlawasi.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3.5 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition-colors"><FiXCircle size={28} /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Nombre de la Prenda</label>
                                    <input name="name" required type="text" defaultValue={editingProduct?.name} placeholder="Ej: Polo Lino Natural" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-base font-bold transition-all shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Categoría</label>
                                    <div className="space-y-3">
                                        <select name="category" defaultValue={editingProduct?.category} onChange={(e) => setShowNewCat(e.target.value === 'NEW')} className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent outline-none text-sm font-bold appearance-none cursor-pointer focus:border-emerald-500 shadow-inner">
                                            {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            <option value="NEW" className="text-emerald-700 font-black">+ Crear Nueva...</option>
                                        </select>
                                        {showNewCat && <input name="new_category" required type="text" placeholder="Nueva categoría" className="w-full px-8 py-5 bg-emerald-50 border-2 border-emerald-100 rounded-2xl outline-none font-bold animate-fade-in shadow-inner" />}
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Precio (S/)</label>
                                    <input name="price" required type="number" step="0.01" defaultValue={editingProduct?.price} placeholder="0.00" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-base font-black shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Stock</label>
                                    <input name="stock" required type="number" defaultValue={editingProduct?.stock} placeholder="0" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-base font-bold shadow-inner" />
                                </div>
                                <div className="space-y-3 text-center">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Emoji</label>
                                    <input name="emoji" type="text" defaultValue={editingProduct?.emoji || '👕'} className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent text-center text-2xl shadow-inner" />
                                </div>
                            </div>

                            <div className="col-span-2 space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6 flex items-center gap-2">Imagen de Catálogo <FiImage className="text-emerald-500" /></label>
                                <div className="flex gap-2">
                                    <input name="image_url" type="text" value={editingProduct?.image_url || ''} onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })} placeholder="URL o sube una imagen" className="flex-1 px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-xs font-medium shadow-inner" />
                                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={uploading}
                                        className="px-6 bg-emerald-50 text-emerald-700 rounded-2xl border-2 border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center"
                                    >
                                        {uploading ? <FiLoader className="animate-spin" /> : <FiUpload size={20} />}
                                    </button>
                                </div>
                                {editingProduct?.image_url && (
                                    <img src={editingProduct.image_url} alt="Preview" className="h-32 w-auto rounded-2xl mx-auto border-2 border-emerald-50 shadow-lg mt-4" />
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Material</label>
                                    <input name="material" type="text" defaultValue={editingProduct?.material} placeholder="Ej: Lino Orgánico 100%" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent outline-none text-sm font-bold shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Tallas (XS, S, M, L...)</label>
                                    <input name="sizes" type="text" defaultValue={editingProduct?.sizes?.join(', ')} placeholder="XS, S, M, L" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent outline-none text-sm font-bold shadow-inner" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Colores (Nombre:#hex, Nombre:#hex...)</label>
                                <input name="colors" type="text" defaultValue={editingProduct?.colors?.map((c: any) => `${c.name}:${c.hex}`).join(', ')} placeholder="Blanco:#ffffff, Crema:#f5f5dc" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent outline-none text-sm font-bold shadow-inner" />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Historia / Descripción</label>
                                <textarea name="description" defaultValue={editingProduct?.description} rows={3} placeholder="Describe el origen y diseño de la pieza..." className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-sm font-bold resize-none transition-all shadow-inner" />
                            </div>

                            <div className="flex gap-5 pt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-6 bg-gray-100 text-gray-500 rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all">Cancelar</button>
                                <button type="submit" disabled={saving || uploading} className="flex-[2] py-6 bg-[#1a3c1a] text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-emerald-900/30 hover:bg-black transition-all flex items-center justify-center gap-4">
                                    {(saving || uploading) ? <FiLoader className="animate-spin text-xl" /> : <><FiCheckCircle className="text-xl" /> {editingProduct?.id ? 'Actualizar Colección' : 'Lanzar Prenda'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
