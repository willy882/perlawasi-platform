'use client'

import Link from 'next/link'
import { useState } from 'react'

// Mock featured products - in production, this would come from the database
const featuredProducts = [
    {
        id: '1',
        name: 'Cordero de los Andes',
        category: 'Restaurante',
        price: 89.00,
        image: '🥩',
        rating: 4.9,
        slug: 'cordero-de-los-andes',
    },
    {
        id: '2',
        name: 'Suite Panorámica',
        category: 'Alojamiento',
        price: 240.00,
        image: '🏔️',
        rating: 5.0,
        slug: 'suite-panoramica',
    },
    {
        id: '3',
        name: 'Andean Highland Peaks',
        category: 'Cafetería',
        price: 24.00,
        image: '☕',
        rating: 4.8,
        slug: 'andean-highland-peaks',
    },
    {
        id: '4',
        name: 'Master Selection Truffles',
        category: 'Chocolates',
        price: 32.00,
        image: '🍫',
        rating: 4.9,
        slug: 'master-selection-truffles',
    },
    {
        id: '5',
        name: 'Handwoven Poncho',
        category: 'Ropa',
        price: 185.00,
        image: '🧥',
        rating: 4.7,
        slug: 'handwoven-poncho',
    },
    {
        id: '6',
        name: 'Blue Agave Reserva',
        category: 'Licorería',
        price: 145.00,
        image: '🥃',
        rating: 5.0,
        slug: 'blue-agave-reserva',
    },
]

export default function FeaturedProducts() {
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
                <div
                    key={product.id}
                    className="card card-hover group"
                    onMouseEnter={() => setHoveredId(product.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    {/* Product Image */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-8xl overflow-hidden">
                        <div className={`transition-transform duration-300 ${hoveredId === product.id ? 'scale-110' : 'scale-100'}`}>
                            {product.image}
                        </div>

                        {/* Quick Add Button */}
                        <button
                            className={`absolute bottom-4 right-4 bg-primary-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 ${hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                                }`}
                        >
                            Agregar al Carrito
                        </button>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1">
                                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                            </div>
                        </div>

                        <Link href={`/product/${product.slug}`}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {product.name}
                            </h3>
                        </Link>

                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-2xl font-bold text-gray-900">
                                    S/ {product.price.toFixed(2)}
                                </span>
                            </div>
                            <Link
                                href={`/product/${product.slug}`}
                                className="text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center gap-1"
                            >
                                Ver detalles
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
