import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ChatBot from '@/components/ChatBot'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Perlawasi - Refugio de Lujo en el Corazón de la Naturaleza',
    description: 'Descubre Perlawasi: restaurante, heladería, cafetería, chocolates, boutique, alojamiento, cervecería, vivero y licorería. Ubicados en Segunda Jerusalén, Rioja, San Martín. Trabajamos con más de 60 operadores turísticos.',
    keywords: ['Perlawasi', 'restaurante', 'heladería', 'cafetería', 'alojamiento', 'Rioja', 'San Martín', 'turismo', 'Perú'],
    authors: [{ name: 'Perlawasi' }],
    openGraph: {
        title: 'Perlawasi - Experiencia Única en la Naturaleza',
        description: 'Restaurante, alojamiento y más en el corazón de San Martín',
        type: 'website',
        locale: 'es_PE',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className="smooth-scroll">
            <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
                <WhatsAppButton />
                <ChatBot />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            iconTheme: {
                                primary: '#00D100',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </body>
        </html>
    )
}
