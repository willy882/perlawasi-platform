'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiCheckCircle, FiXCircle, FiLoader,
    FiImage, FiSun, FiDroplet, FiUpload, FiX
} from 'react-icons/fi'
import { supabase, uploadImage } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

// ─── Categoría → tipo de formulario ──────────────────────────────────────────
const SUSTRATO_KEYS = ['sustrato', 'sustratos', 'nutriente', 'nutrientes', 'abono', 'abonos']
const MACETA_KEYS   = ['maceta', 'macetas']
const TUTOR_KEYS    = ['tutor', 'tutores']

type CatType = 'plant' | 'maceta' | 'tutor' | 'sustrato'

function getCatType(cat: string): CatType {
    const c = (cat || '').toLowerCase()
    if (SUSTRATO_KEYS.some(k => c.includes(k))) return 'sustrato'
    if (MACETA_KEYS.some(k => c.includes(k)))   return 'maceta'
    if (TUTOR_KEYS.some(k => c.includes(k)))    return 'tutor'
    return 'plant'
}

// Variante tamaño+precio para sustratos/abonos
interface Variant { size: string; price: number }

function parseVariants(tags: string[]): Variant[] {
    return (tags || [])
        .filter(t => /^.+:\d/.test(t))
        .map(t => { const [size, price] = t.split(':'); return { size: size.trim(), price: parseFloat(price) } })
}

function encodeVariants(variants: Variant[]): string[] {
    return variants.filter(v => v.size && v.price > 0).map(v => `${v.size}:${v.price}`)
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function AdminVivero() {
    const [searchTerm, setSearchTerm]     = useState('')
    const [showModal, setShowModal]       = useState(false)
    const [editingPlant, setEditingPlant] = useState<any>(null)
    const [loading, setLoading]           = useState(true)
    const [saving, setSaving]             = useState(false)
    const [uploading, setUploading]       = useState(false)
    const [plants, setPlants]             = useState<any[]>([])
    const [showNewCat, setShowNewCat]     = useState(false)
    const [selectedCat, setSelectedCat]  = useState('')
    const [variants, setVariants]         = useState<Variant[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const catType = getCatType(selectedCat)

    useEffect(() => { fetchPlants() }, [])

    async function fetchPlants() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('plantas').select('*').order('created_at', { ascending: false })
            if (error) throw error
            setPlants(data || [])
        } catch (error: any) {
            toast.error('Error al cargar vivero: ' + error.message)
        } finally { setLoading(false) }
    }

    const handleOpenModal = (plant: any = null) => {
        setEditingPlant(plant)
        setShowNewCat(false)
        const cat = plant?.category || ''
        setSelectedCat(cat)
        const ct = getCatType(cat)
        setVariants(ct === 'sustrato' ? parseVariants(plant?.tags || []) : [])
        setShowModal(true)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        try {
            setUploading(true)
            toast.loading('Subiendo imagen...', { id: 'plant_upload' })
            const url = await uploadImage(file, 'products')
            setEditingPlant((prev: any) => ({ ...(prev || {}), image_url: url }))
            toast.success('Imagen subida ✨', { id: 'plant_upload' })
        } catch (error: any) {
            toast.error('Error: ' + error.message, { id: 'plant_upload' })
        } finally { setUploading(false) }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const fd = new FormData(e.currentTarget)
        const ct = catType

        try {
            const category = fd.get('category') === 'NEW' ? fd.get('new_category') : fd.get('category')

            // Tags: para sustrato guarda variantes; para el resto, tags de texto
            let tags: string[] = []
            if (ct === 'sustrato') {
                tags = encodeVariants(variants)
            } else {
                tags = (fd.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || []
            }

            const plantData: any = {
                name:            fd.get('name'),
                scientific_name: fd.get('scientific_name'),
                category,
                price:           parseFloat(fd.get('price') as string) || 0,
                stock:           parseInt(fd.get('stock') as string) || 0,
                description:     fd.get('description'),
                image_url:       editingPlant?.image_url || fd.get('image_url'),
                status:          parseInt(fd.get('stock') as string) > 0 ? 'In Stock' : 'Out of Stock',
                emoji:           fd.get('emoji') || '🌿',
                tags,
            }

            // Campos según tipo
            if (ct === 'plant') {
                plantData.difficulty = fd.get('difficulty')
                plantData.light      = fd.get('light')
                plantData.water      = fd.get('water')
                plantData.env        = fd.get('env')
                plantData.pet_friendly = fd.get('pet_friendly') === 'true'
            } else if (ct === 'maceta') {
                plantData.difficulty = fd.get('tamano')       // tamaño → difficulty
                plantData.light      = fd.get('material')     // material → light
                plantData.water      = fd.get('color_maceta') // color → water
                plantData.env        = null
                plantData.pet_friendly = false
            } else if (ct === 'tutor') {
                plantData.difficulty = fd.get('tipo_tutor')   // tipo → difficulty
                plantData.light      = fd.get('material')     // material → light
                plantData.water      = fd.get('altura')       // altura → water
                plantData.env        = null
                plantData.pet_friendly = false
            } else if (ct === 'sustrato') {
                plantData.difficulty = fd.get('tipo_sustrato') // tipo → difficulty
                plantData.light      = fd.get('volumen_base')  // volumen base → light
                plantData.water      = fd.get('aplicacion')    // aplicación → water
                plantData.env        = fd.get('composicion')   // composición → env
                plantData.pet_friendly = false
            }

            if (editingPlant?.id) {
                const { error } = await supabase.from('plantas').update(plantData).eq('id', editingPlant.id)
                if (error) throw error
                toast.success('Especie actualizada ✨')
            } else {
                const { error } = await supabase.from('plantas').insert([plantData])
                if (error) throw error
                toast.success(ct === 'sustrato' ? 'Sustrato añadido 🌱' : 'Especie añadida 🌿')
            }

            setShowModal(false)
            fetchPlants()
        } catch (error: any) {
            toast.error('Error al guardar: ' + error.message)
        } finally { setSaving(false) }
    }

    const filtered = plants.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const categoriesList = Array.from(new Set(plants.map((p: any) => p.category).filter(Boolean)))
    if (categoriesList.length === 0)
        categoriesList.push('Interior', 'Exterior', 'Suculentas', 'Ornamentales', 'Huerta', 'Macetas', 'Tutores', 'Sustratos', 'Nutrientes')

    // ── Variantes editor helpers ──────────────────────────────────────────────
    const addVariant = () => setVariants(v => [...v, { size: '', price: 0 }])
    const removeVariant = (i: number) => setVariants(v => v.filter((_, idx) => idx !== i))
    const updateVariant = (i: number, field: keyof Variant, value: string) =>
        setVariants(v => v.map((item, idx) => idx === i ? { ...item, [field]: field === 'price' ? parseFloat(value) || 0 : value } : item))

    return (
        <div className="space-y-8 animate-fade-in px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-display font-black text-gray-900 leading-none tracking-tight">Vivero Perlawasi</h2>
                    <p className="text-gray-500 mt-3 text-sm font-medium italic">Gestión botánica y biodiversidad local.</p>
                </div>
                <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-8 py-4 bg-[#1a3c1a] text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-900/20 hover:bg-black transition-all">
                    <FiPlus /> Nueva Especie
                </button>
            </div>

            <div className="max-w-xl relative">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Buscar por nombre, científico o categoría..."
                    className="w-full pl-14 pr-4 py-4 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] border-b border-gray-100">
                                <th className="px-10 py-7">Nombre / Científico</th>
                                <th className="px-10 py-7">Categoría</th>
                                <th className="px-10 py-7">Stock</th>
                                <th className="px-10 py-7">Precio</th>
                                <th className="px-10 py-7 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="px-10 py-32 text-center"><FiLoader className="inline-block animate-spin text-emerald-600 text-3xl" /></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="px-10 py-32 text-center text-gray-400 font-medium italic">No hay plantas registradas.</td></tr>
                            ) : filtered.map((p) => (
                                <tr key={p.id} className="group hover:bg-emerald-50/20 transition-all duration-300">
                                    <td className="px-10 py-7">
                                        <div className="flex items-center gap-5">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden shadow-sm border border-gray-100 shrink-0">
                                                {p.image_url
                                                    ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                                    : <span className="text-4xl grayscale opacity-30">{p.emoji || '🌿'}</span>}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 text-lg leading-tight uppercase tracking-tight">{p.name}</p>
                                                <p className="text-xs text-emerald-600 mt-1 font-black italic">{p.scientific_name || getCatType(p.category)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-7">
                                        <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded-full tracking-widest">{p.category}</span>
                                    </td>
                                    <td className="px-10 py-7">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${p.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>{p.stock} uds.</span>
                                    </td>
                                    <td className="px-10 py-7 font-black text-gray-900 text-xl tracking-tighter">
                                        {getCatType(p.category) === 'sustrato' && parseVariants(p.tags || []).length > 0
                                            ? <span className="text-sm text-emerald-700">Desde S/ {Math.min(...parseVariants(p.tags).map(v => v.price))}</span>
                                            : `S/ ${p.price}`}
                                    </td>
                                    <td className="px-10 py-7 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => handleOpenModal(p)} className="p-3.5 bg-white text-emerald-600 rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1"><FiEdit2 size={18} /></button>
                                            <button onClick={async () => { if (confirm('¿Eliminar esta especie?')) { await supabase.from('plantas').delete().eq('id', p.id); fetchPlants(); toast.success('Especie eliminada') } }} className="p-3.5 bg-white text-red-500 rounded-xl border border-red-50 shadow-sm hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1"><FiTrash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── MODAL CRUD ─────────────────────────────────────────────────── */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
                    <div className="relative bg-white w-full max-w-2xl rounded-[3.5rem] p-12 shadow-2xl max-h-[90vh] overflow-y-auto border border-white/20">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-4xl font-black text-gray-900 leading-none tracking-tighter">
                                    {editingPlant?.id ? 'Editar' : 'Nueva'} {
                                        catType === 'maceta' ? 'Maceta' :
                                        catType === 'tutor' ? 'Tutor' :
                                        catType === 'sustrato' ? 'Sustrato / Abono' :
                                        'Especie'
                                    }
                                </h3>
                                <p className="text-gray-400 text-sm mt-2 font-medium italic">
                                    {catType === 'maceta' && 'Ficha de maceta y recipiente.'}
                                    {catType === 'tutor' && 'Ficha de tutor o soporte.'}
                                    {catType === 'sustrato' && 'Ficha de sustrato o abono orgánico.'}
                                    {catType === 'plant' && 'Ficha botánica Perlawasi.'}
                                </p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-3.5 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition-colors"><FiXCircle size={28} /></button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">

                            {/* Nombre + Científico / Ref */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Nombre</label>
                                    <input name="name" required type="text" defaultValue={editingPlant?.name}
                                        placeholder={catType === 'maceta' ? 'Ej: Maceta Terracota' : catType === 'tutor' ? 'Ej: Tutor Bambú' : catType === 'sustrato' ? 'Ej: Sustrato Orchídeas' : 'Ej: Costilla de Adán'}
                                        className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-base font-bold transition-all shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">
                                        {catType === 'plant' ? 'Nombre Científico' : catType === 'maceta' ? 'Referencia / Modelo' : catType === 'tutor' ? 'Referencia' : 'Marca / Proveedor'}
                                    </label>
                                    <input name="scientific_name" type="text" defaultValue={editingPlant?.scientific_name}
                                        placeholder={catType === 'plant' ? 'Ej: Monstera deliciosa' : 'Opcional'}
                                        className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-base font-bold transition-all shadow-inner italic" />
                                </div>
                            </div>

                            {/* Categoría + Precio + Stock */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Categoría</label>
                                        <select name="category"
                                            value={selectedCat || editingPlant?.category || ''}
                                            onChange={(e) => {
                                                const val = e.target.value
                                                setShowNewCat(val === 'NEW')
                                                setSelectedCat(val === 'NEW' ? '' : val)
                                                if (getCatType(val) === 'sustrato') setVariants([])
                                            }}
                                            className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent outline-none text-sm font-bold appearance-none cursor-pointer focus:border-emerald-500 shadow-inner">
                                            <option value="" disabled>Seleccionar categoría...</option>
                                            {categoriesList.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            <option value="NEW" className="text-emerald-700 font-bold">+ Crear Nueva...</option>
                                        </select>
                                    {showNewCat && (
                                        <input name="new_category" required type="text" placeholder="Nueva categoría"
                                            onChange={(e) => setSelectedCat(e.target.value)}
                                            className="w-full px-8 py-5 bg-emerald-50 border-2 border-emerald-100 rounded-2xl outline-none font-bold shadow-inner" />
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">
                                        {catType === 'sustrato' ? 'Precio Base (S/)' : 'Precio (S/)'}
                                    </label>
                                    <input name="price" required={catType !== 'sustrato'} type="number" step="0.5"
                                        defaultValue={editingPlant?.price} placeholder="0.00"
                                        className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-base font-black shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Stock</label>
                                    <input name="stock" required type="number" defaultValue={editingPlant?.stock} placeholder="0"
                                        className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-base font-bold shadow-inner" />
                                </div>
                            </div>

                            {/* Imagen */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6 flex items-center gap-2">Imagen <FiImage className="text-emerald-500" /></label>
                                <div className="flex gap-2">
                                    <input name="image_url" type="text" value={editingPlant?.image_url || ''}
                                        onChange={(e) => setEditingPlant((prev: any) => ({ ...(prev || {}), image_url: e.target.value }))}
                                        placeholder="URL o sube una imagen"
                                        className="flex-1 px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-xs font-medium shadow-inner" />
                                    <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageUpload} />
                                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                                        className="px-6 bg-emerald-50 text-emerald-700 rounded-2xl border-2 border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center">
                                        {uploading ? <FiLoader className="animate-spin" /> : <FiUpload size={20} />}
                                    </button>
                                </div>
                                {editingPlant?.image_url && (
                                    <img src={editingPlant.image_url} alt="Preview" className="h-32 w-auto rounded-3xl mx-auto border-4 border-emerald-50 shadow-xl mt-4" />
                                )}
                            </div>

                            {/* ══ CAMPOS ESPECÍFICOS POR CATEGORÍA ══ */}

                            {/* PLANTAS: Luz, Riego, Ambiente, Dificultad, Pet Friendly */}
                            {catType === 'plant' && (
                                <>
                                    <div className="rounded-2xl bg-emerald-50/60 p-6 space-y-4">
                                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Cuidados de la planta</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 flex items-center gap-1">Luz <FiSun /></label>
                                                <select name="light" defaultValue={editingPlant?.light || 'Media'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                    <option>Sombra</option><option>Media</option><option>Directa</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400 flex items-center gap-1">Riego <FiDroplet /></label>
                                                <select name="water" defaultValue={editingPlant?.water || 'Medio'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                    <option>Bajo</option><option>Medio</option><option>Alto</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400">Ambiente</label>
                                                <select name="env" defaultValue={editingPlant?.env || 'Interior'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                    <option>Interior</option><option>Exterior</option><option>Ambos</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400">Pet Friendly</label>
                                                <select name="pet_friendly" defaultValue={editingPlant?.pet_friendly ? 'true' : 'false'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                    <option value="true">Sí</option><option value="false">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400">Dificultad</label>
                                                <select name="difficulty" defaultValue={editingPlant?.difficulty || 'Fácil'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                    <option>Fácil</option><option>Media</option><option>Experto</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400">Emoji decorativo</label>
                                                <input name="emoji" type="text" defaultValue={editingPlant?.emoji || '🌿'} maxLength={2}
                                                    className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xl text-center shadow-inner" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Etiquetas (separadas por coma)</label>
                                        <input name="tags" type="text" defaultValue={editingPlant?.tags?.join(', ')}
                                            placeholder="Decorativa, Purificadora, Fácil cuidado"
                                            className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent outline-none text-sm font-bold shadow-inner" />
                                    </div>
                                </>
                            )}

                            {/* MACETAS: Tamaño, Material, Color */}
                            {catType === 'maceta' && (
                                <div className="rounded-2xl bg-orange-50/60 p-6 space-y-4">
                                    <p className="text-[10px] font-black text-orange-700 uppercase tracking-widest">Características de la maceta</p>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Tamaño</label>
                                            <select name="tamano" defaultValue={editingPlant?.difficulty || 'Mediana'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                <option>Mini (≤10cm)</option>
                                                <option>Pequeña (11–15cm)</option>
                                                <option>Mediana (16–25cm)</option>
                                                <option>Grande (26–35cm)</option>
                                                <option>XL (≥36cm)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Material</label>
                                            <select name="material" defaultValue={editingPlant?.light || 'Terracota'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                <option>Terracota</option><option>Plástico</option><option>Cerámica</option>
                                                <option>Madera</option><option>Metal</option><option>Fibra de coco</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Color</label>
                                            <input name="color_maceta" type="text" defaultValue={editingPlant?.water} placeholder="Ej: Terracota natural"
                                                className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs shadow-inner" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400">Emoji</label>
                                        <input name="emoji" type="text" defaultValue={editingPlant?.emoji || '🪴'} maxLength={2}
                                            className="w-24 px-4 py-3 bg-white rounded-xl outline-none font-bold text-xl text-center shadow-inner" />
                                    </div>
                                </div>
                            )}

                            {/* TUTORES: Tipo, Material, Altura */}
                            {catType === 'tutor' && (
                                <div className="rounded-2xl bg-amber-50/60 p-6 space-y-4">
                                    <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Características del tutor</p>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Tipo de tutor</label>
                                            <select name="tipo_tutor" defaultValue={editingPlant?.difficulty || 'Estaca'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                <option>Estaca</option><option>Espiral</option><option>Arco</option>
                                                <option>Malla</option><option>Tótem de musgo</option><option>Otro</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Material</label>
                                            <select name="material" defaultValue={editingPlant?.light || 'Bambú'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                <option>Bambú</option><option>Metal</option><option>Plástico</option>
                                                <option>Madera</option><option>Musgo</option><option>Fibra</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Altura / Largo</label>
                                            <input name="altura" type="text" defaultValue={editingPlant?.water} placeholder="Ej: 60cm, 1m"
                                                className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs shadow-inner" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400">Emoji</label>
                                        <input name="emoji" type="text" defaultValue={editingPlant?.emoji || '🪵'} maxLength={2}
                                            className="w-24 px-4 py-3 bg-white rounded-xl outline-none font-bold text-xl text-center shadow-inner" />
                                    </div>
                                </div>
                            )}

                            {/* SUSTRATOS / ABONOS: Tipo, Composición, Aplicación + Variantes de tamaño */}
                            {catType === 'sustrato' && (
                                <>
                                    <div className="rounded-2xl bg-green-50/60 p-6 space-y-4">
                                        <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">Características del sustrato / abono</p>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400">Tipo</label>
                                                <select name="tipo_sustrato" defaultValue={editingPlant?.difficulty || 'Sustrato Universal'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                    <option>Sustrato Universal</option>
                                                    <option>Sustrato Orchídeas</option>
                                                    <option>Sustrato Cactus</option>
                                                    <option>Sustrato Tropical</option>
                                                    <option>Humus de lombriz</option>
                                                    <option>Compost orgánico</option>
                                                    <option>Abono foliar</option>
                                                    <option>Fertilizante NPK</option>
                                                    <option>Otro</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-gray-400">Aplicación</label>
                                                <select name="aplicacion" defaultValue={editingPlant?.water || 'Trasplante'} className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs uppercase shadow-inner">
                                                    <option>Trasplante</option><option>Siembra</option><option>Riego</option>
                                                    <option>Foliar</option><option>Enraizamiento</option><option>General</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Composición / Ingredientes</label>
                                            <input name="composicion" type="text" defaultValue={editingPlant?.env}
                                                placeholder="Ej: Turba, perlita, corteza de pino"
                                                className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs shadow-inner" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Volumen base (para precio base)</label>
                                            <input name="volumen_base" type="text" defaultValue={editingPlant?.light}
                                                placeholder="Ej: 1L, 5kg"
                                                className="w-full px-4 py-3 bg-white rounded-xl outline-none font-bold text-xs shadow-inner" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-gray-400">Emoji</label>
                                            <input name="emoji" type="text" defaultValue={editingPlant?.emoji || '🪱'} maxLength={2}
                                                className="w-24 px-4 py-3 bg-white rounded-xl outline-none font-bold text-xl text-center shadow-inner" />
                                        </div>
                                    </div>

                                    {/* Editor de variantes tamaño + precio */}
                                    <div className="rounded-2xl border-2 border-dashed border-emerald-200 p-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Variantes de tamaño y precio</p>
                                                <p className="text-[10px] text-gray-400 mt-1">El cliente elegirá el tamaño y el precio cambia automáticamente.</p>
                                            </div>
                                            <button type="button" onClick={addVariant}
                                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-emerald-700 transition-all">
                                                <FiPlus /> Agregar tamaño
                                            </button>
                                        </div>

                                        {variants.length === 0 && (
                                            <p className="text-center text-gray-300 text-sm font-medium py-4 italic">
                                                Sin variantes — el cliente verá el precio base.
                                            </p>
                                        )}

                                        <div className="space-y-3">
                                            {variants.map((v, i) => (
                                                <div key={i} className="flex gap-3 items-center">
                                                    <input
                                                        type="text"
                                                        value={v.size}
                                                        onChange={(e) => updateVariant(i, 'size', e.target.value)}
                                                        placeholder="Tamaño (ej: 1L, 5kg, 20L)"
                                                        className="flex-1 px-5 py-3 bg-gray-50 rounded-xl border-2 border-transparent focus:border-emerald-400 outline-none font-bold text-sm shadow-inner"
                                                    />
                                                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-5 py-3 border-2 border-transparent focus-within:border-emerald-400 shadow-inner">
                                                        <span className="text-gray-400 font-black text-xs">S/</span>
                                                        <input
                                                            type="number"
                                                            step="0.5"
                                                            value={v.price || ''}
                                                            onChange={(e) => updateVariant(i, 'price', e.target.value)}
                                                            placeholder="0.00"
                                                            className="w-24 bg-transparent outline-none font-black text-sm"
                                                        />
                                                    </div>
                                                    <button type="button" onClick={() => removeVariant(i)}
                                                        className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                                        <FiX size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Descripción — para todos */}
                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">
                                    {catType === 'sustrato' ? 'Notas / Modo de uso' : catType === 'maceta' ? 'Notas adicionales' : catType === 'tutor' ? 'Notas adicionales' : 'Descripción Botánica'}
                                </label>
                                <textarea name="description" defaultValue={editingPlant?.description} rows={3}
                                    placeholder={catType === 'sustrato' ? 'Instrucciones de uso, dosis recomendada...' : 'Características particulares...'}
                                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-sm font-bold resize-none transition-all shadow-inner" />
                            </div>

                            <div className="flex gap-5 pt-6">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 py-6 bg-gray-100 text-gray-500 rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all">
                                    Cancelar
                                </button>
                                <button type="submit" disabled={saving || uploading}
                                    className="flex-[2] py-6 bg-[#1a3c1a] text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-emerald-900/30 hover:bg-black transition-all flex items-center justify-center gap-4">
                                    {(saving || uploading) ? <FiLoader className="animate-spin text-xl" /> : <><FiCheckCircle className="text-xl" /> {editingPlant?.id ? 'Actualizar' : 'Guardar'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
