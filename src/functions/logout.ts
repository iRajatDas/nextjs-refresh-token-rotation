import { authApi } from "@/lib/auth-api";
import { NextResponse } from "next/server";
import { appendCookiesToNextResponse } from "./append-cookies-to-next-response";
import { extractAndParseCookies } from "./extract-and-parse-cookies";
import { TOKENS } from "@/lib/constants";

export const logout = async (response: NextResponse, headers: Headers) => {
  const { logout } = authApi();
  const refreshAccessTokenResponse = await logout(headers);
  const setCookieHeader = refreshAccessTokenResponse.headers.getSetCookie().join("; ");
  const removedAuthCookies = extractAndParseCookies(setCookieHeader, [TOKENS.ACCESS_TOKEN, TOKENS.REFRESH_TOKEN]);
  const newResponse = appendCookiesToNextResponse(response, removedAuthCookies);
  return newResponse;
};
