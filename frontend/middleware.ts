import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "somedi_session";

const PUBLIC_PATHS = new Set([
  "/",
  "/legal/terminos-y-condiciones",
  "/legal/politica-de-datos",
  "/favicon.ico",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow Next internals
  if (pathname.startsWith("/_next")) return NextResponse.next();
  if (pathname.startsWith("/api")) return NextResponse.next();

  // Public routes
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();

  // Protected routes (current app area)
  const isProtectedArea = pathname.startsWith("/nuevo-servicio");
  if (!isProtectedArea) return NextResponse.next();

  const hasSession = request.cookies.get(SESSION_COOKIE)?.value === "1";
  if (hasSession) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/:path*"],
};
