import { NextResponse } from "next/server"

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const cookie = request.cookies.get(process.env.TOKEN_COOKIE_KEY)?.value || null

    const wrongPaths = path === "/dashboard";

    const publicRoutes = path === "/login" || path === "/signup" || path === "/forgetpassword";
    const commonRoutes = path === "/";

    if ((cookie && publicRoutes) || wrongPaths) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    if (!cookie && !publicRoutes && !commonRoutes) {
        // if we have no cookie (means we are logout) and try to access path which is not public path (means private path) and also not a common path "/", then redirect to "/login"
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
}
export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/forgetpassword',
        '/dashboard/(.*)'
    ]
}