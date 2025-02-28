import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request) {
    const excludedPaths = ['/api/verify'];
    // skip middleware check
    if (excludedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    const result = {
        isLogin: false,
        name: '',
        uuid: '',
        expire: 0
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');

    if (token) {
        try {
            const res = await fetch(`${request.nextUrl.origin}/api/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token.value }),
            });
            const userData = await res.json()
            if (userData.user) {
                result.name = userData.user.name
                result.uuid = userData.user.user_id
                result.isLogin = true
                result.expire = userData.expireMinute
            }
        } catch (error) {
            console.log('error from middleware : ', error)
        }
    }

    // handle path
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