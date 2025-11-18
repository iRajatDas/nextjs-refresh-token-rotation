import { NextResponse } from "next/server";
import { authApi } from "@/lib/auth-api";
import { appendCookiesToNextResponse } from "./append-cookies-to-next-response";
import { extractAndParseCookies } from "./extract-and-parse-cookies";

export const logout = async (response: NextResponse) => {
  const { logout } = authApi();
  const logoutResponse = await logout();
  const setCookieHeader = logoutResponse.headers["set-cookie"];
  if (setCookieHeader) {
    const cookieString = Array.isArray(setCookieHeader) ? setCookieHeader.join("; ") : setCookieHeader;
    const removedAuthCookies = extractAndParseCookies(cookieString, ["Authentication", "Refresh"]);
    const newResponse = appendCookiesToNextResponse(response, removedAuthCookies);
    return newResponse;
  }
  return response;
};
