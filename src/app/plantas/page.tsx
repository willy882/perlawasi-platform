import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Plantas Perlawasi - Oasis de Vida para tu Hogar | San Martín',
    description: 'Nuestra florería ofrece una selección curada de plantas nativas y exóticas. Aprende sobre el cuidado de tus plantas y transforma tus espacios.',
}

export default function PlantasPage() {
    const categories = [
        { name: 'Interior', emoji: '🪴', color: 'bg-[#F0F7F4]' },
        { name: 'Exterior', emoji: '🌳', color: 'bg-[#EBF1ED]' },
        { name: 'Suculentas', emoji: '🌵', color: 'bg-[#F4F9F6]' },
        { name: 'Aromáticas', emoji: '🌿', color: 'bg-[#F1F6F2]' },
    ]

    const plants = [
        { name: 'Monstera Deliciosa', price: 45, level: 'Fácil', emoji: '🌿' },
        { name: 'Ficus Lyrata', price: 120, level: 'Medio', emoji: '🌳' },
        { name: 'Lengua de Suegra', price: 35, level: 'Muy Fácil', emoji: '🪴' },
        { name: 'Helecho Espada', price: 40, level: 'Medio', emoji: '🌿' },
        { name: 'Orquídea Amazónica', price: 75, level: 'Difícil', emoji: '🌸' },
        { name: 'Palmerita de Salón', price: 55, level: 'Fácil', emoji: '🌴' },
    ]

    return (
        <div className="min-h-screen bg-[#FBFDFB] text-gray-900">
            {/* Hero Section - Light Eco-Friendly */}
            <section className="relative h-[60vh] flex items-center overflow-hidden bg-[#E8F3ED]">
                <div className="absolute right-[-10%] top-[-10%] w-[50%] h-[50%] bg-[#00D100] blur-[200px] opacity-[0.05] rounded-full" />
                <div className="absolute left-[20%] bottom-0 text-[35rem] leading-none font-bold text-white select-none opacity-40">
                    ZEN
                </div>

                <div className="relative z-20 container-custom">
                    <div className="max-w-2xl px-4">
                        <span className="text-primary-600 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">Nature Indoors</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                            Verdor Interior
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                            Transforma tus espacios en oasis de vida. Una colección curada de plantas que purifican el aire y elevan tu bienestar diario.
                        </p>
                        <div className="flex gap-6 flex-wrap">
                            <Link href="#galeria" className="btn bg-primary-600 text-white px-10 py-4 text-lg font-bold rounded-2xl hover:bg-primary-700 shadow-medium transition-all">
                                Explorar Vivero
                            </Link>
                            <Link href="#cuidados" className="btn border-2 border-primary-100 text-primary-700 px-10 py-4 text-lg font-bold rounded-2xl hover:bg-white/50 backdrop-blur-sm transition-all">
                                Guía de Cuidados
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Categories */}
            <section className="py-12 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.map((cat, i) => (
                            <div key={i} className={`${cat.color} rounded-2xl p-6 flex items-center justify-between group cursor-pointer hover:shadow-soft transition-all`}>
                                <div className="text-3xl transition-transform group-hover:scale-125">{cat.emoji}</div>
                                <span className="font-bold text-sm uppercase tracking-widest">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery / Product Grid */}
            <section id="galeria" className="section bg-white pt-10">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <div className="max-w-xl">
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Selección Curada</h2>
                            <p className="text-gray-500">Cada planta es tratada individualmente para asegurar su salud óptima antes de llegar a tu hogar.</p>
                        </div>
                        <Link href="/all-plants" className="text-primary-600 font-bold border-b-2 border-primary-600 pb-1">Ver catálogo completo →</Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {plants.map((plant, i) => (
                            <div key={i} className="group bg-[#F9FBF9] rounded-[2.5rem] p-8 hover:bg-white hover:shadow-strong transition-all duration-500 border border-transparent hover:border-primary-50">
                                <div className="aspect-square bg-white rounded-3xl flex items-center justify-center text-[10rem] mb-8 relative shadow-soft overflow-hidden">
                                    <div className="absolute inset-0 bg-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6 z-10">{plant.emoji}</div>
                                </div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold mb-1">{plant.name}</h3>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Cuidado: {plant.level}</p>
                                    </div>
                                    <span className="text-xl font-bold text-primary-700">S/ {plant.price}</span>
                                </div>
                                <button className="btn bg-gray-900 text-white w-full py-3 rounded-2xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">Añadir al Carrito</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guía de Cuidados */}
            <section id="cuidados" className="section bg-[#E8F3ED] overflow-hidden">
                <div className="container-custom relative">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-medium bg-white p-12 flex flex-col justify-between group">
                            <div className="text-[12rem] text-center transition-transform duration-1000 group-hover:rotate-12">🚿</div>
                            <div className="space-y-6">
                                <h3 className="text-3xl font-display font-bold">Guía de Riego Correcto</h3>
                                <p className="text-gray-600">Muchas plantas mueren por exceso de agua. Aprende a escuchar las necesidades hídricas de cada especie según la temporada y humedad.</p>
                                <button className="btn btn-primary px-8 py-3 rounded-xl font-bold">Descargar PDF →</button>
                            </div>
                        </div>
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <span className="text-primary-600 font-bold uppercase tracking-widest text-xs">Expert Insights</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">Secretos del Vivero</h2>
                            </div>

                            <div className="space-y-10">
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-soft">☀️</div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-2">Luz Indirecta</h4>
                                        <p className="text-gray-500">La mayoría de las plantas de interior prosperan en luz filtrada, no directa.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-soft">🌬️</div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-2">Humedad Ambiental</h4>
                                        <p className="text-gray-500">Técnicas de pulverización y agrupación para ambientes amazónicos.</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-soft">🧪</div>
                                    <div>
                                        <h4 className="font-bold text-xl mb-2">Fertilización Natural</h4>
                                        <p className="text-gray-500">Uso de compost artesanal y abonos locales de bajo impacto.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Eco CTA */}
            <section className="py-24 bg-white text-center">
                <div className="container-custom">
                    <div className="bg-primary-50 rounded-[4rem] p-16 md:p-24 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">¿Necesitas asesoría botánica?</h2>
                            <p className="text-gray-600 text-xl mb-12 max-w-2xl mx-auto">Nuestros expertos te ayudan a elegir la planta perfecta para las condiciones de tu espacio.</p>
                            <a href="https://wa.me/51928141669?text=Hola,%20quiero%20asesoría%20sobre%20plantas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary px-16 py-6 text-2xl rounded-2xl font-bold shadow-strong">Habla con un Experto</a>
                        </div>
                        <div className="absolute bottom-[-5rem] left-[-5rem] text-[20rem] opacity-[0.03] select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000">🌿</div>
                    </div>
                </div>
            </section>

            {/* Footer / Location Map Placeholder */}
            <section className="py-24 bg-brand-dark text-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-display font-bold mb-6">Visítanos en el Vivero</h2>
                    <p className="text-gray-400 mb-12">Estamos ubicados dentro de las instalaciones de Perlawasi, en Segunda Jerusalén.</p>
                    <div className="flex gap-6 justify-center flex-wrap">
                        <Link href="/" className="btn bg-white text-black px-10 py-4 font-bold rounded-2xl">Ir a Home</Link>
                        <Link href="/restaurante" className="btn border border-white/20 text-white px-10 py-4 font-bold rounded-2xl hover:bg-white/10">Ver Restaurante</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
