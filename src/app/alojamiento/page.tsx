import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Alojamiento Perlawasi - Santuario de Lujo en la Naturaleza | San Martín',
    description: 'Suites y cabañas de lujo en el corazón de la selva. Experiencias de alojamiento que conectan con la naturaleza.',
}

export default function AlojamientoPage() {
    return (
        <div className="min-h-screen bg-[#050805] text-[#f0f0f0] overflow-x-hidden pt-10 md:pt-20 px-4 md:px-0">
            {/* ═══ SUPER HERO HOSPEDAJE ═══ */}
            <section className="relative min-h-screen flex items-center py-10 md:py-20">
                {/* Texturas de fondo sutiles */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(34,197,94,0.08)_0%,transparent_60%)]" />

                <div className="container-custom relative z-10 w-full">
                    <div className="grid lg:grid-cols-12 gap-10 md:gap-12 items-center">

                        {/* ── COLUMNA IZQUIERDA: TEXTO (Espacio optimizado 5/12) ── */}
                        <div className="lg:col-span-5 space-y-8 md:space-y-12 order-2 lg:order-1">
                            <div className="space-y-4">
                                <span className="text-[#86efac] font-bold uppercase tracking-[0.4em] text-xs md:text-sm block opacity-80">Bienvenido</span>
                                <h1 className="text-4xl md:text-5xl lg:text-[3.2rem] xl:text-[4rem] font-display font-black leading-[1.1] tracking-tight">
                                    PERLAWASI <br />
                                    <span className="text-[#86efac] block mt-1">HOSPEDAJE</span>
                                </h1>
                            </div>

                            <div className="space-y-6 md:space-y-10 max-w-xl">
                                <p className="text-lg md:text-xl text-white/50 font-light italic leading-snug">
                                    "El espíritu de la selva en cada amanecer"
                                </p>
                                <p className="text-sm md:text-base text-white/70 leading-relaxed font-light">
                                    Vive una experiencia auténtica en medio de la naturaleza. Nuestro hospedaje rústico está diseñado para quienes buscan <span className="text-[#86efac] font-medium">desconectarse del ruido de la ciudad</span> y reconectarse con la tranquilidad del entorno natural.
                                </p>

                                <div className="pt-2 md:pt-4">
                                    <Link href="#habitaciones"
                                        className="group inline-flex items-center gap-5 border border-[#86efac]/30 bg-[#86efac]/5 hover:bg-[#86efac] text-[#86efac] hover:text-[#050805] px-8 py-4 rounded-xl transition-all duration-500 shadow-xl">
                                        <span className="text-sm font-bold uppercase tracking-widest">VER HABITACIONES</span>
                                        <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* ── COLUMNA DERECHA: COMPOSICIÓN VISUAL (Espacio 7/12) ── */}
                        <div className="lg:col-span-7 relative order-1 lg:order-2">
                            <div className="flex gap-4 md:gap-10 items-center justify-center">
                                {/* Miniaturas verticales */}
                                <div className="flex flex-col gap-4 md:gap-8 w-[28%]">
                                    <div className="relative aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-lg hover:scale-[1.03] transition-transform duration-500">
                                        <Image src="/images/alojamiento_a.png" alt="Suite Interior" fill className="object-cover" />
                                    </div>
                                    <div className="relative aspect-[1/1] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-lg hover:scale-[1.03] transition-transform duration-500">
                                        <Image src="/images/alojamiento_b.png" alt="Exterior Selva" fill className="object-cover" />
                                    </div>
                                    <div className="relative aspect-[3/4] rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-lg hover:scale-[1.03] transition-transform duration-500">
                                        <Image src="/images/alojamiento_c.png" alt="Cabaña Árbol" fill className="object-cover" />
                                    </div>
                                </div>

                                {/* Imagen principal destacada */}
                                <div className="w-[72%]">
                                    <div className="relative aspect-[4/5] rounded-[3rem] md:rounded-[5rem] overflow-hidden border border-[#86efac]/20 shadow-[0_0_120px_rgba(34,197,94,0.15)]">
                                        <Image
                                            src="/images/alojamiento_d.png"
                                            alt="Perlawasi Hospedaje Experience"
                                            fill
                                            className="object-cover"
                                            priority
                                            quality={100}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16">
                                            <p className="text-[#86efac] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-3">San Martín, Perú</p>
                                            <h3 className="text-xl md:text-4xl font-display font-bold">Refugio en el Paraíso</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Círculo decorativo flotante */}
                            <div className="absolute -top-10 -right-10 w-56 h-56 bg-[#86efac] rounded-full blur-[140px] opacity-[0.05] animate-pulse" />
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
