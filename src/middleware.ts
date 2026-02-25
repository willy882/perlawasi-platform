import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Si intenta entrar al dashboard pero no al login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const authCookie = request.cookies.get('admin_auth')

        // Si no existe la cookie de autenticación, redirigir al login
        if (!authCookie || authCookie.value !== 'true') {
            const loginUrl = new URL('/admin/login', request.url)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}

// Configurar en qué rutas se debe ejecutar este middleware
export const config = {
    matcher: ['/admin/:path*'],
}
