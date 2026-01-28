import { z } from 'zod'

// ============================================
// USER VALIDATION
// ============================================

export const registerSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    phone: z.string().optional(),
})

export const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
})

// ============================================
// PRODUCT VALIDATION
// ============================================

export const productSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    slug: z.string().min(3, 'El slug es requerido'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    price: z.number().positive('El precio debe ser mayor a 0'),
    comparePrice: z.number().positive().optional(),
    categoryId: z.string().min(1, 'La categoría es requerida'),
    stock: z.number().int().min(0, 'El stock no puede ser negativo'),
    sku: z.string().optional(),
    features: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
})

// ============================================
// CART VALIDATION
// ============================================

export const addToCartSchema = z.object({
    productId: z.string().min(1, 'El producto es requerido'),
    quantity: z.number().int().positive('La cantidad debe ser mayor a 0'),
})

export const updateCartItemSchema = z.object({
    quantity: z.number().int().positive('La cantidad debe ser mayor a 0'),
})

// ============================================
// ORDER VALIDATION
// ============================================

export const checkoutSchema = z.object({
    customerName: z.string().min(2, 'El nombre es requerido'),
    customerEmail: z.string().email('Email inválido'),
    customerPhone: z.string().min(9, 'El teléfono es requerido'),
    customerIdDoc: z.string().min(8, 'El documento de identidad es requerido'),
    deliveryType: z.enum(['DELIVERY', 'PICKUP', 'DINE_IN']),
    address: z.string().optional(),
    notes: z.string().optional(),
})

// ============================================
// RESERVATION VALIDATION
// ============================================

export const reservationSchema = z.object({
    productId: z.string().min(1, 'El producto es requerido'),
    customerName: z.string().min(2, 'El nombre es requerido'),
    customerEmail: z.string().email('Email inválido'),
    customerPhone: z.string().min(9, 'El teléfono es requerido'),
    customerIdDoc: z.string().min(8, 'El documento de identidad es requerido'),
    checkIn: z.string().datetime('Fecha de entrada inválida'),
    checkOut: z.string().datetime('Fecha de salida inválida'),
    guests: z.number().int().positive('El número de huéspedes debe ser mayor a 0'),
    notes: z.string().optional(),
})

// ============================================
// REVIEW VALIDATION
// ============================================

export const reviewSchema = z.object({
    productId: z.string().min(1, 'El producto es requerido'),
    rating: z.number().int().min(1).max(5, 'La calificación debe estar entre 1 y 5'),
    title: z.string().optional(),
    comment: z.string().min(10, 'El comentario debe tener al menos 10 caracteres'),
})

// ============================================
// SANITIZATION HELPERS
// ============================================

export function sanitizeString(str: string): string {
    return str
        .trim()
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
}

export function sanitizeEmail(email: string): string {
    return email.toLowerCase().trim()
}

export function sanitizePhone(phone: string): string {
    return phone.replace(/[^\d+]/g, '')
}

// ============================================
// VALIDATION HELPERS
// ============================================

export function validateAndSanitize<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
    try {
        const validated = schema.parse(data)
        return { success: true, data: validated }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors: Record<string, string> = {}
            error.errors.forEach((err) => {
                const path = err.path.join('.')
                errors[path] = err.message
            })
            return { success: false, errors }
        }
        return { success: false, errors: { _error: 'Validation failed' } }
    }
}
