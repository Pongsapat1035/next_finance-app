import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request) {
    const result = {
        isLogin: false,
        name: '',
        uuid: ''
    }

    try {
        const token = request.cookies.get('authToken')
        const res = await fetch(`${request.nextUrl.origin}/api/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: token.value }),
        });
        const userData = await res.json()
        result.name = userData.user.name
        result.uuid = userData.user.user_id
        result.isLogin = true
    } catch (error) {
        console.log('error from middleware : ', error)
    }

    if (request.nextUrl.pathname.startsWith('/finance') && !result.isLogin) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (request.nextUrl.pathname === '/' && result.isLogin) {
        const response = NextResponse.redirect(new URL('/finance/dashboard', request.nextUrl))
        response.headers.set('user', JSON.stringify(result))
        return response

    } else {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('user', JSON.stringify(result))
        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        })
        return response
    }
}

export const config = {
    matcher: ['/:path*']
}