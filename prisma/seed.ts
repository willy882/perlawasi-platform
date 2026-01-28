import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@perlawasi.com' },
        update: {},
        create: {
            email: 'admin@perlawasi.com',
            name: 'Administrador Perlawasi',
            password: hashedPassword,
            role: 'SUPER_ADMIN',
            phone: '+51928141669',
        },
    })

    console.log('✅ Admin user created:', admin.email)

    // Create categories
    const categories = [
        {
            name: 'Restaurante',
            slug: 'restaurante',
            description: 'Experiencia gastronómica con productos de kilómetro cero',
            color: '#8B4513',
            icon: '🍽️',
            order: 1,
        },
        {
            name: 'Heladería',
            slug: 'heladeria',
            description: 'Helados artesanales con ingredientes orgánicos',
            color: '#FF1744',
            icon: '🍦',
            order: 2,
        },
        {
            name: 'Cafetería',
            slug: 'cafeteria',
            description: 'Café de especialidad y bebidas calientes',
            color: '#4A2C2A',
            icon: '☕',
            order: 3,
        },
        {
            name: 'Chocolates',
            slug: 'chocolates',
            description: 'Chocolatería fina artesanal',
            color: '#3E2723',
            icon: '🍫',
            order: 4,
        },
        {
            name: 'Ropa',
            slug: 'ropa',
            description: 'Boutique con ropa artesanal inspirada en la naturaleza',
            color: '#F5F5DC',
            icon: '👕',
            order: 5,
        },
        {
            name: 'Alojamiento',
            slug: 'alojamiento',
            description: 'Refugio de lujo en el corazón de la naturaleza',
            color: '#2E7D32',
            icon: '🏡',
            order: 6,
        },
        {
            name: 'Cerveza',
            slug: 'cerveza',
            description: 'Cervecería artesanal con sabores únicos',
            color: '#FFB300',
            icon: '🍺',
            order: 7,
        },
        {
            name: 'Plantas',
            slug: 'plantas',
            description: 'Vivero con plantas nativas y decorativas',
            color: '#66BB6A',
            icon: '🌿',
            order: 8,
        },
        {
            name: 'Licorería',
            slug: 'licoreria',
            description: 'Destilados premium del alma de los Andes',
            color: '#1A237E',
            icon: '🥃',
            order: 9,
        },
    ]

    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        })
    }

    console.log('✅ Categories created')

    // Create sample products for each category
    const sampleProducts = [
        // Restaurante
        {
            name: 'Cordero de los Andes',
            slug: 'cordero-de-los-andes',
            description: 'Cordero criado en las montañas, preparado con hierbas locales y vegetales de nuestra huerta orgánica.',
            price: 89.00,
            categorySlug: 'restaurante',
            stock: 20,
            features: ['Kilómetro Cero', 'Orgánico', 'Plato Signature'],
            tags: ['carne', 'plato principal', 'premium'],
        },
        {
            name: 'Trucha del Corazón Verde',
            slug: 'trucha-del-corazon-verde',
            description: 'Trucha fresca de río, servida con quinua andina y salsa de ají amarillo.',
            price: 65.00,
            categorySlug: 'restaurante',
            stock: 30,
            features: ['Pescado Fresco', 'Local', 'Saludable'],
            tags: ['pescado', 'plato principal', 'local'],
        },

        // Heladería
        {
            name: 'Classic Vanilla',
            slug: 'classic-vanilla',
            description: 'Helado de vainilla artesanal con vainilla orgánica de Madagascar.',
            price: 4.50,
            categorySlug: 'heladeria',
            stock: 100,
            features: ['Artesanal', 'Sin Conservantes', 'Cremoso'],
            tags: ['helado', 'vainilla', 'clásico'],
        },
        {
            name: 'Intense Chocolate',
            slug: 'intense-chocolate',
            description: 'Helado de chocolate intenso con cacao peruano al 70%.',
            price: 5.00,
            categorySlug: 'heladeria',
            stock: 100,
            features: ['Cacao Peruano', 'Intenso', 'Premium'],
            tags: ['helado', 'chocolate', 'premium'],
        },
        {
            name: 'Cacao & Coffee',
            slug: 'cacao-coffee',
            description: 'Combinación perfecta de cacao y café de especialidad.',
            price: 5.50,
            categorySlug: 'heladeria',
            stock: 80,
            features: ['Edición Especial', 'Café Orgánico'],
            tags: ['helado', 'café', 'chocolate'],
        },

        // Cafetería
        {
            name: 'Andean Highland Peaks',
            slug: 'andean-highland-peaks',
            description: 'Café de altura cultivado en las montañas andinas, notas de chocolate y caramelo.',
            price: 24.00,
            categorySlug: 'cafeteria',
            stock: 50,
            features: ['Origen Único', 'Tostado Medio', '250g'],
            tags: ['café', 'grano', 'premium'],
        },
        {
            name: 'Midnight Espresso Blend',
            slug: 'midnight-espresso-blend',
            description: 'Mezcla especial para espresso con cuerpo intenso y crema perfecta.',
            price: 27.00,
            categorySlug: 'cafeteria',
            stock: 40,
            features: ['Blend Signature', 'Tostado Oscuro', '250g'],
            tags: ['café', 'espresso', 'intenso'],
        },

        // Chocolates
        {
            name: 'Amazonian Midnight Bar',
            slug: 'amazonian-midnight-bar',
            description: 'Barra de chocolate oscuro al 85% con cacao amazónico.',
            price: 14.00,
            categorySlug: 'chocolates',
            stock: 60,
            features: ['85% Cacao', 'Single Origin', '100g'],
            tags: ['chocolate', 'oscuro', 'premium'],
        },
        {
            name: 'Master Selection Truffles',
            slug: 'master-selection-truffles',
            description: 'Selección de trufas artesanales con rellenos exóticos.',
            price: 32.00,
            categorySlug: 'chocolates',
            stock: 30,
            features: ['Hecho a Mano', '12 Unidades', 'Edición Limitada'],
            tags: ['chocolate', 'trufas', 'lujo'],
        },

        // Ropa
        {
            name: 'Handwoven Poncho',
            slug: 'handwoven-poncho',
            description: 'Poncho tejido a mano con lana de alpaca natural.',
            price: 185.00,
            categorySlug: 'ropa',
            stock: 15,
            features: ['100% Alpaca', 'Tejido a Mano', 'Diseño Tradicional'],
            tags: ['ropa', 'alpaca', 'artesanal'],
        },
        {
            name: 'Organic Cotton T-Shirt',
            slug: 'organic-cotton-tshirt',
            description: 'Camiseta de algodón orgánico con diseños inspirados en la naturaleza.',
            price: 55.00,
            categorySlug: 'ropa',
            stock: 50,
            features: ['Algodón Orgánico', 'Unisex', 'Eco-Friendly'],
            tags: ['ropa', 'camiseta', 'orgánico'],
        },

        // Alojamiento
        {
            name: 'Suite Panorámica',
            slug: 'suite-panoramica',
            description: 'Suite de lujo con vista panorámica a las montañas, jacuzzi privado y terraza.',
            price: 240.00,
            categorySlug: 'alojamiento',
            stock: 3,
            features: ['Vista Panorámica', 'Jacuzzi Privado', 'King Size Bed'],
            tags: ['habitación', 'lujo', 'suite'],
        },
        {
            name: 'Cabaña Rústica',
            slug: 'cabana-rustica',
            description: 'Cabaña acogedora con chimenea y vista al bosque.',
            price: 120.00,
            categorySlug: 'alojamiento',
            stock: 5,
            features: ['Chimenea', 'Vista al Bosque', 'Queen Size Bed'],
            tags: ['habitación', 'cabaña', 'naturaleza'],
        },

        // Cerveza
        {
            name: 'Columbre IPA',
            slug: 'columbre-ipa',
            description: 'IPA con lúpulos americanos y notas cítricas intensas.',
            price: 4.50,
            categorySlug: 'cerveza',
            stock: 200,
            features: ['IPA', '6.5% ABV', '355ml'],
            tags: ['cerveza', 'ipa', 'artesanal'],
        },
        {
            name: 'Noche Stout',
            slug: 'noche-stout',
            description: 'Stout oscura con notas de café y chocolate.',
            price: 5.00,
            categorySlug: 'cerveza',
            stock: 150,
            features: ['Stout', '7.2% ABV', '355ml'],
            tags: ['cerveza', 'stout', 'oscura'],
        },

        // Plantas
        {
            name: 'Monstera Deliciosa',
            slug: 'monstera-deliciosa',
            description: 'Planta tropical de interior con hojas grandes y decorativas.',
            price: 39.00,
            categorySlug: 'plantas',
            stock: 25,
            features: ['Interior', 'Fácil Cuidado', 'Maceta Incluida'],
            tags: ['planta', 'interior', 'tropical'],
        },
        {
            name: 'Echeveria Rosea',
            slug: 'echeveria-rosea',
            description: 'Suculenta con forma de rosa, perfecta para espacios pequeños.',
            price: 12.00,
            categorySlug: 'plantas',
            stock: 60,
            features: ['Suculenta', 'Bajo Mantenimiento', 'Decorativa'],
            tags: ['planta', 'suculenta', 'pequeña'],
        },

        // Licorería
        {
            name: 'Blue Agave Reserva',
            slug: 'blue-agave-reserva',
            description: 'Destilado premium de agave azul, envejecido 8 años en barrica de roble.',
            price: 145.00,
            categorySlug: 'licoreria',
            stock: 20,
            features: ['8 Años', 'Barrica de Roble', '750ml'],
            tags: ['licor', 'premium', 'agave'],
        },
        {
            name: 'Peruvian Infusion',
            slug: 'peruvian-infusion',
            description: 'Macerado de hierbas andinas con pisco acholado.',
            price: 98.00,
            categorySlug: 'licoreria',
            stock: 35,
            features: ['Hierbas Andinas', 'Artesanal', '750ml'],
            tags: ['licor', 'pisco', 'artesanal'],
        },
    ]

    for (const product of sampleProducts) {
        const category = await prisma.category.findUnique({
            where: { slug: product.categorySlug },
        })

        if (category) {
            await prisma.product.upsert({
                where: { slug: product.slug },
                update: {},
                create: {
                    name: product.name,
                    slug: product.slug,
                    description: product.description,
                    price: product.price,
                    categoryId: category.id,
                    stock: product.stock,
                    features: product.features,
                    tags: product.tags,
                    rating: Math.random() * 2 + 3, // Random rating between 3-5
                    reviewCount: Math.floor(Math.random() * 50),
                },
            })
        }
    }

    console.log('✅ Sample products created')
    console.log('🎉 Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
