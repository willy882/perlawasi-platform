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
    const [dishes, setDishes] = useState<any[]>([])

    // En un proyecto real, crearíamos una tabla 'platos'
    // Por ahora, simularemos con un estado local pero con la estructura lista
    useEffect(() => {
        setTimeout(() => {
            setDishes([
                { id: 1, name: 'Paiche en Salsa de Cocona', category: 'Fondo', price: 45, status: 'Disponible' },
                { id: 2, name: 'Juane Tradicional', category: 'Fondo', price: 35, status: 'Disponible' },
                { id: 3, name: 'Tacacho con Cecina', category: 'Fondo', price: 38, status: 'Agotado' },
            ])
            setLoading(false)
        }, 800)
    }, [])

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
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan={4} className="px-8 py-20 text-center"><FiLoader className="inline-block animate-spin" /></td></tr>
                            ) : (
                                dishes.map((d) => (
                                    <tr key={d.id} className="group hover:bg-emerald-50/30 transition-colors">
                                        <td className="px-8 py-6 font-bold text-gray-900">{d.name}</td>
                                        <td className="px-8 py-6 text-sm text-gray-500">{d.category}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${d.status === 'Disponible' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right font-black text-gray-900">S/ {d.price}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-[3rem] p-10 animate-slide-up">
                        <h3 className="text-2xl font-black mb-8 text-gray-900">Nuevo Plato en Carta</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="Nombre del plato" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 outline-none text-sm font-bold" />
                            <select className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent outline-none text-sm font-bold appearance-none">
                                <option>Entrada</option>
                                <option>Plato de Fondo</option>
                                <option>Postre</option>
                                <option>Bebida</option>
                            </select>
                            <input type="number" placeholder="Precio S/" className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 outline-none text-sm font-bold" />
                            <div className="flex gap-4 pt-4">
                                <button onClick={() => setShowModal(false)} className="flex-1 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black uppercase text-xs">Cancelar</button>
                                <button onClick={() => { toast.success('Pronto: Conexión a Base de Datos de Menú'); setShowModal(false) }} className="flex-[2] py-4 bg-emerald-700 text-white rounded-2xl font-black uppercase text-xs">Guardar Plato</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
