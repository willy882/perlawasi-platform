import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

const dishes = [
    // PLATOS TÍPICOS
    { name: 'CHAUFA REGIONAL', category: 'Platos Típicos', price: 25.00, description: 'Arroz chaufa elaborado con cecina y chorizo servido con plátano frito.' },
    { name: 'TACACHO CON CECINA', category: 'Platos Típicos', price: 25.00, description: 'Tacacho con cecina + patacones + plátano frito + zarza de cebolla.' },
    { name: 'JUANE SELVÁTICO', category: 'Platos Típicos', price: 25.00, description: 'Tacacho + juane selvático + zarza de cebolla.' },
    { name: 'PATACONES RELLENOS', category: 'Platos Típicos', price: 25.00, description: 'Patacón relleno con ceviche de cecina regional.' },
    { name: 'CHICHARRON DE CERDO', category: 'Platos Típicos', price: 30.00, description: 'Chicharrón de cerdo + Tacacho + patacones + plátano frito + zarza de cebolla.' },

    // PESCADOS
    { name: 'SUDADO DE TILAPIA', category: 'Pescados', price: 30.00, description: 'Arroz + sudado de tilapia + patacones.' },
    { name: 'PATARASHCA DE TILAPIA', category: 'Pescados', price: 30.00, description: 'Arroz + patarashca de tilapia + patacones + maduro frito.' },
    { name: 'TILAPIA FRITA/PARRILLA/PLANCHA', category: 'Pescados', price: 30.00, description: 'Arroz + patacones + tilapia + zarza de cebolla.' },
    { name: 'TRUCHA FRITA/PARRILLA/PLANCHA', category: 'Pescados', price: 35.00, description: 'Arroz + patacones + trucha + zarza de cebolla.' },
    { name: 'SUDADO DE TRUCHA', category: 'Pescados', price: 35.00, description: 'Arroz + sudado de trucha + patacones.' },
    { name: 'PATARASHCA DE TRUCHA', category: 'Pescados', price: 35.00, description: 'Arroz + patarashca de trucha + patacones + maduro frito.' },

    // POLLOS
    { name: 'POLLO FRITO/PLANCHA/PARRILLA', category: 'Pollos', price: 22.00, description: 'Pollo + plátano frito + papa frita + ensalada.' },
    { name: 'CHICHARRON DE POLLO', category: 'Pollos', price: 22.00, description: 'Chicharrón de pollo + plátano frito + papa frita + ensalada.' },
    { name: 'MILANESA DE POLLO', category: 'Pollos', price: 22.00, description: 'Pollo + plátano frito + papa frita + ensalada.' },

    // PAICHES
    { name: 'PAICHE EN SALSA AMAZÓNICA', category: 'Paiches', price: 45.00, description: 'Preparado a la parrilla, mariscos en salsa de huacatay + yuca frita.' },
    { name: 'PAICHE A LA PARRILLA', category: 'Paiches', price: 40.00, description: 'Arroz + paiche a la parrilla + patacones + yuca frita + zarza de cebolla.' },
    { name: 'PAICHE A LA PLANCHA', category: 'Paiches', price: 40.00, description: 'Arroz + paiche a la plancha + patacones + yuca frita + zarza de cebolla.' },
    { name: 'PATARASHCA DE PAICHE', category: 'Paiches', price: 40.00, description: 'Arroz + patarashca de paiche + patacón + plátano frito.' },
    { name: 'CHICHARRON DE PAICHE', category: 'Paiches', price: 40.00, description: 'Arroz + chicharrón de paiche + patacón + plátano frito.' },

    // CEVICHES
    { name: 'CEVICHE DE TOYO', category: 'Ceviches', price: 30.00, description: 'Refrescante ceviche de toyo.' },
    { name: 'CEVICHE MIXTO', category: 'Ceviches', price: 40.00, description: 'Ceviche con variedad de pescados y mariscos.' },
    { name: 'CEVICHE DE PAICHE', category: 'Ceviches', price: 40.00, description: 'Ceviche premium de paiche amazónico.' },
    { name: 'TRIO DE CEVICHE SELVÁTICO', category: 'Ceviches', price: 65.00, description: 'Toyo + Paiche + Cecina.' },

    // CERDO
    { name: 'CHANCHO A LA CAJA CHINA', category: 'Cerdo', price: 30.00, description: 'Cerdo crocante preparado en caja china.' },
    { name: 'COSTILLAS EN SALSA BBQ', category: 'Cerdo', price: 28.00, description: 'Costillas de cerdo bañadas en salsa BBQ.' },
    { name: 'CHORIZO CON TACACHO', category: 'Cerdo', price: 25.00, description: 'Chorizo regional acompañado de tacacho.' },
    { name: 'MIXTO (Cecina + chorizo)', category: 'Cerdo', price: 30.00, description: 'Cecina y chorizo regional.' },
    { name: 'COSTILLA AHUMADA EN SALSA DE COCONA', category: 'Cerdo', price: 30.00, description: 'Costilla con el toque cítrico de la cocona.' },
    { name: 'CHULETA FRITA/PLANCHA/PARRILLA', category: 'Cerdo', price: 25.00, description: 'Chuleta de cerdo preparada al gusto.' },

    // ESPECIALES
    { name: 'RONDA AMAZÓNICA (2 Pers)', category: 'Especiales', price: 79.00, description: 'JUANE AVISPA + CECINA + CHORIZO + CHAUFA REGIONAL.' },
    { name: 'LA BUCHIZAPA (3 Pers)', category: 'Especiales', price: 99.00, description: 'JUANE AVISPA + CEVICHE DE PAICHE + CHICHARRON DE PAICHE + CHAUFA REGIONAL + CORONA.' },
    { name: 'MAJADO EXÓTICO', category: 'Especiales', price: 45.00, description: 'MAJADO DE YUCA + MAJADO DE PLÁTANO + COSTILLAS AHUMADAS DE CASA + AJÍ DE COCONA.' },
    { name: 'CREPS VEGETARIANO', category: 'Especiales', price: 29.00, description: 'Crepe enrollada con verdura salteada y bañada en salsa de pitajaya.' },

    // EXTRAS
    { name: 'CALDO DE GALLINA', category: 'Extras', price: 22.00, description: 'Sustancioso caldo de gallina regional.' },
    { name: 'SOPA DIETA', category: 'Extras', price: 15.00, description: 'Sopa ligera y nutritiva.' },
    { name: 'JUANE DE GALLINA', category: 'Extras', price: 25.00, description: 'Plato tradicional de arroz con gallina envuelto en hojas de bijao.' },
    { name: 'ENSALADA DE FILETE', category: 'Extras', price: 15.00, description: 'Ensalada fresca con filete.' },
    { name: 'TORTILLAS DE VERDURA', category: 'Extras', price: 15.00, description: 'Tortillas saludables con verduras frescas.' },

    // GUARNICIONES
    { name: 'ARROZ', category: 'Guarniciones', price: 5.00, description: 'Porción de arroz blanco.' },
    { name: 'PAPA SANCOCHADA / FRITA', category: 'Guarniciones', price: 5.00, description: 'Papa al gusto.' },
    { name: 'PATACONES', category: 'Guarniciones', price: 5.00, description: 'Porción de patacones crocantes.' },
    { name: 'TACACHO', category: 'Guarniciones', price: 5.00, description: 'Porción de tacacho tradicional.' },
    { name: 'YUCA SANCOCHADA / FRITA', category: 'Guarniciones', price: 5.00, description: 'Yuca al gusto.' },
    { name: 'PLATANO FRITO', category: 'Guarniciones', price: 5.00, description: 'Porción de plátano frito.' },
    { name: 'ZARZA CRIOLLA', category: 'Guarniciones', price: 5.00, description: 'Zarza de cebolla fresca.' },

    // BEBIDAS
    { name: 'COCONA', category: 'Bebidas', price: 15.00, description: 'Jarra de refresco de cocona.' },
    { name: 'CEBADA', category: 'Bebidas', price: 12.00, description: 'Jarra de refresco de cebada.' },
    { name: 'MARACUYA', category: 'Bebidas', price: 15.00, description: 'Jarra de refresco de maracuya.' },
    { name: 'CARAMBOLA', category: 'Bebidas', price: 12.00, description: 'Jarra de refresco de carambola.' },
    { name: 'MAÍZ MORADO', category: 'Bebidas', price: 15.00, description: 'Jarra de chicha morada.' },
    { name: 'TÉ / INFUSIONES', category: 'Bebidas Calientes', price: 6.00, description: 'Manzanilla, Hierba Luisa o Canela.' },
    { name: 'CAFÉ A LA OLLA', category: 'Bebidas Calientes', price: 8.00, description: 'Café tradicional preparado a la olla.' },
    { name: 'CAFÉ CON LECHE', category: 'Bebidas Calientes', price: 10.00, description: 'Café con leche regional.' },
    { name: 'CHOCOLATE REGIONAL', category: 'Bebidas Calientes', price: 10.00, description: 'Chocolate pura pasta de cacao.' },
    { name: 'CHOCOLATE CON LECHE', category: 'Bebidas Calientes', price: 12.00, description: 'Chocolate regional con leche.' },
    { name: 'RONDA SELVÁTICA (6 Sabores)', category: 'Bebidas Regionales', price: 39.00, description: 'Degustación de 6 macerados típicos.' },
    { name: 'CERVEZA ARTESANAL', category: 'Bebidas Regionales', price: 16.00, description: 'Cerveza artesanal de la casa (Chop o Botella).' }
]

async function seed() {
    console.log('--- Iniciando Carga de Menú Restaurante ---')
    const { data, error } = await supabase.from('restaurante_menu').insert(dishes)
    if (error) {
        console.error('Error al insertar platos:', error)
    } else {
        console.log('✅ Menú cargado exitosamente. Total platos:', dishes.length)
    }
}

seed()
