import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { auth } = NextAuth(authConfig);

const protectedPaths = [
  /^\/(en|it|vi)?\/shipping-address/,
  /^\/(en|it|vi)?\/payment-method/,
  /^\/(en|it|vi)?\/place-order/,
  /^\/(en|it|vi)?\/profile/,
  /^\/(en|it|vi)?\/user\/.*/,
  /^\/(en|it|vi)?\/order\/.*/,
  /^\/(en|it|vi)?\/admin/,
];

export async function protectRoutes(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;
  const isProtected = protectedPaths.some((regex) => regex.test(pathname));
  const session = await auth();

  if (!session && isProtected) {
    const locale = pathname.split("/")[1] || "en";
    const signInUrl = new URL(`/${locale}/sign-in`, request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);

    return NextResponse.redirect(signInUrl);
  }

  return null;
}