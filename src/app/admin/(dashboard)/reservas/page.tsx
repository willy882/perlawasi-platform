'use client'

import React, { useState, useEffect } from 'react'
import {
    FiPlus, FiSearch, FiEdit2, FiTrash2,
    FiFilter, FiCheckCircle, FiXCircle,
    FiLoader, FiUser, FiCalendar, FiClock,
    FiEye, FiMoreVertical, FiCheck
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import { toast } from 'react-hot-toast'

export default function AdminReservas() {
    const [searchTerm, setSearchTerm] = useState('')
    const [bookings, setBookings] = useState<any[]>([])
    const [showModal, setShowModal] = useState(false)
    const [editingBooking, setEditingBooking] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [showNewType, setShowNewType] = useState(false)

    useEffect(() => { fetchBookings() }, [])

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
        } finally { setLoading(false) }
    }

    const handleOpenModal = (booking: any = null) => {
        setEditingBooking(booking)
        setShowNewType(false)
        setShowModal(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.')) return

        try {
            toast.loading('Eliminando reserva...', { id: 'delete' })
            const { error } = await supabase.from('reservas').delete().eq('id', id)
            if (error) throw error
            toast.success('Reserva eliminada correctamente', { id: 'delete' })
            fetchBookings()
        } catch (error: any) {
            toast.error('Error al eliminar: ' + error.message, { id: 'delete' })
        }
    }

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('reservas')
                .update({ status: newStatus })
                .eq('id', id)
            if (error) throw error
            toast.success(`Estado actualizado a ${newStatus} ✨`)
            fetchBookings()
        } catch (error: any) {
            toast.error('Error al actualizar estado: ' + error.message)
        }
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSaving(true)
        const formData = new FormData(e.currentTarget)

        try {
            const roomType = formData.get('room_type') === 'NEW' ? formData.get('new_room_type') : formData.get('room_type')

            const bookingData: any = {
                customer_name: formData.get('name'),
                customer_email: formData.get('email'),
                customer_phone: formData.get('phone'),
                check_in: formData.get('check_in'),
                check_out: formData.get('check_out'),
                guests: parseInt(formData.get('guests') as string),
                room_type: roomType,
                total_price: parseFloat(formData.get('price') as string),
                status: editingBooking?.status || 'Confirmado'
            }

            if (editingBooking?.id) {
                const { error } = await supabase
                    .from('reservas')
                    .update(bookingData)
                    .eq('id', editingBooking.id)
                if (error) throw error
                toast.success('Reserva actualizada correctamente ✨')
            } else {
                const { error } = await supabase
                    .from('reservas')
                    .insert([bookingData])
                if (error) throw error
                toast.success('Nueva reserva registrada 🏨')
            }

            setShowModal(false)
            fetchBookings()
        } catch (error: any) {
            toast.error('Error al guardar: ' + error.message)
        } finally { setSaving(false) }
    }

    const roomTypes = Array.from(new Set(bookings.map((b: any) => b.room_type).filter(Boolean)))
    if (roomTypes.length === 0) roomTypes.push('Suite Familiar', 'Bungalow Privado', 'Habitación Doble', 'Glamping Deluxe')

    const filteredBookings = bookings.filter((b: any) =>
        b.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.room_type?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusStyle = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'confirmado': return 'bg-emerald-100 text-emerald-700'
            case 'pendiente': return 'bg-amber-100 text-amber-700'
            case 'cancelado': return 'bg-red-100 text-red-700'
            case 'completado': return 'bg-blue-100 text-blue-700'
            default: return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="space-y-8 animate-fade-in px-4">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-display font-black text-gray-900 leading-none tracking-tight">Estadías Perlawasi</h2>
                    <p className="text-gray-500 mt-3 text-sm font-medium italic">Gestión de huéspedes y disponibilidad del Lodge.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-8 py-4 bg-[#1a3c1a] text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-900/20 hover:bg-black transition-all transform hover:-translate-y-1"
                >
                    <FiPlus /> Nueva Reserva
                </button>
            </div>

            {/* Search & Stats */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="w-full max-w-xl relative">
                    <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar por huésped, habitación o correo..."
                        className="w-full pl-14 pr-4 py-4.5 bg-white border border-gray-100 rounded-2xl text-sm outline-none shadow-sm focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <div className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-center">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Total</p>
                        <p className="text-lg font-black text-gray-900">{bookings.length}</p>
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 uppercase text-[10px] font-black text-gray-400 tracking-[0.2em] border-b border-gray-100">
                                <th className="px-10 py-7">Huésped / Identidad</th>
                                <th className="px-10 py-7">Entrada / Salida</th>
                                <th className="px-10 py-7">Alojamiento</th>
                                <th className="px-10 py-7">Estado</th>
                                <th className="px-10 py-7 text-right">Monto</th>
                                <th className="px-10 py-7 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-10 py-32 text-center">
                                        <FiLoader className="inline-block animate-spin text-emerald-600 text-3xl mb-4" />
                                        <p className="text-gray-400 text-xs font-black uppercase tracking-[0.3em]">Sincronizando Libro de Reservas...</p>
                                    </td>
                                </tr>
                            ) : filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-10 py-32 text-center text-gray-400 font-medium italic">
                                        No se encontraron registros de estadía.
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((b) => (
                                    <tr key={b.id} className="group hover:bg-emerald-50/20 transition-all duration-300">
                                        <td className="px-10 py-7">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                                                    <FiUser size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg leading-tight uppercase tracking-tight">{b.customer_name}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1 font-black tracking-widest uppercase">{b.customer_email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                    {b.check_in}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tighter">
                                                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                                                    {b.check_out}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7">
                                            <div className="space-y-1">
                                                <p className="text-xs font-black text-gray-900 uppercase tracking-widest">{b.room_type}</p>
                                                <p className="text-[10px] text-gray-400 font-bold">{b.guests} Huéspedes</p>
                                            </div>
                                        </td>
                                        <td className="px-10 py-7">
                                            <select
                                                value={b.status}
                                                onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer border-transparent focus:ring-2 focus:ring-offset-1 focus:ring-gray-200 transition-all ${getStatusStyle(b.status)}`}
                                            >
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="Confirmado">Confirmado</option>
                                                <option value="Completado">Completado</option>
                                                <option value="Cancelado">Cancelado</option>
                                            </select>
                                        </td>
                                        <td className="px-10 py-7 text-right">
                                            <p className="font-black text-gray-900 text-xl tracking-tighter uppercase">S/ {b.total_price}</p>
                                        </td>
                                        <td className="px-10 py-7 text-right">
                                            <div className="flex justify-end gap-3 transition-all">
                                                <button
                                                    onClick={() => handleOpenModal(b)}
                                                    className="p-3.5 bg-white text-emerald-600 rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-600 hover:text-white transition-all transform hover:-translate-y-1"
                                                >
                                                    <FiEdit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(b.id)}
                                                    className="p-3.5 bg-white text-red-500 rounded-xl border border-red-50 shadow-sm hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1"
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
                                <h3 className="text-4xl font-black text-gray-900 leading-none tracking-tighter">
                                    {editingBooking?.id ? 'Editar Reserva' : 'Registrar Estancia'}
                                </h3>
                                <p className="text-gray-400 text-sm mt-3 font-medium italic">Gestión de Alojamiento Perlawasi.</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-3.5 bg-gray-50 text-gray-400 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <FiXCircle size={28} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Nombre del Huésped</label>
                                    <input name="name" required type="text" defaultValue={editingBooking?.customer_name} placeholder="Nombre completo" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-base font-bold transition-all shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Identificación / DNI</label>
                                    <input name="dni" type="text" placeholder="Opcional" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-base font-bold transition-all shadow-inner" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Correo de Contacto</label>
                                    <input name="email" required type="email" defaultValue={editingBooking?.customer_email} placeholder="email@ejemplo.com" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-base font-bold transition-all shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Teléfono / WhatsApp</label>
                                    <input name="phone" type="text" defaultValue={editingBooking?.customer_phone} placeholder="+51 000 000 000" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-base font-bold transition-all shadow-inner" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Check-In</label>
                                    <input name="check_in" required type="date" defaultValue={editingBooking?.check_in} className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-sm font-bold shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Check-Out</label>
                                    <input name="check_out" required type="date" defaultValue={editingBooking?.check_out} className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-sm font-bold shadow-inner" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">N° Huéspedes</label>
                                    <input name="guests" required type="number" min="1" defaultValue={editingBooking?.guests || 1} className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-transparent focus:border-emerald-500 border-2 outline-none text-base font-bold text-center shadow-inner" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Tipo de Alojamiento</label>
                                    <div className="space-y-3">
                                        <select
                                            name="room_type"
                                            defaultValue={editingBooking?.room_type}
                                            onChange={(e) => setShowNewType(e.target.value === 'NEW')}
                                            className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent outline-none text-sm font-bold appearance-none cursor-pointer focus:border-emerald-500 shadow-inner"
                                        >
                                            {roomTypes.map(type => <option key={type} value={type}>{type}</option>)}
                                            <option value="NEW" className="text-emerald-700 font-bold">+ Crear Tipo...</option>
                                        </select>
                                        {showNewType && <input name="new_room_type" required type="text" placeholder="Ej: Cabaña del Bosque" className="w-full px-8 py-5 bg-emerald-50 border-2 border-emerald-100 rounded-2xl outline-none font-bold animate-fade-in shadow-inner" />}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-6">Monto Total (S/)</label>
                                    <input name="price" required type="number" step="1" defaultValue={editingBooking?.total_price} placeholder="0.00" className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-emerald-500 outline-none text-base font-black shadow-inner" />
                                </div>
                            </div>

                            <div className="flex gap-5 pt-6">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-6 bg-gray-100 text-gray-500 rounded-3xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all">Cancelar</button>
                                <button type="submit" disabled={saving} className="flex-[2] py-6 bg-[#1a3c1a] text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-emerald-900/30 hover:bg-black transition-all flex items-center justify-center gap-4">
                                    {saving ? <FiLoader className="animate-spin text-xl" /> : <><FiCheckCircle className="text-xl" /> {editingBooking?.id ? 'Guardar Cambios' : 'Confirmar Reserva'}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
