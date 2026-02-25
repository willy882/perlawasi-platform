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

-- HABILITAR SEGURIDAD (RLS)
ALTER TABLE public.plantas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública plantas" ON public.plantas FOR SELECT USING (true);
CREATE POLICY "Admin total plantas" ON public.plantas FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.productos_ropa ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública ropa" ON public.productos_ropa FOR SELECT USING (true);
CREATE POLICY "Admin total ropa" ON public.productos_ropa FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.reservas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública reservas" ON public.reservas FOR SELECT USING (true);
CREATE POLICY "Admin total reservas" ON public.reservas FOR ALL USING (auth.role() = 'authenticated');

-- TABLA DE HELADERIA
CREATE TABLE IF NOT EXISTS public.heladeria (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT
);

-- TABLA DE CERVECERIA
CREATE TABLE IF NOT EXISTS public.cerveceria (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT
);

-- TABLA DE LICORERIA
CREATE TABLE IF NOT EXISTS public.licoreria (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT
);

-- TABLA DE MENU RESTAURANTE
CREATE TABLE IF NOT EXISTS public.restaurante_menu (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    available BOOLEAN DEFAULT true
);

-- HABILITAR SEGURIDAD (RLS) para nuevas tablas
ALTER TABLE public.heladeria ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública heladeria" ON public.heladeria FOR SELECT USING (true);
CREATE POLICY "Admin total heladeria" ON public.heladeria FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.cerveceria ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública cerveceria" ON public.cerveceria FOR SELECT USING (true);
CREATE POLICY "Admin total cerveceria" ON public.cerveceria FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.licoreria ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública licoreria" ON public.licoreria FOR SELECT USING (true);
CREATE POLICY "Admin total licoreria" ON public.licoreria FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE public.restaurante_menu ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública restaurante" ON public.restaurante_menu FOR SELECT USING (true);
CREATE POLICY "Admin total restaurante" ON public.restaurante_menu FOR ALL USING (auth.role() = 'authenticated');

-- TABLA DE CAFE Y CACAO
CREATE TABLE IF NOT EXISTS public.cafe_cacao (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    description TEXT
);
ALTER TABLE public.cafe_cacao ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lectura pública cafe" ON public.cafe_cacao FOR SELECT USING (true);
CREATE POLICY "Admin total cafe" ON public.cafe_cacao FOR ALL USING (auth.role() = 'authenticated');

-- ÍNDICES PARA RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_plantas_name ON public.plantas(name);
CREATE INDEX IF NOT EXISTS idx_plantas_category ON public.plantas(category);
CREATE INDEX IF NOT EXISTS idx_ropa_name ON public.productos_ropa(name);
CREATE INDEX IF NOT EXISTS idx_ropa_category ON public.productos_ropa(category);
CREATE INDEX IF NOT EXISTS idx_reservas_dates ON public.reservas(check_in, check_out);
CREATE INDEX IF NOT EXISTS idx_reservas_customer ON public.reservas(customer_name);
CREATE INDEX IF NOT EXISTS idx_heladeria_cat ON public.heladeria(category);
CREATE INDEX IF NOT EXISTS idx_cerveceria_cat ON public.cerveceria(category);
CREATE INDEX IF NOT EXISTS idx_licoreria_cat ON public.licoreria(category);
CREATE INDEX IF NOT EXISTS idx_restaurante_cat ON public.restaurante_menu(category);
CREATE INDEX IF NOT EXISTS idx_cafe_cat ON public.cafe_cacao(category);
