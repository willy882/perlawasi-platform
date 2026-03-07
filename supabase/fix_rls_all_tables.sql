-- SCRIPT PARA HABILITAR ACCESO TOTAL DE ESCRITURA/LECTURA A TODAS LAS SECCIONES DEL PANEL
-- =========================================================================================
-- Esto arregla el error "new row violates row-level security policy" permitiendo que
-- el panel de administrador funcione correctamente y guarde los productos sin necesidad
-- de un token JWT complejo en esta etapa del proyecto.

-- 1. PLANTAS (Vivero)
DROP POLICY IF EXISTS "Admin total plantas" ON public.plantas;
CREATE POLICY "Admin total plantas" ON public.plantas FOR ALL USING (true) WITH CHECK (true);

-- 2. ROPA (Boutique)
DROP POLICY IF EXISTS "Admin total ropa" ON public.productos_ropa;
CREATE POLICY "Admin total ropa" ON public.productos_ropa FOR ALL USING (true) WITH CHECK (true);

-- 3. RESERVAS (Lodge)
DROP POLICY IF EXISTS "Admin total reservas" ON public.reservas;
CREATE POLICY "Admin total reservas" ON public.reservas FOR ALL USING (true) WITH CHECK (true);

-- 4. HELADERÍA
DROP POLICY IF EXISTS "Admin total heladeria" ON public.heladeria;
CREATE POLICY "Admin total heladeria" ON public.heladeria FOR ALL USING (true) WITH CHECK (true);

-- 5. CERVECERÍA
DROP POLICY IF EXISTS "Admin total cerveceria" ON public.cerveceria;
CREATE POLICY "Admin total cerveceria" ON public.cerveceria FOR ALL USING (true) WITH CHECK (true);

-- 6. LICORERÍA
DROP POLICY IF EXISTS "Admin total licoreria" ON public.licoreria;
CREATE POLICY "Admin total licoreria" ON public.licoreria FOR ALL USING (true) WITH CHECK (true);

-- 7. RESTAURANTE
DROP POLICY IF EXISTS "Admin total restaurante" ON public.restaurante_menu;
CREATE POLICY "Admin total restaurante" ON public.restaurante_menu FOR ALL USING (true) WITH CHECK (true);

-- 8. CAFÉ & CACAO
DROP POLICY IF EXISTS "Admin total cafe" ON public.cafe_cacao;
CREATE POLICY "Admin total cafe" ON public.cafe_cacao FOR ALL USING (true) WITH CHECK (true);

-- Si deseas desactivar por completo RLS temporalmente en lugar de cambiar las políticas, descomenta esto:
-- ALTER TABLE public.plantas DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.productos_ropa DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.reservas DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.heladeria DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.cerveceria DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.licoreria DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.restaurante_menu DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.cafe_cacao DISABLE ROW LEVEL SECURITY;
