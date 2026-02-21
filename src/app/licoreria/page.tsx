import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Licores Perlamayo - Destilados Artesanales de la Selva Peruana | San Martín',
    description: 'Licores Perlamayo: destilados premium y macerados artesanales únicos. El espíritu de la selva peruana encapsulado en cada botella.',
}

export default function LicoreriaPage() {
    const products = [
        {
            name: 'Cacao Spirit',
            type: 'Destilado de Cacao',
            notes: 'Frutos secos · Chocolate amargo · Tierra húmeda',
            abv: '42%',
            ml: '500 ml',
            badge: 'Signature',
            gradient: 'from-amber-950 via-stone-900 to-black',
            accentColor: '#D4AF37',
            emoji: '🥃',
        },
        {
            name: 'Andean Botanical',
            type: 'Gin de Montaña',
            notes: 'Enebro · Hierba luisa · Cítricos andinos',
            abv: '40%',
            ml: '750 ml',
            badge: 'Edición Limitada',
            gradient: 'from-slate-900 via-blue-950 to-black',
            accentColor: '#7dd3fc',
            emoji: '🍸',
        },
        {
            name: 'Mistify Rum',
            type: 'Ron Añejo Selva',
            notes: 'Melaza · Roble americano · Vainilla',
            abv: '45%',
            ml: '750 ml',
            badge: 'Reserva',
            gradient: 'from-orange-950 via-red-950 to-black',
            accentColor: '#fb923c',
            emoji: '🥃',
        },
        {
            name: 'Floral Mist',
            type: 'Licor de Flores',
            notes: 'Pétalos de rosa · Flor de saúco · Miel',
            abv: '28%',
            ml: '500 ml',
            badge: 'Artesanal',
            gradient: 'from-rose-950 via-pink-950 to-black',
            accentColor: '#f9a8d4',
            emoji: '🍶',
        },
    ]

    const proceso = [
        { num: '01', title: 'Selección', desc: 'Botánicos recolectados a mano en los alrededores de Perlawasi al amanecer.', icon: '🌿' },
        { num: '02', title: 'Maceración', desc: 'Reposo de 72 horas en alcohol neutro para extraer los aceites esenciales.', icon: '🫙' },
        { num: '03', title: 'Destilación', desc: 'Triple destilación en alambiques de cobre artesanales a baja temperatura.', icon: '⚗️' },
        { num: '04', title: 'Reposo', desc: 'Mínimo 6 meses en barricas de roble para los destilados añejados.', icon: '🪵' },
        { num: '05', title: 'Embotellado', desc: 'En lotes de no más de 250 botellas numeradas a mano.', icon: '🍾' },
    ]

    return (
        <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden">

            {/* ═══ HERO CINEMATOGRÁFICO ═══ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Imagen de fondo difuminada */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/licoreria_hero_bg.png"
                        alt="Licores Perlamayo"
                        fill
                        className="object-cover blur-sm scale-105"
                        style={{ opacity: 0.55 }}
                        priority
                    />
                </div>
                {/* Overlay oscuro principal */}
                <div className="absolute inset-0 bg-[#080808]/45 z-[1]" />
                {/* Overlay gradiente para profundidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-[#080808]/40 z-[2]" />
                {/* Brillo dorado central */}
                <div className="absolute inset-0 flex items-center justify-center z-[3]">
                    <div className="w-[90vw] h-[90vw] max-w-4xl max-h-4xl bg-[#D4AF37] rounded-full blur-[180px] opacity-[0.08]" />
                </div>
                {/* Brillo dorado esquinas */}
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#D4AF37] rounded-full blur-[140px] opacity-[0.05] z-[3]" />
                <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-amber-700 rounded-full blur-[120px] opacity-[0.06] z-[3]" />
                {/* Líneas decorativas */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent hidden lg:block z-[4]" />
                <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent hidden lg:block" />

                {/* Contenido Hero */}
                <div className="relative z-10 container-custom text-center px-4">
                    {/* Badge superior */}
                    <div className="inline-flex items-center gap-3 border border-[#D4AF37]/30 rounded-full px-6 py-2 mb-10 backdrop-blur-md bg-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                        <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Licores Perlamayo · San Martín · Perú</span>
                    </div>

                    {/* Título enorme */}
                    <h1 className="font-display font-black leading-none mb-6 tracking-tight">
                        <span className="block text-5xl md:text-6xl text-gray-400 font-light italic mb-2">El espíritu de la selva</span>
                        <span className="block text-6xl md:text-8xl lg:text-[9rem] bg-gradient-to-r from-[#B8960C] via-[#D4AF37] to-[#F5D26B] bg-clip-text text-transparent">
                            Licores Perlamayo
                        </span>
                    </h1>

                    {/* Divider dorado */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
                        <span className="text-[#D4AF37] text-lg">✦</span>
                        <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
                    </div>

                    <p className="text-xl md:text-2xl text-gray-400 mb-14 leading-relaxed max-w-2xl mx-auto font-light">
                        Destilados de autor creados para elevar los sentidos. Una oda a la biodiversidad peruana encapsulada en botellas de lujo.
                    </p>

                    <div className="flex gap-5 justify-center flex-wrap">
                        <Link href="#coleccion"
                            className="group relative inline-flex items-center gap-3 bg-[#D4AF37] text-black px-12 py-5 text-lg font-bold hover:bg-[#E5C64A] transition-all duration-300 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)]">
                            <span>Ver Colección</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                        </Link>
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20información%20sobre%20la%20licorería%20premium"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 border border-[#D4AF37]/40 text-[#D4AF37] px-12 py-5 text-lg font-bold hover:bg-[#D4AF37]/10 transition-all duration-300 rounded-full backdrop-blur-md">
                            Consultar por WhatsApp
                        </a>
                    </div>
                </div>

                {/* Flecha scroll */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-[#D4AF37]/40 text-xs uppercase tracking-widest">Descubrir</span>
                    <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/40 to-transparent" />
                </div>
            </section>

            {/* ═══ BARRA DE ESTADÍSTICAS ═══ */}
            <section className="border-y border-[#D4AF37]/15 bg-[#0d0d0d]">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D4AF37]/10">
                        {[
                            { num: '4', label: 'Destilados Únicos' },
                            { num: '250', label: 'Botellas por Lote' },
                            { num: '72h', label: 'Maceración Mínima' },
                            { num: '6+', label: 'Meses de Reposo' },
                        ].map((stat, i) => (
                            <div key={i} className="py-10 px-8 text-center group hover:bg-[#D4AF37]/5 transition-colors">
                                <div className="text-4xl md:text-5xl font-display font-black text-[#D4AF37] mb-2">{stat.num}</div>
                                <div className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ COLECCIÓN DE AUTOR ═══ */}
            <section id="coleccion" className="py-32 bg-[#080808]">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <span className="text-[#D4AF37] font-bold uppercase tracking-[0.25em] text-xs mb-4 block">Nuestra Selección</span>
                        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6">Colección de Autor</h2>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-16 bg-[#D4AF37]/40" />
                            <span className="text-[#D4AF37]">✦</span>
                            <div className="h-px w-16 bg-[#D4AF37]/40" />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((item, i) => (
                            <div key={i} className="group relative cursor-pointer">
                                {/* Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                                        style={{ borderColor: item.accentColor + '50', color: item.accentColor, backgroundColor: item.accentColor + '15' }}>
                                        {item.badge}
                                    </span>
                                </div>

                                {/* Botella / Tarjeta */}
                                <div className={`relative aspect-[2/3] bg-gradient-to-b ${item.gradient} rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl`}
                                    style={{ '--tw-shadow-color': item.accentColor + '30' } as React.CSSProperties}>
                                    {/* Brillo interior */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `radial-gradient(circle at 50% 100%, ${item.accentColor}15 0%, transparent 60%)` }} />
                                    {/* Emoji centrado */}
                                    <div className="absolute inset-0 flex items-center justify-center text-8xl transition-transform duration-500 group-hover:scale-110">
                                        {item.emoji}
                                    </div>
                                    {/* Línea inferior */}
                                    <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ backgroundColor: item.accentColor + '60' }} />
                                </div>

                                {/* Info inferior */}
                                <div className="mt-5 px-1">
                                    <div className="flex items-start justify-between mb-1">
                                        <h3 className="text-xl font-display font-bold text-white">{item.name}</h3>
                                        <span className="text-sm font-bold mt-0.5" style={{ color: item.accentColor }}>{item.abv}</span>
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: item.accentColor + 'bb' }}>{item.type}</p>
                                    <p className="text-gray-600 text-xs leading-relaxed">{item.notes}</p>
                                    <p className="text-gray-700 text-xs mt-2">{item.ml}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PROCESO DE DESTILACIÓN ═══ */}
            <section className="py-32 bg-[#0c0c0c] border-t border-[#D4AF37]/10">
                <div className="container-custom">
                    <div className="text-center mb-20">
                        <span className="text-[#D4AF37] font-bold uppercase tracking-[0.25em] text-xs mb-4 block">De la Naturaleza a la Botella</span>
                        <h2 className="text-5xl md:text-6xl font-display font-bold">Nuestro Proceso</h2>
                    </div>

                    <div className="relative">
                        {/* Línea conectora */}
                        <div className="hidden lg:block absolute top-[3.5rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {proceso.map((step, i) => (
                                <div key={i} className="relative text-center group">
                                    {/* Círculo con número */}
                                    <div className="relative w-28 h-28 mx-auto mb-6 rounded-full border border-[#D4AF37]/30 bg-[#0a0a0a] flex items-center justify-center transition-all duration-400 group-hover:border-[#D4AF37]/70 group-hover:bg-[#D4AF37]/5">
                                        <span className="text-4xl">{step.icon}</span>
                                        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#D4AF37] text-black text-xs font-black flex items-center justify-center">
                                            {step.num}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 text-white">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ FILOSOFÍA ═══ */}
            <section id="historia" className="py-32 bg-[#080808] border-t border-[#D4AF37]/10">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Texto */}
                        <div className="space-y-8">
                            <div>
                                <span className="text-[#D4AF37] font-bold uppercase tracking-[0.25em] text-xs block mb-4">Legado & Pureza</span>
                                <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight">
                                    La Destilería<br />
                                    <span className="bg-gradient-to-r from-[#D4AF37] to-[#F5D26B] bg-clip-text text-transparent">del Bosque</span>
                                </h2>
                            </div>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Nuestros alambiques de cobre son testigos de un proceso lento y cuidadoso. Destilamos en pequeños lotes utilizando botánicos recolectados de manera sostenible en los alrededores de Perlawasi.
                            </p>
                            <p className="text-gray-500 text-base leading-relaxed">
                                Cada botella lleva un número de lote y la firma del maestro destilador — una garantía de que lo que estás sosteniendo es algo verdaderamente excepcional y único en el mundo.
                            </p>

                            <div className="grid grid-cols-2 gap-4 pt-4">
                                {[
                                    { icon: '🍯', title: 'Macerado Ancestral', desc: 'Técnicas heredadas de comunidades locales.' },
                                    { icon: '⚗️', title: 'Triple Destilación', desc: 'Pureza sin comprometer el carácter.' },
                                    { icon: '🌿', title: 'Botánicos Nativos', desc: 'Flora endémica de San Martín.' },
                                    { icon: '🏷️', title: 'Lotes Numerados', desc: 'Máximo 250 botellas por producción.' },
                                ].map((item, i) => (
                                    <div key={i} className="p-5 bg-white/3 border border-white/5 rounded-2xl hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/5 transition-all duration-300">
                                        <span className="text-2xl block mb-2">{item.icon}</span>
                                        <h4 className="font-bold text-sm mb-1 text-white">{item.title}</h4>
                                        <p className="text-gray-600 text-xs">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual grande */}
                        <div className="relative">
                            <div className="relative h-[600px] rounded-[3rem] overflow-hidden border border-[#D4AF37]/20 bg-gradient-to-br from-amber-950 via-stone-950 to-black flex items-center justify-center shadow-[0_0_80px_rgba(212,175,55,0.1)]">
                                {/* Decoración interna */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <div className="w-64 h-64 rounded-full border-2 border-[#D4AF37]" />
                                </div>
                                <div className="absolute inset-8 rounded-[2.5rem] border border-[#D4AF37]/10" />
                                <div className="text-center z-10">
                                    <div className="text-9xl mb-4">🏺</div>
                                    <p className="text-[#D4AF37]/60 text-sm uppercase tracking-widest">Alambique de Cobre</p>
                                </div>
                                {/* Brillo esquina */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4AF37] rounded-full blur-[80px] opacity-10" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-700 rounded-full blur-[60px] opacity-10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ CATA PRIVADA ═══ */}
            <section className="py-32 relative overflow-hidden border-t border-[#D4AF37]/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a1200] via-[#0a0a0a] to-[#0a0a0a]" />
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                    <div className="w-[70vw] h-[70vw] bg-[#D4AF37] rounded-full blur-[200px]" />
                </div>
                <div className="relative z-10 container-custom text-center">
                    <span className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Experiencia Exclusiva</span>
                    <h2 className="text-5xl md:text-8xl font-display font-bold mb-6 leading-tight">
                        Noche de<br />
                        <span className="bg-gradient-to-r from-[#D4AF37] to-[#F5D26B] bg-clip-text text-transparent">Selección</span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Una cata exclusiva guiada por nuestro maestro destilador. Aprende a identificar cada nota, aroma y textura de nuestra colección completa.
                    </p>
                    <div className="flex gap-5 justify-center flex-wrap">
                        <a href="https://wa.me/51928141669?text=Hola,%20quiero%20reservar%20una%20cata%20privada%20de%20licores"
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-12 py-5 text-xl font-bold hover:bg-[#E5C64A] transition-all duration-300 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                            Reservar Cata Privada ✦
                        </a>
                        <Link href="/"
                            className="inline-flex items-center gap-3 border border-[#D4AF37]/30 text-[#D4AF37] px-12 py-5 text-xl font-bold hover:bg-[#D4AF37]/10 transition-all duration-300 rounded-full">
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    )
}
