import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";
import { verifyAccessToken } from "@/functions/verify-access-token";
import { refreshAccessToken } from "@/functions/refresh-access-token";
import { logout } from "@/functions/logout";

export function withAuth(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("Authentication");

    const isProtectedRoute = (pathname: string) => pathname.includes("/protected");

    if (isProtectedRoute(pathname) && !accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!isProtectedRoute(pathname) && accessToken) {
      return NextResponse.redirect(new URL("/protected/server", request.url));
    }

    try {
      if (isProtectedRoute(pathname) && accessToken) {
        await verifyAccessToken();
      }
    } catch (_) {
      try {
        response = await refreshAccessToken(response);
      } catch (_) {
        response = await logout(response);
      }
    }

    return middleware(request, event, response);
  };
}
