import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/cadastro', '/empresa', '/recuperar-senha'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;

  const isPublic = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
