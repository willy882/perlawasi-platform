'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi'

const categories = [
    { name: 'Restaurante', slug: 'restaurante', icon: '🍽️' },
    { name: 'Heladería', slug: 'heladeria', icon: '🍦' },
    { name: 'Café & Cacao', slug: 'cafe-cacao', icon: '☕' },
    { name: 'Cervecería', slug: 'cerveceria', icon: '🍺' },
    { name: 'Licorería', slug: 'licoreria', icon: '🥃' },
    { name: 'Alojamiento', slug: 'alojamiento', icon: '🏡' },
    { name: 'Ropa', slug: 'ropa', icon: '👕' },
    { name: 'Plantas', slug: 'plantas', icon: '🌿' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
            {/* Main Header */}
            <div className="container-custom py-2">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-16 h-16 transition-transform group-hover:scale-105">
                            <Image
                                src="/images/logo-perlawasi.png"
                                alt="Perlawasi"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {categories.map((cat) => {
                            const isActive = pathname === `/${cat.slug}`
                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/${cat.slug}`}
                                    className={`text-[11px] font-bold transition-all uppercase tracking-widest relative pb-1 ${isActive
                                            ? 'text-primary-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-600'
                                            : 'text-gray-700 hover:text-primary-500'
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                            aria-label="Buscar"
                        >
                            <FiSearch className="w-5 h-5 text-gray-700" />
                        </button>

                        <Link
                            href="/cart"
                            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Carrito"
                        >
                            <FiShoppingCart className="w-5 h-5 text-gray-700" />
                            <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                0
                            </span>
                        </Link>

                        <Link
                            href="/book"
                            className="btn btn-primary px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:px-8"
                        >
                            Reservar Ahora
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Menú"
                        >
                            {mobileMenuOpen ? (
                                <FiX className="w-6 h-6 text-gray-700" />
                            ) : (
                                <FiMenu className="w-6 h-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                {searchOpen && (
                    <div className="mt-4 animate-slide-down">
                        <input
                            type="search"
                            placeholder="Busca nuestras experiencias y productos..."
                            className="input bg-gray-50 border-none focus:bg-white"
                            autoFocus
                        />
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200 animate-slide-down">
                    <nav className="container-custom py-4 space-y-2">
                        <Link
                            href="/"
                            className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Inicio
                        </Link>

                        <div className="px-4 py-2 text-sm font-semibold text-gray-500">
                            Categorías
                        </div>

                        {categories.map((cat) => {
                            const isActive = pathname === `/${cat.slug}`
                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/${cat.slug}`}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-primary-50 text-primary-700 font-semibold border-l-4 border-primary-600'
                                            : 'hover:bg-gray-50'
                                        }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-xl">{cat.icon}</span>
                                    <span>{cat.name}</span>
                                </Link>
                            )
                        })}

                        <Link
                            href="/nosotros"
                            className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Nosotros
                        </Link>
                        <Link
                            href="/contacto"
                            className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contacto
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
