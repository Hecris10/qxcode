import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ['/register']


export async function middleware(request: NextRequest) {
    const route = request.nextUrl.pathname;
    if (!route.startsWith("/home")) {
        return NextResponse.next();
    }
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    return NextResponse.next();
}