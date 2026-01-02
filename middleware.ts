import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@lib/auth';

const protectedPaths = [
  '/home',
  '/menu',
  '/item',
  '/cart',
  '/checkout',
  '/orders',
  '/profile',
];

const adminPaths = [
  '/admin/dashboard',
  '/admin/menu-management',
  '/admin/orders',
  '/admin/analytics',
  '/admin/settings',
];

const authPaths = ['/login', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('auth_token')?.value;

  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path));
  const isAdminPath = adminPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = authPaths.includes(pathname);

  if (isProtectedPath || isAdminPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth_token');
      return response;
    }

    if (isAdminPath && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  if (isAuthPath && token) {
    const payload = verifyToken(token);
    if (payload) {
      if (payload.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
