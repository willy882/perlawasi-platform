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
    title: 'Perlawasi - Refugio de Lujo en el Coraz├│n de la Naturaleza',
    description: 'Descubre Perlawasi: restaurante, helader├¡a, cafeter├¡a, chocolates, boutique, alojamiento, cervecer├¡a, vivero y licorer├¡a. Ubicados en Segunda Jerusal├®n, Rioja, San Mart├¡n. Trabajamos con m├ís de 60 operadores tur├¡sticos.',
    keywords: ['Perlawasi', 'restaurante', 'helader├¡a', 'cafeter├¡a', 'alojamiento', 'Rioja', 'San Mart├¡n', 'turismo', 'Per├║'],
    authors: [{ name: 'Perlawasi' }],
    openGraph: {
        title: 'Perlawasi - Experiencia ├Ünica en la Naturaleza',
        description: 'Restaurante, alojamiento y m├ís en el coraz├│n de San Mart├¡n',
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
                {children}
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
