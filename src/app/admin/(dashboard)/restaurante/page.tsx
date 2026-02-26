'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiCheckCircle, FiXCircle, FiLoader, FiCamera, FiImage, FiUpload, FiRefreshCw, FiInfo
} from 'react-icons/fi'
import { supabase, uploadImage } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export const dynamic = 'force-dynamic'

export default function AdminRestaurante() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [editingDish, setEditingDish] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [dishes, setDishes] = useState<any[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [currentImageUrl, setCurrentImageUrl] = useState('')

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
            console.log("DATOS CARGADOS:", data)
        } catch (error: any) {
            toast.error('Error al cargar menú: ' + error.message)
        } finally { setLoading(false) }
    }

    const handleOpenModal = (dish: any = null) => {
        setEditingDish(dish ? { ...dish } : null)
        setCurrentImageUrl(dish?.image_url || '')
        setShowModal(true)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setUploading(true)
            toast.loading('Subiendo a la nube...', { id: 'upload' })
            const url = await uploadImage(file, 'products')

            console.log("URL GENERADA:", url)
            setCurrentImageUrl(url)

            toast.success('¡Imagen lista!', { id: 'upload' })
        } catch (error: any) {
            toast.error('Fallo en la subida: ' + error.message, { id: 'upload' })
        } finally { setUploading(false) }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)

        try {
            const dishData = {
                name: formData.get('name')?.toString(),
                category: formData.get('category')?.toString(),
                price: parseFloat(formData.get('price')?.toString() || '0'),
                description: formData.get('description')?.toString(),
                image_url: currentImageUrl, // ESTO DEBE TENER LA URL
                available: formData.get('available') === 'on' || formData.get('available') === 'true'
            }

            console.log("ESTO SE ENVÍA A SUPABASE:", dishData)

            if (editingDish?.id) {
                const { error, data } = await supabase
                    .from('restaurante_menu')
                    .update(dishData)
                    .eq('id', editingDish.id)
                    .select()
                if (error) throw error
                console.log("RESPUESTA UPDATE:", data)
            } else {
                const { error, data } = await supabase
                    .from('restaurante_menu')
                    .insert([dishData])
                    .select()
                if (error) throw error
                console.log("RESPUESTA INSERT:", data)
            }

            toast.success('¡Plato guardado con éxito! ✨')
            setShowModal(false)
            setEditingDish(null)
            setCurrentImageUrl('')
            fetchDishes()
        } catch (error: any) {
            console.error("ERROR AL GUARDAR:", error)
            toast.error('Error: ' + error.message)
        } finally { setSaving(false) }
    }

    const filtered = dishes.filter(d =>
        d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-fade-in px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-display font-black text-gray-900 leading-none">Menú Restaurante</h2>
                    <p className="text-gray-500 mt-3 text-sm font-medium italic">Si la imagen no carga, abre la consola (F12) para ver el error.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchDishes} className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100" title="Refrescar">
                        <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-8 py-4 bg-[#1a3c1a] text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-900/20 hover:bg-black transition-all">
                        <FiPlus /> Registrar Nuevo
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] border-b border-gray-100">
                            <th className="px-10 py-7">Plato</th>
                            <th className="px-10 py-7">Precio</th>
                            <th className="px-10 py-7 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan={3} className="px-10 py-32 text-center text-emerald-600 animate-pulse font-black">CARGANDO...</td></tr>
                        ) : filtered.map((d) => (
                            <tr key={d.id} className="group hover:bg-emerald-50/20 transition-all">
                                <td className="px-10 py-7">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-200">
                                            {d.image_url ? (
                                                <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-3xl opacity-20">🥘</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 uppercase">{d.name}</p>
                                            <p className="text-[10px] text-gray-400 font-black">{d.category}</p>
                                            {/* BOTÓN DE INSPECCIÓN PARA TI */}
                                            <button onClick={() => { console.log("DATA DEL PLATO:", d); alert(`URL en base de datos: ${d.image_url || 'VACÍO'}`); }} className="text-[9px] text-emerald-600 underline mt-1 flex items-center gap-1"><FiInfo /> Inspeccionar</button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-7 font-black text-xl tracking-tighter">S/ {d.price}</td>
                                <td className="px-10 py-7 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button onClick={() => handleOpenModal(d)} className="p-3 bg-white text-emerald-600 rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-600 hover:text-white transition-all"><FiEdit2 /></button>
                                        <button onClick={async () => { if (confirm('¿Eliminar?')) { await supabase.from('restaurante_menu').delete().eq('id', d.id); fetchDishes(); } }} className="p-3 bg-white text-red-500 rounded-xl border border-red-50 shadow-sm hover:bg-red-500 hover:text-white transition-all"><FiTrash2 /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <div className="bg-white w-full max-w-xl rounded-[3rem] p-10 shadow-2xl animate-slide-up overflow-y-auto max-h-[90vh]">
                        <h3 className="text-3xl font-black mb-8">{editingDish?.id ? 'Editar Plato' : 'Nuevo Plato'}</h3>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Nombre del Plato</label>
                                <input name="name" required defaultValue={editingDish?.name} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold" />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Categoría</label>
                                    <input name="category" required defaultValue={editingDish?.category} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Precio (S/)</label>
                                    <input name="price" type="number" step="0.5" required defaultValue={editingDish?.price} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold text-center" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Imagen (Desde tu PC)</label>
                                <div onClick={() => fileInputRef.current?.click()} className="border-4 border-dashed border-gray-100 rounded-3xl p-6 bg-gray-50/50 hover:bg-emerald-50 cursor-pointer text-center transition-all">
                                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                                    {uploading ? <FiLoader className="animate-spin text-3xl mx-auto text-emerald-600" /> :
                                        currentImageUrl ? <img src={currentImageUrl} className="h-32 mx-auto rounded-xl shadow-lg border-2 border-white" /> :
                                            <div className="text-gray-400"><FiUpload className="text-3xl mx-auto mb-2" /><p className="text-xs font-black uppercase">Subir Foto</p></div>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-4">Descripción Corta</label>
                                <textarea name="description" rows={2} defaultValue={editingDish?.description} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold resize-none" />
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 bg-gray-100 rounded-2xl font-black uppercase text-[10px]">Cerrar</button>
                                <button type="submit" disabled={saving || uploading} className="flex-[2] py-5 bg-[#1a3c1a] text-white rounded-2xl font-black uppercase text-[10px] shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2">
                                    {saving ? <FiLoader className="animate-spin" /> : <><FiCheckCircle /> Actualizar Datos Ahora</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
