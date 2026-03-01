import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'

export const metadata: Metadata = {
    title: 'Cervecería Perlawasi - Cerveza Artesanal con Alma de Montaña | San Martín',
    description: 'Descubre nuestras variedades de cerveza artesanal elaboradas con agua de manantial y lúpulos seleccionados. Visita nuestro taproom gourmet.',
}

export default async function CerveceriaPage() {
    // Fetch beers from Supabase
    const { data: dbBeers } = await supabase
        .from('cerveceria')
        .select('*')
        .order('created_at', { ascending: false })

    const beers = dbBeers?.map(b => ({
        ...b,
        emoji: '🍺',
        color: b.category?.toLowerCase().includes('ipa') ? 'from-amber-600 to-amber-400' :
            (b.category?.toLowerCase().includes('porter') || b.category?.toLowerCase().includes('stout') ? 'from-gray-900 to-gray-700' :
                (b.category?.toLowerCase().includes('red') ? 'from-red-600 to-red-400' : 'from-yellow-400 to-yellow-200')),
        type: b.category || 'Artesanal'
    })) || []

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Video Background */}
            <section className="relative h-[70vh] flex items-center overflow-hidden bg-[#FFB300]">
                {/* Fondo de Video */}
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                    >
                        <source src="/videos/hero_cerveceria.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="absolute inset-0 bg-black/30 z-10" />


                <div className="relative z-20 container-custom text-white">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 bg-black text-[#FFB300] text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                            Artesana & Natural
                        </span>
                        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight">
                            Maestría en <br />Cada Malta
                        </h1>
                        <p className="text-2xl text-white/95 mb-10 leading-relaxed max-w-2xl">
                            Cervezas únicas con sabores inspirados en las montañas. Elaboradas con agua pura de manantial y pasión inquebrantable.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link href="#variedades" className="btn bg-black text-white px-10 py-4 text-lg hover:bg-gray-900">
                                Ver Variedades
                            </Link>
                            <Link href="#taproom" className="btn bg-white/20 backdrop-blur-md text-white border border-white/40 hover:bg-white/30 px-10 py-4 text-lg">
                                Visitar Taproom
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brewing Process */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative h-[500px] rounded-[3rem] overflow-hidden bg-gray-100">
                            <Image
                                src="/images/cerveceria_fermentacion.png"
                                alt="Proceso de Fermentación"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="order-1 md:order-2 space-y-6">
                            <span className="text-[#FFB300] font-bold uppercase tracking-widest text-xs">El Arte de Elaborar</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                                Ritual de Fermentación
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Nuestro proceso combina tecnología moderna con técnicas tradicionales de fermentación. Desde la selección manual de los granos hasta el embotellado final, cada paso es supervisado por nuestros maestros cerveceros.
                            </p>
                            <ul className="space-y-4 pt-4">
                                {[
                                    { title: 'Agua de Manantial', desc: 'Pureza absoluta desde la fuente natural.' },
                                    { title: 'Lúpulos Seleccionados', desc: 'Aromas y amargores equilibrados a la perfección.' },
                                    { title: 'Maduración Lenta', desc: 'El tiempo necesario para desarrollar el carácter real.' }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#FFB300] flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Beer Grid */}
            <section id="variedades" className="section bg-brand-dark text-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-[#FFB300] font-bold uppercase tracking-widest text-xs">Nuestra Selección</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">Variedades de Autor</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {beers.map((beer, i) => (
                            <div key={i} className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-all group">
                                <div className={`aspect-square relative rounded-2xl bg-gradient-to-br ${beer.color} flex items-center justify-center text-7xl mb-6 transition-transform group-hover:scale-110 overflow-hidden`}>
                                    {beer.image_url ? (
                                        <img src={beer.image_url} alt={beer.name} className="w-full h-full object-cover" />
                                    ) : (
                                        beer.emoji
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{beer.name}</h3>
                                <p className="text-[#FFB300] font-bold text-sm mb-4 uppercase tracking-widest">{beer.type}</p>
                                <div className="flex justify-between items-center text-gray-400 text-sm">
                                    <span>Stock: {beer.stock} • S/ {beer.price}</span>
                                    <button className="text-white hover:text-[#FFB300] transition-colors">Ver Ficha →</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Taproom Section */}
            <section id="taproom" className="section bg-[#F9F6F2]">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <span className="text-[#FFB300] font-bold uppercase tracking-widest text-xs">Vive la Experiencia</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mt-2">Visita Nuestro Taproom</h2>
                                <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                                    Ven y disfruta de nuestras cervezas recién salidas del barril. Un ambiente único donde la cultura cervecera se encuentra con la alta cocina en un maridaje perfecto.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-6 bg-white rounded-2xl shadow-soft">
                                    <h4 className="font-bold mb-2">Catas Guiadas</h4>
                                    <p className="text-xs text-gray-500">Prueba todas nuestras variedades con un guía experto.</p>
                                </div>
                                <div className="p-6 bg-white rounded-2xl shadow-soft">
                                    <h4 className="font-bold mb-2">Maridaje</h4>
                                    <p className="text-xs text-gray-500">Snacks especiales diseñados para cada tipo de cerveza.</p>
                                </div>
                            </div>
                            <Link href="/reservar" className="btn bg-black text-white px-10 py-4 rounded-full text-lg inline-block">
                                Reservar Visita
                            </Link>
                        </div>
                        <div className="relative h-[600px] rounded-[4rem] overflow-hidden bg-amber-100 flex items-center justify-center text-[10rem] shadow-medium">
                            🥨
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-[#FFB300]">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-black">¿Sed de algo real?</h2>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20hacer%20un%20pedido%20de%20cervezas"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-black text-white px-12 py-5 text-xl font-bold">
                            Pedir Pack de Degustación
                        </a>
                        <Link href="/" className="btn bg-white text-black px-12 py-5 text-xl font-bold hover:bg-gray-100">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
