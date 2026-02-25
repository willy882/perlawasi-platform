'use client'

import React, { useState, useEffect } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiFilter, FiDownload, FiCheckCircle, FiXCircle,
    FiLoader
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminPlantas() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [plants, setPlants] = useState<any[]>([])

    useEffect(() => {
        fetchPlants()
    }, [])

    async function fetchPlants() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('plantas')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setPlants(data || [])
        } catch (error: any) {
            toast.error('Error al cargar plantas: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)

        try {
            const newPlant = {
                name: formData.get('name'),
                scientific_name: formData.get('scientific'),
                price: parseFloat(formData.get('price') as string),
                stock: parseInt(formData.get('stock') as string),
                category: formData.get('category'),
                description: formData.get('description'),
                status: parseInt(formData.get('stock') as string) > 0 ? 'In Stock' : 'Out of Stock'
            }

            const { error } = await supabase.from('plantas').insert([newPlant])
            if (error) throw error

            toast.success('Planta guardada correctamente 🌿')
            setShowModal(false)
            fetchPlants()
        } catch (error: any) {
            toast.error('Error al guardar: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const filteredPlants = plants.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.scientific_name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 max-w-lg relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o especie..."
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-3.5 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm">
                        <FiFilter />
                    </button>
                    <button className="p-3.5 bg-white border border-gray-100 text-gray-400 rounded-2xl hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm">
                        <FiDownload />
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all"
                    >
                        <FiPlus /> Nueva Planta
                    </button>
                </div>
            </div>

            {/* Plants Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em]">
                                <th className="px-8 py-5">Nombre / Especie</th>
                                <th className="px-8 py-5">Categoría</th>
                                <th className="px-8 py-5">Stock</th>
                                <th className="px-8 py-5">Precio</th>
                                <th className="px-8 py-5">Estado</th>
                                <th className="px-8 py-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <FiLoader className="inline-block animate-spin text-emerald-500 text-3xl mb-2" />
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sincronizando Vivero...</p>
                                    </td>
                                </tr>
                            ) : filteredPlants.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <p className="text-gray-400 text-sm font-medium italic">No se encontraron plantas en esta sección.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredPlants.map((plant) => (
                                    <tr key={plant.id} className="group hover:bg-emerald-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div>
                                                <p className="font-bold text-gray-900">{plant.name}</p>
                                                <p className="text-xs text-gray-400 italic">{plant.scientific_name}</p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                                            {plant.category}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${plant.stock > 10 ? 'bg-emerald-500' :
                                                            plant.stock > 0 ? 'bg-orange-500' : 'bg-red-500'
                                                            }`}
                                                        style={{ width: `${Math.min((plant.stock / 20) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-black text-gray-700">{plant.stock}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 font-black text-gray-900">
                                            S/ {plant.price}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${plant.status === 'In Stock' ? 'text-emerald-600' :
                                                plant.status === 'Low Stock' ? 'text-orange-600' : 'text-red-600'
                                                }`}>
                                                {plant.status === 'In Stock' ? <FiCheckCircle /> : <FiXCircle />}
                                                {plant.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                                                    <FiEdit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={async () => {
                                                        if (confirm('¿Seguro que deseas eliminar esta planta?')) {
                                                            const { error } = await supabase.from('plantas').delete().eq('id', plant.id)
                                                            if (error) toast.error('Error al eliminar')
                                                            else { toast.success('Planta eliminada'); fetchPlants() }
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

            {/* Modal Mockup */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up">
                        <div className="p-10">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Agregar Nueva Planta</h3>
                            <p className="text-gray-400 text-sm mb-8 font-medium">Completa los datos para integrar una joya botánica al catálogo.</p>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Nombre Público</label>
                                        <input name="name" type="text" required placeholder="Ej: Begonia Maculata" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Nombre Científico</label>
                                        <input name="scientific" type="text" placeholder="Nombre en latín..." className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Precio (S/)</label>
                                        <input name="price" type="number" step="0.01" required placeholder="00.00" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Stock Inicial</label>
                                        <input name="stock" type="number" required placeholder="0" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Categoría</label>
                                        <select name="category" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold appearance-none">
                                            <option value="Interior">Interior</option>
                                            <option value="Exterior">Exterior</option>
                                            <option value="Exóticas">Exóticas</option>
                                            <option value="Cactus">Cactus</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-gray-400">Descripción Botánica</label>
                                    <textarea name="description" rows={3} placeholder="Describe los cuidados y belleza de esta planta..." className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold resize-none" />
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
                                        className="flex-[2] px-8 py-4 bg-emerald-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {saving ? <FiLoader className="animate-spin" /> : 'Guardar Planta 🌿'}
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
