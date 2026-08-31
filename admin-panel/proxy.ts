import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  console.log("🔥 PROXY HIT:", request.nextUrl.pathname);

  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("token");

  console.log("🍪 TOKEN:", token ? "FOUND" : "NOT FOUND");

  if (!token) {
    console.log("🔐 REDIRECTING TO LOGIN");

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/products/:path*",
    "/categories/:path*",
    "/orders/:path*",
    "/customers/:path*",
    "/users/:path*",
    "/brands/:path*",
    "/banners/:path*",
    "/coupons/:path*",
    "/reviews/:path*",
    "/reports/:path*",
    "/newsletter/:path*",
    "/bulk-sms/:path*",
    "/pages/:path*",
    "/settings/:path*",
  ],
};