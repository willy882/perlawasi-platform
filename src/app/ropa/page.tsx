import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Ropa Perlawasi - Moda Consciente y Natural | San Martín',
    description: 'Nuestra boutique ofrece prendas diseñadas para el bienestar y la armonía con el entorno. Materiales orgánicos y diseño minimalista.',
}

export default function RopaPage() {
    const products = [
        { name: 'Polo Essential Lino', price: 85, emoji: '👕', category: 'Camisetas' },
        { name: 'Pantalón Relax Algodón', price: 120, emoji: '👖', category: 'Pantalones' },
        { name: 'Hoodie Soft Cloud', price: 150, emoji: '🧥', category: 'Abrigos' },
        { name: 'Vestido Nature Flow', price: 180, emoji: '👗', category: 'Vestidos' },
        { name: 'Tote Bag Perlawasi', price: 45, emoji: '👜', category: 'Accesorios' },
        { name: 'Gorra Nature Cap', price: 55, emoji: '🧢', category: 'Accesorios' },
        { name: 'Bufanda Wool Mix', price: 75, emoji: '🧣', category: 'Accesorios' },
        { name: 'Sandalias Zen Walk', price: 95, emoji: '🩴', category: 'Calzado' },
    ]

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-gray-900">
            {/* Hero Section - Clean Minimalist */}
            <section className="relative h-[65vh] flex items-center overflow-hidden bg-[#F4F1ED]">
                <div className="absolute inset-x-0 bottom-0 top-0 left-0 flex items-center justify-center opacity-30 select-none pointer-events-none">
                    <span className="text-[25rem] font-display font-bold text-white uppercase tracking-tighter">Cloth</span>
                </div>

                <div className="relative z-20 container-custom">
                    <div className="max-w-xl animate-fade-in pl-4">
                        <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">Sustainable Fashion</span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-tight">
                            Ropa Esencial
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                            Básicos conscientes diseñados para tu ritual diario. La elegancia de lo natural en armonía con tu cuerpo y el planeta.
                        </p>
                        <Link href="#coleccion" className="btn bg-black text-white px-12 py-4 text-lg font-bold hover:bg-gray-800 transition-all rounded-full">
                            Explorar Colección
                        </Link>
                    </div>
                </div>
            </section>

            {/* Collection Section with Filters (Sidebar Mockup) */}
            <section id="coleccion" className="section bg-white">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-16">
                        {/* Sidebar Filters */}
                        <aside className="lg:w-64 space-y-12 shrink-0">
                            <div>
                                <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider underline decoration-[#D4AF37] underline-offset-8">Categorías</h4>
                                <ul className="space-y-4 text-gray-500">
                                    <li className="font-bold text-black border-l-2 border-black pl-4">Ver Todo</li>
                                    <li className="pl-4 hover:text-black transition-colors cursor-pointer">Camisetas</li>
                                    <li className="pl-4 hover:text-black transition-colors cursor-pointer">Pantalones</li>
                                    <li className="pl-4 hover:text-black transition-colors cursor-pointer">Abrigos</li>
                                    <li className="pl-4 hover:text-black transition-colors cursor-pointer">Accesorios</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Materiales</h4>
                                <ul className="space-y-4 text-gray-500">
                                    <li className="flex items-center gap-3"><div className="w-3 h-3 rounded-full border border-gray-300"></div> Lino Orgánico</li>
                                    <li className="flex items-center gap-3"><div className="w-3 h-3 rounded-full border border-gray-300"></div> Algodón Pima</li>
                                    <li className="flex items-center gap-3"><div className="w-3 h-3 rounded-full border border-gray-300"></div> Lana de Alpaca</li>
                                </ul>
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-12">
                                <p className="text-gray-400 text-sm">Mostrando {products.length} productos registrados</p>
                                <select className="bg-transparent border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-black cursor-pointer">
                                    <option>Más recientes</option>
                                    <option>Precio: bajo a alto</option>
                                    <option>Precio: alto a bajo</option>
                                </select>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
                                {products.map((p, i) => (
                                    <div key={i} className="group">
                                        <div className="aspect-[4/5] bg-[#F9F7F5] rounded-3xl overflow-hidden relative mb-6 cursor-pointer">
                                            <div className="absolute inset-0 flex items-center justify-center text-9xl transition-transform duration-700 group-hover:scale-110 select-none">
                                                {p.emoji}
                                            </div>
                                            <div className="absolute top-4 right-4 group-hover:opacity-100 transition-opacity">
                                                <span className="w-10 h-10 bg-white shadow-soft rounded-full flex items-center justify-center">♡</span>
                                            </div>
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:bottom-8 w-[80%]">
                                                <button className="btn bg-black text-white w-full py-3 rounded-full text-xs font-bold shadow-strong">Vista Rápida</button>
                                            </div>
                                        </div>
                                        <h3 className="font-display font-bold text-xl mb-1">{p.name}</h3>
                                        <p className="text-gray-400 text-xs mb-3 uppercase tracking-widest">{p.category}</p>
                                        <p className="font-bold text-lg">S/ {p.price}.00</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lookbook / Lifestyle Section */}
            <section className="section bg-[#F4F1ED]">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="relative h-[650px] rounded-[3rem] overflow-hidden bg-white shadow-medium flex items-center justify-center text-[15rem] group">
                            🧥
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="space-y-10">
                            <div>
                                <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Aesthetics</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 leading-tight">Minimalismo Consciente</h2>
                                <p className="text-gray-600 text-lg mt-8 leading-relaxed">
                                    Nuestra colección está inspirada en la simplicidad de la naturaleza. Usamos colores que evocan la tierra, el cielo y la selva, creando prendas que duran en el tiempo.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-10">
                                <div>
                                    <h4 className="font-display font-bold text-2xl mb-2">100%</h4>
                                    <p className="text-gray-500 text-sm">Fibras Naturales</p>
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-2xl mb-2">Ético</h4>
                                    <p className="text-gray-500 text-sm">Comercio Justo</p>
                                </div>
                            </div>
                            <Link href="/brand-story" className="text-black font-bold border-b-2 border-black pb-2 hover:border-[#D4AF37] transition-colors inline-block pt-4">Conoce nuestro compromiso →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA Section */}
            <section className="py-24 bg-white border-y border-gray-100">
                <div className="container-custom text-center">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">Únete al Ritual</h2>
                    <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">Suscríbete para recibir noticias sobre nuestras nuevas colecciones y eventos exclusivos de moda consciente.</p>
                    <form className="max-w-md mx-auto flex gap-4">
                        <input type="email" placeholder="Tu correo electrónico" className="flex-1 bg-[#F9F7F5] border-none px-6 py-4 rounded-full focus:ring-2 focus:ring-black focus:bg-white transition-all outline-none" />
                        <button className="btn bg-black text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800">Unirme</button>
                    </form>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 bg-black text-white text-center">
                <div className="container-custom">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-10">Viste con Propósito</h2>
                    <div className="flex gap-6 justify-center flex-wrap">
                        <Link href="/" className="btn bg-white text-black px-12 py-5 text-xl font-bold hover:bg-gray-100">Cerrar Sesión</Link>
                        <Link href="https://wa.me/51928141669?text=Hola,%20quiero%20información%20sobre%20vuestra%20boutique%20consciente"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn border-2 border-white/20 text-white px-12 py-5 text-xl font-bold hover:bg-white/10 backdrop-blur-md">Atención al Cliente</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
