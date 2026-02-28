'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    FiHome, FiPackage, FiCalendar, FiSettings, FiBriefcase,
    FiUser, FiLogOut, FiMenu, FiX, FiPieChart, FiCoffee,
    FiTag, FiCheckCircle, FiLoader, FiZap, FiTarget
} from 'react-icons/fi'

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true)
    const pathname = usePathname()

    const menuItems = [
        { name: 'Panel Control', icon: <FiPieChart />, path: '/admin' },
        { name: 'Vivero (Plantas)', icon: <FiPackage />, path: '/admin/plantas' },
        { name: 'Restaurante', icon: <FiBriefcase />, path: '/admin/restaurante' },
        { name: 'Boutique (Ropa)', icon: <FiTag />, path: '/admin/ropa' },
        { name: 'Lodge (Alojamiento)', icon: <FiCalendar />, path: '/admin/reservas' },
        { name: 'Café & Cacao', icon: <FiCoffee />, path: '/admin/cafe-cacao' },
        { name: 'Heladería', icon: <FiPieChart />, path: '/admin/heladeria' },
        { name: 'Cervecería', icon: <FiLoader />, path: '/admin/cerveceria' },
        { name: 'Licorería', icon: <FiCheckCircle />, path: '/admin/licoreria' },
        { name: 'Ajustes', icon: <FiSettings />, path: '/admin/ajustes' },
    ]

    return (
        <div className="min-h-screen bg-[#F8FAFB] flex font-sans">
            {/* SIDEBAR TOTALMENTE FIJO (FIXED) */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#1a3c1a] text-white transition-all duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } flex flex-col shadow-2xl`}
            >
                <div className="p-8 border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1 shadow-inner overflow-hidden">
                            <img src="/images/logo.png" alt="Perlawasi Logo" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h2 className="font-display font-black tracking-tighter text-xl text-white leading-none">PERLAWASI</h2>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-300 font-bold mt-1">Panel de Administración</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all font-bold text-sm ${isActive
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.name}
                                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-6 bg-black/20 border-t border-white/10 shrink-0">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm border-2 border-emerald-500">
                            AD
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold truncate">Administrador</p>
                            <p className="text-[10px] text-white/40 truncate">admin@perlawasi.com</p>
                        </div>
                    </div>
                    <Link href="/admin/login" className="flex items-center gap-3 text-xs font-bold text-white/50 hover:text-white transition-colors">
                        <FiLogOut /> Cerrar Sesión
                    </Link>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL CON MARGEN PARA EL SIDEBAR */}
            <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'ml-0'}`}>
                <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400"
                        >
                            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800 leading-none">
                                {menuItems.find(i => i.path === pathname)?.name || 'Panel de Control'}
                            </h1>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Sistema Integrado</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/" className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
                            Ver Sitio Público
                        </Link>
                    </div>
                </header>

                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
