import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request) {
    const excludedPaths = ['/api/verify'];
    if (excludedPaths.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }
    const result = {
        isLogin: false,
        name: '',
        uuid: ''
    }
    // console.log('middleware')
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');
    // if (!token) throw new Error('no cookie found')
    // console.log(`token check from middleware ${request.nextUrl} : `, token)
   
    if (token) {
        try {

            const res = await fetch(`${request.nextUrl.origin}/api/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: token.value }),
            });
            const userData = await res.json()
            console.log('reponse vertify check : ', userData)
            result.name = userData.user.name
            result.uuid = userData.user.user_id
            result.isLogin = true
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