import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/session';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/8c6976e5b541')) {
    const session = request.cookies.get('session');
    
    if (!session) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    const payload = await verifySession(session.value);
    
    if (!payload) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/8c6976e5b541/:path*'
}