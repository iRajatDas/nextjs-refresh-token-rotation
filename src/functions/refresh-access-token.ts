import { authApi } from "@/lib/auth-api";
import { TOKENS } from "@/lib/constants";
import { NextResponse } from "next/server";
import { appendCookiesToNextResponse } from "./append-cookies-to-next-response";
import { extractAndParseCookies } from "./extract-and-parse-cookies";

export const refreshAccessToken = async (response: NextResponse, headers: Headers) => {
  const { refreshAccessToken } = authApi();
  const refreshAccessTokenResponse = await refreshAccessToken(headers);
  const setCookieHeader = refreshAccessTokenResponse.headers.getSetCookie().join("; ");
  const refreshedAuthCookies = extractAndParseCookies(setCookieHeader, [TOKENS.ACCESS_TOKEN, TOKENS.REFRESH_TOKEN]);
  const newResponse = appendCookiesToNextResponse(response, refreshedAuthCookies);
  return newResponse;
};
