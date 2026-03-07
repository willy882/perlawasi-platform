-- Migration: add section field to productos_ropa for beach sections
ALTER TABLE public.productos_ropa 
ADD COLUMN IF NOT EXISTS section TEXT DEFAULT 'swim',
ADD COLUMN IF NOT EXISTS material TEXT,
ADD COLUMN IF NOT EXISTS emoji TEXT DEFAULT '🩱',
ADD COLUMN IF NOT EXISTS colors JSONB DEFAULT '[]'::jsonb;

-- section values: 'swim' | 'cover' | 'accesorios'
COMMENT ON COLUMN public.productos_ropa.section IS 'Beach section: swim | cover | accesorios';
