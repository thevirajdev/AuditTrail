import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = new URL(req.url);
  const isEditor = url.pathname.startsWith('/editor');
  const isAuthCallback = url.pathname.startsWith('/auth/callback');

  // Ensure session is loaded during callback exchange
  if (isAuthCallback) {
    return res; // allow next to handle the callback route
  }

  if (isEditor && !session) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/auth/callback', '/editor/:path*'],
};
