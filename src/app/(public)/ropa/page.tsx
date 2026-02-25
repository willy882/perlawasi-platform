import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const FashionConfigurator = dynamic(
    () => import('@/components/FashionConfigurator'),
    { ssr: false }
)

export const metadata: Metadata = {
    title: 'Ropa & Boutique Perlawasi - Moda Consciente | San Martín, Perú',
    description: 'Boutique Perlamayo en Perlawasi. Ropa artesanal con materiales orgánicos: camisetas de lino, pantalones algodón pima, vestidos bambú y más. Configura tu look en 3D.',
}

export default function RopaPage() {
    return <FashionConfigurator />
}
