import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {

    const cookieStore = await cookies()
    const auth = cookieStore.get('auth')

    if (request.nextUrl.pathname.startsWith('/finance')) {
        if (!auth) {
            console.log('user is not login')
            return NextResponse.redirect(new URL('/auth', request.url))
        }
    }
    if (request.nextUrl.pathname.startsWith('/auth')) {
        if (auth) {
            console.log('user is already login')
            return NextResponse.redirect(new URL('/finance/dashboard', request.url))
        }
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/finance/:path*', '/auth/:path*']
}