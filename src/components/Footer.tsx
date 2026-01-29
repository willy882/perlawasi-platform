import Link from 'next/link'
import Image from 'next/image'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="bg-brand-dark text-gray-400 py-20">
            {/* Main Footer */}
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* About */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative w-20 h-20 transition-transform group-hover:scale-105">
                                <Image
                                    src="/images/logo-perlawasi.png"
                                    alt="Perlawasi"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Un espacio para reencontrarse con la tierra, disfrutar de sabores auténticos y descansar bajo el manto estelar de las montañas.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="https://www.facebook.com/perlawasi/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all">
                                <FaFacebook className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://www.instagram.com/explore/locations/176851519353099/recreo-turistico-perlawasi/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all">
                                <FaInstagram className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://www.youtube.com/@perlawasi" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all">
                                <FaYoutube className="w-4 h-4 text-white" />
                            </a>
                            <a href="https://wa.me/51928141669" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary-500 hover:border-primary-500 transition-all">
                                <FaWhatsapp className="w-4 h-4 text-white" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-white font-display font-bold mb-6 uppercase tracking-wider text-sm">Navegación</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/nosotros" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/galeria" className="hover:text-white transition-colors">Galería</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog de Viaje</Link></li>
                            <li><Link href="/preguntas" className="hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                        </ul>
                    </div>

                    {/* Experiences */}
                    <div>
                        <h3 className="text-white font-display font-bold mb-6 uppercase tracking-wider text-sm">Experiencias</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/restaurante" className="hover:text-white transition-colors">Restaurante</Link></li>
                            <li><Link href="/heladeria" className="hover:text-white transition-colors">Heladería</Link></li>
                            <li><Link href="/cafe-cacao" className="hover:text-white transition-colors">Café & Cacao</Link></li>
                            <li><Link href="/cerveceria" className="hover:text-white transition-colors">Cervecería</Link></li>
                            <li><Link href="/licoreria" className="hover:text-white transition-colors">Licorería</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-display font-bold mb-6 uppercase tracking-wider text-sm">Contacto</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500">📞</span>
                                <a href="tel:+51928141669" className="hover:text-white transition-colors">+51 928 141 669</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-primary-500">✉️</span>
                                <a href="mailto:hola@perlawasi.com" className="hover:text-white transition-colors">hola@perlawasi.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase">
                    <p>© 2026 Perlawasi Lodge & Experiences. Todos los derechos reservados. <span className="opacity-30 ml-2">v2.9</span></p>
                    <div className="flex gap-8">
                        <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
                        <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
