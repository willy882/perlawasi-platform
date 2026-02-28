'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ────────────────── TIPOS ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
interface Plant {
    id: string
    name: string
    scientific: string
    price: number
    emoji: string
    bgColor: string
    accentColor: string
    difficulty: 'Muy Fácil' | 'Fácil' | 'Medio' | 'Difícil'
    light: string
    water: string
    environment: string
    petFriendly: boolean
    tabs: {
        info: string
        care: string
        more: string
    }
    thumbnails: string[]
    tags: string[]
}

// ────────────────── DATOS ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
const plants: Plant[] = [
    {
        id: 'monstera',
        name: 'Monstera Deliciosa',
        scientific: 'Monstera deliciosa',
        price: 45,
        emoji: '🌿',
        bgColor: '#E8F5E9',
        accentColor: '#2E7D32',
        difficulty: 'Fácil',
        light: 'Luz indirecta',
        water: 'Cada 7-10 días',
        environment: 'Interior',
        petFriendly: false,
        tabs: {
            info: 'La Monstera Deliciosa es una de las plantas de interior más populares del mundo, conocida por sus espectaculares hojas perforadas que le dan un aspecto tropical único. Originaria de los bosques tropicales de América Central y del Sur, su nombre alude a sus frutos comestibles y a la apariencia monstruosamente grande de sus hojas maduras. Ideal para dar carácter a cualquier espacio interior.',
            care: 'Riegue solo cuando los 2-3 cm superiores del sustrato estén secos. Necesita luz brillante indirecta; evite la luz solar directa que puede quemar las hojas. Fertilice cada mes durante primavera y verano con abono líquido equilibrado. Limpie las hojas con un trapo húmedo para mantener su brillo y ayudar a la fotosíntesis.',
            more: 'Esta planta puede crecer más de 1 metro de altura en interiores. Sus hojas jóvenes son enteras y se vuelven perforadas con la madurez. No apta para mascotas ni niños pequeños por su toxicidad moderada. Disponible también en variedad "Thai Constellation" con patrones blancos únicos.',
        },
        thumbnails: ['🌿', '🍃', '🪴'],
        tags: ['Tropical', 'Tendencia', 'Gran tamaño'],
    },
    {
        id: 'snake',
        name: 'Lengua de Suegra',
        scientific: 'Sansevieria trifasciata',
        price: 35,
        emoji: '🪴',
        bgColor: '#F1F8E9',
        accentColor: '#558B2F',
        difficulty: 'Muy Fácil',
        light: 'Cualquier luz',
        water: 'Cada 14-21 días',
        environment: 'Interior',
        petFriendly: false,
        tabs: {
            info: 'La Sansevieria, popularmente llamada "Lengua de Suegra" o Snake Plant, es la planta perfecta para principiantes y para espacios con poca luz. Sus hojas erguidas, firmes y con patrones de bandas plateadas y verdes aportan elegancia vertical a cualquier rincón. Además, es una de las mejores plantas purificadoras del aire.',
            care: 'Riegue muy poco: es una suculenta y tolera perfectamente el olvido. En invierno, puede pasar hasta un mes sin agua. Necesita sustrato bien drenado para evitar la pudrición de raíces. Soporta temperaturas de 10 a 35°C. Evite que el agua se acumule en el centro de las hojas.',
            more: 'Considerada por la NASA como una de las mejores plantas para purificar el aire interior. Puede sobrevivir en condiciones de muy baja luminosidad. Existen más de 70 variedades de Sansevieria. Perfecta para oficinas, dormitorios y baños.',
        },
        thumbnails: ['🪴', '🌱', '✨'],
        tags: ['Purifica el aire', 'Pocas horas luz', 'Principiantes'],
    },
    {
        id: 'orquidea',
        name: 'Orquídea Amazónica',
        scientific: 'Phalaenopsis amabilis',
        price: 75,
        emoji: '🌸',
        bgColor: '#FCE4EC',
        accentColor: '#C2185B',
        difficulty: 'Medio',
        light: 'Luz indirecta brillante',
        water: 'Cada 7 días',
        environment: 'Interior',
        petFriendly: true,
        tabs: {
            info: 'La Phalaenopsis, conocida como Orquídea Mariposa, es una de las orquídeas más elegantes y codiciadas del mundo. Sus flores duran entre 2 y 3 meses, en cascadas de pétalos que van desde el blanco puro hasta el magenta intenso. Una auténtica joya botánica de los bosques amazónicos peruanos, cultivada en nuestro vivero con técnicas especializadas.',
            care: 'Riegue sumergiendo la maceta en agua durante 10 minutos semanalmente y deje escurrir bien. Necesita luz brillante pero nunca directa. Fertilice cada 2 semanas con abono específico para orquídeas. Después de la floración, corte el tallo por encima del segundo nudo para estimular nueva floración.',
            more: 'Una vez establecida, reflota increíblemente bien después de la floración. Ideal como regalo de lujo. No requiere tierra; vive mejor en corteza de pino o musgo especial de orquídeas. Con los cuidados correctos, puede florecer 2-3 veces al año.',
        },
        thumbnails: ['🌸', '🏺', '🌺'],
        tags: ['Premium', 'Florece meses', 'Pet friendly'],
    },
    {
        id: 'ficus',
        name: 'Ficus Lyrata',
        scientific: 'Ficus lyrata',
        price: 120,
        emoji: '🌳',
        bgColor: '#E0F2F1',
        accentColor: '#00695C',
        difficulty: 'Medio',
        light: 'Luz brillante indirecta',
        water: 'Cada 5-7 días',
        environment: 'Interior',
        petFriendly: false,
        tabs: {
            info: 'El Ficus Lyrata, o Ficus Hoja de Violín, es la planta favorita de los diseñadores de interiores por sus enormes hojas brillantes con forma de violín. Es una planta árbol que puede alcanzar los 2 metros en interior, convirtiéndose en un elemento arquitectónico viviente dentro del hogar o la oficina.',
            care: 'Mantenga humedad constante sin encharcamiento. Use tierra de alta calidad con buen drenaje. Limpie las hojas semanalmente para eliminar el polvo y potenciar la fotosíntesis. Evite los cambios bruscos de ubicación, ya que puede perder hojas. Aléjelo de corrientes de aire frío o calefactores.',
            more: 'Actualmente es la planta de interior más fotografiada en redes sociales. Puede vivir más de 10 años con los cuidados correctos. Disponible en versión estándar y encaramada (braided trunk). La savia puede irritar la piel sensible y es tóxica para mascotas.',
        },
        thumbnails: ['🌳', '🍃', '🌱'],
        tags: ['Árbol interior', 'Diseño', 'Gran formato'],
    },
    {
        id: 'helecho',
        name: 'Helecho Espada',
        scientific: 'Nephrolepis exaltata',
        price: 40,
        emoji: '🌿',
        bgColor: '#E8F5E9',
        accentColor: '#388E3C',
        difficulty: 'Medio',
        light: 'Luz difusa',
        water: 'Cada 2-3 días',
        environment: 'Interior / Exterior',
        petFriendly: true,
        tabs: {
            info: 'El Helecho Espada es una clásica planta colgante con largos frondas arqueadas de color verde brillante. Ideal para colgar en maceteros, estantes o en porches sombreados. Su capacidad para limpiar el aire y añadir textura natural a los ambientes lo hace un favorito eterno de los jardines y hogares de la selva peruana.',
            care: 'Es la más exigente en cuanto a humedad: riegue con frecuencia y nunca deje que la tierra se seque por completo. Pulverice las hojas regularmente o colóquelo cerca de una bandeja con agua. En verano puede necesitar riego diario. Evite el sol directo que quema sus delicadas frondas.',
            more: 'El Helecho Espada purifica el aire eliminando formaldehído y xileno. Es completamente seguro para gatos y perros. Puede llegar a tener frondas de hasta 90 cm de longitud. En ambientes muy secos puede ser más difícil de mantener; en la humedad de San Martín, prospera sin esfuerzo.',
        },
        thumbnails: ['🌿', '🍃', '🌱'],
        tags: ['Colgante', 'Pet friendly', 'Purificador'],
    },
    {
        id: 'palmerita',
        name: 'Palmerita de Salón',
        scientific: 'Chamaedorea elegans',
        price: 55,
        emoji: '🌴',
        bgColor: '#FFF8E1',
        accentColor: '#F57F17',
        difficulty: 'Fácil',
        light: 'Luz baja a media',
        water: 'Cada 7-10 días',
        environment: 'Interior',
        petFriendly: true,
        tabs: {
            info: 'La Chamaedorea elegans, conocida como Palmerita de Salón o Palmera de Bambú, es la palmera de interior más resistente y versátil. Sus delicados arcos de hojas pinnadas crean una atmósfera tropical sin necesitar mucho espacio. Originaria de México y Guatemala, es perfecta para añadir un toque exótico a salones, comedores y dormitorios.',
            care: 'Riegue de forma moderada, permitiendo que el sustrato superior se seque entre riegos. No tolera el encharcamiento. Fertilice cada 2 meses en primavera y verano. Puede tolerar ambientes con poca luz, pero su crecimiento es más lento. Trasplante cada 2-3 años a una maceta ligeramente más grande.',
            more: 'Una de las pocas palmeras totalmente seguras para mascotas y niños. Puede alcanzar 1,2 metros de altura. Perfecta junto a ventanas norte u oeste. Es también un magnífico regalo para oficinas y recepciones. Disponible en diferentes tamaños en nuestro vivero.',
        },
        thumbnails: ['🌴', '🌿', '✨'],
        tags: ['Pet friendly', 'Poca luz', 'Tropical'],
    },
]

// ────────────────── ICONOS SVG DE CUIDADO ─────────────────────────────────────────────────────────────────────────────────────────────────────────────
const SunIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
)
const WaterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.25 6-7.5 9.75-7.5 12.75a7.5 7.5 0 0015 0c0-3-2.25-6.75-7.5-12.75z" />
    </svg>
)
const HomeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L22.25 12M4.5 9.75V19.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V15a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v4.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V9.75" />
    </svg>
)
const PawIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.5c-2.5 0-4.5 1.5-4.5 4s2 5.5 4.5 5.5 4.5-3 4.5-5.5-2-4-4.5-4zM5 8.5c0 1.4-1 2.5-2.5 2.5S0 9.9 0 8.5s1-2.5 2.5-2.5S5 7.1 5 8.5zm14 0c0 1.4 1 2.5 2.5 2.5S24 9.9 24 8.5 23 6 21.5 6 19 7.1 19 8.5zM8 6C8 4.3 9.3 3 11 3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm6 0c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3z" />
    </svg>
)

// ────────────────── COMPONENTE VISOR PLANTA ───────────────────────────────────────────────────────────────────────────────────────────────────────────
function PlantViewer({ plant, qty, setQty }: { plant: Plant; qty: number; setQty: (n: number) => void }) {
    const [activeTab, setActiveTab] = useState<'info' | 'care' | 'more'>('info')
    const [activeThumbnail, setActiveThumbnail] = useState(0)
    const [added, setAdded] = useState(false)

    const handleAdd = () => {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const difficultyColor = {
        'Muy Fácil': 'bg-emerald-100 text-emerald-700',
        'Fácil': 'bg-green-100 text-green-700',
        'Medio': 'bg-amber-100 text-amber-700',
        'Difícil': 'bg-red-100 text-red-700',
    }[plant.difficulty]

    return (
        <div className="w-full">
            {/* ÔöÇÔöÇ Grid principal del visor ÔöÇÔöÇ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[2.5rem] overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.12)] bg-white border border-gray-100">

                {/* Columna 1: Miniaturas verticales */}
                <div className="lg:col-span-1 flex lg:flex-col items-center justify-center gap-3 p-4 bg-gray-50/80 border-r border-gray-100 order-2 lg:order-1">
                    {plant.thumbnails.map((thumb, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveThumbnail(i)}
                            className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 border-2 ${activeThumbnail === i
                                ? 'border-current shadow-md scale-105'
                                : 'border-transparent bg-white hover:bg-white hover:shadow-sm'
                                }`}
                            style={activeThumbnail === i ? { borderColor: plant.accentColor, backgroundColor: plant.bgColor } : {}}
                        >
                            {thumb}
                        </button>
                    ))}
                </div>

                {/* Columna 2: Imagen principal */}
                <div
                    className="lg:col-span-4 relative flex items-center justify-center p-8 lg:p-12 order-1 lg:order-2 min-h-[300px] lg:min-h-[500px] transition-colors duration-700"
                    style={{ backgroundColor: plant.bgColor }}
                >
                    {/* Decoración circular de fondo */}
                    <div
                        className="absolute inset-0 m-8 lg:m-12 rounded-[2rem] opacity-20"
                        style={{ background: `radial-gradient(circle at 60% 40%, ${plant.accentColor}55, transparent 70%)` }}
                    />

                    {/* Badge dificultad */}
                    <div className={`absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-bold ${difficultyColor}`}>
                        {plant.difficulty}
                    </div>

                    {/* Badge pet friendly */}
                    {plant.petFriendly && (
                        <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 border border-green-200 flex items-center gap-1">
                            🐾 Pet Safe
                        </div>
                    )}

                    {/* Emoji/planta central */}
                    <div
                        className="relative z-10 text-[11rem] lg:text-[14rem] leading-none select-none transition-all duration-700"
                        style={{ filter: `drop-shadow(0 20px 40px ${plant.accentColor}44)` }}
                    >
                        {plant.emoji}
                    </div>

                    {/* Sombra base */}
                    <div
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full blur-xl opacity-30"
                        style={{ backgroundColor: plant.accentColor }}
                    />
                </div>

                {/* Columna 3: Info del producto */}
                <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col gap-6 order-3">

                    {/* Nombre y precio */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h2
                                className="text-3xl lg:text-4xl font-display font-bold leading-tight"
                                style={{ color: '#1a1a1a' }}
                            >
                                {plant.name}
                            </h2>
                            <p className="text-sm italic text-gray-400 mt-1">{plant.scientific}</p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-3xl font-black" style={{ color: plant.accentColor }}>S/ {plant.price}</p>
                            <p className="text-xs text-gray-400">Por planta</p>
                        </div>
                    </div>

                    {/* Badges de cuidado */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            { icon: <SunIcon />, label: plant.light, title: 'Luz' },
                            { icon: <WaterIcon />, label: plant.water, title: 'Riego' },
                            { icon: <HomeIcon />, label: plant.environment, title: 'Ambiente' },
                            { icon: <PawIcon />, label: plant.petFriendly ? 'Segura' : 'Tóxica', title: 'Mascotas' },
                        ].map((badge, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-white hover:shadow-sm transition-all text-center min-w-[80px]"
                            >
                                <span style={{ color: plant.accentColor }}>{badge.icon}</span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{badge.title}</span>
                                <span className="text-xs font-semibold text-gray-700 leading-tight">{badge.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Divisor */}
                    <div className="border-t border-gray-100" />

                    {/* Tabs de información */}
                    <div>
                        <div className="flex gap-0 border-b border-gray-100 mb-5">
                            {(['info', 'care', 'more'] as const).map((tab) => {
                                const labels = { info: 'Información', care: 'Cuidados', more: 'Más detalles' }
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-5 py-3 text-sm font-bold transition-all border-b-2 -mb-px ${activeTab === tab
                                            ? 'border-current text-current'
                                            : 'border-transparent text-gray-400 hover:text-gray-600'
                                            }`}
                                        style={activeTab === tab ? { color: plant.accentColor, borderColor: plant.accentColor } : {}}
                                    >
                                        {tab === 'info' ? 'Información' : tab === 'care' ? 'Cuidados' : 'Más detalles'}
                                    </button>
                                )
                            })}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 lg:line-clamp-4">
                            {plant.tabs[activeTab]}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {plant.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="text-xs font-bold px-3 py-1 rounded-full"
                                style={{ backgroundColor: `${plant.accentColor}15`, color: plant.accentColor }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Cantidad + Add to cart */}
                    <div className="flex items-center gap-4 mt-auto pt-2">
                        <div className="flex items-center gap-0 border border-gray-200 rounded-2xl overflow-hidden">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
                            >−</button>
                            <span className="w-10 text-center text-sm font-bold">{qty}</span>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold"
                            >+</button>
                        </div>

                        <button
                            onClick={handleAdd}
                            className="flex-1 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest text-white transition-all duration-500"
                            style={{
                                backgroundColor: added ? '#22c55e' : plant.accentColor,
                                boxShadow: `0 4px 20px ${plant.accentColor}44`,
                                transform: added ? 'scale(0.97)' : 'scale(1)',
                            }}
                        >
                            {added ? '✓ ¡Agregado!' : `Añadir al Carrito · S/ ${plant.price * qty}`}
                        </button>

                        <a
                            href={`https://wa.me/51928141669?text=Hola,%20quiero%20consultar%20sobre%20${encodeURIComponent(plant.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-11 h-11 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-green-400 transition-colors text-green-500 hover:bg-green-50 shrink-0"
                            title="Consultar por WhatsApp"
                        >
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ────────────────── PÁGINA PRINCIPAL ───────────────────────────────────────────────────────────────────────────────────────────────────────────────────
export default function PlantasPage() {
    const [selectedPlant, setSelectedPlant] = useState<Plant>(plants[0])
    const [qty, setQty] = useState(1)

    const handleSelectPlant = (plant: Plant) => {
        setSelectedPlant(plant)
        setQty(1)
    }

    return (
        <div className="min-h-screen bg-[#FBFDFB] text-gray-900">

            {/* ÔòÉÔòÉ HERO ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
            <section className="relative h-[65vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 50%, #E0F2F1 100%)' }}>
                {/* Decoraciones botánicas de fondo */}
                <div className="absolute inset-0 select-none pointer-events-none overflow-hidden">
                    <div className="absolute top-[-5%] right-[-5%] text-[30rem] opacity-[0.06] rotate-12">🌿</div>
                    <div className="absolute bottom-[-10%] left-[5%] text-[20rem] opacity-[0.05] -rotate-12">🍂</div>
                    <div className="absolute top-[20%] left-[40%] text-[8rem] opacity-[0.04]">🍃</div>
                </div>

                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #2E7D32 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                <div className="relative z-10 container-custom w-full">
                    <div className="max-w-3xl px-4">
                        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-green-200 px-4 py-2 rounded-full mb-6">
                            <span className="text-green-600 text-xs font-black uppercase tracking-widest">🌱 Vivero Perlawasi</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-[1.05] tracking-tight text-gray-900">
                            Verdor<br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #2E7D32, #66BB6A)' }}>
                                Interior
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            Plantas nativas y exóticas de la Amazonía Peruana. Cultivadas con amor en el corazón de San Martín.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <Link href="#vivero" className="btn bg-[#2E7D32] text-white px-10 py-4 text-base font-bold rounded-2xl hover:bg-[#1B5E20] shadow-lg transition-all hover:scale-105">
                                Explorar Vivero →
                            </Link>
                            <Link href="#cuidados" className="btn bg-white/70 backdrop-blur-sm text-[#2E7D32] border border-green-200 px-10 py-4 text-base font-bold rounded-2xl hover:bg-white transition-all">
                                Guía de Cuidados
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats flotantes */}
                <div className="absolute bottom-8 right-8 hidden lg:flex gap-6">
                    {[
                        { value: '+80', label: 'Especies' },
                        { value: '100%', label: 'Orgánico' },
                        { value: '5★', label: 'Calidad' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 text-center border border-white/80 shadow-sm">
                            <p className="text-2xl font-black text-[#2E7D32]">{stat.value}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ÔòÉÔòÉ PLANT VIEWER SHOP ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
            <section id="vivero" className="py-20 bg-white">
                <div className="container-custom">
                    {/* Título sección */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                        <div>
                            <span className="text-green-600 text-xs font-black uppercase tracking-[0.3em] block mb-2">Selección Curada</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold">Nuestras Plantas</h2>
                        </div>
                        <p className="text-gray-500 max-w-sm text-sm">Selecciona cualquier planta para ver sus detalles, guía de cuidados y añadirla a tu carrito.</p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8 items-start">

                        {/* ÔöÇ Listado lateral de plantas ÔöÇ */}
                        <div className="lg:col-span-3">
                            <div className="bg-gray-50 rounded-3xl p-4 border border-gray-100">
                                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4 px-2">
                                    {plants.length} plantas disponibles
                                </p>
                                <div className="flex flex-col gap-2">
                                    {plants.map((plant) => (
                                        <button
                                            key={plant.id}
                                            onClick={() => handleSelectPlant(plant)}
                                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 text-left border ${selectedPlant.id === plant.id
                                                ? 'border-current shadow-sm scale-[1.01]'
                                                : 'border-transparent hover:bg-white hover:shadow-sm'
                                                }`}
                                            style={selectedPlant.id === plant.id ? {
                                                backgroundColor: plant.bgColor,
                                                borderColor: `${plant.accentColor}44`,
                                            } : {}}
                                        >
                                            <div
                                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                                                style={{ backgroundColor: selectedPlant.id === plant.id ? 'white' : plant.bgColor }}
                                            >
                                                {plant.emoji}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-bold truncate ${selectedPlant.id === plant.id ? '' : 'text-gray-700'}`}
                                                    style={selectedPlant.id === plant.id ? { color: plant.accentColor } : {}}>
                                                    {plant.name}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate italic">{plant.scientific}</p>
                                                <p className="text-xs font-bold mt-0.5" style={{ color: plant.accentColor }}>S/ {plant.price}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ÔöÇ Visor principal ÔöÇ */}
                        <div className="lg:col-span-9">
                            <PlantViewer
                                plant={selectedPlant}
                                qty={qty}
                                setQty={setQty}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ÔòÉÔòÉ FEATURE CARDS ÔÇö estilo glassmorphism de la referencia ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
            <section id="cuidados" className="py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1B5E20 0%, #004D40 60%, #006064 100%)' }}>
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="text-green-300 text-xs font-black uppercase tracking-[0.3em] mb-3 block">Aprende con nosotros</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white">Secretos del <span className="text-green-300">Vivero</span></h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: '☀️',
                                title: 'Luz perfecta',
                                subtitle: 'El secreto del crecimiento',
                                desc: 'La mayoría de plantas de interior prosperan en luz brillante indirecta a 1-2 metros de una ventana. La luz directa quema; la oscuridad detiene el crecimiento. El punto medio es la clave.',
                                wave: '〰️',
                            },
                            {
                                icon: '💧',
                                title: 'El riego ideal',
                                subtitle: 'El error más común',
                                desc: 'El exceso de agua mata más plantas que la sequía. Introduce el dedo 2-3 cm en el sustrato: si está húmedo, espera. El riego profundo e infrecuente es siempre mejor que el superficial y diario.',
                                wave: '〰️',
                            },
                            {
                                icon: '🧪',
                                title: 'Nutrición natural',
                                subtitle: 'Fertilización consciente',
                                desc: 'En Perlawasi usamos compost artesanal y abonos naturales locales. Fertiliza solo en primavera y verano (etapa de crecimiento). En otoño e invierno, las plantas descansan y necesitan menos nutrientes.',
                                wave: '〰️',
                            },
                        ].map((card, i) => (
                            <div
                                key={i}
                                className="group relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm p-8 transition-all duration-500 hover:scale-[1.02] hover:border-white/20"
                                style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
                            >
                                {/* Badge Feature */}
                                <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                                    <span className="text-[10px] text-green-300 font-bold uppercase tracking-widest">Consejo Experto</span>
                                </div>

                                {/* Icono */}
                                <div className="text-5xl mb-4">{card.icon}</div>

                                {/* Título */}
                                <h3 className="text-2xl font-display font-bold text-white mb-1">{card.title}</h3>
                                <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-5">{card.subtitle}</p>

                                {/* Divisor ondulado */}
                                <div className="border-t border-white/10 mb-5" />

                                {/* Descripción */}
                                <p className="text-white/70 text-sm leading-relaxed">{card.desc}</p>

                                {/* Decoración esquina */}
                                <div className="absolute bottom-0 right-0 text-[8rem] opacity-[0.04] leading-none select-none">
                                    {card.icon}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ÔòÉÔòÉ QUICK CATEGORIES ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container-custom">
                    <h3 className="text-2xl font-display font-bold mb-8 text-center">Explora por Tipo</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: 'Interior', emoji: '🪴', color: '#E8F5E9', accent: '#2E7D32', desc: 'Para el hogar y oficina' },
                            { name: 'Exterior', emoji: '🌳', color: '#E0F2F1', accent: '#00695C', desc: 'Jardines y terrazas' },
                            { name: 'Suculentas', emoji: '🌵', color: '#FFF8E1', accent: '#F57F17', desc: 'Bajo mantenimiento' },
                            { name: 'Aromáticas', emoji: '🌿', color: '#F1F8E9', accent: '#558B2F', desc: 'Hierbas y medicinales' },
                        ].map((cat, i) => (
                            <div
                                key={i}
                                className="group rounded-3xl p-6 cursor-pointer hover:shadow-lg transition-all duration-400 hover:-translate-y-1 border border-transparent hover:border-gray-100"
                                style={{ backgroundColor: cat.color }}
                            >
                                <div className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 inline-block">{cat.emoji}</div>
                                <h4 className="font-bold text-lg" style={{ color: cat.accent }}>{cat.name}</h4>
                                <p className="text-gray-500 text-xs mt-1">{cat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ÔòÉÔòÉ CTA FINAL ÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉÔòÉ */}
            <section className="py-24 bg-[#FBFDFB]">
                <div className="container-custom">
                    <div
                        className="rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center"
                        style={{ background: 'linear-gradient(135deg, #E8F5E9, #E0F7FA)' }}
                    >
                        <div className="absolute inset-0 select-none pointer-events-none">
                            <div className="absolute -top-10 -left-10 text-[18rem] opacity-[0.05]">🌿</div>
                            <div className="absolute -bottom-10 -right-10 text-[14rem] opacity-[0.05]">🍂</div>
                        </div>
                        <div className="relative z-10">
                            <span className="text-green-600 text-xs font-black uppercase tracking-[0.3em] block mb-4">Asesoría personalizada</span>
                            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gray-900">
                                ¿Necesitas ayuda<br />para elegir?
                            </h2>
                            <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
                                Nuestros botánicos te guían para encontrar la planta perfecta según tu espacio, luz disponible y nivel de experiencia.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <a
                                    href="https://wa.me/51928141669?text=Hola,%20necesito%20asesoría%20botánica%20para%20elegir%20una%20planta"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn bg-[#2E7D32] text-white px-12 py-5 text-lg rounded-2xl font-bold hover:bg-[#1B5E20] shadow-lg hover:scale-105 transition-all"
                                >
                                    Hablar con un Botánico 🌱
                                </a>
                                <Link
                                    href="/"
                                    className="btn bg-white text-gray-700 px-12 py-5 text-lg rounded-2xl font-bold hover:bg-gray-50 border border-gray-200 transition-all"
                                >
                                    Volver al Inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
