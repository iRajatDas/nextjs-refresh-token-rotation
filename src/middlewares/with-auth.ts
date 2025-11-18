import { createAuthHeaders } from "@/functions/create-auth-headers";
import { refreshAccessToken } from "@/functions/refresh-access-token";
import { verifyAccessToken } from "@/functions/verify-access-token";
import { ROUTES, TOKENS } from "@/lib/constants";
import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";

export function withAuth(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get(TOKENS.ACCESS_TOKEN);
    const refreshToken = request.cookies.get(TOKENS.REFRESH_TOKEN);
    const headers = createAuthHeaders(request.headers, { accessToken, refreshToken });

    const isProtectedRoute = (pathname: string) => pathname.includes(ROUTES.PROTECTED);

    if (isProtectedRoute(pathname) && !accessToken) {
      return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
    }

    if (!isProtectedRoute(pathname) && accessToken) {
      return NextResponse.redirect(new URL(ROUTES.PROTECTED_SERVER, request.url));
    }

    try {
      if (isProtectedRoute(pathname) && accessToken) {
        await verifyAccessToken(headers);
      }
    } catch (_) {
      try {
        response = await refreshAccessToken(response, headers);
      } catch (error) {
        // Refresh failed - redirect to login and clear cookies
        const loginResponse = NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
        loginResponse.cookies.delete(TOKENS.ACCESS_TOKEN);
        loginResponse.cookies.delete(TOKENS.REFRESH_TOKEN);
        return loginResponse;
      }
    }

    return middleware(request, event, response);
  };
}
