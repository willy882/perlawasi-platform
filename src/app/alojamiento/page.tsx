import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Alojamiento Perlawasi - Santuario de Lujo en la Naturaleza | San Martín',
    description: 'Suites y cabañas de lujo en el corazón de la selva. Experiencias de alojamiento que conectan con la naturaleza.',
}

export default function AlojamientoPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-[75vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-green-900 to-blue-900 flex items-center justify-center text-9xl">
                    🏨
                </div>

                <div className="relative z-20 container-custom text-white">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-2 bg-primary-500 text-white text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                            Descanso Profundo
                        </span>
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                            Brisa Lodge
                        </h1>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">
                            Suites diseñadas para la paz y el reencuentro con la naturaleza. Lujo sostenible en el corazón de San Martín.
                        </p>
                        <Link href="#habitaciones" className="btn btn-primary px-10 py-4 text-lg">
                            Ver Habitaciones
                        </Link>
                    </div>
                </div>
            </section>

            {/* Habitaciones */}
            <section id="habitaciones" className="section bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Nuestras Suites</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">Espacios de Ensueño</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Suite 1 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-medium hover:shadow-strong transition-all group">
                            <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-blue-50 flex items-center justify-center text-9xl group-hover:scale-105 transition-transform duration-500">
                                🌳
                            </div>
                            <div className="p-10">
                                <h3 className="text-3xl font-display font-bold mb-4">Suite Panorámica</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Vista 360° a la selva, terraza privada, jacuzzi exterior, cama king size, minibar premium.
                                </p>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-3xl font-bold text-primary-500">S/ 450<span className="text-lg text-gray-500">/noche</span></span>
                                </div>
                                <Link href="#reservar" className="btn btn-primary w-full py-3">Reservar Ahora</Link>
                            </div>
                        </div>

                        {/* Suite 2 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-medium hover:shadow-strong transition-all group">
                            <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-green-50 flex items-center justify-center text-9xl group-hover:scale-105 transition-transform duration-500">
                                🏡
                            </div>
                            <div className="p-10">
                                <h3 className="text-3xl font-display font-bold mb-4">Cabaña Rústica</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Construcción tradicional, chimenea, hamaca, baño con vista al bosque, conexión total con la naturaleza.
                                </p>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-3xl font-bold text-primary-500">S/ 320<span className="text-lg text-gray-500">/noche</span></span>
                                </div>
                                <Link href="#reservar" className="btn btn-primary w-full py-3">Reservar Ahora</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Amenidades */}
            <section className="section bg-gradient-to-br from-green-50 to-blue-50">
                <div className="container-custom">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Amenidades Incluidas</h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { emoji: '🍽️', title: 'Desayuno Gourmet', desc: 'Buffet con productos locales' },
                            { emoji: '🧘', title: 'Yoga al Amanecer', desc: 'Sesiones guiadas diarias' },
                            { emoji: '🌿', title: 'Tour de Huerta', desc: 'Recorrido por cultivos orgánicos' },
                            { emoji: '🛁', title: 'Spa Natural', desc: 'Masajes con aceites amazónicos' },
                        ].map((amenidad, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-soft">
                                <div className="text-6xl mb-4">{amenidad.emoji}</div>
                                <h4 className="font-bold text-lg mb-2">{amenidad.title}</h4>
                                <p className="text-gray-600 text-sm">{amenidad.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Paquetes */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Experiencias Completas</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">Paquetes Especiales</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-3xl p-10">
                            <h3 className="text-2xl font-display font-bold mb-4">Escapada Romántica</h3>
                            <p className="text-gray-700 mb-6">2 noches + cena romántica + masaje de pareja + tour privado</p>
                            <div className="text-3xl font-bold text-primary-600 mb-4">S/ 1,200</div>
                            <Link href="#reservar" className="btn bg-primary-600 text-white w-full py-3">Reservar</Link>
                        </div>

                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl p-10">
                            <h3 className="text-2xl font-display font-bold mb-4">Retiro de Bienestar</h3>
                            <p className="text-gray-700 mb-6">3 noches + yoga diario + spa + alimentación detox</p>
                            <div className="text-3xl font-bold text-primary-600 mb-4">S/ 1,650</div>
                            <Link href="#reservar" className="btn bg-primary-600 text-white w-full py-3">Reservar</Link>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-3xl p-10">
                            <h3 className="text-2xl font-display font-bold mb-4">Aventura Familiar</h3>
                            <p className="text-gray-700 mb-6">4 noches + actividades para niños + tours guiados</p>
                            <div className="text-3xl font-bold text-primary-600 mb-4">S/ 2,100</div>
                            <Link href="#reservar" className="btn bg-primary-600 text-white w-full py-3">Reservar</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Reserva */}
            <section id="reservar" className="py-24 bg-gradient-to-br from-primary-500 to-primary-600">
                <div className="container-custom text-center text-white">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Reserva tu Experiencia
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Disponibilidad limitada. Asegura tu estadía en el paraíso
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20reservar%20alojamiento%20en%20Perlawasi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-white text-primary-600 px-12 py-5 text-xl font-bold">
                            Reservar por WhatsApp
                        </a>
                        <a href="tel:+51928141669" className="btn bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 px-12 py-5 text-xl font-bold">
                            Llamar Ahora
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
