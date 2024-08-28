import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/profile", "/settings"];
  const publicRoutes = ["/login", "/register"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken");

  if (isPublicRoute && accessToken) {
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute) {
    if (!accessToken) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    try {
      return NextResponse.next();
    } catch (error) {
      console.error("Error during authentication:", error);
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
