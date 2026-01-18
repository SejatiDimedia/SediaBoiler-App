import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip i18n middleware for admin, api, and preview routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/preview')) {
        return NextResponse.next();
    }

    return intlMiddleware(request);
}

export const config = {
    // Match all paths except static files
    matcher: ['/((?!_next|.*\\..*).*)']
};
