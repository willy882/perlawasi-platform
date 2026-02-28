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
            {/* SUPER HERO HOSPEDAJE */}
            <section className="relative min-h-screen flex items-center py-10 md:py-20">
                {/* Texturas de fondo sutiles */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(34,197,94,0.08)_0%,transparent_60%)]" />

                <div className="container-custom relative z-10 w-full">
                    <div className="grid lg:grid-cols-12 gap-10 md:gap-12 items-center">

                        {/* ÔöÇÔöÇ COLUMNA IZQUIERDA: TEXTO (Espacio optimizado 5/12) ÔöÇÔöÇ */}
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

                        {/* ÔöÇÔöÇ COLUMNA DERECHA: COMPOSICI├ôN VISUAL (Espacio 7/12) ÔöÇÔöÇ */}
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

                            {/* C├¡rculo decorativo flotante */}
                            <div className="absolute -top-10 -right-10 w-56 h-56 bg-[#86efac] rounded-full blur-[140px] opacity-[0.05] animate-pulse" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Habitaciones */}
            <section id="habitaciones" className="py-24 bg-[#050805] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,197,94,0.05)_0%,transparent_50%)]" />
                <div className="container-custom relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-[#86efac] font-bold uppercase tracking-[0.4em] text-xs opacity-80">Nuestras Suites</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Espacios de <span className="text-[#86efac]">Ensueño</span></h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Suite 1 */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[#86efac]/30 transition-all duration-500 group">
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <Image src="/images/alojamiento_a.png" alt="Suite Panor├ímica" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050805] via-transparent to-transparent" />
                            </div>
                            <div className="p-10 md:p-12">
                                <h3 className="text-3xl font-display font-bold mb-4 text-white">Suite Panorámica</h3>
                                <p className="text-white/60 mb-8 leading-relaxed font-light">
                                    Vista 360° a la selva, terraza privada, jacuzzi exterior, cama king size, minibar premium. Un refugio diseñado para la contemplación absoluta.
                                </p>
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-4xl font-bold text-[#86efac]">S/ 450<span className="text-sm font-light text-white/40 ml-2">/ noche</span></span>
                                </div>
                                <Link href="https://wa.me/51928141669?text=Hola,%20quiero%20reservar%20la%20Suite%20Panorámica"
                                    className="block text-center border border-[#86efac]/50 bg-[#86efac]/10 hover:bg-[#86efac] text-[#86efac] hover:text-[#050805] py-5 rounded-2xl font-bold uppercase tracking-widest transition-all duration-500">
                                    Reservar Ahora
                                </Link>
                            </div>
                        </div>

                        {/* Suite 2 */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-[#86efac]/30 transition-all duration-500 group">
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <Image src="/images/alojamiento_c.png" alt="Caba├▒a R├║stica" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050805] via-transparent to-transparent" />
                            </div>
                            <div className="p-10 md:p-12">
                                <h3 className="text-3xl font-display font-bold mb-4 text-white">Caba├▒a R├║stica</h3>
                                <p className="text-white/60 mb-8 leading-relaxed font-light">
                                    Construcci├│n tradicional, chimenea, hamaca, ba├▒o con vista al bosque. La esencia de San Mart├¡n en una experiencia de desconexi├│n total.
                                </p>
                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-4xl font-bold text-[#86efac]">S/ 320<span className="text-sm font-light text-white/40 ml-2">/ noche</span></span>
                                </div>
                                <Link href="https://wa.me/51928141669?text=Hola,%20quiero%20reservar%20la%20Caba├▒a%20R├║stica"
                                    className="block text-center border border-[#86efac]/50 bg-[#86efac]/10 hover:bg-[#86efac] text-[#86efac] hover:text-[#050805] py-5 rounded-2xl font-bold uppercase tracking-widest transition-all duration-500">
                                    Reservar Ahora
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Amenidades */}
            <section className="py-24 bg-[#050805] border-t border-white/5 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center text-white">Amenidades <span className="text-[#86efac]">Exclusivas</span></h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                        {[
                            { icon: '­ƒì┤', title: 'Gastronom├¡a', desc: 'Desayuno gourmet regional' },
                            { icon: '­ƒºÿ', title: 'Bienestar', desc: 'Yoga y meditaci├│n' },
                            { icon: '­ƒî┐', title: 'Naturaleza', desc: 'Tours guiados por la huerta' },
                            { icon: '­ƒÆå', title: 'Relajaci├│n', desc: 'Spa y masajes amaz├│nicos' },
                        ].map((amenidad, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:bg-[#86efac]/5 transition-colors duration-500">
                                <div className="text-5xl mb-6 opacity-80 group-hover:scale-110 transition-transform">{amenidad.icon}</div>
                                <h4 className="font-bold text-white text-lg mb-2">{amenidad.title}</h4>
                                <p className="text-white/40 text-sm font-light">{amenidad.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Paquetes */}
            <section className="py-24 bg-[#050805] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.05)_0%,transparent_50%)]" />
                <div className="container-custom relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-[#86efac] font-bold uppercase tracking-[0.4em] text-xs opacity-80">Experiencias Completas</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 text-white">Paquetes <span className="text-[#86efac]">Especiales</span></h2>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[2.5rem] p-10 hover:border-[#86efac]/30 transition-all duration-500">
                            <h3 className="text-2xl font-display font-bold mb-4 text-white">Escapada Rom├íntica</h3>
                            <p className="text-white/50 mb-8 font-light">2 noches + cena rom├íntica + masaje de pareja + tour privado por el mariposario.</p>
                            <div className="text-4xl font-bold text-[#86efac] mb-8">S/ 1,200</div>
                            <Link href="https://wa.me/51928141669?text=Hola,%20quiero%20informaci├│n%20sobre%20el%20Paquete%20Rom├íntico" className="block text-center border border-white/20 bg-white/5 hover:bg-white text-white hover:text-[#050805] py-4 rounded-xl font-bold transition-all duration-500">Consultar</Link>
                        </div>

                        <div className="bg-gradient-to-br from-[#86efac]/10 to-transparent border border-[#86efac]/30 rounded-[2.5rem] p-10 relative overflow-hidden transform lg:-translate-y-4 shadow-2xl shadow-[#86efac]/10">
                            <div className="absolute top-6 right-6 bg-[#86efac] text-[#050805] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Popular</div>
                            <h3 className="text-2xl font-display font-bold mb-4 text-white">Retiro de Bienestar</h3>
                            <p className="text-white/50 mb-8 font-light">3 noches + yoga diario + spa + alimentaci├│n org├ínica completa y meditaci├│n guiada.</p>
                            <div className="text-4xl font-bold text-[#86efac] mb-8">S/ 1,650</div>
                            <Link href="https://wa.me/51928141669?text=Hola,%20quiero%20informaci├│n%20sobre%20el%20Retiro%20de%20Bienestar" className="block text-center bg-[#86efac] text-[#050805] py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-500">Reservar Ahora</Link>
                        </div>

                        <div className="bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-[2.5rem] p-10 hover:border-[#86efac]/30 transition-all duration-500">
                            <h3 className="text-2xl font-display font-bold mb-4 text-white">Aventura Familiar</h3>
                            <p className="text-white/50 mb-8 font-light">4 noches + actividades para ni├▒os + tours guiados por la selva y fogata nocturna.</p>
                            <div className="text-4xl font-bold text-[#86efac] mb-8">S/ 2,100</div>
                            <Link href="https://wa.me/51928141669?text=Hola,%20quiero%20informaci├│n%20sobre%20el%20Paquete%20Familiar" className="block text-center border border-white/20 bg-white/5 hover:bg-white text-white hover:text-[#050805] py-4 rounded-xl font-bold transition-all duration-500">Consultar</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Reserva FINAL */}
            <section id="reservar" className="py-32 bg-[#050805] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#86efac]/5" />
                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-5xl md:text-8xl font-display font-black mb-10 text-white tracking-tighter">
                        ┬┐LISTO PARA <br />
                        <span className="text-[#86efac]">EL PARA├ìSO?</span>
                    </h2>
                    <p className="text-xl text-white/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                        Descon├®ctate del mundo y recon├®ctate contigo mismo en el coraz├│n de la selva. Cupos limitados para una experiencia exclusiva.
                    </p>
                    <div className="flex gap-6 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20reservar%20alojamiento%20en%20Perlawasi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#86efac] text-[#050805] px-16 py-6 rounded-2xl text-xl font-black uppercase tracking-widest hover:scale-105 transition-all duration-500 shadow-[0_0_50px_rgba(134,239,172,0.3)]">
                            Reservar por WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
