import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const isUserAuthenticated = request.cookies.get('jwt')
    const { pathname } = request.nextUrl;

    if (isUserAuthenticated) {
        if (pathname === '/login' || pathname === '/register') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } else {

        if (pathname === '/dashboard') {
            return NextResponse.redirect(new URL('/api/auth/signin', request.url));
        }
    }

    return NextResponse.next();

}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register']
}