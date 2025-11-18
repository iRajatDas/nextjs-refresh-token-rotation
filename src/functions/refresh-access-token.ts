import { authApi } from "@/lib/auth-api";
import { NextResponse } from "next/server";
import { extractAndParseCookies } from "./extract-and-parse-cookies";
import { appendCookiesToNextResponse } from "./append-cookies-to-next-response";

export const refreshAccessToken = async (response: NextResponse) => {
  const { refreshAccessToken } = authApi();
  const refreshResponse = await refreshAccessToken();
  const setCookieHeader = refreshResponse.headers["set-cookie"];
  if (setCookieHeader) {
    const cookieString = Array.isArray(setCookieHeader) ? setCookieHeader.join("; ") : setCookieHeader;
    const refreshedAuthCookies = extractAndParseCookies(cookieString, ["Authentication", "Refresh"]);
    const newResponse = appendCookiesToNextResponse(response, refreshedAuthCookies);
    return newResponse;
  }
  return response;
};
