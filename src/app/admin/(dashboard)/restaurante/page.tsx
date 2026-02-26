'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiCheckCircle, FiXCircle, FiLoader, FiCamera, FiImage, FiUpload, FiRefreshCw, FiInfo, FiLink
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
        } catch (error: any) {
            toast.error('Error al cargar: ' + error.message)
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
            toast.loading('Subiendo imagen...', { id: 'upload' })
            const url = await uploadImage(file, 'products')
            setCurrentImageUrl(url)
            toast.success('¡Imagen subida con éxito!', { id: 'upload' })
        } catch (error: any) {
            toast.error('Error al subir: ' + error.message, { id: 'upload' })
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
                image_url: currentImageUrl, // Usamos el estado que ya tiene la URL
                available: formData.get('available') === 'on' || formData.get('available') === 'true'
            }

            if (editingDish?.id) {
                const { error } = await supabase
                    .from('restaurante_menu')
                    .update(dishData)
                    .eq('id', editingDish.id)
                if (error) throw error
                toast.success('¡Plato actualizado! 🥘')
            } else {
                const { error } = await supabase
                    .from('restaurante_menu')
                    .insert([dishData])
                if (error) throw error
                toast.success('¡Plato creado! ✨')
            }

            setShowModal(false)
            fetchDishes()
        } catch (error: any) {
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
                    <h2 className="text-4xl font-display font-black text-[#1a3c1a] leading-none tracking-tighter">Menú Restaurante</h2>
                    <p className="text-gray-500 mt-3 text-sm font-medium italic">Gestión de la carta Perlawasi.</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchDishes} className="p-4 bg-white text-emerald-600 rounded-2xl hover:bg-emerald-50 transition-all border border-emerald-100 shadow-sm">
                        <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                    </button>
                    <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-8 py-4 bg-[#1a3c1a] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-black transition-all">
                        <FiPlus /> Registrar Nuevo
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] border-b border-gray-100">
                            <th className="px-8 py-6">Plato</th>
                            <th className="px-8 py-6">Categoría</th>
                            <th className="px-8 py-6 text-right">Precio</th>
                            <th className="px-8 py-6 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr><td colSpan={4} className="px-10 py-32 text-center text-emerald-600 animate-pulse font-black text-xs uppercase tracking-widest">Sincronizando menú...</td></tr>
                        ) : filtered.map((d) => (
                            <tr key={d.id} className="group hover:bg-emerald-50/20 transition-all">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shadow-inner">
                                            {d.image_url ? (
                                                <img src={d.image_url} alt={d.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-2xl grayscale opacity-30">🥘</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 uppercase text-sm tracking-tight">{d.name}</p>
                                            <p className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">{d.available ? '● En carta' : '○ Agotado'}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6"><span className="px-3 py-1 bg-gray-100 text-gray-500 text-[9px] font-black uppercase rounded-lg">{d.category}</span></td>
                                <td className="px-8 py-6 text-right font-black text-lg tracking-tighter text-gray-900">S/ {d.price}</td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleOpenModal(d)} className="p-3 bg-white text-emerald-600 rounded-xl border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all"><FiEdit2 size={16} /></button>
                                        <button onClick={async () => { if (confirm('¿Eliminar?')) { await supabase.from('restaurante_menu').delete().eq('id', d.id); fetchDishes(); } }} className="p-3 bg-white text-red-400 rounded-xl border border-red-50 hover:bg-red-500 hover:text-white transition-all"><FiTrash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1a3c1a]/60 backdrop-blur-xl">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 shadow-2xl animate-slide-up overflow-y-auto max-h-[90vh] border border-white/20">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter">{editingDish?.id ? 'Editar Plato' : 'Nuevo Plato'}</h3>
                            <button onClick={() => setShowModal(false)} className="p-3 bg-gray-50 text-gray-400 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><FiXCircle size={24} /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Nombre del Plato</label>
                                <input name="name" required defaultValue={editingDish?.name} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold text-gray-900 shadow-inner" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Categoría</label>
                                    <select name="category" defaultValue={editingDish?.category} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-bold text-gray-900 shadow-inner">
                                        <option value="Platos Típicos">Platos Típicos</option>
                                        <option value="Pescados">Pescados</option>
                                        <option value="Pollos">Pollos</option>
                                        <option value="Cervezas">Cervezas</option>
                                        <option value="Bebidas">Bebidas</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Precio (S/)</label>
                                    <input name="price" type="number" step="0.5" required defaultValue={editingDish?.price} className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none font-black text-center text-gray-900 shadow-inner" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-4 tracking-widest">Fotografía del Plato</label>
                                <div onClick={() => fileInputRef.current?.click()} className="border-4 border-dashed border-gray-100 rounded-[2rem] p-8 bg-gray-50 hover:bg-emerald-50 hover:border-emerald-200 cursor-pointer text-center transition-all group overflow-hidden relative min-h-[160px] flex flex-col items-center justify-center">
                                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                                    {uploading ? (
                                        <FiLoader className="animate-spin text-4xl text-emerald-600" />
                                    ) : currentImageUrl ? (
                                        <img src={currentImageUrl} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="text-gray-300">
                                            <FiCamera className="text-4xl mx-auto mb-2 group-hover:text-emerald-500 transition-colors" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Subir desde Galería</p>
                                        </div>
                                    )}
                                </div>
                                {/* CAMPO DE URL DE RESPALDO (Por si la subida falla) */}
                                <div className="flex gap-2 bg-gray-50 p-2 rounded-xl">
                                    <FiLink className="text-gray-400 mt-1" />
                                    <input
                                        type="text"
                                        value={currentImageUrl}
                                        onChange={(e) => setCurrentImageUrl(e.target.value)}
                                        placeholder="O pega aquí el enlace de la imagen..."
                                        className="bg-transparent border-none outline-none text-[9px] w-full font-bold text-gray-500"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-5 bg-gray-100 text-gray-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-200 transition-all">Cancelar</button>
                                <button type="submit" disabled={saving || uploading} className="flex-[2] py-5 bg-[#1a3c1a] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-900/30 hover:bg-black transition-all flex items-center justify-center gap-2">
                                    {saving ? <FiLoader className="animate-spin" /> : <><FiCheckCircle /> Confirmar y Publicar</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
