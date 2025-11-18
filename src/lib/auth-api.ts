import { XiorResponse } from "xior";
import { API_ENDPOINTS } from "./constants";
import xiorClient from "./xior";

const BACKEND_URL = API_ENDPOINTS.BASE_URL;

interface Response {
  success: boolean;
  message?: string;
  user?: Record<string, unknown>;
}

interface AuthApi {
  login: (email: string, password: string) => Promise<XiorResponse<Response>>;
  logout: (headers?: Headers) => Promise<XiorResponse<Response>>;
  verifyAccessToken: (headers?: Headers) => Promise<XiorResponse<Response>>;
  refreshAccessToken: (headers?: Headers) => Promise<XiorResponse<Response>>;
}

export const authApi = (): AuthApi => {
  return {
    login,
    logout,
    verifyAccessToken,
    refreshAccessToken,
  };
};

const login = (email: string, password: string) => {
  return xiorClient.post<Response>(`${BACKEND_URL}${API_ENDPOINTS.LOGIN}`, { email, password });
};

const logout = (headers?: Headers) => {
  return xiorClient.get<Response>(`${BACKEND_URL}${API_ENDPOINTS.LOGOUT}`, { headers });
};

const verifyAccessToken = (headers?: Headers) => {
  return xiorClient.get<Response>(`${BACKEND_URL}${API_ENDPOINTS.VERIFY}`, { headers });
};

const refreshAccessToken = (headers?: Headers) => {
  return xiorClient.get<Response>(`${BACKEND_URL}${API_ENDPOINTS.REFRESH}`, { headers });
};
