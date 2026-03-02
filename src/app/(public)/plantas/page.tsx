import { supabase } from '@/lib/supabase'
import PlantasView from './PlantasView'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Vivero Perlawasi - Oasis Amazónico en tu Hogar | San Martín',
    description: 'Colección exclusiva de plantas nativas y exóticas de la Amazonía. Transforma tu espacio con la energía vital de la selva peruana.',
}

export default async function PlantasPage() {
    // Fetch plants from Supabase
    const { data: dbPlants } = await supabase
        .from('plantas')
        .select('*')
        .order('created_at', { ascending: false })

    // Map DB data to UI needs with default design tokens if missing
    // Use fallback mock data if DB is empty to ensure "mucho flow" and professional look
    const mockPlants = [
        {
            id: 'm-1',
            name: 'Monstera Deliciosa',
            scientific_name: 'Monstera deliciosa',
            price: 65,
            emoji: '🌿',
            category: 'Interior',
            difficulty: 'Baja',
            light: 'Indirecta',
            water: 'Semanal',
            description: 'La reina de la selva en tu sala. Hojas majestuosas que purifican y decoran.',
            status: 'In Stock'
        },
        {
            id: 's-1',
            name: 'Sansevieria Moonshine',
            scientific_name: 'Sansevieria trifasciata',
            price: 45,
            emoji: '🪴',
            category: 'Interior',
            difficulty: 'Muy Baja',
            light: 'Baja a Brillante',
            water: 'Cada 15 días',
            description: 'Indestructible y escultural. La planta perfecta para dormitorios.',
            status: 'In Stock'
        },
        {
            id: 'h-1',
            name: 'Helecho Amazónico',
            scientific_name: 'Adiantum capillus-veneris',
            price: 35,
            emoji: '🌿',
            category: 'Interior',
            difficulty: 'Media',
            light: 'Indirecta / Sombra',
            water: 'Frecuente',
            description: 'Frescura vibrante. Ideal para baños o espacios con humedad.',
            status: 'In Stock'
        },
        {
            id: 'p-1',
            name: 'Palmera Viajera',
            scientific_name: 'Ravenala madagascariensis',
            price: 120,
            emoji: '🌴',
            category: 'Exterior',
            difficulty: 'Media',
            light: 'Sol Directo',
            water: 'Abundante',
            description: 'Una pieza arquitectónica viva para tu jardín o terraza.',
            status: 'In Stock'
        }
    ]

    const finalPlantsData = dbPlants && dbPlants.length > 0 ? dbPlants : mockPlants

    const initialPlants = finalPlantsData.map((p: any) => ({
        ...p,
        scientific: p.scientific_name || 'Especie nativa',
        bgColor: p.category === 'Interior' ? '#f0fdf4' : (p.category === 'Exterior' ? '#eff6ff' : '#fdfaf1'),
        accentColor: p.category === 'Interior' ? '#166534' : (p.category === 'Exterior' ? '#1e40af' : '#92400e'),
        thumbnails: [p.image_url || '🌿', '🍃', '🪴'],
        tags: [p.category, p.difficulty, 'Amazónico'],
        tabs: {
            info: p.description || 'Una planta excepcional de nuestra reserva.',
            care: `Luz: ${p.light || 'Variable'}. Riego: ${p.water || 'Moderado'}.`,
            more: 'Cultivada bajo estándares de sostenibilidad en San Martín.'
        }
    }))

    return <PlantasView initialPlants={initialPlants} />
}
