'use client'

import { useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase'
import { FiLoader, FiShoppingBag, FiInfo, FiChevronRight, FiImage } from 'react-icons/fi'

const ClothingViewer3D = dynamic(() => import('./ClothingViewer3D'), { ssr: false })

// ÔöÇÔöÇÔöÇ TIPOS ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
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
    image_url?: string
}

// ÔöÇÔöÇÔöÇ COMPONENTE PRINCIPAL ÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇÔöÇ
export default function FashionConfigurator() {
    const [allProducts, setAllProducts] = useState<ClothingItem[]>([])
    const [categories, setCategories] = useState<{ id: string, label: string, icon: string }[]>([])
    const [activeCategory, setActiveCategory] = useState('Todos')
    const [selectedProduct, setSelectedProduct] = useState<ClothingItem | null>(null)
    const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
    const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null)
    const [isSpinning, setIsSpinning] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchLiveProducts()
    }, [])

    async function fetchLiveProducts() {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('productos_ropa')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            if (data) {
                const formatted = data.map(p => {
                    // Procesar tallas
                    const sizesObj = Array.isArray(p.sizes)
                        ? p.sizes.map((s: string) => ({ label: s, available: true }))
                        : [{ label: '├Ünica', available: true }]

                    // Procesar colores
                    let colorsObj = [{ name: 'Por defecto', hex: '#D4AF37' }]
                    if (p.colors) {
                        try {
                            colorsObj = Array.isArray(p.colors) ? p.colors : JSON.parse(p.colors)
                        } catch {
                            colorsObj = String(p.colors).split(',').map(c => {
                                const [name, hex] = c.split(':').map(s => s.trim())
                                return { name: name || 'Color', hex: hex || '#D4AF37' }
                            })
                        }
                    }

                    return {
                        id: p.id,
                        name: p.name,
                        category: p.category || 'Varios',
                        price: p.price,
                        emoji: p.emoji || '­ƒæò',
                        description: p.description || '',
                        material: p.material || 'Lino & Algod├│n',
                        colors: colorsObj,
                        sizes: sizesObj,
                        image_url: p.image_url
                    }
                })

                setAllProducts(formatted)

                const uniqueCats = Array.from(new Set(formatted.map(p => p.category)))
                setCategories([
                    { id: 'Todos', label: 'Todos', icon: 'Ô£¿' },
                    ...uniqueCats.map(cat => ({ id: cat, label: cat, icon: '­ƒÅÀ´©Å' }))
                ])

                if (formatted.length > 0) {
                    setSelectedProduct(formatted[0])
                    setSelectedColor(formatted[0].colors[0])
                }
            }
        } catch (e) {
            console.error('Error:', e)
        } finally {
            setLoading(false)
        }
    }

    const filteredProducts = activeCategory === 'Todos' ? allProducts : allProducts.filter(p => p.category === activeCategory)

    const handleProductChange = useCallback((product: ClothingItem) => {
        if (product.id === selectedProduct?.id) return
        setIsSpinning(true)
        setSelectedProduct(product)
        setSelectedColor(product.colors[0])
        setSelectedSize(null)
    }, [selectedProduct])

    if (loading) {
        return (
            <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-6">
                <FiLoader className="text-5xl text-[#D4AF37] animate-spin" />
                <p className="text-[#D4AF37]/40 text-[10px] font-black uppercase tracking-[0.5em]">Sincronizando Boutique de Autor...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
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

            {/* CATEGOR├ìAS */}
            <div className="flex justify-center gap-2 flex-wrap px-6 mb-20">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat.id
                            ? 'bg-[#D4AF37] text-black shadow-2xl scale-105'
                            : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* CONFIGURADOR */}
            <div className="max-w-[1400px] mx-auto px-6 pb-40">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* LISTA DE PRENDAS */}
                    <div className="lg:col-span-3 space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar-gold">
                        {filteredProducts.map((product) => (
                            <button
                                key={product.id}
                                onClick={() => handleProductChange(product)}
                                className={`w-full flex items-center gap-5 p-6 rounded-[2.5rem] transition-all duration-700 text-left border-2 ${selectedProduct?.id === product.id
                                    ? 'bg-white/10 border-[#D4AF37]/40 shadow-2xl'
                                    : 'bg-transparent border-transparent hover:bg-white/5'
                                    }`}
                            >
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform overflow-hidden">
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        product.emoji
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-black truncate ${selectedProduct?.id === product.id ? 'text-[#D4AF37]' : 'text-white/60'}`}>{product.name}</p>
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">S/ {product.price}</p>
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
                                    color={selectedColor?.hex || '#D4AF37'}
                                    isSpinning={isSpinning}
                                    onSpinComplete={() => setIsSpinning(false)}
                                />
                            ) : null}

                            {/* Info Flotante */}
                            <div className="absolute top-10 left-10 flex gap-2">
                                <span className="px-5 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-black uppercase tracking-[0.3em]">{selectedProduct?.material}</span>
                                {selectedColor && (
                                    <div className="flex items-center gap-3 bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full">
                                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: selectedColor.hex }} />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{selectedColor.name}</span>
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-10 left-10">
                                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-2">Precio de Colecci├│n</p>
                                <h3 className="text-5xl font-black tracking-tighter">S/ {selectedProduct?.price}</h3>
                            </div>
                        </div>
                    </div>

                    {/* DETALLE Y ACCIONES */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{selectedProduct?.name}</h2>
                            <p className="text-white/40 font-light italic leading-loose text-sm">
                                {selectedProduct?.description || 'Una pieza artesanal diseñada con fibras naturales y acabados de lujo.'}
                            </p>
                        </div>

                        {selectedProduct?.colors && selectedProduct.colors.length > 0 && (
                            <div className="space-y-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Paleta de Tonalidades</p>
                                <div className="flex flex-wrap gap-3">
                                    {selectedProduct.colors.map(color => (
                                        <button
                                            key={color.hex}
                                            onClick={() => setSelectedColor(color)}
                                            className={`p-1 rounded-xl transition-all border-2 ${selectedColor?.hex === color.hex ? 'border-[#D4AF37] scale-110' : 'border-transparent'}`}
                                        >
                                            <div className="w-10 h-10 rounded-lg shadow-xl" style={{ backgroundColor: color.hex }} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Talla Seleccionada</p>
                            <div className="grid grid-cols-4 gap-2">
                                {selectedProduct?.sizes.map(size => (
                                    <button
                                        key={size.label}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-4 rounded-2xl text-[10px] font-black transition-all border ${selectedSize?.label === size.label ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/10'}`}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 space-y-4">
                            <a
                                href={`https://wa.me/51928141669?text=Hola,%20quisiera%20adquirir%20el%20${encodeURIComponent(selectedProduct?.name || '')}%20en%20color%20${encodeURIComponent(selectedColor?.name || '')}`}
                                target="_blank"
                                className="w-full flex items-center justify-center gap-4 py-7 bg-white text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-[#D4AF37] transition-all transform hover:-translate-y-2 shadow-2xl"
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
