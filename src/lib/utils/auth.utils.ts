import { UserRole } from "../types/auth.types";

export interface DecodedToken {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export const decodeJWT = (token: string): DecodedToken | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as DecodedToken;
  } catch {
    return null;
  }
};

export const hasRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    [UserRole.USER]: 1,
    [UserRole.MODERATOR]: 2,
    [UserRole.ADMIN]: 3,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};

export const hasAnyRole = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole);
};
