'use client'

import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
    const [isHovered, setIsHovered] = useState(false)

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '928141669'
    const message = encodeURIComponent('Hola, estoy interesado en los productos y servicios de Perlawasi')
    const whatsappUrl = `https://wa.me/51${whatsappNumber}?text=${message}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Contactar por WhatsApp"
        >
            <div className="relative">
                {/* Tooltip */}
                <div
                    className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium shadow-lg transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
                        }`}
                >
                    ¿Necesitas ayuda? Escríbenos
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-gray-900" />
                </div>

                {/* Button */}
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-float">
                    <FaWhatsapp className="w-8 h-8 text-white" />
                </div>

                {/* Pulse Animation */}
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
            </div>
        </a>
    )
}
