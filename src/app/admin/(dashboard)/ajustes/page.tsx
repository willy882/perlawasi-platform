'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
    FiUser, FiLogOut, FiSettings, FiShield,
    FiBell, FiDatabase, FiHelpCircle
} from 'react-icons/fi'
import { toast } from 'react-hot-toast'

export default function AdminAjustes() {
    const router = useRouter()

    const handleLogout = () => {
        // Eliminar cookie de autenticación
        document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
        toast.success('Sesión cerrada correctamente.')
        router.push('/admin/login')
    }

    const settingsGroups = [
        {
            title: 'Perfil y Cuenta',
            icon: <FiUser />,
            items: [
                { label: 'Nombre de Administrador', value: 'Willy (Administrador Perlawasi)' },
                { label: 'Email', value: 'perlawasi_1@gmail.com' },
                { label: 'Rol', value: 'Súper Administrador' },
            ]
        },
        {
            title: 'Plataforma & Datos',
            icon: <FiDatabase />,
            items: [
                { label: 'Estado de Base de Datos', value: 'Conectado (Supabase)' },
                { label: 'Última Sincronización', value: 'Hace unos segundos' },
                { label: 'Versión del Sistema', value: 'v1.4.2-premium' },
            ]
        }
    ]

    return (
        <div className="max-w-4xl space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-display font-black text-gray-900 leading-none">Ajustes</h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium italic">Configuración de tu centro de control.</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-6 py-3.5 bg-red-50 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-all border border-red-100"
                >
                    <FiLogOut /> Cerrar Sesión
                </button>
            </div>

            <div className="grid gap-8">
                {settingsGroups.map((group, i) => (
                    <div key={i} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-50 flex items-center gap-3">
                            <span className="text-emerald-600 text-lg">{group.icon}</span>
                            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">{group.title}</h3>
                        </div>
                        <div className="p-8 space-y-6">
                            {group.items.map((item, j) => (
                                <div key={j} className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest text-[10px]">{item.label}</span>
                                    <span className="text-sm font-black text-gray-900 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="bg-[#1a3c1a] rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FiShield className="text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Seguridad</span>
                            </div>
                            <h3 className="text-2xl font-black mb-2">Tu panel está protegido</h3>
                            <p className="text-white/60 text-sm max-w-sm leading-relaxed italic">
                                "El sistema de seguridad Perlawasi encripta tus datos y restringe el acceso solo a personal autorizado."
                            </p>
                        </div>
                        <button className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-900/40">
                            Cambiar Contraseña
                        </button>
                    </div>
                    <div className="absolute -right-10 -bottom-10 text-[12rem] opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">🦉</div>
                </div>
            </div>

            <div className="pt-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
                    Propiedad Intelectual de Perlawasi © 2026 · Diseñado para la excelencia
                </p>
            </div>
        </div>
    )
}
