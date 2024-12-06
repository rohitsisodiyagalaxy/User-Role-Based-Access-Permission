// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('authToken');

  if (!token) {
    // Redirect to the login page if the user is not authenticated
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

// Specify which routes to protect
export const config = {
  matcher: ['/dashboard', '/user', '/role', '/permission','/report'], // Protect these routes
};
