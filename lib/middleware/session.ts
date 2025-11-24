import { NextRequest, NextResponse } from "next/server";

export function ensureSessionCartId(request: NextRequest, response: NextResponse): void {
  const cartId = request.cookies.get("sessionCartId")?.value;
  if (!cartId) {
    const newCartId = crypto.randomUUID();
    response.cookies.set("sessionCartId", newCartId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }
}