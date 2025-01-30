import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request) {

    const cookieStore = await cookies()
    const auth = request.cookies.get('auth')
    const allCookies = request.cookies.getAll()
    console.log('show all cookie : ', allCookies)
    if(auth) console.log('check auth : ', auth)

    if(request.nextUrl.pathname === '/' && auth) {
        // user login 
        return NextResponse.redirect(new URL('/finance/dashboard', request.url))
    }
    if(request.nextUrl.pathname.startsWith('/finance') && !auth) {
        return NextResponse.redirect(new URL('/', request.url))
    } else {
        return NextResponse.next()
    }
  
}

export const config = {
    matcher: ['/:path*']
}