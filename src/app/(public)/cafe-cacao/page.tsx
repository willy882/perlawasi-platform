import Link from 'next/link'
import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
    title: 'Café & Cacao Perlawasi - Herencia Andina en Cada Taza | San Martín',
    description: 'Café de especialidad y chocolates artesanales elaborados con cacao ancestral. Experiencia premium de degustación en el corazón de la selva.',
}

export default async function CafeCacaoPage() {
    // Fetch products from Supabase
    const { data: products } = await supabase
        .from('cafe_cacao')
        .select('*')
        .order('category', { ascending: true })

    // Separate by type or handle categories
    const ritualBoxes = products?.filter(p => p.category?.toLowerCase().includes('ritual') || p.category?.toLowerCase().includes('caja')) || []
    const individualProducts = products?.filter(p => !p.category?.toLowerCase().includes('ritual') && !p.category?.toLowerCase().includes('caja')) || []

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Dark Premium */}
            <section className="relative h-[75vh] flex items-center overflow-hidden bg-brand-dark">
                {/* Fondo de Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover opacity-85 contrast-[1.05] brightness-[0.95]"
                    >
                        <source src="/videos/hero_cafe_cacao.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                </div>

                <div className="relative z-20 container-custom text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-primary-500 text-white text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                            Herencia & Aroma
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Café & Cacao
                        </h1>
                        <p className="text-xl text-white/80 mb-10 leading-relaxed">
                            Dos tesoros peruanos unidos en una experiencia sensorial única. Del grano a la taza, del cacao al chocolate más fino.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link href="#productos" className="btn btn-primary px-10 py-4 text-lg">
                                Explorar Colección
                            </Link>
                            <Link href="#degustacion" className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 px-10 py-4 text-lg">
                                Reservar Degustación
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dual Origin Story */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Café */}
                        <div className="space-y-6">
                            <div className="text-6xl mb-4">☕</div>
                            <h2 className="text-4xl font-display font-bold">Café de las Alturas</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Granos cultivados a más de 1,500 metros sobre el nivel del mar en las montañas andinas. Cada taza cuenta la historia de agricultores que dedican su vida al cultivo perfecto.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                    <span className="text-gray-700">Tostado artesanal en pequeños lotes</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                    <span className="text-gray-700">Notas de chocolate, caramelo y frutas</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                    <span className="text-gray-700">Comercio justo certificado</span>
                                </div>
                            </div>
                        </div>

                        {/* Cacao */}
                        <div className="space-y-6">
                            <div className="text-6xl mb-4">🍫</div>
                            <h2 className="text-4xl font-display font-bold">Cacao Ancestral</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Cacao fino de aroma de San Martín, cultivado con técnicas que honran la tradición de nuestros ancestros. Transformado en chocolates que preservan la pureza del origen.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                    <span className="text-gray-700">100% cacao peruano de origen</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                    <span className="text-gray-700">Sin aditivos ni conservantes</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                                    <span className="text-gray-700">Proceso bean-to-bar artesanal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cajas de Ritual Premium */}
            <section id="productos" className="section bg-[#F9F6F2]">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Experiencias Curadas</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6">Cajas de Ritual</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Colecciones diseñadas para transformar tus momentos en ceremonias sensoriales
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ritualBoxes.length > 0 ? (
                            ritualBoxes.map((p, i) => (
                                <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all group">
                                    <div className="aspect-square relative bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                                        {p.image_url ? (
                                            <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                        ) : (
                                            i % 2 === 0 ? '☕' : '🍫'
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <span className="text-xs font-bold text-primary-500 uppercase tracking-wider">{p.category}</span>
                                        <h3 className="text-2xl font-display font-bold mt-2 mb-3">{p.name}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {p.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-gray-900">S/ {p.price}</span>
                                            <button className="btn btn-primary px-6 py-2 text-sm">Agregar</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-400 italic">No hay cajas de ritual disponibles.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Productos Individuales */}
            <section className="section bg-white">
                <div className="container-custom">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Productos Individuales</h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {individualProducts.length > 0 ? (
                            individualProducts.map((p, i) => (
                                <div key={p.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-soft transition-all">
                                    <div className="aspect-square relative bg-gradient-to-br from-amber-200 to-amber-100 rounded-xl flex items-center justify-center text-6xl mb-4 overflow-hidden">
                                        {p.image_url ? (
                                            <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                        ) : (
                                            p.category?.toLowerCase().includes('cafe') ? '☕' : '🍫'
                                        )}
                                    </div>
                                    <h4 className="font-bold text-lg mb-2">{p.name}</h4>
                                    <p className="text-sm text-gray-600 mb-3">{p.description?.substring(0, 50)}...</p>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-lg">S/ {p.price}</span>
                                        <button className="text-primary-500 font-bold text-sm">+</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-400 italic">No hay productos individuales disponibles.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Experiencia de Degustación */}
            <section id="degustacion" className="section bg-brand-dark text-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <span className="text-primary-400 font-bold uppercase tracking-widest text-xs">Experiencia Sensorial</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold">
                                Degustación Guiada
                            </h2>
                            <p className="text-white/80 text-lg leading-relaxed">
                                Sumérgete en un viaje sensorial donde aprenderás a identificar notas, aromas y texturas. Nuestro sommelier te guiará a través de 6 variedades de café y 5 tipos de chocolate.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">⌛</div>
                                    <div>
                                        <p className="font-bold">Duración</p>
                                        <p className="text-white/70">5 a 10 minutos</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">🎁</div>
                                    <div>
                                        <p className="font-bold">Inversión</p>
                                        <p className="text-white/70">¡Completamente Gratis!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-amber-900 to-amber-700 flex items-center justify-center text-[12rem] shadow-2xl">
                            🫘
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section id="reservar" className="py-24 bg-gradient-to-br from-[#4A2C2A] to-[#2A1A18]">
                <div className="container-custom text-center text-white">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Descubre Nuestra Colección
                    </h2>
                    <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                        Visita nuestra tienda o contáctanos para pedidos personalizados y envíos a todo el Perú
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20información%20sobre%20Café%20y%20Cacao"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary px-12 py-5 text-xl font-bold">
                            Contactar por WhatsApp
                        </a>
                        <Link href="/" className="btn bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 px-12 py-5 text-xl font-bold">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
