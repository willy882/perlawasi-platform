'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { FiLoader, FiShoppingBag, FiArrowRight, FiMaximize2, FiShare2, FiHeart } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

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
    { id: 'camisetas', label: 'Basics', icon: '👕' },
    { id: 'pantalones', label: 'Bottoms', icon: '👖' },
    { id: 'vestidos', label: 'Couture', icon: '👗' },
    { id: 'abrigos', label: 'Outerwear', icon: '🧥' },
    { id: 'accesorios', label: 'Objects', icon: '👜' },
    { id: 'calzado', label: 'Footwear', icon: '👟' },
]

const allProducts: ClothingItem[] = [
    {
        id: 'polo-lino',
        name: 'Polo Perlamayo',
        category: 'camisetas',
        price: 85,
        emoji: '👕',
        image: '/images/ropa/polo-perlamayo.png',
        description: 'Cotton weight: 240gsm. Oversized fit. Organic fibers harvested in the Amazonian high-lands. Minimalist silhouette with raw hems.',
        material: 'Algodón Premium 100% Organico',
        colors: [
            { name: 'Onyx Black', hex: '#111111' },
            { name: 'Paper White', hex: '#F5F5F5' },
            { name: 'Sage Green', hex: '#87A878' },
            { name: 'Terracotta', hex: '#C0703A' },
        ],
        sizes: [
            { label: 'XS', available: true },
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
        ],
    },
    {
        id: 'bikini-selva',
        name: 'Bikini Selva Chic',
        category: 'vestidos',
        price: 120,
        emoji: '👙',
        image: '/images/ropa/bikini.png',
        description: 'Engineered for the tropical sun. High-performance recycled lycra. Fast-drying, UV protection. Hand-finished details.',
        material: 'Lycra Reciclada Premium',
        colors: [
            { name: 'Midnight', hex: '#050505' },
            { name: 'Pearl', hex: '#FFFFFF' },
            { name: 'Electric Blue', hex: '#0022FF' },
        ],
        sizes: [
            { label: 'S', available: true },
            { label: 'M', available: true },
            { label: 'L', available: true },
        ],
    },
    {
        id: 'lenceria-perla',
        name: 'Lencería Perla',
        category: 'vestidos',
        price: 95,
        emoji: '🎀',
        image: '/images/ropa/ropainteriror.png',
        description: 'Delicate intimacy. Bamboo silk mesh mixed with local lace patterns. Designed for comfort without compromising allure.',
        material: 'Seda de Bambú y Encaje',
        colors: [
            { name: 'Cloud Blue', hex: '#ADD8E6' },
            { name: 'Pure White', hex: '#FFFFFF' },
            { name: 'Blush Pink', hex: '#FFB6C1' },
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
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

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

    if (!mounted) return null

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-[#D4AF37] selection:text-black">

            {/* GRAIN OVERLAY */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* HERO SELECTO */}
            <header className="relative pt-40 pb-20 px-6 container mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#D4AF37] block mb-10 opacity-80">
                        San Martín · Perú · Since 2024
                    </span>
                    <h1 className="text-7xl md:text-[14rem] font-display font-black tracking-tight leading-[0.8] uppercase mb-12 transform hover:scale-[1.02] transition-transform duration-1000">
                        BOUTIQUE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] via-[#C5A028] to-[#8B7355] italic">PERLAWASI</span>
                    </h1>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-16 max-w-4xl mx-auto">
                        <p className="text-white/30 text-lg font-light leading-relaxed text-left border-l border-white/10 pl-10 italic">
                            High-end garments crafted with ancestral knowledge and contemporary design logic.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] group cursor-pointer hover:bg-[#D4AF37] hover:text-black transition-all">
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest self-center opacity-40">Scroll to curate</span>
                        </div>
                    </div>
                </motion.div>
            </header>

            {/* NAV DE CATEGORÍAS - STICKY FLOW */}
            <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-3xl border-y border-white/5 py-6 mb-32">
                <div className="container mx-auto px-6 flex justify-center gap-12 overflow-x-auto no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryChange(cat.id)}
                            className={`group relative whitespace-nowrap flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${activeCategory === cat.id ? 'text-[#D4AF37]' : 'text-white/20 hover:text-white/60'}`}
                        >
                            <span>{cat.id === activeCategory && '•'}</span>
                            <span>{cat.label}</span>
                            {activeCategory === cat.id && (
                                <motion.div layoutId="catUnderline" className="absolute -bottom-6 left-0 right-0 h-1 bg-[#D4AF37]" />
                            )}
                        </button>
                    ))}
                </div>
            </nav>

            {/* CONFIGURADOR PRINCIPAL */}
            <main className="container mx-auto px-6 pb-64">
                <div className="grid lg:grid-cols-12 gap-32 items-start">

                    {/* SIDELAR SECTION - SELECCION DE PRODUCTO */}
                    <aside className="lg:col-span-3 space-y-16 lg:sticky lg:top-40">
                        <section>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-10 opacity-50">Discovery</h3>
                            <div className="flex flex-col gap-6">
                                <AnimatePresence mode="wait">
                                    {filteredProducts.map((product) => (
                                        <motion.button
                                            key={product.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            onClick={() => handleProductChange(product)}
                                            className={`group w-full text-left p-6 rounded-[2rem] transition-all duration-700 border ${selectedProduct.id === product.id ? 'bg-white/5 border-white/10 shadow-2xl' : 'border-transparent hover:bg-white/5 opacity-40 hover:opacity-100'}`}
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{product.emoji}</span>
                                                <span className="text-[10px] font-black tracking-widest">S/ {product.price}</span>
                                            </div>
                                            <h4 className="text-sm font-black uppercase tracking-widest mb-2 leading-none">{product.name}</h4>
                                            <p className="text-[9px] text-white/20 uppercase tracking-[0.2em]">Ready to Wear</p>
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                                {filteredProducts.length === 0 && (
                                    <p className="text-[10px] text-white/20 uppercase tracking-widest italic">Coming soon to this capsule</p>
                                )}
                            </div>
                        </section>

                        <section className="p-8 rounded-[3rem] bg-gradient-to-br from-[#D4AF37]/5 to-transparent border border-[#D4AF37]/10">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mb-6">Manifesto</h4>
                            <p className="text-[11px] leading-relaxed text-white/40 italic">
                                "La elegancia no es destacar, sino ser recordado por la pureza de la forma y el respeto a la tierra."
                            </p>
                        </section>
                    </aside>

                    {/* FOCUS SECTION - EL VISOR 3D */}
                    <figure className="lg:col-span-6 relative group">
                        {/* ETIQUETA FLOTANTE */}
                        <div className="absolute -top-12 -left-12 z-10 p-6 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 rotate-[-4deg] shadow-2xl">
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1">Archival Piece</p>
                            <p className="text-xs font-serif italic text-white/40">Item #{selectedProduct.id.slice(0, 6).toUpperCase()}</p>
                        </div>

                        <div className="relative aspect-[3/4] md:aspect-square bg-gradient-to-b from-[#0a0a0a] to-[#050505] rounded-[5rem] shadow-[0_60px_100px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center border border-white/5">
                            {/* AMBIENT LIGHTS */}
                            <div className="absolute top-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#D4AF3711,transparent_70%)]" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedProduct.id}
                                    initial={{ opacity: 0, scale: 0.9, rotateY: 90 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, rotateY: -90 }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                    className="w-full h-full"
                                >
                                    <ClothingViewer3D
                                        emoji={selectedProduct.emoji}
                                        color={selectedColor.hex}
                                        image={selectedProduct.image}
                                        isSpinning={isSpinning}
                                        onSpinComplete={() => setIsSpinning(false)}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* CONTROLES OVERLAY */}
                            <div className="absolute top-10 right-10 flex flex-col gap-4">
                                <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                                    <FiMaximize2 className="text-white/40" />
                                </button>
                                <button className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                                    <FiShare2 className="text-white/40" />
                                </button>
                            </div>
                        </div>

                        {/* SOMBRA DINÁMICA */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-10 bg-[#D4AF37]/10 blur-[60px] rounded-full pointer-events-none" />
                    </figure>

                    {/* ACTION SECTION - CONFIGURACIÓN Y COMPRA */}
                    <div className="lg:col-span-3 space-y-16 lg:sticky lg:top-40">
                        <section className="space-y-8">
                            <div>
                                <h2 className="text-5xl font-display font-black uppercase tracking-tighter leading-none mb-6 italic">{selectedProduct.name}</h2>
                                <p className="text-white/40 font-light leading-relaxed text-xs border-l-2 border-[#D4AF37]/40 pl-6">
                                    {selectedProduct.description}
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-4">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Material Composition</p>
                                <p className="text-xs font-serif italic text-white/50">{selectedProduct.material}</p>
                            </div>
                        </section>

                        <section className="space-y-10">
                            {/* SELECTOR DE COLOR */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Paleta</p>
                                    <span className="text-[10px] font-black opacity-30">{selectedColor.name}</span>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {selectedProduct.colors.map((color) => (
                                        <button
                                            key={color.hex}
                                            onClick={() => handleColorChange(color)}
                                            className={`w-12 h-12 rounded-2xl transition-all duration-700 border-2 ${selectedColor.hex === color.hex ? 'border-white scale-125 shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'border-transparent hover:scale-110 opacity-60 hover:opacity-100'}`}
                                            style={{ backgroundColor: color.hex }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* SELECTOR DE TALLA */}
                            <div className="space-y-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Dimension</p>
                                <div className="grid grid-cols-4 gap-3">
                                    {selectedProduct.sizes.map((size) => (
                                        <button
                                            key={size.label}
                                            onClick={() => size.available && setSelectedSize(size)}
                                            disabled={!size.available}
                                            className={`h-14 rounded-2xl text-[10px] font-black transition-all duration-700 border ${!size.available
                                                ? 'opacity-5 cursor-not-allowed grayscale'
                                                : selectedSize?.label === size.label
                                                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-2xl'
                                                    : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white'
                                                }`}
                                        >
                                            {size.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <footer className="pt-10 space-y-6">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className={`w-full py-8 text-black rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 transition-all duration-1000 shadow-2xl ${addedToCart ? 'bg-green-500 shadow-green-500/20' : 'bg-[#D4AF37] shadow-[#D4AF37]/20 hover:bg-white hover:scale-[1.02]'}`}
                            >
                                <FiShoppingBag className="text-lg" />
                                {addedToCart ? "Secured in Bag" : "Acquire Piece"}
                            </motion.button>

                            <a
                                href={`https://wa.me/51928141669?text=Hola,%20quisiera%20adquirir%20la%20prenda%20${encodeURIComponent(selectedProduct.name)}%20en%20color%20${encodeURIComponent(selectedColor.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-6 bg-white/5 text-white/40 rounded-[2.5rem] border border-white/10 text-center text-[9px] font-black uppercase tracking-widest hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2"
                            >
                                WhatsApp Concierge <FiArrowRight />
                            </a>

                            <div className="flex justify-center gap-12 pt-8 opacity-20">
                                <span className="text-[8px] font-black uppercase tracking-tighter">Luxury Worldwide</span>
                                <span className="text-[8px] font-black uppercase tracking-tighter">Carbon Neutral</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </main>

            {/* EXPERIENCE BANNER */}
            <section className="py-64 bg-white text-black relative">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent opacity-10" />
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
                    <div>
                        <h2 className="text-6xl md:text-9xl font-display font-black leading-[0.8] mb-12 uppercase">THE <br /> SILK <br /> <span className="italic">WAY</span></h2>
                        <p className="text-xl font-light leading-relaxed max-w-lg mb-12 uppercase tracking-tighter">Cultivating beauty from the roots of the Amazon. Every stitch tells the story of a culture that flows with the river.</p>
                        <button className="bg-black text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-110 transition-transform">Inquire about tailoring</button>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] bg-gray-100 rounded-[4rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
                            <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Atelier" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-[10px] font-black uppercase tracking-[0.3em] text-center p-8 border-[12px] border-white rotate-12">
                            Ethically Crafted
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER PREMIUM */}
            <footer className="py-32 border-t border-white/5 text-center">
                <p className="text-7xl md:text-[15rem] font-display font-black tracking-tighter text-white/5 opacity-40 uppercase leading-none pointer-events-none">PERLAWASI LUXURY</p>
                <div className="container mx-auto px-6 mt-20 flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                    <p>© 2024 Perlawasi Boutique</p>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-[#D4AF37] transition-all">Instagram</a>
                        <a href="#" className="hover:text-[#D4AF37] transition-all">Artesanía</a>
                        <a href="#" className="hover:text-[#D4AF37] transition-all">Sostenibilidad</a>
                    </div>
                    <p>Designed in San Martín</p>
                </div>
            </footer>
        </div>
    )
}
