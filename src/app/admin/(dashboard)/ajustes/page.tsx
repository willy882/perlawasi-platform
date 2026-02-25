'use client'

import React from 'react'
import { FiClock, FiSettings } from 'react-icons/fi'

export default function AdminAjustes() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-4xl text-emerald-600 animate-pulse">
                <FiSettings />
            </div>
            <div>
                <h2 className="text-3xl font-display font-black text-gray-900">Configuración del Ecosistema</h2>
                <p className="text-gray-500 mt-2 max-w-md mx-auto line-relaxed">
                    Personaliza la identidad visual, correos automáticos y variables globales de la plataforma. Esta sección está en mantenimiento preventivo.
                </p>
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                <FiClock className="animate-spin-slow" /> Próximamente en v8.2
            </div>
        </div>
    )
}
