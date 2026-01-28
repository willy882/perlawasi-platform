import Link from 'next/link'

const categories = [
    {
        name: 'Restaurante',
        slug: 'restaurante',
        icon: '🍽️',
        description: 'Experiencia gastronómica con productos de kilómetro cero',
        color: 'from-restaurant to-restaurant-dark',
        image: '🥘',
    },
    {
        name: 'Heladería',
        slug: 'heladeria',
        icon: '🍦',
        description: 'Helados artesanales con ingredientes orgánicos',
        color: 'from-icecream to-icecream-dark',
        image: '🍨',
    },
    {
        name: 'Cafetería',
        slug: 'cafeteria',
        icon: '☕',
        description: 'Café de especialidad y bebidas calientes',
        color: 'from-cafe to-cafe-dark',
        image: '☕',
    },
    {
        name: 'Chocolates',
        slug: 'chocolates',
        icon: '🍫',
        description: 'Chocolatería fina artesanal',
        color: 'from-chocolate to-chocolate-dark',
        image: '🍫',
    },
    {
        name: 'Ropa',
        slug: 'ropa',
        icon: '👕',
        description: 'Boutique con ropa artesanal inspirada en la naturaleza',
        color: 'from-boutique-dark to-boutique',
        image: '👔',
    },
    {
        name: 'Alojamiento',
        slug: 'alojamiento',
        icon: '🏡',
        description: 'Refugio de lujo en el corazón de la naturaleza',
        color: 'from-lodging to-lodging-dark',
        image: '🏔️',
    },
    {
        name: 'Cerveza',
        slug: 'cerveza',
        icon: '🍺',
        description: 'Cervecería artesanal con sabores únicos',
        color: 'from-beer to-beer-dark',
        image: '🍻',
    },
    {
        name: 'Plantas',
        slug: 'plantas',
        icon: '🌿',
        description: 'Vivero con plantas nativas y decorativas',
        color: 'from-plants to-plants-dark',
        image: '🪴',
    },
    {
        name: 'Licorería',
        slug: 'licoreria',
        icon: '🥃',
        description: 'Destilados premium del alma de los Andes',
        color: 'from-liquor to-liquor-dark',
        image: '🍷',
    },
]

export default function CategoryShowcase() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
                <Link
                    key={category.slug}
                    href={`/${category.slug}`}
                    className="group card card-hover overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div className={`h-48 bg-gradient-to-br ${category.color} flex items-center justify-center text-8xl transition-transform duration-300 group-hover:scale-110`}>
                        {category.image}
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">{category.icon}</span>
                            <h3 className="text-xl font-display font-bold text-gray-900">
                                {category.name}
                            </h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                            {category.description}
                        </p>
                        <div className="flex items-center text-primary-500 font-medium text-sm group-hover:gap-2 transition-all">
                            Explorar
                            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
