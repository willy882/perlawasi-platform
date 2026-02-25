-- TABLA DE PLANTAS (VIVERO)
CREATE TABLE IF NOT EXISTS public.plantas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    scientific_name TEXT,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    status TEXT DEFAULT 'In Stock',
    description TEXT,
    image_url TEXT,
    emoji TEXT DEFAULT '🌿'
);

-- TABLA DE ROPA (BOUTIQUE)
CREATE TABLE IF NOT EXISTS public.productos_ropa (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT,
    image_url TEXT,
    sizes TEXT[] -- Array de tallas ['S', 'M', 'L', 'XL']
);

-- TABLA DE RESERVAS (LODGE)
CREATE TABLE IF NOT EXISTS public.reservas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER DEFAULT 1,
    room_type TEXT,
    status TEXT DEFAULT 'Pendiente',
    total_price DECIMAL(10,2)
);

-- HABILITAR SEGURIDAD (RLS) - Por ahora permitimos lectura pública y escritura solo para admin
ALTER TABLE public.plantas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de plantas" ON public.plantas FOR SELECT USING (true);
CREATE POLICY "Admin gestión total plantas" ON public.plantas FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.productos_ropa ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública de ropa" ON public.productos_ropa FOR SELECT USING (true);
CREATE POLICY "Admin gestión total ropa" ON public.productos_ropa FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin gestión reservas" ON public.reservas FOR ALL USING (auth.role() = 'authenticated');
