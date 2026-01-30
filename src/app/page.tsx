'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import AnimatedIceCreamCharacter from '@/components/AnimatedIceCreamCharacter'
import ClientOnlyErrorBoundary from '@/components/ClientOnlyErrorBoundary'
const Polo3D = dynamic(() => import('@/components/Polo3D'), { ssr: false })

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Restaurante Perlawasi */}
            <section className="relative h-[85vh] flex items-center overflow-hidden mx-4 my-4 rounded-3xl shadow-strong">
                {/* Overlay optimizado para claridad: gradiente sutil solo donde hay texto */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent z-10" />
                <div className="absolute inset-0">
                    <Image
                        src="/images/hero_restaurante.png"
                        alt="Restaurante Perlawasi"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                    />
                </div>

                <div className="relative z-20 container-custom w-full h-full flex items-end pb-24 md:pb-32">
                    <div className="max-w-2xl animate-fade-in pl-8 lg:pl-16">











                        <div className="flex gap-4">
                            <Link href="/restaurante" className="btn btn-primary px-10 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all outline-none">
                                Reservar Mesa
                            </Link>
                            <Link href="/menu" className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 px-10 py-4 text-lg shadow-2xl transform hover:scale-105 transition-all outline-none">
                                Ver Menú
                            </Link>
                        </div>
                    </div>
                </div>

            </section>

            {/* Heladería - Sección Artesanal con Personaje Animado */}
            <section className="section bg-gradient-to-b from-pink-50 via-white to-white overflow-hidden">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-3 gap-8 items-center">
                        {/* Imagen de helados */}
                        <div className="relative h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-medium bg-icecream-light/30 group">
                            <Image
                                src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&q=80&w=1200"
                                alt="Helados Artesanales"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        {/* Contenido de texto */}
                        <div className="space-y-6 px-4 lg:col-span-1">
                            <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Felicidad en cada bocado</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold">Heladería Vibrante</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Delicias cremosas preparadas con las mejores frutas de la región. Un paraíso de sabores naturales que celebran la biodiversidad de nuestra tierra.
                            </p>
                            <Link href="/heladeria" className="btn btn-primary px-10 py-4 rounded-full inline-block text-lg">
                                Probar Sabores →
                            </Link>
                        </div>

                        {/* Personaje Animado */}
                        <div className="hidden lg:flex justify-center items-center">
                            <AnimatedIceCreamCharacter />
                        </div>
                    </div>
                </div>
            </section>

            {/* Café & Cacao - Sección Fusionada (Dark) */}
            < section className="py-24 bg-brand-dark text-white relative overflow-hidden" >
                <div className="container-custom relative z-10">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1 space-y-8">
                            <div>
                                <span className="text-primary-400 font-bold uppercase tracking-tighter text-sm mb-4 block">Herencia & Aroma</span>
                                <h2 className="text-5xl md:text-6xl font-display font-bold leading-tight">Café & Cacao</h2>
                                <p className="text-xl text-gray-300 mt-6 leading-relaxed">
                                    Dos tesoros peruanos en un solo lugar. El aroma del café premium recién tostado se funde con la intensidad del cacao ancestral para crear una experiencia sensorial única.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="p-6 relative rounded-2xl border border-white/10 hover:border-primary-500/50 transition-all overflow-hidden group">
                                    <div className="absolute inset-0">
                                        <Image
                                            src="/images/fondo_cafe1.png"
                                            alt="Fondo Café"
                                            fill
                                            className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                                    </div>
                                    <div className="relative z-10 flex flex-col justify-end h-full min-h-[100px]">
                                        <h3 className="font-bold text-lg mb-1 text-white group-hover:text-primary-400 transition-colors">Café Premium</h3>
                                        <p className="text-xs text-gray-300 group-hover:text-white transition-colors">Granos seleccionados a mano en las alturas andinas.</p>
                                    </div>
                                </div>
                                <div className="p-6 relative rounded-2xl border border-white/10 hover:border-primary-500/50 transition-all overflow-hidden group">
                                    <div className="absolute inset-0">
                                        <Image
                                            src="/images/fondo_cacao.png"
                                            alt="Fondo Cacao"
                                            fill
                                            className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
                                    </div>
                                    <div className="relative z-10 flex flex-col justify-end h-full min-h-[100px]">
                                        <h3 className="font-bold text-lg mb-1 text-white group-hover:text-primary-400 transition-colors">Cacao Fino</h3>
                                        <p className="text-xs text-gray-300 group-hover:text-white transition-colors">Chocolatería artesanal con 100% pureza de origen.</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/cafe-cacao" className="btn btn-primary px-10 py-4 rounded-full text-lg">
                                Explorar Colección
                            </Link>
                        </div>

                        <div className="order-1 md:order-2 relative group flex justify-center w-full">
                            <div className="aspect-square w-full max-w-[450px] rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-6 group-hover:scale-105 relative">
                                <Image
                                    src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000"
                                    alt="Café y Cacao Premium"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 w-36 h-36 bg-primary-500 rounded-full flex items-center justify-center text-center p-4 rotate-12 shadow-2xl border-4 border-brand-dark overflow-hidden">
                                <span className="text-white font-bold text-sm tracking-tighter">ALTA CALIDAD GARANTIZADA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Alojamiento - Sección Santuario */}
            < section className="section bg-brand-light" >
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-primary-600 font-bold uppercase tracking-[0.2em] text-xs">Descanso Profundo</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4">Brisa Lodge</h2>
                    </div>
                    <div className="relative h-[600px] rounded-[3rem] overflow-hidden group shadow-soft">
                        <Image
                            src="/images/fondo_alojamiento.png"
                            alt="Brisa Lodge - Alojamiento en la Selva"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-12 left-12 right-12 text-white z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div className="max-w-xl">
                                <p className="text-xl text-white/90 leading-relaxed">
                                    Suites diseñadas para la paz y el reencuentro con la naturaleza. Cada espacio es un refugio de diseño y comodidad absoluta en el corazón de San Martín.
                                </p>
                            </div>
                            <Link href="/alojamiento" className="btn bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-primary-500 hover:text-white transition-all whitespace-nowrap">
                                Reservar Experiencia
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

            {/* Cervecería - Sección Artesanal */}
            < section className="section bg-white overflow-hidden" >
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <span className="text-primary-500 font-bold uppercase tracking-widest text-xs">Maestría en Malta</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">Cervecería Artesanal</h2>
                                <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                                    Cervezas únicas con sabores inspirados en las montañas. Utilizamos agua pura de manantial y lúpulos seleccionados para crear variedades que sorprenden al paladar.
                                </p>
                            </div>
                            <div className="flex gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-primary-500" />
                                    <span className="text-sm font-bold uppercase">100% Natural</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-primary-500" />
                                    <span className="text-sm font-bold uppercase">Producción Local</span>
                                </div>
                            </div>
                            <Link href="/cerveceria" className="btn btn-primary px-10 py-4 rounded-full inline-block font-bold">
                                Ver Variedades →
                            </Link>
                        </div>
                        <div className="relative h-[500px] rounded-[3rem] overflow-hidden group shadow-medium">
                            <Image
                                src="https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=1200"
                                alt="Cervecería Artesanal"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent" />
                        </div>
                    </div>
                </div>
            </section >

            {/* Licorería - Sección Destilados */}
            < section className="section bg-[#F9F6F2] overflow-hidden" >
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1 relative h-[500px] rounded-[3rem] overflow-hidden group shadow-soft">
                            <Image
                                src="/images/fondo_licores.png"
                                alt="Licorería de Autor"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-bl from-orange-100/30 to-transparent" />
                        </div>
                        <div className="order-1 md:order-2 space-y-8">
                            <div>
                                <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Con Sabor a Selva</span>
                                <h2 className="text-4xl md:text-5xl font-display font-bold mt-2">Licoreres Perlamayo</h2>
                                <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                                    Destilados premium, cocteles y macerados artesanales que capturan la esencia de nuestra biodiversidad. Una curaduría de licores diseñados para los momentos más especiales.
                                </p>
                            </div>
                            <Link href="/licoreria" className="btn bg-gray-900 text-white px-10 py-4 rounded-full inline-block font-bold hover:bg-gray-800 transition-all">
                                Explorar Lircores →
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

            {/* Bento Grid - Ropa & Plantas */}
            < section className="section bg-white" >
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Boutique Section */}
                        <Link href="/ropa" className="group bg-[#F4F1ED] rounded-[3rem] p-12 flex flex-col justify-between relative overflow-hidden transition-all hover:bg-[#EEEAE5]">
                            <div className="z-10 relative">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-4">Conscious Wear</span>
                                <h3 className="text-4xl font-display font-bold text-gray-900">Ropa Esencial con Boutique Perlamayo</h3>
                                <p className="text-gray-500 mt-4 max-w-xs text-lg">Básicos sostenibles diseñados para tu ritual diario en armonía con el entorno, desde zandalias, ropa interior y mucho más.</p>
                            </div>
                            <div className="mt-12 z-10">
                                <span className="btn bg-black text-white px-8 py-3 rounded-full text-sm font-bold inline-block">Explorar Colección</span>
                            </div>
                            <div className="absolute inset-0 opacity-100 transition-transform duration-700 group-hover:scale-105">
                                <Image
                                    src="/images/fondo_boutique.png"
                                    alt="Boutique Perlawasi"
                                    fill
                                    className="object-cover object-center"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1ED] via-[#F4F1ED]/50 to-transparent w-2/3" />
                            </div>
                        </Link>

                        {/* Plants Section */}
                        <Link href="/plantas" className="group bg-[#E8F3ED] rounded-[3rem] p-12 flex flex-col justify-between relative overflow-hidden transition-all hover:bg-[#DDECE4]">
                            <div className="z-10 relative">
                                <span className="text-xs font-bold text-plants uppercase tracking-widest block mb-4">Nature Indoors</span>
                                <h3 className="text-4xl font-display font-bold text-gray-900">Verdor Interior</h3>
                                <p className="text-gray-700 mt-4 max-w-xs text-lg">Una selección de plantas nativas y exóticas para transformar tus espacios en oasis de vida.</p>
                            </div>
                            <div className="mt-12 z-10">
                                <span className="text-sm font-bold border-b-2 border-gray-900 pb-1 hover:border-plants transition-colors">Comprar Plantas →</span>
                            </div>
                            <div className="absolute top-0 right-0 w-full h-full opacity-100 transition-transform duration-700 group-hover:scale-105">
                                <Image
                                    src="/images/fondo_buho.png"
                                    alt="Verdor Interior"
                                    fill
                                    className="object-cover object-right mask-image-gradient-wide"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#E8F3ED] via-transparent to-transparent" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section >

            {/* CTA Final */}
            < section className="py-32 relative overflow-hidden bg-white" >
                <div className="container-custom">
                    <div className="bg-brand-dark rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden group shadow-2xl min-h-[500px] flex items-center justify-center">
                        <div className="absolute inset-0">
                            <Image
                                src="/images/agencias.png"
                                alt="Fondo Experiencia Perlawasi"
                                fill
                                className="object-cover opacity-60 transition-transform duration-[10s] group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60" />
                        </div>
                        <div className="relative z-10 w-full">
                            <h2 className="text-4xl md:text-7xl font-display font-bold text-white mb-8 leading-tight tracking-tight">+50 Agencias<br />Eligen Perlawasi</h2>
                            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">Únete a nosotros en una experiencia que trasciende lo convencional. Perlawasi es tu hogar en la selva.</p>
                            <Link href="/reservar" className="btn btn-primary px-16 py-6 text-2xl rounded-full font-bold shadow-strong transition-all hover:px-20">
                                Planear tu Visita
                            </Link>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}
