'use client'

import React, { useState, useEffect } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiFilter, FiCheckCircle, FiXCircle,
    FiLoader, FiUser, FiCalendar, FiClock
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminReservas() {
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [bookings, setBookings] = useState<any[]>([])

    useEffect(() => {
        fetchBookings()
    }, [])

    async function fetchBookings() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('reservas')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setBookings(data || [])
        } catch (error: any) {
            toast.error('Error al cargar reservas: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)

        try {
            const newBooking = {
                customer_name: formData.get('name'),
                customer_email: formData.get('email'),
                customer_phone: formData.get('phone'),
                check_in: formData.get('check_in'),
                check_out: formData.get('check_out'),
                guests: parseInt(formData.get('guests') as string),
                room_type: formData.get('room_type'),
                total_price: parseFloat(formData.get('price') as string),
                status: 'Confirmado'
            }

            const { error } = await supabase.from('reservas').insert([newBooking])
            if (error) throw error

            toast.success('Reserva confirmada correctamente 🏨')
            setShowModal(false)
            fetchBookings()
        } catch (error: any) {
            toast.error('Error al guardar: ' + error.message)
        } finally {
            setSaving(false)
        }
    }

    const filteredBookings = bookings.filter(b =>
        b.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customer_email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-display font-black text-gray-900 leading-none">Lodge (Reservas)</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium italic">Gestión de huéspedes y disponibilidad del Lodge.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 px-6 py-3.5 bg-[#1a3c1a] text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/20 hover:bg-black hover:-translate-y-0.5 transition-all"
                    >
                        <FiPlus /> Nueva Reserva
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em]">
                                <th className="px-8 py-5">Huésped</th>
                                <th className="px-8 py-5">Estancia</th>
                                <th className="px-8 py-5">Pax</th>
                                <th className="px-8 py-5">Habitación</th>
                                <th className="px-8 py-5">Estado</th>
                                <th className="px-8 py-5 text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <FiLoader className="inline-block animate-spin text-emerald-500 text-3xl mb-2" />
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sincronizando Reservas...</p>
                                    </td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <p className="text-gray-400 text-sm font-medium italic">No hay reservas registradas.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((b) => (
                                    <tr key={b.id} className="group hover:bg-emerald-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                    <FiUser />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{b.customer_name}</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">{b.customer_email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                                                    <FiCalendar size={12} className="text-emerald-600" /> {b.check_in}
                                                </p>
                                                <p className="text-[10px] text-gray-400 flex items-center gap-1.5">
                                                    <FiClock size={12} /> Salida: {b.check_out}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500 font-bold">
                                            {b.guests}
                                        </td>
                                        <td className="px-8 py-6 text-xs text-gray-600 font-medium">
                                            {b.room_type}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-700`}>
                                                {b.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right font-black text-gray-900">
                                            S/ {b.total_price}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-slide-up">
                        <div className="p-10">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Registrar Nueva Reserva</h3>
                            <p className="text-gray-400 text-sm mb-8 font-medium">Gestiona la estancia de tus huéspedes de forma manual.</p>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Nombre del Huésped</label>
                                        <input name="name" type="text" required placeholder="Nombre completo" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email de contacto</label>
                                        <input name="email" type="email" required placeholder="ejemplo@email.com" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Check-In</label>
                                        <input name="check_in" type="date" required className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Check-Out</label>
                                        <input name="check_out" type="date" required className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">N° Huéspedes</label>
                                        <input name="guests" type="number" min="1" required placeholder="1" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Tipo de Habitación</label>
                                        <select name="room_type" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold appearance-none">
                                            <option value="Suite Familiar">Suite Familiar</option>
                                            <option value="Bungalow Privado">Bungalow Privado</option>
                                            <option value="Habitación Doble">Habitación Doble</option>
                                            <option value="Glamping Premium">Glamping Premium</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-gray-400">Monto Total (S/)</label>
                                        <input name="price" type="number" step="1" required placeholder="000" className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-sm font-bold" />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <input name="phone" type="hidden" value="Not Specified" />
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
                                        className="flex-[2] px-8 py-4 bg-[#1a3c1a] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest hover:bg-black shadow-xl shadow-emerald-900/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? <FiLoader className="animate-spin" /> : 'Confirmar Reserva 🏨'}
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
