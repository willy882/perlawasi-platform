import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import BoutiqueModern from '@/components/BoutiqueModern'

export const metadata: Metadata = {
    title: 'Ropa de Playa & Accesorios | LIL Boutique Perlawasi',
    description: 'Colección de ropa de playa, bikinis, pareos y accesorios artesanales de la Amazonía peruana.',
}

export default async function RopaPage() {
    // Fetch products from Supabase, grouped by section
    const { data: dbProducts } = await supabase
        .from('productos_ropa')
        .select('*')
        .order('created_at', { ascending: false })

    // Fallback mock products (shown when DB is empty)
    const MOCK_PRODUCTS = [
        { id: 'm1', name: 'Bikini Selva Coral', price: 120, section: 'swim', description: 'Lycra reciclada UPF 50+, corte brasileño. Resistente al cloro y al sol.', image_url: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?auto=format&fit=crop&w=900&q=80', sizes: ['XS', 'S', 'M', 'L'], category: 'Bikini' },
        { id: 'm2', name: 'Traje Entero Azul', price: 145, section: 'swim', description: 'La elegancia del océano en tejido técnico de alto rendimiento.', image_url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=900&q=80', sizes: ['S', 'M', 'L'], category: 'Bañador' },
        { id: 'm3', name: 'Pareo Amazónico', price: 75, section: 'cover', description: 'Viscosa de bambú estampada artesanalmente en San Martín.', image_url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=900&q=80', sizes: ['Único'], category: 'Pareo' },
        { id: 'm4', name: 'Vestido Lino Arena', price: 95, section: 'cover', description: 'Lino 100% natural. Perfecto para pasar del río al restaurante.', image_url: 'https://images.unsplash.com/photo-1559386484-97dfc0e15539?auto=format&fit=crop&w=900&q=80', sizes: ['S', 'M', 'L', 'XL'], category: 'Vestido' },
        { id: 'm5', name: 'Sombrero Paja Toquilla', price: 180, section: 'accesorios', description: 'El sombrero de paja más fino del Perú. Grado 4.', image_url: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&w=900&q=80', sizes: ['S', 'M', 'L'], category: 'Sombrero' },
        { id: 'm6', name: 'Bolso Palma de Mar', price: 150, section: 'accesorios', description: 'Tejido artesanal de palma natural con cierre de concha.', image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80', sizes: ['Único'], category: 'Bolso' },
    ]

    const products = (dbProducts && dbProducts.length > 0) ? dbProducts : MOCK_PRODUCTS

    return <BoutiqueModern initialProducts={products} />
}
