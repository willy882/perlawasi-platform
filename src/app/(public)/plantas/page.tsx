import { supabase } from '@/lib/supabase'
import PlantasView from './PlantasView'
import { Metadata } from 'next'

export const revalidate = 0 // Forzar actualización en tiempo real

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

    const finalPlantsData = dbPlants || []

    const initialPlants = finalPlantsData.map((p: any) => {
        const categoryUpper = p.category?.toUpperCase() || ''
        const isInterior = categoryUpper === 'INTERIOR'
        const isExterior = categoryUpper === 'EXTERIOR'

        return {
            ...p,
            scientific: p.scientific_name || 'Especie nativa',
            bgColor: isInterior ? '#f0fdf4' : (isExterior ? '#eff6ff' : '#fdfaf1'),
            accentColor: isInterior ? '#166534' : (isExterior ? '#1e40af' : '#92400e'),
            thumbnails: [p.image_url || '🌿', '🍃', '🪴'],
            tags: [p.category || 'Selva', p.difficulty || 'Baja', 'Amazónico'],
            tabs: {
                info: p.description || 'Una planta excepcional de nuestra reserva.',
                care: `Luz: ${p.light || 'Variable'}. Riego: ${p.water || 'Moderado'}.`,
                more: 'Cultivada bajo estándares de sostenibilidad en San Martín.'
            }
        }
    })

    return <PlantasView initialPlants={initialPlants} />
}
