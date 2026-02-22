import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Alojamiento Perlawasi - Santuario de Lujo en la Naturaleza | San Martín',
    description: 'Suites y cabañas de lujo en el corazón de la selva. Experiencias de alojamiento que conectan con la naturaleza.',
}

export default function AlojamientoPage() {
    return (
        <div className="min-h-screen bg-[#050805] text-[#f0f0f0] overflow-x-hidden pt-20 px-4 md:px-0">
            {/* ═══ SUPER HERO HOSPEDAJE ═══ */}
            <section className="relative min-h-[90vh] flex items-center pt-10 pb-20">
                {/* Texturas de fondo sutiles */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.05)_0%,transparent_70%)]" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />

                <div className="container-custom relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">

                        {/* ── COLUMNA IZQUIERDA: TEXTO ── */}
                        <div className="lg:col-span-5 space-y-10">
                            <div className="space-y-4">
                                <span className="text-[#86efac] font-bold uppercase tracking-[0.4em] text-sm block">Bienvenido</span>
                                <h1 className="text-6xl md:text-8xl font-display font-black leading-none tracking-tight">
                                    PERLAWASI <br />
                                    <span className="text-[#86efac]">HOSPEDAJE</span>
                                </h1>
                            </div>

                            <div className="space-y-8 max-w-xl">
                                <p className="text-xl md:text-2xl text-white/50 font-light italic leading-snug">
                                    "El espíritu de la selva en cada amanecer"
                                </p>
                                <p className="text-lg text-white/70 leading-relaxed font-light">
                                    Vive una experiencia auténtica en medio de la naturaleza. Nuestro hospedaje rústico está diseñado para quienes buscan <span className="text-[#86efac] font-medium">desconectarse del ruido de la ciudad</span> y reconectarse con la tranquilidad del entorno natural.
                                </p>

                                <div className="pt-4">
                                    <Link href="#habitaciones"
                                        className="group inline-flex items-center gap-6 bg-[#1a2e1a] hover:bg-[#2d4a2d] text-[#86efac] border border-[#86efac]/30 px-10 py-5 rounded-2xl transition-all duration-500 hover:gap-10 shadow-xl">
                                        <span className="text-xl font-bold uppercase tracking-widest">Ver Habitaciones</span>
                                        <div className="w-12 h-12 rounded-full border border-[#86efac]/40 flex items-center justify-center group-hover:bg-[#86efac] group-hover:text-[#050805] transition-colors">
                                            <span className="text-2xl">→</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ── COLUMNA DERECHA: COMPOSICIÓN VISUAL ── */}
                        <div className="lg:col-span-7 relative">
                            <div className="flex gap-6 items-center">
                                {/* Miniaturas verticales */}
                                <div className="hidden md:flex flex-col gap-6 w-1/3 pt-20">
                                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                                        <Image src="/images/fondo_alojamiento.png" alt="Detalle Naturaleza" fill className="object-cover" />
                                    </div>
                                    <div className="relative aspect-[1/1] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                                        <Image src="/images/fondo_buho.png" alt="Detalle Fauna" fill className="object-cover" />
                                    </div>
                                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                                        <Image src="/images/fondo_buho1.png" alt="Detalle Selva" fill className="object-cover" />
                                    </div>
                                </div>

                                {/* Imagen principal destacada */}
                                <div className="w-full md:w-2/3">
                                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-[#86efac]/20 shadow-[0_0_100px_rgba(34,197,94,0.1)]">
                                        <Image
                                            src="/images/alojamiento_hero_bg.png"
                                            alt="Perlawasi Hospedaje"
                                            fill
                                            className="object-cover"
                                            priority
                                            quality={100}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        <div className="absolute bottom-10 left-10">
                                            <p className="text-[#86efac] text-xs font-bold uppercase tracking-[0.3em] mb-2">San Martín, Perú</p>
                                            <h3 className="text-2xl font-bold">Refugio en el Paraíso</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Círculo decorativo flotante */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#86efac] rounded-full blur-[100px] opacity-10 animate-pulse" />
                        </div>
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
