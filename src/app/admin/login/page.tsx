'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiMail, FiLock, FiArrowRight, FiShield } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

export default function AdminLogin() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Validación de credenciales solicitadas por el usuario
        setTimeout(() => {
            if (email === 'perlawasi_1@gmail.com' && password === 'willydev') {
                // Establecer cookie de autenticación (sesión simple para este demo)
                document.cookie = "admin_auth=true; path=/; max-age=86400; SameSite=Strict"

                toast.success('Acceso permitido. ¡Bienvenido, Willy!')
                router.push('/admin')
            } else {
                toast.error('Acceso denegado. Credenciales incorrectas.')
                setLoading(false)
            }
        }, 1200)
    }

    return (
        <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-200 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="w-full max-w-[450px] relative z-10 transition-all">
                {/* Logo Area */}
                <div className="text-center mb-10">
                    <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center p-2 mx-auto mb-6 shadow-2xl shadow-emerald-900/20 rotate-3 overflow-hidden">
                        <img src="/images/logo.png" alt="Perlawasi Logo" className="w-full h-full object-contain" />
                    </div>
                    <h1 className="text-3xl font-display font-black text-gray-900 tracking-tight">Perlawasi HQ</h1>
                    <p className="text-gray-400 text-sm font-medium mt-2">Centro de Control de Experiencias</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-[3rem] p-10 shadow-strong border border-gray-100">
                    <div className="flex items-center gap-2 mb-8 px-4 py-2 bg-emerald-50 rounded-xl w-fit">
                        <FiShield className="text-emerald-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Acceso Restringido</span>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Email de Usuario</label>
                            <div className="relative">
                                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@perlawasi.com"
                                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Contraseña</label>
                                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-800 transition-colors">¿Olvidaste?</button>
                            </div>
                            <div className="relative">
                                <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-transparent rounded-[1.5rem] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 bg-[#1a3c1a] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-2xl shadow-emerald-900/30 hover:bg-black hover:-translate-y-1 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Entrar al Panel <FiArrowRight /></>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Links */}
                <div className="mt-10 text-center">
                    <p className="text-xs text-gray-400 font-medium italic">
                        "Gestionando la magia de San Martín desde 2026."
                    </p>
                    <div className="mt-4 flex justify-center gap-6">
                        <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Volver al Inicio</Link>
                        <span className="text-gray-200">|</span>
                        <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">Soporte IT</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
