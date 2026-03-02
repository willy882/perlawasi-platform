import { supabase } from '@/lib/supabase'
import PlantasClient from './PlantasClient'
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
    const initialPlants = dbPlants?.map(p => ({
        ...p,
        bgColor: p.category === 'Interior' ? '#f0fdf4' : (p.category === 'Exterior' ? '#eff6ff' : '#fdfaf1'),
        accentColor: p.category === 'Interior' ? '#166534' : (p.category === 'Exterior' ? '#1e40af' : '#92400e'),
        thumbnails: [p.image_url || '🌿', '🍃', '🪴'],
        tags: [p.category, p.difficulty, 'Amazónico'],
        tabs: {
            info: p.description || 'Una planta excepcional de nuestra reserva.',
            care: `Luz: ${p.light}. Riego: ${p.water}.`,
            more: 'Cultivada bajo estándares de sostenibilidad en San Martín.'
        }
    })) || []

    return <PlantasClient initialPlants={initialPlants} />
}
