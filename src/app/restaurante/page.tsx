import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Restaurante Perlawasi - Del Campo a la Mesa | Gastronomía Peruana',
    description: 'Experiencia gastronómica única con ingredientes de kilómetro cero. Platos signature que celebran la biodiversidad de San Martín.',
}

export default function RestaurantePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[70vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero_restaurante_v2.png"
                        alt="Gastronomía Perlawasi"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                </div>

                <div className="relative z-20 container-custom text-white">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 bg-primary-500 text-white text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                            Kilómetro Cero
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Del Campo a tu Mesa
                        </h1>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl">
                            Celebramos la biodiversidad de San Martín con ingredientes frescos de nuestra huerta. Cada plato cuenta la historia de nuestra tierra.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link href="#menu" className="btn btn-primary px-10 py-4 text-lg">
                                Ver Menú
                            </Link>
                            <Link href="#reservar" className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 px-10 py-4 text-lg">
                                Reservar Mesa
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filosofía Kilómetro Cero */}
            <section className="section bg-[#F9F6F2]">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Nuestra Filosofía</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
                                Ingredientes que Viajan Metros, No Kilómetros
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Trabajamos directamente con agricultores locales y nuestra propia huerta orgánica. Cada ingrediente es seleccionado en su punto óptimo de maduración, garantizando frescura y sabor incomparables.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="space-y-2">
                                    <div className="text-4xl font-bold text-primary-500">100%</div>
                                    <p className="text-sm text-gray-600 font-medium">Ingredientes Locales</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-4xl font-bold text-primary-500">0km</div>
                                    <p className="text-sm text-gray-600 font-medium">De la Huerta a la Cocina</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-medium bg-green-100 flex items-center justify-center text-9xl">
                            🌱
                        </div>
                    </div>
                </div>
            </section>

            {/* Platos Signature */}
            <section id="menu" className="section bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Nuestros Clásicos</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6">Platos Signature</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Creaciones culinarias que fusionan técnicas ancestrales con innovación contemporánea
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Plato 1 */}
                        <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                                🥗
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Ensalada de la Huerta</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Vegetales frescos de nuestra huerta con vinagreta de maracuyá y hierbas aromáticas.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-primary-500">S/ 28</span>
                                    <button className="btn btn-primary px-6 py-2 text-sm">Ordenar</button>
                                </div>
                            </div>
                        </div>

                        {/* Plato 2 */}
                        <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                            <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                                🍲
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Inchicapi Amazónico</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Sopa tradicional de gallina criolla con maní, cilantro y yuca de la región.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-primary-500">S/ 35</span>
                                    <button className="btn btn-primary px-6 py-2 text-sm">Ordenar</button>
                                </div>
                            </div>
                        </div>

                        {/* Plato 3 */}
                        <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                            <div className="aspect-square bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                                🐟
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Paiche a la Parrilla</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Filete de paiche amazónico con salsa de aguaje y plátano caramelizado.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-primary-500">S/ 48</span>
                                    <button className="btn btn-primary px-6 py-2 text-sm">Ordenar</button>
                                </div>
                            </div>
                        </div>

                        {/* Plato 4 */}
                        <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                            <div className="aspect-square bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                                🍖
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Cecina con Tacacho</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Cerdo ahumado artesanalmente con bolas de plátano verde y chorizo regional.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-primary-500">S/ 42</span>
                                    <button className="btn btn-primary px-6 py-2 text-sm">Ordenar</button>
                                </div>
                            </div>
                        </div>

                        {/* Plato 5 */}
                        <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                            <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                                🍇
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Juane Gourmet</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Arroz con pollo envuelto en hojas de bijao, versión premium con especias secretas.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-primary-500">S/ 38</span>
                                    <button className="btn btn-primary px-6 py-2 text-sm">Ordenar</button>
                                </div>
                            </div>
                        </div>

                        {/* Plato 6 */}
                        <div className="group bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300">
                            <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform duration-500">
                                🍰
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Postre de Camu Camu</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Mousse de camu camu con crumble de cacao y frutas amazónicas frescas.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-primary-500">S/ 22</span>
                                    <button className="btn btn-primary px-6 py-2 text-sm">Ordenar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experiencias Exclusivas */}
            <section className="section bg-brand-dark text-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-primary-400 font-bold uppercase tracking-widest text-xs">Solo en Perlawasi</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">Experiencias Exclusivas</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Experiencia 1 */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all">
                            <div className="text-6xl mb-6">👨‍🍳</div>
                            <h3 className="text-3xl font-display font-bold mb-4">Mesa del Chef</h3>
                            <p className="text-white/80 text-lg mb-6 leading-relaxed">
                                Menú degustación de 7 tiempos diseñado exclusivamente por nuestro chef. Incluye maridaje con vinos peruanos y visita a la cocina.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-primary-400">S/ 180</span>
                                <Link href="#reservar" className="btn btn-primary px-8 py-3">Reservar</Link>
                            </div>
                        </div>

                        {/* Experiencia 2 */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:bg-white/10 transition-all">
                            <div className="text-6xl mb-6">🌿</div>
                            <h3 className="text-3xl font-display font-bold mb-4">Tour de la Huerta</h3>
                            <p className="text-white/80 text-lg mb-6 leading-relaxed">
                                Recorrido guiado por nuestra huerta orgánica seguido de almuerzo campestre con ingredientes recién cosechados.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl font-bold text-primary-400">S/ 95</span>
                                <Link href="#reservar" className="btn btn-primary px-8 py-3">Reservar</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ubicación */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Encuéntranos</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold">
                                En el Corazón de San Martín
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">📍</div>
                                    <div>
                                        <p className="font-bold text-gray-900">Dirección</p>
                                        <p>Segunda Jerusalén - Rioja, San Martín, Perú</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">🕐</div>
                                    <div>
                                        <p className="font-bold text-gray-900">Horario</p>
                                        <p>Lunes a Domingo: 8:00 AM - 10:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">📞</div>
                                    <div>
                                        <p className="font-bold text-gray-900">Contacto</p>
                                        <p>+51 928 141 669</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-medium bg-green-50 flex items-center justify-center text-9xl">
                            🗺️
                        </div>
                    </div>
                </div>
            </section>

            {/* Reserva CTA */}
            <section id="reservar" className="py-24 bg-gradient-to-br from-primary-500 to-primary-600">
                <div className="container-custom text-center text-white">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Reserva tu Experiencia Gastronómica
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Asegura tu mesa y vive una experiencia culinaria que celebra lo mejor de nuestra tierra
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href="tel:+51928141669" className="btn bg-white text-primary-600 px-12 py-5 text-xl font-bold hover:bg-gray-100">
                            Llamar Ahora
                        </a>
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20reservar%20una%20mesa%20en%20el%20restaurante"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 px-12 py-5 text-xl font-bold">
                            WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
