'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { FiLoader, FiShoppingBag } from 'react-icons/fi'

const ClothingViewer3D = dynamic(() => import('./ClothingViewer3D'), { ssr: false })

// --- TIPOS ---
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
    image?: string
    description: string
    material: string
    colors: ColorOption[]
    sizes: SizeOption[]
}

// --- DATOS DE PRODUCTOS ---
const categories = [
    { id: 'camisetas', label: 'Camisetas', icon: '👕' },
    { id: 'pantalones', label: 'Pantalones', icon: '👖' },
    { id: 'vestidos', label: 'Vestidos', icon: '👗' },
    { id: 'abrigos', label: 'Abrigos', icon: '🧥' },
    { id: 'accesorios', label: 'Accesorios', icon: '👜' },
    { id: 'calzado', label: 'Calzado', icon: '👟' },
]

const allProducts: ClothingItem[] = [
    {
        id: 'polo-lino',
        name: 'Polo Perlamayo',
        category: 'camisetas',
        price: 85,
        emoji: '👕',
        image: '/images/ropa/polo-perlamayo.png',
        description: 'Polo exclusivo Perlamayo en algodón premium. Diseño minimalista con el sello de la selva amazónica.',
        material: 'Algodón Premium 100%',
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
        emoji: '🧥',
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
    {
        id: 'vestido-nature',
        name: 'Vestido Nature Flow',
        category: 'vestidos',
        price: 180,
        emoji: '👗',
        description: 'Un vestido que fluye como el agua. Diseñado para celebrar la feminidad en armonía con la naturaleza.',
        material: 'Viscosa de Bambú',
        colors: [
            { name: 'Siena', hex: '#A0522D' },
            { name: 'Verde Musgo', hex: '#556B2F' },
            { name: 'Palo Rosa', hex: '#D8BFD8' },
        ],
        sizes: [
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
        ],
    }
]

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
        <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">

            {/* HERO SELECTO */}
            <div className="text-center pt-32 pb-20 px-6">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] block mb-6 px-4 py-2 bg-[#D4AF37]/5 rounded-full border border-[#D4AF37]/10 w-fit mx-auto">
                    Colección Exclusiva Perlawasi
                </span>
                <h1 className="text-6xl md:text-[10rem] font-display font-black tracking-tighter leading-[0.85] uppercase">
                    BOUTIQUE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#8B7355]">PERLAWASI</span>
                </h1>
                <p className="text-white/40 mt-10 text-xl max-w-2xl mx-auto font-light leading-relaxed italic">
                    Piezas limitadas en lino orgánico y fibras naturales. La sostenibilidad convertida en alta costura amazónica.
                </p>
            </div>

            {/* SELECTOR DE CATEGORÍAS */}
            <div className="flex justify-center gap-4 flex-wrap px-4 mb-20">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`flex items-center gap-3 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-500 border ${activeCategory === cat.id
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.3)] scale-105'
                            : 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* CONFIGURADOR PRINCIPAL */}
            <div className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* SELECTOR DE PRODUCTOS */}
                    <div className="lg:col-span-3 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-6 px-2">
                            Disponibles en {categories.find(c => c.id === activeCategory)?.label}
                        </p>
                        {filteredProducts.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => handleProductChange(product)}
                                className={`w-full group flex items-center gap-4 p-4 rounded-3xl transition-all duration-500 text-left border ${selectedProduct.id === product.id
                                    ? 'bg-white/5 border-[#D4AF37]/30 shadow-xl'
                                    : 'border-transparent hover:bg-white/5'
                                    }`}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-[#111] border border-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                                    {product.emoji}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm font-bold uppercase tracking-tight ${selectedProduct.id === product.id ? 'text-white' : 'text-white/40'}`}>
                                        {product.name}
                                    </p>
                                    <p className="text-xs font-black text-[#D4AF37]">S/ {product.price}.00</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* VISOR PRINCIPAL - PRIORIDAD 3D */}
                    <div className="lg:col-span-6">
                        <div className="relative aspect-[4/5] md:aspect-square bg-gradient-to-b from-[#111] to-black rounded-[4rem] border border-white/5 overflow-hidden group shadow-2xl flex items-center justify-center">
                            {selectedProduct ? (
                                <ClothingViewer3D
                                    emoji={selectedProduct.emoji}
                                    color={selectedColor.hex}
                                    image={selectedProduct.image}
                                    isSpinning={isSpinning}
                                    onSpinComplete={() => setIsSpinning(false)}
                                />
                            ) : null}

                            {/* Info de color */}
                            <div className="absolute top-10 left-10 flex items-center gap-3 bg-black/40 backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/10">
                                <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ backgroundColor: selectedColor.hex }} />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{selectedColor.name}</span>
                            </div>
                        </div>
                    </div>

                    {/* CONFIGURACIÓN Y COMPRA */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{selectedProduct.name}</h2>
                            <p className="text-white/40 font-light italic leading-loose text-sm">
                                {selectedProduct.description}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Seleccionar Tonalidad</p>
                            <div className="flex flex-wrap gap-3">
                                {selectedProduct.colors.map((color) => (
                                    <button
                                        key={color.hex}
                                        onClick={() => handleColorChange(color)}
                                        className={`w-10 h-10 rounded-full transition-all duration-500 border-2 ${selectedColor.hex === color.hex ? 'border-white scale-125 shadow-2xl' : 'border-transparent hover:scale-110'}`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Talla Requerida</p>
                            <div className="flex flex-wrap gap-2">
                                {selectedProduct.sizes.map((size) => (
                                    <button
                                        key={size.label}
                                        onClick={() => size.available && setSelectedSize(size)}
                                        disabled={!size.available}
                                        className={`w-12 h-12 rounded-2xl text-[10px] font-black transition-all duration-500 border ${!size.available
                                            ? 'opacity-10 cursor-not-allowed grayscale'
                                            : selectedSize?.label === size.label
                                                ? 'bg-white text-black border-white'
                                                : 'bg-[#111] text-white/40 border-white/5 hover:border-white/20 hover:text-white'
                                            }`}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 space-y-4">
                            <a
                                href={`https://wa.me/51928141669?text=Hola,%20quisiera%20adquirir%20la%20prenda%20${encodeURIComponent(selectedProduct.name)}%20en%20color%20${encodeURIComponent(selectedColor.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-6 bg-white text-black rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500"
                            >
                                <FiShoppingBag className="text-xl" /> Adquirir Ahora
                            </a>
                            <p className="text-center text-[9px] font-black text-white/20 uppercase tracking-widest">Envíos nacionales • Packaging sostenible</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
