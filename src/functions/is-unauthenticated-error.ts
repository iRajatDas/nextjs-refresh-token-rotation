import { AxiosError } from "axios";

export const isUnauthorizedError = (error: unknown): boolean => {
  if (error instanceof AxiosError && error.response?.status === 401) {
    return true;
  }
  return false;
};
