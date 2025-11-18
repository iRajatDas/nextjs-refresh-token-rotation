import { authApi } from "@/lib/auth-api";

export const verifyAccessToken = async () => {
  const { verifyAccessToken } = authApi();
  await verifyAccessToken();
};
