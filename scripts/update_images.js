const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://cplpfmivjhivgipjyacz.supabase.co';
const supabaseAnonKey = 'sb_publishable_twcjAj9K955E9531hIwobw_j1qIrQDv';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const updates = [
    { name: 'JUANE DE GALLINA', image: '/images/carta/avispa juanes.png' },
    { name: 'TACACHO CON CECINA', image: '/images/carta/tacacho con chorizo y cecina.png' },
    { name: 'JUANE SELVÁTICO', image: '/images/carta/juane selvatico.jpg' },
    { name: 'PATACONES RELLENOS', image: '/images/carta/Patacon relleno.jpg' },
    { name: 'CALDO DE GALLINA', image: '/images/carta/caldo.png' },
    { name: 'SOPA DIETA', image: '/images/private_only/sopa fdieta.png' }, // Adjusted from list
    { name: 'MILANESA DE POLLO', image: '/images/carta/milanesa de pollo.png' },
    { name: 'POLLO FRITO/PLANCHA/PARRILLA', image: '/images/carta/pollo frita.png' },
    { name: 'TILAPIA FRITA/PARRILLA/PLANCHA', image: '/images/carta/tilapia frita.png' },
    { name: 'TRUCHA FRITA/PARRILLA/PLANCHA', image: '/images/carta/Trucha Frita.jpg' },
    { name: 'PAICHE A LA PARRILLA', image: '/images/carta/paiche parrilla.png' },
    { name: 'MAJADO EXÓTICO', image: '/images/carta/Majado Exotico.jpg' },
    { name: 'CREPS VEGETARIANO', image: '/images/carta/Creps Vegetariano.jpg' },
    { name: 'ARROZ', image: '/images/carta/porcion arroz.png' },
    { name: 'PAPA SANCOCHADA / FRITA', image: '/images/carta/porcion papa frita.png' },
    { name: 'PATACONES', image: '/images/carta/porcion patacones.png' },
    { name: 'TACACHO', image: '/images/carta/porcion tacacho.png' },
    { name: 'YUCA SANCOCHADA / FRITA', image: '/images/carta/yuca frita.png' },
    { name: 'PLATANO FRITO', image: '/images/carta/maduro frito.png' },
    { name: 'ZARZA CRIOLLA', image: '/images/carta/porcion cebolla.png' },
    { name: 'COCONA', image: '/images/carta/refresco cocona.png' },
    { name: 'CEBADA', image: '/images/carta/refresco cebada.png' },
    { name: 'MARACUYA', image: '/images/carta/maracuyá.png' },
    { name: 'CARAMBOLA', image: '/images/carta/refresco carambola.png' },
    { name: 'CAFÉ A LA OLLA', image: '/images/carta/café de olla.png' },
    { name: 'CAFÉ CON LECHE', image: '/images/carta/café con leche.png' },
    { name: 'TÉ / INFUSIONES', image: '/images/carta/té de hierba luisa.png' },
    { name: 'LA BUCHIZAPA (3 Pers)', image: '/images/carta/buchizapa.jpg' },
    { name: 'PAICHE EN SALSA AMAZÓNICA', image: '/images/carta/paiche-salsa-amazonica.jpg' },
    { name: 'RONDA AMAZÓNICA (2 Pers)', image: '/images/carta/ronda-amazonica.jpg' },
    { name: 'TRIO DE CEVICHE SELVÁTICO', image: '/images/carta/trio-ceviche-selvatico.jpg' },
    { name: 'CEVICHE DE PAICHE', image: '/images/carta/ceviche-paiche.jpg' },
    { name: 'CHANCHO A LA CAJA CHINA', image: '/images/carta/caja-china.jpg' },
];

async function run() {
    console.log('--- ACTUALIZANDO IMÁGENES DEL MENÚ ---');
    for (const item of updates) {
        // First find if the dish exists to be sure
        const { data: dishes } = await supabase.from('restaurante_menu').select('id').eq('name', item.name);

        if (dishes && dishes.length > 0) {
            const { error } = await supabase
                .from('restaurante_menu')
                .update({ image_url: item.image })
                .eq('name', item.name);

            if (error) {
                console.error(`Error actualizando ${item.name}:`, error.message);
            } else {
                console.log(`✅ ${item.name} actualizado`);
            }
        } else {
            console.log(`⚠️ ${item.name} no encontrado en la tabla`);
        }
    }
    console.log('--- PROCESO FINALIZADO ---');
}

run().catch(console.error);
