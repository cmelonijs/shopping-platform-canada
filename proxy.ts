import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { protectRoutes } from "@/lib/middleware/auth";
import { ensureSessionCartId } from "@/lib/middleware/session";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirect / → /en
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  // 2. Applica localizzazione
  const response = intlMiddleware(request);

  // 3. Imposta sessionCartId se mancante
  ensureSessionCartId(request, response);

  // 4. Proteggi le route
  const authRedirect = await protectRoutes(request);
  if (authRedirect) return authRedirect;

  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};