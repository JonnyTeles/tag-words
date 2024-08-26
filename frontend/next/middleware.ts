import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const isUserAuthenticated = request.cookies.get('jwt')
    const { pathname } = request.nextUrl;

    if (isUserAuthenticated) {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/home', request.url));
        }
    } else {

        if (pathname === '/home') {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/home/:path*', '/login', '/register']
}