import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export const { auth: authMiddleware } = NextAuth(authConfig);

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Redirect / → /en
  if (pathname === "/") {
    const locale = "en"; // imposta la lingua predefinita
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // 2. Imposta sessionCartId se non esiste
  const response = intlMiddleware(request);
  const cartId = request.cookies.get("sessionCartId")?.value;

  if (!cartId) {
    const newCartId = crypto.randomUUID();
    response.cookies.set("sessionCartId", newCartId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};