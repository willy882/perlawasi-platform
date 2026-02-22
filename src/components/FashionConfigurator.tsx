'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

const ClothingViewer3D = dynamic(() => import('./ClothingViewer3D'), { ssr: false })

// ─── TIPOS ────────────────────────────────────────────────────────────────────
interface ColorOption {
    name: string
    hex: string
}

interface SizeOption {
    label: string
    available: boolean
}

interface ClothingItem {
    id: string
    name: string
    category: string
    price: number
    emoji: string
    description: string
    material: string
    colors: ColorOption[]
    sizes: SizeOption[]
}

// ─── DATOS DE PRODUCTOS ───────────────────────────────────────────────────────
const categories = [
    { id: 'camisetas', label: 'Camisetas', icon: '👕' },
    { id: 'pantalones', label: 'Pantalones', icon: '👖' },
    { id: 'vestidos', label: 'Vestidos', icon: '👗' },
    { id: 'abrigos', label: 'Abrigos', icon: '🧥' },
    { id: 'accesorios', label: 'Accesorios', icon: '👒' },
    { id: 'calzado', label: 'Calzado', icon: '👟' },
]

const allProducts: ClothingItem[] = [
    // CAMISETAS
    {
        id: 'polo-lino',
        name: 'Polo Essential Lino',
        category: 'camisetas',
        price: 85,
        emoji: '👕',
        description: 'Básico perfecto en lino orgánico de primera. Silueta relaxed que se adapta a cualquier momento del día.',
        material: 'Lino Orgánico 100%',
        colors: [
            { name: 'Blanco Natural', hex: '#F5F0E8' },
            { name: 'Crema', hex: '#DED4B4' },
            { name: 'Azul Marino', hex: '#2C3E6B' },
            { name: 'Verde Selva', hex: '#2D6A4F' },
            { name: 'Gris Piedra', hex: '#6B7280' },
            { name: 'Terracota', hex: '#C0703A' },
        ],
        sizes: [
            { label: 'XS', available: true },
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
            { label: 'XL', available: false },
        ],
    },
    {
        id: 'hoodie-cloud',
        name: 'Hoodie Soft Cloud',
        category: 'camisetas',
        price: 150,
        emoji: '🧶',
        description: 'La sudadera más suave que sentirás en tu vida. Algodón peinado premium, corte oversize contemporáneo.',
        material: 'Algodón Peinado Premium',
        colors: [
            { name: 'Blanco Nieve', hex: '#F0EDE8' },
            { name: 'Beige Tostado', hex: '#C8A882' },
            { name: 'Negro Carbón', hex: '#1A1A1A' },
            { name: 'Lavanda', hex: '#B4A7D6' },
            { name: 'Sage Green', hex: '#87A878' },
        ],
        sizes: [
            { label: 'XS', available: true },
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
            { label: 'XL', available: true },
        ],
    },
    // PANTALONES
    {
        id: 'pantalon-relax',
        name: 'Pantalón Relax Algodón',
        category: 'pantalones',
        price: 120,
        emoji: '👖',
        description: 'Corte wide-leg en algodón pima peruano. Cintura elástica con cordón para ajuste perfecto todo el día.',
        material: 'Algodón Pima Peruano',
        colors: [
            { name: 'Beige Arena', hex: '#C4A882' },
            { name: 'Negro', hex: '#1C1C1C' },
            { name: 'Azul Índigo', hex: '#3D5A80' },
            { name: 'Verde Oliva', hex: '#6B7C45' },
            { name: 'Caramelo', hex: '#C07840' },
        ],
        sizes: [
            { label: 'XS', available: false },
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
            { label: 'XL', available: true },
        ],
    },
    {
        id: 'jogger-bamboo',
        name: 'Jogger Bambú Soft',
        category: 'pantalones',
        price: 98,
        emoji: '🩲',
        description: 'Ultra suave al tacto, hecho de bambú natural. El pantalón para estar en casa con estilo o salir casual.',
        material: 'Fibra de Bambú 100%',
        colors: [
            { name: 'Gris Perla', hex: '#C8C8C8' },
            { name: 'Negro', hex: '#1A1A1A' },
            { name: 'Azul Marino', hex: '#1D3557' },
            { name: 'Vino', hex: '#6B2737' },
        ],
        sizes: [
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
            { label: 'XL', available: false },
        ],
    },
    // VESTIDOS
    {
        id: 'vestido-flow',
        name: 'Vestido Nature Flow',
        category: 'vestidos',
        price: 180,
        emoji: '👗',
        description: 'Un vestido que fluye como el agua. Diseñado para celebrar la feminidad en armonía con la naturaleza.',
        material: 'Viscosa de Bambú',
        colors: [
            { name: 'Terracota Rosa', hex: '#D4856A' },
            { name: 'Verde Selva', hex: '#388464' },
            { name: 'Azul Cielo', hex: '#7EC8E3' },
            { name: 'Blanco Puro', hex: '#FAFAFA' },
            { name: 'Mostaza', hex: '#D4A837' },
        ],
        sizes: [
            { label: 'XS', available: true },
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
        ],
    },
    {
        id: 'vestido-midi',
        name: 'Midi Linen Dress',
        category: 'vestidos',
        price: 210,
        emoji: '🥻',
        description: 'Vestido midi de lino con escote en V y botones frontales. Perfecto de la playa a la cena.',
        material: 'Lino Belga 70% / Algodón 30%',
        colors: [
            { name: 'Azul Celeste', hex: '#93C5FD' },
            { name: 'Blanco Natural', hex: '#F7F0E6' },
            { name: 'Negro Noche', hex: '#1A1A2E' },
            { name: 'Verde Sage', hex: '#A7C0A0' },
        ],
        sizes: [
            { label: 'XS', available: true },
            { label: 'S', available: true },
            { label: 'M', available: false },
            { label: 'L', available: true },
        ],
    },
    // ABRIGOS
    {
        id: 'abrigo-natural',
        name: 'Abrigo Alpaca Natural',
        category: 'abrigos',
        price: 350,
        emoji: '🧥',
        description: 'Confeccionado con lana de alpaca peruana. Cálido sin ser pesado, elegante sin ser formal.',
        material: 'Lana de Alpaca Peruana',
        colors: [
            { name: 'Camel Natural', hex: '#C19A6B' },
            { name: 'Gris Antracita', hex: '#3D4347' },
            { name: 'Crema Marfil', hex: '#F5ECD7' },
            { name: 'Azul Tormenta', hex: '#4A6B8A' },
        ],
        sizes: [
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
            { label: 'XL', available: true },
        ],
    },
    // ACCESORIOS
    {
        id: 'gorra-nature',
        name: 'Gorra Nature Cap',
        category: 'accesorios',
        price: 55,
        emoji: '🧢',
        description: 'Gorra de 6 paneles en canvas orgánico con bordado minimal del logo Perlawasi.',
        material: 'Canvas Orgánico Lavado',
        colors: [
            { name: 'Beige', hex: '#D4C5A9' },
            { name: 'Negro', hex: '#1A1A1A' },
            { name: 'Blanco', hex: '#F5F5F5' },
            { name: 'Verde Ejército', hex: '#4A5240' },
        ],
        sizes: [
            { label: 'Único', available: true },
        ],
    },
    {
        id: 'tote-bag',
        name: 'Tote Bag Perlawasi',
        category: 'accesorios',
        price: 45,
        emoji: '👜',
        description: 'Bolso tote de lona gruesa 100% orgánica. Serigrafía de edición limitada. Gran capacidad.',
        material: 'Lona Orgánica 400g',
        colors: [
            { name: 'Natural', hex: '#D4C5A9' },
            { name: 'Negro', hex: '#1A1A1A' },
            { name: 'Verde', hex: '#4A8C6A' },
        ],
        sizes: [
            { label: 'Único', available: true },
        ],
    },
    // CALZADO
    {
        id: 'sandalias-zen',
        name: 'Sandalias Zen Walk',
        category: 'calzado',
        price: 95,
        emoji: '🩴',
        description: 'Sandalias artesanales con suela de caucho natural y correas de cuero vegetal. Zero waste.',
        material: 'Cuero Vegetal + Caucho Natural',
        colors: [
            { name: 'Cuero Natural', hex: '#A0785A' },
            { name: 'Negro', hex: '#2A2A2A' },
            { name: 'Cognac', hex: '#8B4513' },
        ],
        sizes: [
            { label: '36', available: true },
            { label: '37', available: true },
            { label: '38', available: true },
            { label: '39', available: true },
            { label: '40', available: true },
            { label: '41', available: false },
        ],
    },
    {
        id: 'sneakers-canvas',
        name: 'Canvas Eco Sneaker',
        category: 'calzado',
        price: 130,
        emoji: '👟',
        description: 'Zapatillas de lona orgánica. Suela de goma reciclada. Diseño minimalista atemporal.',
        material: 'Lona Orgánica + Goma Reciclada',
        colors: [
            { name: 'Blanco', hex: '#F0EDE8' },
            { name: 'Negro', hex: '#1A1A1A' },
            { name: 'Azul Marino', hex: '#1E3A5F' },
            { name: 'Rojo Ladrillo', hex: '#8B2635' },
        ],
        sizes: [
            { label: '36', available: true },
            { label: '37', available: true },
            { label: '38', available: true },
            { label: '39', available: true },
            { label: '40', available: true },
            { label: '41', available: true },
            { label: '42', available: true },
        ],
    },
]

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function FashionConfigurator() {
    const [activeCategory, setActiveCategory] = useState('camisetas')
    const [selectedProduct, setSelectedProduct] = useState<ClothingItem>(allProducts[0])
    const [selectedColor, setSelectedColor] = useState<ColorOption>(allProducts[0].colors[0])
    const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null)
    const [isSpinning, setIsSpinning] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)

    const filteredProducts = allProducts.filter(p => p.category === activeCategory)

    const handleCategoryChange = useCallback((catId: string) => {
        setActiveCategory(catId)
        const firstProduct = allProducts.find(p => p.category === catId)
        if (firstProduct) {
            setIsSpinning(true)
            setSelectedProduct(firstProduct)
            setSelectedColor(firstProduct.colors[0])
            setSelectedSize(null)
        }
    }, [])

    const handleProductChange = useCallback((product: ClothingItem) => {
        if (product.id === selectedProduct.id) return
        setIsSpinning(true)
        setSelectedProduct(product)
        setSelectedColor(product.colors[0])
        setSelectedSize(null)
    }, [selectedProduct.id])

    const handleColorChange = useCallback((color: ColorOption) => {
        setSelectedColor(color)
        setIsSpinning(true)
    }, [])

    const handleAddToCart = () => {
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-white font-sans overflow-x-hidden">

            {/* ── TÍTULO HERO ── */}
            <div className="text-center pt-16 pb-8 px-4">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/30 block mb-4">Boutique Perlawasi</span>
                <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter">
                    MODA{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F0D060] to-[#D4AF37]">
                        CONSCIENTE
                    </span>
                </h1>
                <p className="text-white/40 mt-4 text-lg max-w-xl mx-auto font-light">
                    Configura tu look. Selecciona categoría, prenda y color — la pieza gira para que la veas desde todos los ángulos.
                </p>
            </div>

            {/* ── SELECTOR DE CATEGORÍAS ── */}
            <div className="flex justify-center gap-2 md:gap-3 flex-wrap px-4 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${activeCategory === cat.id
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                            : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <span className="text-base">{cat.icon}</span>
                        <span className="hidden md:inline">{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* ── CONFIGURADOR PRINCIPAL ── */}
            <div className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">

                    {/* ─ PANEL IZQUIERDO: Selección de producto ─ */}
                    <div className="lg:col-span-3 order-3 lg:order-1">
                        <div className="bg-white/5 rounded-3xl p-4 border border-white/10">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 px-2">
                                {categories.find(c => c.id === activeCategory)?.label} ·{' '}
                                <span className="text-[#D4AF37]">{filteredProducts.length} prendas</span>
                            </h3>
                            <div className="flex flex-col gap-2">
                                {filteredProducts.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleProductChange(product)}
                                        className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 text-left ${selectedProduct.id === product.id
                                            ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/50'
                                            : 'hover:bg-white/5 border border-transparent'
                                            }`}
                                    >
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-colors duration-500"
                                            style={{
                                                background: selectedProduct.id === product.id
                                                    ? `${selectedColor.hex}22`
                                                    : 'rgba(255,255,255,0.05)',
                                                border: selectedProduct.id === product.id
                                                    ? `1px solid ${selectedColor.hex}44`
                                                    : '1px solid transparent'
                                            }}
                                        >
                                            {product.emoji}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm font-bold truncate ${selectedProduct.id === product.id ? 'text-[#D4AF37]' : 'text-white/80'}`}>
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-white/30">S/ {product.price}.00</p>
                                        </div>
                                        {selectedProduct.id === product.id && (
                                            <div className="w-1.5 h-8 rounded-full bg-[#D4AF37] shrink-0" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ─ PANEL CENTRAL: Visor 3D ─ */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <div
                            className="relative rounded-[2.5rem] overflow-hidden flex items-center justify-center"
                            style={{
                                height: 520,
                                background: `radial-gradient(ellipse at 50% 40%, ${selectedColor.hex}15 0%, ${selectedColor.hex}05 40%, transparent 70%), #111111`,
                                border: `1px solid ${selectedColor.hex}22`,
                                boxShadow: `0 0 80px ${selectedColor.hex}15`,
                                transition: 'all 0.7s ease',
                            }}
                        >
                            {/* Gradiente ambiental superior */}
                            <div
                                className="absolute top-0 left-0 right-0 h-40 opacity-30 pointer-events-none transition-colors duration-700"
                                style={{
                                    background: `linear-gradient(to bottom, ${selectedColor.hex}30, transparent)`,
                                }}
                            />

                            {/* Líneas de cuadrícula decorativas */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                                    backgroundSize: '40px 40px',
                                }}
                            />

                            {/* Badge de color activo */}
                            <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <div
                                    className="w-3 h-3 rounded-full ring-2 ring-white/30 transition-colors duration-500"
                                    style={{ backgroundColor: selectedColor.hex }}
                                />
                                <span className="text-xs font-bold text-white/80">{selectedColor.name}</span>
                            </div>

                            {/* Badge de material */}
                            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                                <span className="text-xs font-bold text-white/60">{selectedProduct.material}</span>
                            </div>

                            {/* VISOR 3D */}
                            <ClothingViewer3D
                                emoji={selectedProduct.emoji}
                                color={selectedColor.hex}
                                isSpinning={isSpinning}
                                onSpinComplete={() => setIsSpinning(false)}
                            />

                            {/* Precio flotante */}
                            <div className="absolute bottom-6 left-6">
                                <p className="text-3xl font-black text-white">S/ {selectedProduct.price}<span className="text-sm font-normal text-white/40">.00</span></p>
                            </div>

                            {/* Nombre de la prenda */}
                            <div className="absolute bottom-6 right-6 text-right">
                                <p className="text-xs text-white/40 uppercase tracking-widest">{categories.find(c => c.id === activeCategory)?.label}</p>
                                <p className="text-sm font-bold text-white">{selectedProduct.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* ─ PANEL DERECHO: Configuración ─ */}
                    <div className="lg:col-span-3 order-2 lg:order-3 space-y-6">

                        {/* Descripción */}
                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                            <h2 className="text-xl font-bold mb-2 text-white">{selectedProduct.name}</h2>
                            <p className="text-sm text-white/50 leading-relaxed">{selectedProduct.description}</p>
                        </div>

                        {/* Selector de colores */}
                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Color</h3>
                                <span className="text-xs font-bold text-[#D4AF37]">{selectedColor.name}</span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {selectedProduct.colors.map((color) => (
                                    <button
                                        key={color.hex}
                                        onClick={() => handleColorChange(color)}
                                        title={color.name}
                                        className="relative"
                                        style={{ width: 34, height: 34 }}
                                    >
                                        <div
                                            className="w-full h-full rounded-full transition-all duration-300"
                                            style={{
                                                backgroundColor: color.hex,
                                                boxShadow: selectedColor.hex === color.hex
                                                    ? `0 0 0 2px #0D0D0D, 0 0 0 4px ${color.hex}, 0 0 15px ${color.hex}80`
                                                    : `0 0 0 1px rgba(255,255,255,0.1)`,
                                                transform: selectedColor.hex === color.hex ? 'scale(1.2)' : 'scale(1)',
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Selector de tallas */}
                        <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Talla</h3>
                                {selectedSize && (
                                    <span className="text-xs font-bold text-[#D4AF37]">{selectedSize.label} seleccionada</span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedProduct.sizes.map((size) => (
                                    <button
                                        key={size.label}
                                        onClick={() => size.available && setSelectedSize(size)}
                                        disabled={!size.available}
                                        className={`flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 border ${!size.available
                                            ? 'opacity-25 cursor-not-allowed text-white/30 border-white/10'
                                            : selectedSize?.label === size.label
                                                ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                                                : 'text-white/70 border-white/20 hover:border-white/50 hover:text-white'
                                            }`}
                                        style={{ minWidth: 44, height: 44, padding: '0 8px' }}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Botón agregar al carrito */}
                        <button
                            onClick={handleAddToCart}
                            className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 ${addedToCart
                                ? 'bg-green-500 text-white scale-95'
                                : 'bg-[#D4AF37] text-black hover:brightness-110 hover:scale-[1.02] active:scale-95'
                                }`}
                            style={{ boxShadow: addedToCart ? '0 0 30px rgba(34, 197, 94, 0.4)' : '0 0 30px rgba(212, 175, 55, 0.3)' }}
                        >
                            {addedToCart ? '✓ ¡Agregado al Carrito!' : `Agregar al Carrito · S/ ${selectedProduct.price}`}
                        </button>

                        {/* WhatsApp CTA */}
                        <a
                            href={`https://wa.me/51928141669?text=Hola,%20quiero%20información%20sobre%20el%20${encodeURIComponent(selectedProduct.name)}%20color%20${encodeURIComponent(selectedColor.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 border border-white/20 text-white/60 hover:text-white hover:border-white/50 flex items-center justify-center gap-2"
                        >
                            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Consultar por WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
