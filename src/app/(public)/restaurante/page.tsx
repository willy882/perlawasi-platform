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
                        <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-medium">
                            <Image
                                src="/images/filosofia_restaurante_v2.png"
                                alt="Nuestra Filosofía - Kilómetro Cero"
                                fill
                                className="object-cover"
                                quality={100}
                                priority
                            />
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
                                ­ƒÑù
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Ensalada de la Huerta</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Vegetales frescos de nuestra huerta con vinagreta de maracuy├í y hierbas arom├íticas.
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
                                ­ƒì▓
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Inchicapi Amaz├│nico</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Sopa tradicional de gallina criolla con man├¡, cilantro y yuca de la regi├│n.
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
                                ­ƒÉƒ
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
                                ­ƒìû
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Cecina con Tacacho</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Cerdo ahumado artesanalmente con bolas de pl├ítano verde y chorizo regional.
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
                                ­ƒìç
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Juane Gourmet</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Arroz con pollo envuelto en hojas de bijao, versi├│n premium con especias secretas.
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
                                ­ƒì░
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3">Postre de Camu Camu</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Mousse de camu camu con crumble de cacao y frutas amaz├│nicas frescas.
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

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Experiencia 1 */}
                        <div className="bg-brand-dark/40 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:bg-brand-dark/60 transition-all flex flex-col relative overflow-hidden group">
                            {/* Fondo de Imagen */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/images/exp_chocolate.png"
                                    alt="Degustaci├│n de Chocolate"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                    quality={100}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl font-display font-bold mb-4">Degustaci├│n de Chocolate</h3>
                                <p className="text-white/80 text-lg mb-6 leading-relaxed flex-grow">
                                    Un viaje sensorial por los aromas y sabores del cacao amaz├│nico en sus diferentes concentraciones y texturas.
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-bold text-primary-400">Consultar</span>
                                    <Link href="#reservar" className="btn btn-primary px-6 py-2">Reservar</Link>
                                </div>
                            </div>
                        </div>

                        {/* Experiencia 2 */}
                        <div className="bg-brand-dark/40 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:bg-brand-dark/60 transition-all flex flex-col relative overflow-hidden group">
                            {/* Fondo de Imagen */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/images/exp_cafe.png"
                                    alt="Tour del Caf├®"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                    quality={100}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl font-display font-bold mb-4">Tour del Caf├®</h3>
                                <p className="text-white/80 text-lg mb-6 leading-relaxed flex-grow">
                                    Descubre el proceso desde el grano hasta la taza con una cata guiada de nuestros varietales m├ís exclusivos.
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-bold text-primary-400">Consultar</span>
                                    <Link href="#reservar" className="btn btn-primary px-6 py-2">Reservar</Link>
                                </div>
                            </div>
                        </div>

                        {/* Experiencia 3 */}
                        <div className="bg-brand-dark/40 backdrop-blur-sm border border-white/10 rounded-3xl p-10 hover:bg-brand-dark/60 transition-all flex flex-col relative overflow-hidden group">
                            {/* Fondo de Imagen */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/images/exp_licores_v4.png"
                                    alt="Licores Perlamayo"
                                    fill
                                    className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                                    quality={100}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full">
                                <h3 className="text-2xl font-display font-bold mb-4">Licores Perlamayo</h3>
                                <p className="text-white/80 text-lg mb-6 leading-relaxed flex-grow">
                                    Explora nuestra selecci├│n de destilados y macerados artesanales inspirados en los frutos ex├│ticos de la selva.
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-bold text-primary-400">Consultar</span>
                                    <Link href="#reservar" className="btn btn-primary px-6 py-2">Reservar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ubicaci├│n */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Encu├®ntranos</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold">
                                En el Coraz├│n de San Mart├¡n
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">­ƒôì</div>
                                    <div>
                                        <p className="font-bold text-gray-900">Direcci├│n</p>
                                        <p>Segunda Jerusal├®n - Rioja, San Mart├¡n, Per├║</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">­ƒòÉ</div>
                                    <div>
                                        <p className="font-bold text-gray-900">Horario</p>
                                        <p>Lunes a Domingo: 8:00 AM - 10:00 PM</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-2xl">­ƒô×</div>
                                    <div>
                                        <p className="font-bold text-gray-900">Contacto</p>
                                        <p>+51 928 141 669</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-strong border border-gray-100 group">
                            <iframe
                                src="https://www.google.com/maps?q=Perlawasi+Lodge+%26+Experiences+Rioja+San+Martin&output=embed&z=16&t=m&hl=es&cache=4.5"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="contrast-[1.1]"
                            ></iframe>
                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                <a
                                    href="https://www.google.com/maps/dir/?api=1&destination=Perlawasi+Lodge+%26+Experiences+Rioja+San+Martin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white text-gray-900 px-4 py-2 rounded-xl shadow-lg border border-gray-100 text-sm font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors"
                                >
                                    <span>­ƒÜù</span> C├│mo llegar
                                </a>
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Perlawasi+Lodge+%26+Experiences+Rioja+San+Martin"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-brand-dark/80 backdrop-blur-md text-white px-4 py-2 rounded-xl shadow-lg border border-white/10 text-sm font-bold flex items-center gap-2 hover:bg-brand-dark transition-colors"
                                >
                                    <span>­ƒù║´©Å</span> Pantalla Completa
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reserva CTA */}
            <section id="reservar" className="py-24 bg-gradient-to-br from-primary-500 to-primary-600">
                <div className="container-custom text-center text-white">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Reserva tu Experiencia Gastron├│mica
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
