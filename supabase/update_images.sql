-- UPDATE IMAGES FOR RESTAURANTE MENU
-- Run in Supabase SQL Editor

UPDATE public.restaurante_menu SET image_url = '/images/carta/avispa juanes.png' WHERE name = 'JUANE DE GALLINA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/tacacho con chorizo y cecina.png' WHERE name = 'TACACHO CON CECINA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/juane selvatico.jpg' WHERE name = 'JUANE SELVÁTICO';
UPDATE public.restaurante_menu SET image_url = '/images/carta/Patacon relleno.jpg' WHERE name = 'PATACONES RELLENOS';
UPDATE public.restaurante_menu SET image_url = '/images/carta/caldo.png' WHERE name = 'CALDO DE GALLINA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/sopa fdieta.png' WHERE name = 'SOPA DIETA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/milanesa de pollo.png' WHERE name = 'MILANESA DE POLLO';
UPDATE public.restaurante_menu SET image_url = '/images/carta/pollo frita.png' WHERE name = 'POLLO FRITO/PLANCHA/PARRILLA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/tilapia frita.png' WHERE name = 'TILAPIA FRITA/PARRILLA/PLANCHA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/Trucha Frita.jpg' WHERE name = 'TRUCHA FRITA/PARRILLA/PLANCHA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/paiche parrilla.png' WHERE name = 'PAICHE A LA PARRILLA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/Majado Exotico.jpg' WHERE name = 'MAJADO EXÓTICO';
UPDATE public.restaurante_menu SET image_url = '/images/carta/Creps Vegetariano.jpg' WHERE name = 'CREPS VEGETARIANO';
UPDATE public.restaurante_menu SET image_url = '/images/carta/porcion arroz.png' WHERE name = 'ARROZ';
UPDATE public.restaurante_menu SET image_url = '/images/carta/porcion papa frita.png' WHERE name = 'PAPA SANCOCHADA / FRITA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/porcion patacones.png' WHERE name = 'PATACONES';
UPDATE public.restaurante_menu SET image_url = '/images/carta/porcion tacacho.png' WHERE name = 'TACACHO';
UPDATE public.restaurante_menu SET image_url = '/images/carta/yuca frita.png' WHERE name = 'YUCA SANCOCHADA / FRITA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/maduro frito.png' WHERE name = 'PLATANO FRITO';
UPDATE public.restaurante_menu SET image_url = '/images/carta/porcion cebolla.png' WHERE name = 'ZARZA CRIOLLA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/refresco cocona.png' WHERE name = 'COCONA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/refresco cebada.png' WHERE name = 'CEBADA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/maracuyá.png' WHERE name = 'MARACUYA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/refresco carambola.png' WHERE name = 'CARAMBOLA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/café de olla.png' WHERE name = 'CAFÉ A LA OLLA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/café con leche.png' WHERE name = 'CAFÉ CON LECHE';
UPDATE public.restaurante_menu SET image_url = '/images/carta/té de hierba luisa.png' WHERE name = 'TÉ / INFUSIONES';

-- Signature dishes already added images but let's confirm them in the DB
UPDATE public.restaurante_menu SET image_url = '/images/carta/buchizapa.jpg' WHERE name = 'LA BUCHIZAPA (3 Pers)';
UPDATE public.restaurante_menu SET image_url = '/images/carta/paiche-salsa-amazonica.jpg' WHERE name = 'PAICHE EN SALSA AMAZÓNICA';
UPDATE public.restaurante_menu SET image_url = '/images/carta/ronda-amazonica.jpg' WHERE name = 'RONDA AMAZÓNICA (2 Pers)';
UPDATE public.restaurante_menu SET image_url = '/images/carta/trio-ceviche-selvatico.jpg' WHERE name = 'TRIO DE CEVICHE SELVÁTICO';
UPDATE public.restaurante_menu SET image_url = '/images/carta/ceviche-paiche.jpg' WHERE name = 'CEVICHE DE PAICHE';
UPDATE public.restaurante_menu SET image_url = '/images/carta/caja-china.jpg' WHERE name = 'CHANCHO A LA CAJA CHINA';
