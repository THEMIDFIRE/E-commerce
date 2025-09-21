import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl
    
    // Get session flags from cookies
    const canAccessResetCode = request.cookies.get('reset-flow-step')?.value === 'code'
    const canAccessResetPassword = request.cookies.get('reset-flow-step')?.value === 'password'
    
    if (token) {
        // Authenticated users should not access auth pages
        if (pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/forget-password')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        
        // Authenticated users should not access reset pages
        if (pathname.includes('/reset-code') || pathname.includes('/reset-password')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        
        return NextResponse.next()
    } else {
        // Handle reset flow for unauthenticated users
        if (pathname.includes('/reset-code')) {
            if (!canAccessResetCode) {
                return NextResponse.redirect(new URL('/forget-password', request.url))
            }
            return NextResponse.next()
        }
        
        if (pathname.includes('/reset-password')) {
            if (!canAccessResetPassword) {
                return NextResponse.redirect(new URL('/forget-password', request.url))
            }
            return NextResponse.next()
        }
        
        // Handle other protected routes
        const protectedRoutes = ['/account', '/allorders', '/wishlist', '/cart', '/checkout']
        const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route))
        
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
        
        return NextResponse.next()
    }
}

export const config = {
    matcher: [
        // Protected routes
        '/account',
        '/allorders',
        '/wishlist',
        '/cart',
        '/checkout',
        // Auth routes
        '/login',
        '/register',
        '/forget-password',
        '/reset-code',
        '/reset-password'
    ],
}