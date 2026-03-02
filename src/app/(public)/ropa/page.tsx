import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const BoutiqueModern = dynamic(
    () => import('@/components/BoutiqueModern'),
    { ssr: false }
)

export const metadata: Metadata = {
    title: 'Ropa & Boutique Perlawasi - Moda Consciente | San Martín, Perú',
    description: 'Boutique Perlamayo en Perlawasi. Ropa artesanal con materiales orgánicos en un lookbook exclusivo.',
}

export default function RopaPage() {
    return <BoutiqueModern />
}
