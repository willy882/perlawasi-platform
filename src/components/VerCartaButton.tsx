'use client'

import { useState } from 'react'
import CartaFlipbook from '@/components/CartaFlipbook'

export default function VerCartaButton() {
    const [cartaAbierta, setCartaAbierta] = useState(false)

    return (
        <>
            <button
                onClick={() => setCartaAbierta(true)}
                className="btn bg-emerald-600 text-white px-10 py-4 text-lg hover:bg-emerald-700"
            >
                Ver La Carta
            </button>
            <CartaFlipbook open={cartaAbierta} onClose={() => setCartaAbierta(false)} />
        </>
    )
}
