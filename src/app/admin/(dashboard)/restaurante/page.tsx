'use client'

import React, { useState, useEffect } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiLoader, FiPieChart, FiCoffee
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminRestaurante() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [dishes, setDishes] = useState<any[]>([])
    const [showNewCat, setShowNewCat] = useState(false)

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
            toast.error('Error: ' + error.message)
        } finally { setLoading(false) }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)
        try {
            const category = formData.get('category') === 'NEW' ? formData.get('new_category') : formData.get('category')
            const newDish = {
                name: formData.get('name'),
                category: category,
                price: parseFloat(formData.get('price') as string),
                available: true
            }
            const { error } = await supabase.from('restaurante_menu').insert([newDish])
            if (error) throw error
            toast.success('Plato añadido a la carta 🥘')
            setShowModal(false)
            fetchDishes()
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally { setSaving(false) }
    }

    const filtered = dishes.filter(d => d.name?.toLowerCase().includes(searchTerm.toLowerCase()))
    const categories = Array.from(new Set(dishes.map(d => d.category).filter(Boolean)))

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-display font-black text-gray-900 leading-none">Restaurante Perlawasi</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium italic">Gestión del menú y especialidades amazónicas.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-6 py-3.5 bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-900/20 hover:bg-black transition-all"
                >
                    <FiPlus /> Nuevo Plato
                </button>
            </div>

            <div className="max-w-md relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar plato..."
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
                                <th className="px-8 py-5">Nombre</th>
                                <th className="px-8 py-5">Categoría</th>
                                <th className="px-8 py-5">Estado</th>
                                <th className="px-8 py-5 text-right">Precio</th>
                                <th className="px-8 py-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={5} className="px-8 py-20 text-center"><FiLoader className="inline-block animate-spin" /></td></tr>
                            ) : filtered.map((d) => (
                                <tr key={d.id} className="group hover:bg-emerald-50/30 transition-colors">
                                    <td className="px-8 py-6 font-bold text-gray-900">{d.name}</td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-bold">{d.category}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${d.available ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                            {d.available ? 'Disponible' : 'Agotado'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right font-black text-gray-900">S/ {d.price}</td>
                                    <td className="px-8 py-6 text-right">
                                        <button onClick={async () => { if (confirm('¿Eliminar?')) { await supabase.from('restaurante_menu').delete().eq('id', d.id); fetchDishes(); } }} className="p-2.5 text-red-600 opacity-0 group-hover:opacity-100"><FiTrash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 animate-slide-up">
                        <h3 className="text-2xl font-black mb-8 text-gray-900">Nuevo Plato en Carta</h3>
                        <form onSubmit={handleSave} className="space-y-6">
                            <input name="name" required type="text" placeholder="Nombre del plato" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 outline-none text-sm font-bold" />
                            <div className="space-y-2">
                                <select name="category" onChange={(e) => setShowNewCat(e.target.value === 'NEW')} className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent outline-none text-sm font-bold appearance-none">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    <option value="NEW" className="text-emerald-600">+ Nueva Categoría (Entrada, Fondo...)</option>
                                </select>
                                {showNewCat && <input name="new_category" required type="text" placeholder="Ej: Fondos, Postres, Amazonian Mix..." className="w-full px-5 py-3.5 bg-emerald-50 rounded-2xl outline-none font-bold" />}
                            </div>
                            <input name="price" required type="number" step="0.5" placeholder="Precio S/" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 outline-none text-sm font-bold" />
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase text-xs">Cancelar</button>
                                <button type="submit" disabled={saving} className="flex-[2] py-4 bg-emerald-700 text-white rounded-2xl font-black uppercase text-xs">{saving ? 'Guardando...' : 'Guardar Plato🥘'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
