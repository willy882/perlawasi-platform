import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const FashionConfigurator = dynamic(
    () => import('@/components/FashionConfigurator'),
    { ssr: false }
)

export const metadata: Metadata = {
    title: 'Ropa & Boutique Perlawasi - Moda Consciente | San Mart├¡n, Per├║',
    description: 'Boutique Perlamayo en Perlawasi. Ropa artesanal con materiales org├ínicos: camisetas de lino, pantalones algod├│n pima, vestidos bamb├║ y m├ís. Configura tu look en 3D.',
}

export default function RopaPage() {
    return <FashionConfigurator />
}
