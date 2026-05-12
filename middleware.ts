import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Route protection via lightweight cookies set by lib/auth.tsx on login.
 * Real security is enforced by Firestore rules — this is UX-level gating.
 */

const SELLER_ROUTES = ['/dashboard'];
const AUTH_ROUTES   = ['/cart', '/checkout', '/account'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get('tonorib_auth');
  const roleCookie = request.cookies.get('tonorib_role');

  const isAuthenticated = authCookie?.value === '1';
  const role = roleCookie?.value;

  const isSellerRoute = SELLER_ROUTES.some((p) => pathname.startsWith(p));
  const isAuthRoute   = AUTH_ROUTES.some((p) => pathname.startsWith(p));

  // Unauthenticated user hitting a protected page → send to login
  if ((isSellerRoute || isAuthRoute) && !isAuthenticated) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // Authenticated buyer trying to reach seller-only pages → send home
  if (isSellerRoute && role !== 'seller') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cart',
    '/checkout',
    '/account/:path*',
  ],
};
