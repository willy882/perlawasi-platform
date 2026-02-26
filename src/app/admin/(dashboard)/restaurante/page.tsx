'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiCheckCircle, FiXCircle, FiLoader, FiCamera, FiImage, FiUpload
} from 'react-icons/fi'
import { supabase, uploadImage } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminRestaurante() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingDish, setEditingDish] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [dishes, setDishes] = useState<any[]>([])
    const [showNewCat, setShowNewCat] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => { fetchDishes() }, [])

    async function fetchDishes() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('restaurante_menu')
                .select('*')
                .order('created_at', { ascending: false })
            if (error) throw error
            setDishes(data || [])
        } catch (error: any) {
            toast.error('Error al cargar menú: ' + error.message)
        } finally { setLoading(false) }
    }

    const handleOpenModal = (dish: any = null) => {
        setEditingDish(dish)
        setShowNewCat(false)
        setShowModal(true)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setUploading(true)
            toast.loading('Subiendo imagen...', { id: 'uploading' })
            // Intentar subir al bucket 'products'
            const url = await uploadImage(file, 'products')

            // Si estamos editando un plato, actualizamos el campo en el formulario dinámicamente o guardamos la URL
            if (editingDish) {
                setEditingDish({ ...editingDish, image_url: url })
            } else {
                // Si es un plato nuevo, necesitamos una referencia temporal
                setEditingDish({ image_url: url })
            }

            toast.success('Imagen subida correctamente ✨', { id: 'uploading' })
        } catch (error: any) {
            toast.error('Error al subir (Asegúrate de tener el bucket "products" en Supabase): ' + error.message, { id: 'uploading' })
        } finally {
            setUploading(false)
        }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)
        try {
            const category = formData.get('category') === 'NEW' ? formData.get('new_category') : formData.get('category')
            const dishData: any = {
                name: formData.get('name'),
                category: category,
                price: parseFloat(formData.get('price') as string),
                description: formData.get('description'),
                image_url: formData.get('image_url'),
                available: formData.get('available') === 'on' || formData.get('available') === 'true'
            }

            if (editingDish?.id) {
                const { error } = await supabase
                    .from('restaurante_menu')
                    .update(dishData)
                    .eq('id', editingDish.id)
                if (error) throw error
                toast.success('Plato actualizado exitosamente ✨')
            } else {
                const { error } = await supabase
                    .from('restaurante_menu')
                    .insert([dishData])
                if (error) throw error
                toast.success('Nuevo plato añadido a la carta 🥘')
            }

            setShowModal(false)
            fetchDishes()
        } catch (error: any) {
            toast.error('Error al guardar: ' + error.message)
        } finally { setSaving(false) }
    }

    const filtered = dishes.filter(d =>
        d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const categoriesList = Array.from(new Set(dishes.map(d => d.category).filter(Boolean)))
    if (categoriesList.length === 0) categoriesList.push('Entradas', 'Fondos', 'Pollos', 'Pescados', 'Paiches', 'Ceviches', 'Bebidas')

    return (
        <div className="space-y-8 animate-fade-in px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-display font-black text-gray-900 leading-none">Menú Restaurante</h2>
                    <p className="text-gray-500 mt-3 text-sm font-medium italic">Gestiona el catálogo de platos y especialidades.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-8 py-4 bg-[#1a3c1a] text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-900/20 hover:bg-black transition-all"
                >
                    <FiPlus /> Registrar Nuevo Plato
                </button>
            </div>

            <div className="max-w-xl relative">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o categoría..."
                    className="w-full pl-14 pr-4 py-4.5 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-medium"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] border-b border-gray-100">
                                <th className="px-10 py-7">Plato / Descripción</th>
                                <th className="px-10 py-7">Categoría</th>
                                <th className="px-10 py-7">Estado</th>
                                <th className="px-10 py-7 text-right">Precio</th>
                                <th className="px-10 py-7 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="px-10 py-32 text-center"><FiLoader className="inline-block animate-spin text-emerald-600 text-3xl" /></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="px-10 py-32 text-center text-gray-400 font-medium italic">No se encontraron platos en el menú.</td></tr>
                            ) : (
                                filtered.map((d) => (
                                    <tr key={d.id} className="group hover:bg-emerald-50/20 transition-all duration-300">
                                        <td className="px-10 py-7">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 shrink-0">
                                                    {d.image_url ? (
                                                        <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-4xl grayscale opacity-30">🥘</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg leading-tight uppercase tracking-tight">{d.name}</p>
                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1 italic">{d.description || 'Sin descripción'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7 font-bold">
                                            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded-full tracking-widest">{d.category}</span>
                                        </td>
                                        <td className="px-10 py-7">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${d.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                {d.available ? '● Disponible' : '○ Agotado'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-7 text-right font-black text-gray-900 text-xl tracking-tighter">S/ {d.price}</td>
                                        <td className="px-10 py-7 text-right">
                                            <div className="flex justify-end gap-3 transition-all">
                                                <button
                                                    onClick={() => handleOpenModal(d)}
                                                    className="p-3.5 bg-white text-emerald-600 rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1"
                                                    title="Editar Plato"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={async () => { if (confirm('¿Deseas eliminar este plato permanentemente?')) { await supabase.from('restaurante_menu').delete().eq('id', d.id); fetchDishes(); toast.success('Plato eliminado'); } }}
                                                    className="p-3.5 bg-white text-red-500 rounded-xl border border-red-50 shadow-sm hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1"
                                                    title="Eliminar Plato"
                                                >
                                                    <FiTrash2 size={18} />
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

            {/* Modal CRUD */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] p-12 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto border border-white/20">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h3 className="text-4xl font-black text-gray-900 leading-none tracking-tighter">{editingDish?.id ? 'Editar Plato' : 'Nuevo Plato'}</h3>
                                <p className="text-gray-400 text-sm mt-3 font-medium italic">Detalle de la carta Perlawasi.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3.5 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition-colors"><FiXCircle size={28} /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Título del Plato</label>
                                <input name="name" required type="text" defaultValue={editingDish?.name} placeholder="Ej: Paiche a la Parrilla" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-base font-bold transition-all shadow-inner" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Categoría del Menú</label>
                                    <div className="space-y-3">
                                        <select name="category" defaultValue={editingDish?.category} onChange={(e) => setShowNewCat(e.target.value === 'NEW')} className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent outline-none text-sm font-bold appearance-none cursor-pointer focus:border-emerald-500 shadow-inner">
                                            {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            <option value="NEW" className="text-emerald-700 font-black">+ Crear Nueva Categoría...</option>
                                        </select>
                                        {showNewCat && <input name="new_category" required type="text" placeholder="Nombre nueva categoría" className="w-full px-8 py-5 bg-emerald-50 border-2 border-emerald-100 rounded-2xl outline-none font-bold animate-fade-in shadow-inner" />}
                                    </div>
                                </div>
                                <div className="space-y-3 text-right">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-6">Estado de Venta</label>
                                    <div className="flex items-center justify-end gap-4 h-14 bg-gray-50 rounded-2xl px-8 shadow-inner">
                                        <label htmlFor="available_check" className="text-xs font-black text-gray-500 uppercase tracking-widest cursor-pointer">Disponible</label>
                                        <input name="available" type="checkbox" id="available_check" defaultChecked={editingDish ? editingDish.available : true} className="w-6 h-6 accent-emerald-600 rounded cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Precio (S/)</label>
                                    <input name="price" required type="number" step="0.5" defaultValue={editingDish?.price} placeholder="0.00" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-base font-black shadow-inner" />
                                </div>
                                <div className="col-span-2 space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6 flex items-center gap-2">Imagen del Plato <FiImage className="text-emerald-500" /></label>
                                    <div className="flex gap-2">
                                        <input name="image_url" type="text" value={editingDish?.image_url || ''} onChange={(e) => setEditingDish({ ...editingDish, image_url: e.target.value })} placeholder="URL de la imagen" className="flex-1 px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-xs font-medium shadow-inner" />
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
                                    {editingDish?.image_url && (
                                        <div className="mt-2 text-center">
                                            <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest mb-2">Vista previa:</p>
                                            <img src={editingDish.image_url} alt="Preview" className="h-24 w-auto rounded-xl mx-auto border-2 border-emerald-50 shadow-md" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Descripción Narrativa</label>
                                <textarea name="description" defaultValue={editingDish?.description} rows={3} placeholder="Describe los sabores, ingredientes o la historia del plato..." className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-sm font-bold resize-none transition-all shadow-inner" />
                            </div>

                            <div className="flex gap-5 pt-8">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-6 bg-gray-100 text-gray-500 rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all">Cancelar</button>
                                <button type="submit" disabled={saving || uploading} className="flex-[2] py-6 bg-[#1a3c1a] text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-emerald-900/30 hover:bg-black transition-all flex items-center justify-center gap-4 disabled:opacity-50">
                                    {(saving || uploading) ? <FiLoader className="animate-spin text-xl" /> : <><FiCheckCircle className="text-xl" /> {editingDish?.id ? 'Actualizar Plato' : 'Publicar en Carta'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
