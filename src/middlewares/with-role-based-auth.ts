import { NextFetchEvent, NextResponse, type NextRequest } from "next/server";
import { CustomMiddleware } from "./chain";
import { UserRole } from "@/lib/types/auth.types";
import { decodeJWT, hasRole } from "@/lib/utils/auth.utils";

export interface RouteConfig {
  path: string;
  roles: UserRole[];
}

const protectedRoutes: RouteConfig[] = [
  { path: "/admin", roles: [UserRole.ADMIN] },
  { path: "/moderator", roles: [UserRole.MODERATOR, UserRole.ADMIN] },
  { path: "/protected", roles: [UserRole.USER, UserRole.MODERATOR, UserRole.ADMIN] },
];

export function withRoleBasedAuth(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname;
    const accessToken = request.cookies.get("Authentication");

    const matchedRoute = protectedRoutes.find((route) => pathname.startsWith(route.path));

    if (matchedRoute && accessToken) {
      const decoded = decodeJWT(accessToken.value);

      if (!decoded) {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      const hasAccess = matchedRoute.roles.some((requiredRole) => hasRole(decoded.role, requiredRole));

      if (!hasAccess) {
        return NextResponse.json(
          { error: "Forbidden", message: "You don't have permission to access this resource" },
          { status: 403 }
        );
      }
    }

    return middleware(request, event, response);
  };
}
