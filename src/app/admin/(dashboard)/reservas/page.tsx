'use client'

import React from 'react'
import { FiLayout } from 'react-icons/fi'

export default function AdminComingSoon() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
            <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-4xl text-gray-400">
                <FiLayout />
            </div>
            <div>
                <h2 className="text-3xl font-display font-black text-gray-900 leading-none">Módulo en Desarrollo</h2>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto line-relaxed">
                    Estamos preparando las herramientas de gestión avanzada para esta sección de Perlawasi.
                </p>
            </div>
        </div>
    )
}
