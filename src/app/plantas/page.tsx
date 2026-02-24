'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Category = 'interior' | 'exterior' | 'suculentas' | 'aromaticas'

interface Plant {
    id: string; name: string; scientific: string; price: number; emoji: string
    bg: string; accent: string; difficulty: string; light: string; water: string
    env: string; petFriendly: boolean; category: Category
    info: string; care: string; tags: string[]
}

const CATS = [
    { id: 'interior' as Category, label: 'Interior', icon: '🪴', desc: 'Para hogar y oficina' },
    { id: 'exterior' as Category, label: 'Exterior', icon: '🌳', desc: 'Jardines y terrazas' },
    { id: 'suculentas' as Category, label: 'Suculentas', icon: '🌵', desc: 'Bajo mantenimiento' },
    { id: 'aromaticas' as Category, label: 'Aromáticas', icon: '🌿', desc: 'Hierbas y medicinales' },
]

const ALL_PLANTS: Plant[] = [
    // INTERIOR
    { id: 'monstera', name: 'Monstera Deliciosa', scientific: 'Monstera deliciosa', price: 45, emoji: '🌿', bg: '#E8F5E9', accent: '#2E7D32', difficulty: 'Fácil', light: 'Luz indirecta', water: 'Cada 7-10 días', env: 'Interior', petFriendly: false, category: 'interior', info: 'La Monstera es la reina de las plantas de interior. Sus hojas perforadas y su porte monumental la convierten en el centro de atención de cualquier espacio. Originaria de los bosques tropicales de Centroamérica, crece rápido y es muy agradecida cuando la cuidas bien.', care: 'Riegue solo cuando los 2-3 cm superiores estén secos. Luz brillante indirecta. Fertilice mensualmente en primavera y verano. Limpie las hojas con trapo húmedo para potenciar la fotosíntesis.', tags: ['Tropical', 'Tendencia', 'Gran tamaño'] },
    { id: 'snake', name: 'Lengua de Suegra', scientific: 'Sansevieria trifasciata', price: 35, emoji: '🪴', bg: '#F1F8E9', accent: '#558B2F', difficulty: 'Muy Fácil', light: 'Cualquier luz', water: 'Cada 14-21 días', env: 'Interior', petFriendly: false, category: 'interior', info: 'La planta perfecta para principiantes. Sus hojas erguidas con patrones plateados le dan una elegancia vertical única. Purifica el aire y sobrevive en condiciones que matan a cualquier otra planta. Ideal para oficinas, dormitorios y baños.', care: 'Riegue muy poco: tolera perfectamente el olvido. En invierno puede pasar un mes sin agua. Usa sustrato bien drenado. Soporta de 10 a 35°C. Evita que el agua se acumule en el centro de las hojas.', tags: ['Purifica el aire', 'Poca luz', 'Principiantes'] },
    { id: 'orquidea', name: 'Orquídea Amazónica', scientific: 'Phalaenopsis amabilis', price: 75, emoji: '🌸', bg: '#FCE4EC', accent: '#C2185B', difficulty: 'Medio', light: 'Luz brillante indirecta', water: 'Cada 7 días', env: 'Interior', petFriendly: true, category: 'interior', info: 'La Phalaenopsis es la joya de los bosques amazónicos. Sus flores duran 2-3 meses en cascadas de pétalos que van del blanco puro al magenta intenso. Cultivada en nuestro vivero con técnicas especializadas.', care: 'Sumerge la maceta en agua 10 min semanalmente y deja escurrir. Luz brillante nunca directa. Fertiliza cada 2 semanas con abono específico para orquídeas. Tras la floración, corta el tallo sobre el segundo nudo.', tags: ['Premium', 'Florece meses', 'Pet safe'] },
    { id: 'ficus', name: 'Ficus Lyrata', scientific: 'Ficus lyrata', price: 120, emoji: '🌳', bg: '#E0F2F1', accent: '#00695C', difficulty: 'Medio', light: 'Luz brillante indirecta', water: 'Cada 5-7 días', env: 'Interior', petFriendly: false, category: 'interior', info: 'El favorito de los diseñadores de interiores. Sus enormes hojas en forma de violín pueden alcanzar 2 metros de altura, convirtiéndose en un elemento arquitectónico vivo. La planta más fotografiada en redes sociales.', care: 'Humedad constante sin encharcamiento. Evita cambios bruscos de ubicación ya que pierde hojas. Limpie las hojas semanalmente. Alejada de corrientes de aire y calefactores.', tags: ['Árbol interior', 'Diseño', 'Gran formato'] },
    // EXTERIOR
    { id: 'palmera', name: 'Palmera Real', scientific: 'Roystonea regia', price: 180, emoji: '🌴', bg: '#E0F7FA', accent: '#006064', difficulty: 'Fácil', light: 'Sol pleno', water: 'Cada 3-5 días', env: 'Exterior', petFriendly: true, category: 'exterior', info: 'La Palmera Real es el símbolo del trópico amazónico. Con un tronco plateado y una copa espectacular, puede alcanzar más de 20 metros. Perfecta para jardines amplios donde quieras crear un ambiente caribeño auténtico.', care: 'Necesita sol pleno al menos 6 horas al día. Riego abundante en verano, reduciendo en invierno. Suelo bien drenado. Fertiliza 3 veces al año con abono rico en potasio para fortalecer el tronco.', tags: ['Gran jardín', 'Sol pleno', 'Tropical'] },
    { id: 'bambu', name: 'Bambú Lucky', scientific: 'Dracaena sanderiana', price: 55, emoji: '🎋', bg: '#F1F8E9', accent: '#33691E', difficulty: 'Fácil', light: 'Sol / sombra parcial', water: 'Cada 5 días', env: 'Exterior / Interior', petFriendly: false, category: 'exterior', info: 'El Bambú Lucky crece con asombrosa velocidad, creando cortinas verdes naturales perfectas para dar privacidad a terrazas y jardines. Su estructura vertical y elegante añade movimiento y frescura a los espacios.', care: 'Muy versátil: tolera sol y sombra. Riego moderado y regular. Fertiliza en primavera y verano. Puede plantarse en maceta grande o directamente en tierra. Controla su expansión con barreras si lo plantas libre.', tags: ['Crece rápido', 'Privacidad', 'Versátil'] },
    { id: 'hibiscus', name: 'Hibiscus Tropical', scientific: 'Hibiscus rosa-sinensis', price: 40, emoji: '🌺', bg: '#FBE9E7', accent: '#BF360C', difficulty: 'Fácil', light: 'Sol pleno', water: 'Cada 2-3 días', env: 'Exterior', petFriendly: false, category: 'exterior', info: 'El Hibiscus es el rey de las flores tropicales. Sus enormes flores de hasta 15 cm en rojos, naranjas y amarillos vibrantes florecen prácticamente durante todo el año en el clima amazónico. Un espectáculo de color para tu jardin.', care: 'Necesita mucho sol. Riego frecuente sin encharcamiento. Poda ligera después de cada floración para estimular nuevas ramas y flores. Fertiliza cada 2 semanas durante la temporada de floración con abono rico en fósforo.', tags: ['Florece todo el año', 'Color tropical', 'Externa'] },
    // SUCULENTAS
    { id: 'aloe', name: 'Aloe Vera', scientific: 'Aloe barbadensis', price: 25, emoji: '🌵', bg: '#F9FBE7', accent: '#827717', difficulty: 'Muy Fácil', light: 'Sol / luz brillante', water: 'Cada 14-21 días', env: 'Interior / Exterior', petFriendly: false, category: 'suculentas', info: 'El Aloe Vera es la farmacia natural de tu hogar. Su gel interior tiene propiedades antisépticas, hidratantes y cicatrizantes únicas. Además es una planta absolutamente indestructible, perfecta para espacios soleados con olvido ocasional.', care: 'Riegue muy poco - es una suculenta resistente a la sequía. Sustrato específico para cactus y suculentas con buen drenaje. Mucho sol o luz muy brillante. En verano puede estar en el exterior. Evita completamente el encharcamiento.', tags: ['Medicinal', 'Muy resistente', 'UV-free'] },
    { id: 'cactus-san-pedro', name: 'Cactus San Pedro', scientific: 'Echinopsis pachanoi', price: 30, emoji: '🌵', bg: '#F0F4C3', accent: '#9E9D24', difficulty: 'Muy Fácil', light: 'Sol pleno', water: 'Cada 21-30 días', env: 'Interior / Exterior', petFriendly: false, category: 'suculentas', info: 'El Cactus San Pedro es nativo de los Andes peruanos y uno de los cactus más majestuosos. De crecimiento vertical con costillas pronunciadas, puede alcanzar varios metros. Una pieza escultórica viviente que requiere mínimo mantenimiento.', care: 'Muy poca agua - es uno de los cactus más resistentes. Sustrato poroso con excelente drenaje. Mucho sol directo. En invierno reduce el riego casi a cero. Trasplanta solo cuando las raíces sobresalen del contenedor.', tags: ['Nativo Andino', 'Escultural', 'Mínimo cuidado'] },
    { id: 'echeveria', name: 'Echeveria Roseta', scientific: 'Echeveria elegans', price: 18, emoji: '🌸', bg: '#FCE4EC', accent: '#880E4F', difficulty: 'Fácil', light: 'Luz brillante', water: 'Cada 10-14 días', env: 'Interior / Exterior', petFriendly: true, category: 'suculentas', info: 'Las Echeverias son las joyas del mundo de las suculentas. Sus rosetas perfectas de hojas gruesas y carnosas en colores que van del verde azulado al rosa magenta las convierten en las más fotografiadas. Perfectas para centros de mesa y minijardines.', care: 'Luz brillante es esencial para mantener el color. Riego escaso en sustrato con drenaje perfecto. Nunca mojes las hojas ya que genera pudrición. Reproduce fácilmente por hojas. Tolera temperaturas de 5 a 40°C.', tags: ['Decorativa', 'Fácil propagar', 'Pet safe'] },
    // AROMÁTICAS
    { id: 'menta', name: 'Menta Fresca', scientific: 'Mentha spicata', price: 15, emoji: '🌿', bg: '#E8F5E9', accent: '#1B5E20', difficulty: 'Fácil', light: 'Sol / sombra parcial', water: 'Cada 2-3 días', env: 'Interior / Exterior', petFriendly: true, category: 'aromaticas', info: 'La Menta es la hierba más versátil de la cocina y la salud natural. Ideal para infusiones, cócteles, ensaladas y postres. Crece con vigor y rapidez. Su aroma fresco y vigorizante también aleja insectos naturalmente.', care: 'Necesita riego frecuente - no tolera bien la sequía. Sustrato húmedo bien drenado. Puede crecer en poca luz pero prefiere sol matutino. Poda frecuente para estimular el crecimiento y evitar que florezca prematuramente.', tags: ['Comestible', 'Ahuyenta insectos', 'Crecimiento rápido'] },
    { id: 'lavanda', name: 'Lavanda Peruana', scientific: 'Lavandula angustifolia', price: 22, emoji: '💜', bg: '#EDE7F6', accent: '#4527A0', difficulty: 'Medio', light: 'Sol pleno', water: 'Cada 7-10 días', env: 'Exterior / Interior', petFriendly: true, category: 'aromaticas', info: 'La Lavanda es sinónimo de calma y bienestar. Sus espigas de flores violeta perfuman el jardín y el hogar con un aroma relajante incomparable. Perfecta para bordes de jardín, macetas en terraza o como planta aromática de interior luminoso.', care: 'Necesita mucho sol directo al menos 6 horas. Suelo bien drenado, casi seco. Muy resistente a la sequía una vez establecida. Poda tras la floración para mantener forma compacta. El exceso de agua es su principal enemigo.', tags: ['Relajante', 'Repelente natural', 'Pet safe'] },
    { id: 'albahaca', name: 'Albahaca Genovesa', scientific: 'Ocimum basilicum', price: 12, emoji: '🌱', bg: '#F1F8E9', accent: '#2E7D32', difficulty: 'Fácil', light: 'Sol / luz brillante', water: 'Cada 1-2 días', env: 'Interior / Exterior', petFriendly: true, category: 'aromaticas', info: 'La Albahaca es el alma de la cocina mediterránea y amazónica. Indispensable para salsas, ensaladas y tés. Crece rápido junto a una ventana soleada o en terraza. Cada planta produce hojas durante meses y meses con mínimo esfuerzo.', care: 'Riego frecuente pero sin encharcamiento. Mucha luz solar directa o muy brillante. Pinca las flores apenas aparezcan para prolongar la producción de hojas. Cosecha regularmente tomando las hojas desde arriba para estimular el crecimiento lateral.', tags: ['Culinaria', 'Rápida cosecha', 'Pet safe'] },
]

// Iconos SVG
const SunIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><circle cx="12" cy="12" r="4" /><path strokeLinecap="round" d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
const WaterIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.25 6-7.5 9.75-7.5 12.75a7.5 7.5 0 0015 0c0-3-2.25-6.75-7.5-12.75z" /></svg>
const HomeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.5 1.5 0 012.092 0L22.25 12M4.5 9.75V19.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V15a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v4.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V9.75" /></svg>

export default function PlantasPage() {
    const [activeCategory, setActiveCategory] = useState<Category>('interior')
    const [selectedPlant, setSelectedPlant] = useState<Plant>(ALL_PLANTS[0])
    const [activeTab, setActiveTab] = useState<'info' | 'care'>('info')
    const [qty, setQty] = useState(1)
    const [added, setAdded] = useState(false)

    const filtered = ALL_PLANTS.filter(p => p.category === activeCategory)

    const handleCategory = (cat: Category) => {
        setActiveCategory(cat)
        const first = ALL_PLANTS.find(p => p.category === cat)
        if (first) { setSelectedPlant(first); setQty(1); setAdded(false) }
    }

    const handleSelect = (plant: Plant) => {
        setSelectedPlant(plant); setQty(1); setAdded(false); setActiveTab('info')
    }

    const handleAdd = () => { setAdded(true); setTimeout(() => setAdded(false), 2000) }

    return (
        <div className="min-h-screen bg-[#FBFDFB] text-gray-900">

            {/* HERO */}
            <section className="relative h-[65vh] flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg,#E8F5E9,#F1F8E9 50%,#E0F2F1)' }}>
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                    <div className="absolute -top-10 -right-10 text-[30rem] opacity-[0.06] rotate-12">🌿</div>
                    <div className="absolute -bottom-20 left-0 text-[18rem] opacity-[0.04] -rotate-6">🌸</div>
                </div>
                <div className="relative z-10 container-custom w-full">
                    <div className="max-w-2xl px-4">
                        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-green-200 px-4 py-2 rounded-full mb-6">
                            <span className="text-green-700 text-xs font-black uppercase tracking-widest font-bold">🌱 Vivero Perlawasi</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-[1.05] text-gray-900">
                            Verdor<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] to-[#66BB6A]">Interior</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                            Plantas nativas y exóticas de la Amazonía Peruana. Cultivadas con amor en San Martín.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <a href="#vivero" className="btn bg-[#2E7D32] text-white px-10 py-4 text-base font-bold rounded-2xl hover:bg-[#1B5E20] shadow-lg transition-all hover:scale-105">
                                Explorar Vivero →
                            </a>
                            <a href="#cuidados" className="btn bg-white/70 backdrop-blur-sm text-[#2E7D32] border border-green-200 px-10 py-4 text-base font-bold rounded-2xl hover:bg-white transition-all">
                                Guía de Cuidados
                            </a>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 right-8 hidden lg:flex gap-5">
                    {[{ v: '+80', l: 'Especies' }, { v: '100%', l: 'Orgánico' }, { v: '5★', l: 'Calidad' }].map((s, i) => (
                        <div key={i} className="bg-white/70 backdrop-blur-md rounded-2xl px-5 py-3 text-center border border-white shadow-sm">
                            <p className="text-2xl font-black text-[#2E7D32]">{s.v}</p>
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">{s.l}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* SHOP SECTION */}
            <section id="vivero" className="py-20 bg-white">
                <div className="container-custom">
                    {/* Header + Tabs de categoría */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                        <div>
                            <span className="text-green-600 text-xs font-black uppercase tracking-[0.3em] block mb-2">Selección Curada</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold">Nuestras Plantas</h2>
                        </div>
                        {/* CATEGORÍAS — clickeables y funcionales */}
                        <div className="flex flex-wrap gap-2">
                            {CATS.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => handleCategory(cat.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border ${activeCategory === cat.id
                                        ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-lg scale-105'
                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-green-50 hover:border-green-300 hover:text-green-700'
                                        }`}
                                >
                                    <span className="text-lg">{cat.icon}</span>
                                    <span>{cat.label}</span>
                                    <span className={`text-xs rounded-full px-2 py-0.5 font-black ${activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                        {ALL_PLANTS.filter(p => p.category === cat.id).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Layout: listado + visor */}
                    <div className="grid lg:grid-cols-12 gap-6 items-start">

                        {/* Lista de plantas filtradas */}
                        <div className="lg:col-span-3">
                            <div className="bg-gray-50 rounded-3xl p-3 border border-gray-100 sticky top-24">
                                <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3 px-2">
                                    {filtered.length} planta{filtered.length !== 1 ? 's' : ''} · {CATS.find(c => c.id === activeCategory)?.label}
                                </p>
                                <div className="flex flex-col gap-1.5">
                                    {filtered.map(plant => (
                                        <button
                                            key={plant.id}
                                            onClick={() => handleSelect(plant)}
                                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all duration-200 text-left border ${selectedPlant.id === plant.id
                                                ? 'border-current shadow-sm'
                                                : 'border-transparent hover:bg-white hover:shadow-sm'
                                                }`}
                                            style={selectedPlant.id === plant.id ? { backgroundColor: plant.bg, borderColor: `${plant.accent}44` } : {}}
                                        >
                                            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 bg-white shadow-sm">
                                                {plant.emoji}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate" style={selectedPlant.id === plant.id ? { color: plant.accent } : { color: '#374151' }}>
                                                    {plant.name}
                                                </p>
                                                <p className="text-xs text-gray-400 italic truncate">{plant.scientific}</p>
                                            </div>
                                            <span className="text-sm font-black shrink-0" style={{ color: plant.accent }}>S/{plant.price}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Visor principal */}
                        <div className="lg:col-span-9">
                            <div className="rounded-[2.5rem] overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.10)] bg-white border border-gray-100">
                                <div className="grid md:grid-cols-12">

                                    {/* Imagen */}
                                    <div className="md:col-span-5 relative flex items-center justify-center p-10 md:p-16 min-h-[320px] transition-colors duration-700" style={{ backgroundColor: selectedPlant.bg }}>
                                        {/* Badges */}
                                        <div className={`absolute top-5 left-5 px-3 py-1 rounded-full text-xs font-bold ${selectedPlant.difficulty === 'Muy Fácil' ? 'bg-emerald-100 text-emerald-700' :
                                            selectedPlant.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                                                selectedPlant.difficulty === 'Medio' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                                            }`}>{selectedPlant.difficulty}</div>
                                        {selectedPlant.petFriendly && (
                                            <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-green-700 border border-green-200">🐾 Pet Safe</div>
                                        )}
                                        {/* Emoji planta */}
                                        <div className="text-[10rem] md:text-[12rem] leading-none select-none transition-all duration-500"
                                            style={{ filter: `drop-shadow(0 16px 32px ${selectedPlant.accent}44)` }}>
                                            {selectedPlant.emoji}
                                        </div>
                                        {/* Sombra */}
                                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full blur-xl opacity-25"
                                            style={{ backgroundColor: selectedPlant.accent }} />
                                    </div>

                                    {/* Info */}
                                    <div className="md:col-span-7 p-8 flex flex-col gap-5">
                                        {/* Nombre */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-2xl md:text-3xl font-display font-bold leading-tight">{selectedPlant.name}</h2>
                                                <p className="text-sm italic text-gray-400 mt-1">{selectedPlant.scientific}</p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="text-3xl font-black" style={{ color: selectedPlant.accent }}>S/ {selectedPlant.price}</p>
                                                <p className="text-xs text-gray-400">Por planta</p>
                                            </div>
                                        </div>

                                        {/* Badges de cuidado */}
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { icon: <SunIcon />, label: 'Luz', value: selectedPlant.light },
                                                { icon: <WaterIcon />, label: 'Riego', value: selectedPlant.water },
                                                { icon: <HomeIcon />, label: 'Ambiente', value: selectedPlant.env },
                                            ].map((b, i) => (
                                                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-100 bg-gray-50">
                                                    <span style={{ color: selectedPlant.accent }}>{b.icon}</span>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{b.label}</p>
                                                        <p className="text-xs font-semibold text-gray-700">{b.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="border-t border-gray-100" />

                                        {/* Tabs */}
                                        <div>
                                            <div className="flex gap-0 border-b border-gray-100 mb-4">
                                                {([['info', 'Información'], ['care', 'Cuidados']] as const).map(([tab, label]) => (
                                                    <button key={tab} onClick={() => setActiveTab(tab)}
                                                        className={`px-5 py-2.5 text-sm font-bold border-b-2 -mb-px transition-all ${activeTab === tab ? 'border-current' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                                                        style={activeTab === tab ? { color: selectedPlant.accent, borderColor: selectedPlant.accent } : {}}>
                                                        {label}
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                                                {activeTab === 'info' ? selectedPlant.info : selectedPlant.care}
                                            </p>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPlant.tags.map((tag, i) => (
                                                <span key={i} className="text-xs font-bold px-3 py-1 rounded-full"
                                                    style={{ backgroundColor: `${selectedPlant.accent}15`, color: selectedPlant.accent }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Cantidad + Carrito */}
                                        <div className="flex items-center gap-3 mt-auto pt-2">
                                            <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden">
                                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-lg">−</button>
                                                <span className="w-8 text-center text-sm font-bold">{qty}</span>
                                                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold text-lg">+</button>
                                            </div>
                                            <button onClick={handleAdd}
                                                className="flex-1 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest text-white transition-all duration-400"
                                                style={{ backgroundColor: added ? '#22c55e' : selectedPlant.accent, boxShadow: `0 4px 20px ${selectedPlant.accent}44` }}>
                                                {added ? '✓ ¡Agregado!' : `Añadir · S/ ${selectedPlant.price * qty}`}
                                            </button>
                                            <a href={`https://wa.me/51928141669?text=Hola,%20quiero%20${encodeURIComponent(selectedPlant.name)}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="w-10 h-10 flex items-center justify-center rounded-2xl border border-gray-200 hover:border-green-400 text-green-500 hover:bg-green-50 transition-all shrink-0">
                                                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* FEATURE CARDS — glassmorphism */}
            <section id="cuidados" className="py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg,#1B5E20,#004D40 60%,#006064)' }}>
                <div className="container-custom">
                    <div className="text-center mb-14">
                        <span className="text-green-300 text-xs font-black uppercase tracking-[0.3em] mb-3 block">Aprende con nosotros</span>
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white">Secretos del <span className="text-green-300">Vivero</span></h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: '☀️', title: 'Luz perfecta', sub: 'El secreto del crecimiento', text: 'La mayoría de plantas de interior prosperan en luz brillante indirecta a 1-2 metros de una ventana. La luz directa quema; la oscuridad detiene el crecimiento.' },
                            { icon: '💧', title: 'El riego ideal', sub: 'El error más común', text: 'Introduce el dedo 2-3 cm en el sustrato: si está húmedo, espera. El riego profundo e infrecuente es siempre mejor que el superficial diario.' },
                            { icon: '🧪', title: 'Nutrición natural', sub: 'Fertilización consciente', text: 'En Perlawasi usamos compost artesanal y abonos naturales locales. Fertiliza solo en primavera y verano; en otoño e invierno las plantas descansan.' },
                        ].map((c, i) => (
                            <div key={i} className="relative rounded-3xl border border-white/10 backdrop-blur-sm p-8 hover:scale-[1.02] transition-all duration-500 hover:border-white/20 overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}>
                                <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                                    <span className="text-[10px] text-green-300 font-bold uppercase tracking-widest">Consejo Experto</span>
                                </div>
                                <div className="text-4xl mb-3">{c.icon}</div>
                                <h3 className="text-xl font-display font-bold text-white mb-1">{c.title}</h3>
                                <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-4">{c.sub}</p>
                                <div className="border-t border-white/10 mb-4" />
                                <p className="text-white/70 text-sm leading-relaxed">{c.text}</p>
                                <div className="absolute bottom-0 right-0 text-[7rem] opacity-[0.04] leading-none select-none">{c.icon}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#FBFDFB]">
                <div className="container-custom">
                    <div className="rounded-[3rem] p-12 md:p-16 relative overflow-hidden text-center" style={{ background: 'linear-gradient(135deg,#E8F5E9,#E0F7FA)' }}>
                        <div className="absolute inset-0 pointer-events-none select-none">
                            <div className="absolute -top-10 -left-10 text-[16rem] opacity-[0.05]">🌿</div>
                            <div className="absolute -bottom-10 -right-10 text-[12rem] opacity-[0.05]">🌸</div>
                        </div>
                        <div className="relative z-10">
                            <span className="text-green-600 text-xs font-black uppercase tracking-[0.3em] block mb-4">Asesoría personalizada</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-5">¿Necesitas ayuda para elegir?</h2>
                            <p className="text-gray-600 text-lg mb-10 max-w-lg mx-auto">Nuestros botánicos te guían para encontrar la planta perfecta según tu espacio y experiencia.</p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <a href="https://wa.me/51928141669?text=Hola,%20necesito%20asesoría%20botánica" target="_blank" rel="noopener noreferrer"
                                    className="btn bg-[#2E7D32] text-white px-10 py-4 text-base rounded-2xl font-bold hover:bg-[#1B5E20] shadow-lg hover:scale-105 transition-all">
                                    Hablar con un Botánico 🌱
                                </a>
                                <Link href="/" className="btn bg-white text-gray-700 px-10 py-4 text-base rounded-2xl font-bold border border-gray-200 hover:bg-gray-50 transition-all">
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
