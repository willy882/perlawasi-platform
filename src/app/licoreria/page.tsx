import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Licorería Perlawasi - El Alma de los Andes en Destilados | San Martín',
    description: 'Destilados premium y macerados artesanales únicos. Descubre la sofisticación de nuestros licores de autor inspirados en la biodiversidad.',
}

export default function LicoreriaPage() {
    const products = [
        { name: 'Cacao Spirit', type: 'Destilado de Cacao', notes: 'Frutos secos, chocolate amargo', emoji: '🥃', color: 'bg-[#1a1a1a]' },
        { name: 'Andean Botanical', type: 'Gin de Montaña', notes: 'Enebro, hierba luisa, cítricos', emoji: '🍸', color: 'bg-[#0f172a]' },
        { name: 'Mistify Rum', type: 'Ron Añejo', notes: 'Melaza, roble, vainilla', emoji: '🥃', color: 'bg-[#1e1e1e]' },
        { name: 'Floral Mist', type: 'Licor de Flores', notes: 'Pétalos de rosa, flor de saúco', emoji: '🍶', color: 'bg-[#2d1b1b]' },
    ]

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Hero Section - Sophisticated Dark Theme with Gold Accents */}
            <section className="relative h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50 z-10" />
                <div className="absolute inset-0 bg-[#0f1012] flex items-center justify-center">
                    <div className="w-[80vw] h-[80vw] bg-[#FFD700] rounded-full blur-[200px] opacity-[0.05]" />
                </div>

                <div className="relative z-20 container-custom">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Premium Spirits</span>
                        <h1 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-tight">
                            El Alma de <br />los Andes
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                            Destilados de autor creados para elevar los sentidos. Una oda a la biodiversidad peruana encapsulada en botellas de lujo.
                        </p>
                        <div className="flex gap-6 justify-center flex-wrap">
                            <Link href="#coleccion" className="btn bg-[#D4AF37] text-black px-12 py-5 text-xl font-bold hover:bg-[#C09A30] transition-all">
                                Ver Colección
                            </Link>
                            <Link href="#historia" className="btn border-2 border-white/20 text-white px-12 py-5 text-xl font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                                Nuestra Historia
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Collection Showcase */}
            <section id="coleccion" className="section bg-[#0a0a0a]">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Colección de Autor</h2>
                        <div className="w-20 h-1 bg-[#D4AF37] mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {products.map((item, i) => (
                            <div key={i} className="group relative">
                                <div className={`aspect-[3/4] ${item.color} rounded-[2rem] border border-white/5 flex items-center justify-center text-8xl mb-6 shadow-2xl transition-all duration-500 group-hover:-translate-y-4 group-hover:border-[#D4AF37]/30`}>
                                    {item.emoji}
                                    <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-2xl font-display font-bold text-white mb-2">{item.name}</h3>
                                    <p className="text-[#D4AF37] text-sm font-bold uppercase tracking-widest mb-3">{item.type}</p>
                                    <p className="text-gray-500 text-sm italic">{item.notes}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section id="historia" className="section relative overflow-hidden bg-[#0f0f0f]">
                <div className="container-custom relative z-10">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div>
                                <span className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Legado & Pureza</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 leading-tight">La Destilería del Bosque</h2>
                                <p className="text-gray-400 text-lg mt-6 leading-relaxed">
                                    Nuestros alambiques son testigos de un proceso lento y cuidadoso. Destilamos en pequeños lotes utilizando botánicos recolectados de manera sostenible en los alrededores de Perlawasi.
                                </p>
                            </div>
                            <div className="space-y-6">
                                <div className="flex gap-6 items-center p-6 bg-white/5 rounded-3xl border border-white/10">
                                    <div className="text-4xl">🍯</div>
                                    <div>
                                        <h4 className="font-bold">Macerado Ancestral</h4>
                                        <p className="text-gray-500 text-sm">Técnicas heredadas de comunidades locales.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6 items-center p-6 bg-white/5 rounded-3xl border border-white/10">
                                    <div className="text-4xl">✨</div>
                                    <div>
                                        <h4 className="font-bold">Triple Destilación</h4>
                                        <p className="text-gray-500 text-sm">Pureza excepcional sin comprometer el sabor.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[600px] rounded-[4rem] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center text-[15rem] shadow-strong">
                            🏺
                        </div>
                    </div>
                </div>
            </section>

            {/* Catas CTA */}
            <section className="py-32 bg-white text-black text-center">
                <div className="container-custom">
                    <span className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-6 block">Private Experience</span>
                    <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Noche de Selección</h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Disfruta de una cata exclusiva dirigida por nuestro mixólogo. Aprende los secretos de cada destilado y descubre la historia detrás de cada nota.
                    </p>
                    <Link href="/reservar" className="btn bg-black text-white px-16 py-6 text-2xl rounded-full font-bold shadow-2xl transition-all hover:bg-gray-800">
                        Reservar Cata Privada
                    </Link>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-[#D4AF37] text-black">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-10">Lleva el Espíritu de Perlawasi contigo</h2>
                    <div className="flex gap-6 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20información%20sobre%20vuestra%20licorería%20premium"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-black text-white px-12 py-5 text-xl font-bold hover:bg-gray-900 shadow-xl">
                            Contactar Asesor
                        </a>
                        <Link href="/" className="btn border-2 border-black/20 text-black px-12 py-5 text-xl font-bold hover:bg-black/5">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
