// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')?.value;

    const protectedPaths = ['/admin-map-view', '/announcements', '/map-set', '/map-view', '/user-confirm/share',]; // 🔒 list of protected routes
    const path = req.nextUrl.pathname;
    console.log(path)

    const isProtected = protectedPaths.some(p => path.startsWith(p));

    if (isProtected && !token) {
        return NextResponse.redirect(new URL('/admin-auth', req.url));
    }
    return NextResponse.next();
}
