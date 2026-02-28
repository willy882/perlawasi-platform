-- =============================================================
-- SINCRONIZACIÓN COMPLETA DEL MENÚ RESTAURANTE PERLAWASI
-- Ejecutar en: Supabase > SQL Editor
-- Este script inserta SOLO los platos que NO existen aún.
-- =============================================================

-- Asegurarse que la columna image_url existe
ALTER TABLE public.restaurante_menu ADD COLUMN IF NOT EXISTS image_url TEXT;

-- PLATOS TÍPICOS
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('CHAUFA REGIONAL', 'Platos Típicos', 25.00::decimal, 'Arroz chaufa elaborado con cecina y chorizo servido con plátano frito.', true),
    ('TACACHO CON CECINA', 'Platos Típicos', 25.00::decimal, 'Tacacho con cecina + patacones + plátano frito + zarza de cebolla.', true),
    ('JUANE SELVÁTICO', 'Platos Típicos', 25.00::decimal, 'Tacacho + juane selvático + zarza de cebolla.', true),
    ('PATACONES RELLENOS', 'Platos Típicos', 25.00::decimal, 'Patacón relleno con ceviche de cecina regional.', true),
    ('CHICHARRON DE CERDO', 'Platos Típicos', 30.00::decimal, 'Chicharrón de cerdo + Tacacho + patacones + plátano frito + zarza de cebolla.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- PESCADOS
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('SUDADO DE TILAPIA', 'Pescados', 30.00::decimal, 'Arroz + sudado de tilapia + patacones.', true),
    ('PATARASHCA DE TILAPIA', 'Pescados', 30.00::decimal, 'Arroz + patarashca de tilapia + patacones + maduro frito.', true),
    ('TILAPIA FRITA/PARRILLA/PLANCHA', 'Pescados', 30.00::decimal, 'Arroz + patacones + tilapia + zarza de cebolla.', true),
    ('TRUCHA FRITA/PARRILLA/PLANCHA', 'Pescados', 35.00::decimal, 'Arroz + patacones + trucha + zarza de cebolla.', true),
    ('SUDADO DE TRUCHA', 'Pescados', 35.00::decimal, 'Arroz + sudado de trucha + patacones.', true),
    ('PATARASHCA DE TRUCHA', 'Pescados', 35.00::decimal, 'Arroz + patarashca de trucha + patacones + maduro frito.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- POLLOS
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('POLLO FRITO/PLANCHA/PARRILLA', 'Pollos', 22.00::decimal, 'Pollo + plátano frito + papa frita + ensalada.', true),
    ('CHICHARRON DE POLLO', 'Pollos', 22.00::decimal, 'Chicharrón de pollo + plátano frito + papa frita + ensalada.', true),
    ('MILANESA DE POLLO', 'Pollos', 22.00::decimal, 'Pollo + plátano frito + papa frita + ensalada.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- PAICHES
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('PAICHE EN SALSA AMAZÓNICA', 'Paiches', 45.00::decimal, 'Preparado a la parrilla, mariscos en salsa de huacatay + yuca frita.', true),
    ('PAICHE A LA PARRILLA', 'Paiches', 40.00::decimal, 'Arroz + paiche a la parrilla + patacones + yuca frita + zarza de cebolla.', true),
    ('PAICHE A LA PLANCHA', 'Paiches', 40.00::decimal, 'Arroz + paiche a la plancha + patacones + yuca frita + zarza de cebolla.', true),
    ('PATARASHCA DE PAICHE', 'Paiches', 40.00::decimal, 'Arroz + patarashca de paiche + patacón + plátano frito.', true),
    ('CHICHARRON DE PAICHE', 'Paiches', 40.00::decimal, 'Arroz + chicharrón de paiche + patacón + plátano frito.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- CEVICHES
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('CEVICHE DE TOYO', 'Ceviches', 30.00::decimal, 'Refrescante ceviche de toyo.', true),
    ('CEVICHE MIXTO', 'Ceviches', 40.00::decimal, 'Ceviche con variedad de pescados y mariscos.', true),
    ('CEVICHE DE PAICHE', 'Ceviches', 40.00::decimal, 'Ceviche premium de paiche amazónico.', true),
    ('TRIO DE CEVICHE SELVÁTICO', 'Ceviches', 65.00::decimal, 'Toyo + Paiche + Cecina.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- CERDO
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('CHANCHO A LA CAJA CHINA', 'Cerdo', 30.00::decimal, 'Cerdo crocante preparado en caja china.', true),
    ('COSTILLAS EN SALSA BBQ', 'Cerdo', 28.00::decimal, 'Costillas de cerdo bañadas en salsa BBQ.', true),
    ('CHORIZO CON TACACHO', 'Cerdo', 25.00::decimal, 'Chorizo regional acompañado de tacacho.', true),
    ('MIXTO (Cecina + chorizo)', 'Cerdo', 30.00::decimal, 'Cecina y chorizo regional.', true),
    ('COSTILLA AHUMADA EN SALSA DE COCONA', 'Cerdo', 30.00::decimal, 'Costilla con el toque cítrico de la cocona.', true),
    ('CHULETA FRITA/PLANCHA/PARRILLA', 'Cerdo', 25.00::decimal, 'Chuleta de cerdo preparada al gusto.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- ESPECIALES
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('RONDA AMAZÓNICA (2 Pers)', 'Especiales', 79.00::decimal, 'JUANE AVISPA + CECINA + CHORIZO + CHAUFA REGIONAL.', true),
    ('LA BUCHIZAPA (3 Pers)', 'Especiales', 99.00::decimal, 'JUANE AVISPA + CEVICHE DE PAICHE + CHICHARRON DE PAICHE + CHAUFA REGIONAL + CORONA.', true),
    ('MAJADO EXÓTICO', 'Especiales', 45.00::decimal, 'MAJADO DE YUCA + MAJADO DE PLÁTANO + COSTILLAS AHUMADAS DE CASA + AJÍ DE COCONA.', true),
    ('CREPS VEGETARIANO', 'Especiales', 29.00::decimal, 'Crepe enrollada con verdura salteada y bañada en salsa de pitajaya.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- EXTRAS
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('CALDO DE GALLINA', 'Extras', 22.00::decimal, 'Sustancioso caldo de gallina regional.', true),
    ('SOPA DIETA', 'Extras', 15.00::decimal, 'Sopa ligera y nutritiva.', true),
    ('JUANE DE GALLINA', 'Extras', 25.00::decimal, 'Plato tradicional de arroz con gallina envuelto en hojas de bijao.', true),
    ('ENSALADA DE FILETE', 'Extras', 15.00::decimal, 'Ensalada fresca con filete.', true),
    ('TORTILLAS DE VERDURA', 'Extras', 15.00::decimal, 'Tortillas saludables con verduras frescas.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- GUARNICIONES
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('ARROZ', 'Guarniciones', 5.00::decimal, 'Porción de arroz blanco.', true),
    ('PAPA SANCOCHADA / FRITA', 'Guarniciones', 5.00::decimal, 'Papa al gusto.', true),
    ('PATACONES', 'Guarniciones', 5.00::decimal, 'Porción de patacones crocantes.', true),
    ('TACACHO', 'Guarniciones', 5.00::decimal, 'Porción de tacacho tradicional.', true),
    ('YUCA SANCOCHADA / FRITA', 'Guarniciones', 5.00::decimal, 'Yuca al gusto.', true),
    ('PLATANO FRITO', 'Guarniciones', 5.00::decimal, 'Porción de plátano frito.', true),
    ('ZARZA CRIOLLA', 'Guarniciones', 5.00::decimal, 'Zarza de cebolla fresca.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- BEBIDAS
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('COCONA', 'Bebidas', 15.00::decimal, 'Jarra de refresco de cocona.', true),
    ('CEBADA', 'Bebidas', 12.00::decimal, 'Jarra de refresco de cebada.', true),
    ('MARACUYA', 'Bebidas', 15.00::decimal, 'Jarra de refresco de maracuya.', true),
    ('CARAMBOLA', 'Bebidas', 12.00::decimal, 'Jarra de refresco de carambola.', true),
    ('MAÍZ MORADO', 'Bebidas', 15.00::decimal, 'Jarra de chicha morada.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- BEBIDAS CALIENTES
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('TÉ / INFUSIONES', 'Bebidas Calientes', 6.00::decimal, 'Manzanilla, Hierba Luisa o Canela.', true),
    ('CAFÉ A LA OLLA', 'Bebidas Calientes', 8.00::decimal, 'Café tradicional preparado a la olla.', true),
    ('CAFÉ CON LECHE', 'Bebidas Calientes', 10.00::decimal, 'Café con leche regional.', true),
    ('CHOCOLATE REGIONAL', 'Bebidas Calientes', 10.00::decimal, 'Chocolate pura pasta de cacao.', true),
    ('CHOCOLATE CON LECHE', 'Bebidas Calientes', 12.00::decimal, 'Chocolate regional con leche.', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- BEBIDAS REGIONALES
INSERT INTO public.restaurante_menu (name, category, price, description, available)
SELECT * FROM (VALUES
    ('RONDA SELVÁTICA (6 Sabores)', 'Bebidas Regionales', 39.00::decimal, 'Degustación de 6 macerados típicos.', true),
    ('CERVEZA ARTESANAL', 'Bebidas Regionales', 16.00::decimal, 'Cerveza artesanal de la casa (Chop o Botella).', true)
) AS v(name, category, price, description, available)
WHERE NOT EXISTS (SELECT 1 FROM public.restaurante_menu rm WHERE rm.name = v.name);

-- También nos aseguramos de que todos los platos estén marcados como disponibles
UPDATE public.restaurante_menu SET available = true WHERE available IS NULL;

-- Verificar el total
SELECT count(*) AS total_platos FROM public.restaurante_menu;
