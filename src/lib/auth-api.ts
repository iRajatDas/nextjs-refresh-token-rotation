import { httpClient } from "./http/http-client";
import { LoginRequest } from "./types/auth.types";

export const authApi = () => {
  return {
    login: async (email: string, password: string) => {
      const request: LoginRequest = { email, password };
      return httpClient.post("/auth/login", request);
    },
    logout: async () => {
      return httpClient.post("/auth/logout");
    },
    verifyAccessToken: async () => {
      return httpClient.get("/auth/verify");
    },
    refreshAccessToken: async () => {
      return httpClient.post("/auth/refresh");
    },
  };
};
