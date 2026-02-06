'use client'

import Link from 'next/link'
import AnimatedIceCreamCharacter from '@/components/AnimatedIceCreamCharacter'

export default function HeladeriaPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section - Pink/Red Vibrant */}
            <section className="relative h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-pink-500 via-red-400 to-orange-400">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-10 left-10 text-9xl animate-float">🍦</div>
                    <div className="absolute bottom-20 right-20 text-9xl animate-float" style={{ animationDelay: '1s' }}>🍨</div>
                    <div className="absolute top-1/2 left-1/3 text-7xl animate-float" style={{ animationDelay: '0.5s' }}>🍧</div>
                </div>

                <div className="relative z-20 container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Contenido de texto */}
                        <div className="text-white text-center lg:text-left">
                            <span className="inline-block px-4 py-2 bg-white text-pink-600 text-xs font-bold rounded-full mb-6 uppercase tracking-wider">
                                Felicidad en Cada Bocado
                            </span>
                            <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 leading-tight">
                                Heladería Vibrante
                            </h1>
                            <p className="text-2xl text-white/95 mb-10 leading-relaxed">
                                Sabores artesanales que celebran las frutas amazónicas. Frescura natural en cada cucharada.
                            </p>
                            <Link href="#sabores" className="btn bg-white text-pink-600 px-12 py-5 text-xl font-bold hover:bg-pink-50">
                                Descubre los Sabores
                            </Link>
                        </div>

                        {/* Personaje Animado */}
                        <div className="hidden lg:flex justify-center items-center">
                            <AnimatedIceCreamCharacter />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sabores Destacados */}
            <section id="sabores" className="section bg-gradient-to-b from-pink-50 to-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-pink-600 font-bold uppercase tracking-widest text-xs">Nuestros Clásicos</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 text-gray-900">Sabores Signature</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Helados elaborados con frutas frescas de la región, sin conservantes ni saborizantes artificiales
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Sabor 1 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-yellow-200 to-yellow-100 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                                🥭
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Mango Amazónico</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Cremoso helado de mango fresco con trozos de fruta. Dulzura natural y tropical.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-pink-600">S/ 12</span>
                                    <button className="btn bg-pink-600 text-white px-6 py-2 text-sm hover:bg-pink-700">Pedir</button>
                                </div>
                            </div>
                        </div>

                        {/* Sabor 2 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-purple-300 to-purple-200 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                                🫐
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Aguaje Silvestre</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Exótico sabor de aguaje, fruta emblemática de la Amazonía. Rico en vitaminas.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-pink-600">S/ 14</span>
                                    <button className="btn bg-pink-600 text-white px-6 py-2 text-sm hover:bg-pink-700">Pedir</button>
                                </div>
                            </div>
                        </div>

                        {/* Sabor 3 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-green-200 to-green-100 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                                🥥
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Coco Cremoso</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Helado de coco natural con trozos de coco rallado. Refrescante y tropical.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-pink-600">S/ 13</span>
                                    <button className="btn bg-pink-600 text-white px-6 py-2 text-sm hover:bg-pink-700">Pedir</button>
                                </div>
                            </div>
                        </div>

                        {/* Sabor 4 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-pink-300 to-pink-200 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                                🍓
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Fresa Andina</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Fresas frescas de las alturas convertidas en un helado suave y aromático.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-pink-600">S/ 12</span>
                                    <button className="btn bg-pink-600 text-white px-6 py-2 text-sm hover:bg-pink-700">Pedir</button>
                                </div>
                            </div>
                        </div>

                        {/* Sabor 5 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-amber-800 to-amber-600 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                                🍫
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Chocolate Perlawasi</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Helado de chocolate elaborado con nuestro cacao artesanal. Intenso y cremoso.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-pink-600">S/ 13</span>
                                    <button className="btn bg-pink-600 text-white px-6 py-2 text-sm hover:bg-pink-700">Pedir</button>
                                </div>
                            </div>
                        </div>

                        {/* Sabor 6 */}
                        <div className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-strong transition-all group">
                            <div className="aspect-square bg-gradient-to-br from-orange-300 to-orange-200 flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-500">
                                🍊
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900">Camu Camu Cítrico</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Superfood amazónico en helado. Alto en vitamina C, sabor único y refrescante.
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-pink-600">S/ 15</span>
                                    <button className="btn bg-pink-600 text-white px-6 py-2 text-sm hover:bg-pink-700">Pedir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Combos Especiales */}
            <section className="section bg-gradient-to-br from-pink-100 to-orange-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-pink-600 font-bold uppercase tracking-widest text-xs">Ofertas Especiales</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 mb-6 text-gray-900">Combos Familiares</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Combo 1 */}
                        <div className="bg-white rounded-3xl p-10 shadow-medium">
                            <div className="text-6xl mb-6 text-center">🍦🍦🍦</div>
                            <h3 className="text-3xl font-display font-bold mb-4 text-center text-gray-900">Combo Familiar</h3>
                            <p className="text-gray-600 text-center mb-6">
                                3 bolas de helado + 3 toppings a elección + 3 conos premium
                            </p>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-pink-600 mb-4">S/ 35</div>
                                <button className="btn bg-pink-600 text-white px-10 py-3 text-lg hover:bg-pink-700">
                                    Ordenar Combo
                                </button>
                            </div>
                        </div>

                        {/* Combo 2 */}
                        <div className="bg-white rounded-3xl p-10 shadow-medium">
                            <div className="text-6xl mb-6 text-center">🍨🍨</div>
                            <h3 className="text-3xl font-display font-bold mb-4 text-center text-gray-900">Combo Pareja</h3>
                            <p className="text-gray-600 text-center mb-6">
                                2 copas grandes + 4 toppings + 2 salsas especiales
                            </p>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-pink-600 mb-4">S/ 28</div>
                                <button className="btn bg-pink-600 text-white px-10 py-3 text-lg hover:bg-pink-700">
                                    Ordenar Combo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Agregar a tu Reserva Section */}
            <section className="section bg-white">
                <div className="container-custom">
                    <div className="bg-gradient-to-br from-pink-500 to-orange-400 rounded-[4rem] p-16 text-white text-center">
                        <div className="text-8xl mb-8">🍽️</div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Agrégalos a tu Reserva
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Nuestros helados artesanales son el complemento perfecto para tu experiencia gastronómica. Al reservar tu mesa, puedes agregar helados a tu pedido y los serviremos junto con tu comida.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <a href="https://wa.me/51928141669?text=Hola,%20quiero%20reservar%20una%20mesa%20y%20agregar%20helados%20a%20mi%20pedido"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn bg-white text-pink-600 px-12 py-5 text-xl font-bold hover:bg-pink-50">
                                Reservar Mesa
                            </a>
                            <a href="tel:+51928141669" className="btn bg-white/10 backdrop-blur-md text-white border-2 border-white/30 hover:bg-white/20 px-12 py-5 text-xl font-bold">
                                Llamar Ahora
                            </a>
                        </div>
                        <p className="text-white/70 mt-6 text-sm">
                            Helados servidos solo con crema • Sin toppings ni decoraciones adicionales
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-gradient-to-br from-pink-600 to-red-500">
                <div className="container-custom text-center text-white">
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        ¡Visítanos Hoy!
                    </h2>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Abierto todos los días de 10:00 AM a 9:00 PM
                    </p>
                    <Link href="/" className="btn bg-white text-pink-600 px-12 py-5 text-xl font-bold hover:bg-pink-50">
                        Volver al Inicio
                    </Link>
                </div>
            </section>
        </div>
    )
}
