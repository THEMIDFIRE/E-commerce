import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    if (token) {
        if (request.nextUrl.pathname.includes('/login') || request.nextUrl.pathname.includes('/register')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
        return NextResponse.next()
    } else {
        if (!request.nextUrl.pathname.includes('/login') || !request.nextUrl.pathname.includes('/register')) {
            return NextResponse.rewrite(new URL('/login', request.url))
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
    ],
}