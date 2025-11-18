import { AxiosHttpClient } from "./axios-http-client";
import { isClientSide } from "@/functions/is-client-side";
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { setAuthCookies, getAuthCookie } from "../utils/token.utils";
import { RefreshTokenResponse, LoginResponse } from "../types/auth.types";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  config: InternalAxiosRequestConfig;
}> = [];

const processQueue = (error: AxiosError | null, httpClient: AxiosHttpClient) => {
  failedQueue.forEach((prom) => {
    if (!error && prom.config.url) {
      const method = (prom.config.method || "get").toLowerCase() as "get" | "post" | "put" | "patch" | "delete";
      httpClient[method](prom.config.url, prom.config.data, prom.config)
        .then(prom.resolve)
        .catch(prom.reject);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

const createHttpClient = () => {
  const httpClient = new AxiosHttpClient({
    baseURL: BACKEND_URL,
    withCredentials: true,
  });

  const requestInterceptor = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    if (!isClientSide()) {
      const { cookies } = await import("next/headers");
      const cookiesString = cookies()
        .getAll()
        .map((item) => `${item.name}=${item.value}`)
        .join("; ");
      config.headers = config.headers || {};
      config.headers.cookie = cookiesString;
    } else {
      const accessToken = getAuthCookie('Authentication');
      if (accessToken && !config.headers?.Authorization) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  };

  const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    if (isClientSide() && response.data) {
      const data = response.data as LoginResponse | RefreshTokenResponse;
      if (data.accessToken && data.refreshToken) {
        setAuthCookies(data.accessToken, data.refreshToken);
      }
    }
    return response;
  };

  const errorInterceptor = async (error: AxiosError): Promise<never> => {
    const originalRequest = error.config as InternalAxiosRequestConfig;

    if (
      error.response?.status === 401 &&
      isClientSide() &&
      !originalRequest?.url?.includes("/login") &&
      !originalRequest?.url?.includes("/refresh")
    ) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const refreshToken = getAuthCookie('Refresh');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }
          
          const refreshResponse = await httpClient.post("/auth/refresh", { refreshToken });
          const data = refreshResponse.data as RefreshTokenResponse;
          
          if (data.accessToken && data.refreshToken) {
            setAuthCookies(data.accessToken, data.refreshToken);
          }
          
          isRefreshing = false;
          processQueue(null, httpClient);

          if (originalRequest?.url) {
            const method = (originalRequest.method || "get").toLowerCase() as "get" | "post" | "put" | "patch" | "delete";
            return httpClient[method](originalRequest.url, originalRequest.data, originalRequest) as never;
          }
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError as AxiosError, httpClient);
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve, reject) => {
        if (originalRequest) {
          failedQueue.push({ resolve, reject, config: originalRequest });
        } else {
          reject(error);
        }
      }) as never;
    }

    if (isClientSide() && error.response?.status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  };

  httpClient.setInterceptors(requestInterceptor, responseInterceptor, errorInterceptor);

  return httpClient;
};

export const httpClient = createHttpClient();
