'use client'

import React, { useState, useEffect } from 'react'
import {
    FiUsers, FiShoppingBag, FiTrendingUp, FiCalendar,
    FiArrowUpRight, FiArrowDownRight, FiActivity, FiStar,
    FiLoader
} from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

export default function AdminDashboard() {
    const [plantCount, setPlantCount] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const { count, error } = await supabase
                    .from('plantas')
                    .select('*', { count: 'exact', head: true })

                if (!error) setPlantCount(count)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    const stats = [
        { label: 'Ventas Totales', value: 'S/ 0', trend: '0%', color: 'emerald', icon: <FiTrendingUp /> },
        { label: 'Reservas Activas', value: '0', trend: '0%', color: 'blue', icon: <FiCalendar /> },
        { label: 'Plantas en Stock', value: loading ? '...' : plantCount?.toString() || '0', trend: '+100%', color: 'orange', icon: <FiShoppingBag /> },
        { label: 'Nuevos Clientes', value: '0', trend: '0%', color: 'purple', icon: <FiUsers /> },
    ]

    const recentOrders = [
        { id: '#1204', customer: 'Carlos Mendoza', product: 'Begonia Maculata', date: 'Hace 2h', status: 'Completado', amount: 'S/ 85.00' },
        { id: '#1205', customer: 'Lucía Fernández', product: 'Pack Café Altura', date: 'Hace 5h', status: 'Pendiente', amount: 'S/ 145.00' },
        { id: '#1206', customer: 'Roberto Gómez', product: 'Zapatillas Boutique', date: 'Ayer', status: 'Enviado', amount: 'S/ 220.00' },
        { id: '#1207', customer: 'Ana Belén', product: 'Reserva Brisa Lodge', date: 'Ayer', status: 'Completado', amount: 'S/ 450.00' },
    ]

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcoming */}
            <div>
                <h2 className="text-3xl font-display font-black text-gray-900 leading-none">¡Hola, Administrador!</h2>
                <p className="text-gray-500 mt-2 text-sm font-medium italic">"El universo Perlawasi está floreciendo hoy."</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                                    stat.color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'
                                }`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-black flex items-center gap-1 ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
                                }`}>
                                {stat.trend.startsWith('+') ? <FiArrowUpRight /> : <FiArrowDownRight />}
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Placeholder & Table */}
            <div className="grid lg:grid-cols-12 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden px-8 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Actividad Reciente</h3>
                            <p className="text-xs text-gray-400 font-medium">Últimas transacciones y pedidos</p>
                        </div>
                        <button className="text-xs font-black text-emerald-600 hover:text-emerald-800 uppercase tracking-widest">Ver Todo</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50 uppercase text-[10px] font-black text-gray-400 tracking-widest">
                                    <th className="pb-4">Cliente</th>
                                    <th className="pb-4">Producto</th>
                                    <th className="pb-4">Estado</th>
                                    <th className="pb-4 text-right">Monto</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.map((order, i) => (
                                    <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400">
                                                    {order.customer.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{order.customer}</p>
                                                    <p className="text-[10px] text-gray-400">{order.id} · {order.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5">
                                            <span className="text-sm text-gray-600 font-medium">{order.product}</span>
                                        </td>
                                        <td className="py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Completado' ? 'bg-emerald-100 text-emerald-700' :
                                                order.status === 'Enviado' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-5 text-right font-black text-gray-900">
                                            {order.amount}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Performance Side Panel */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#1a3c1a] text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <FiActivity className="text-3xl text-emerald-400 mb-6" />
                            <h3 className="text-lg font-bold mb-2">Salud del Vivero</h3>
                            <p className="text-sm text-white/60 mb-6 leading-relaxed">
                                El stock de Plantas de Autor está al 85%. Considera reponer Begonias.
                            </p>
                            <div className="w-full bg-white/10 h-2 rounded-full mb-2">
                                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '85%' }} />
                            </div>
                            <p className="text-[10px] font-black uppercase text-emerald-400">Excelente Estado</p>
                        </div>
                        <div className="absolute -right-10 -bottom-10 text-[10rem] opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">🌿</div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-gray-900">Top Reseñas</h3>
                            <FiStar className="text-orange-400" />
                        </div>
                        <div className="space-y-4">
                            {[1, 2].map((_, i) => (
                                <div key={i} className="p-4 bg-gray-50 rounded-2xl">
                                    <div className="flex gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map(s => <FiStar key={s} size={10} className="fill-orange-400 text-orange-400" />)}
                                    </div>
                                    <p className="text-[11px] text-gray-600 font-medium italic">"La mejor experiencia en la selva. El lodge es increíble."</p>
                                    <p className="text-[9px] font-black uppercase mt-2 text-gray-400">— Sofía V.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
