export const setAuthCookies = (accessToken: string, refreshToken: string): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = `Authentication=${accessToken}; path=/; SameSite=Lax`;
  document.cookie = `Refresh=${refreshToken}; path=/; SameSite=Lax`;
};

export const clearAuthCookies = (): void => {
  if (typeof document === 'undefined') return;
  
  document.cookie = 'Authentication=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  document.cookie = 'Refresh=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const getAuthCookie = (name: 'Authentication' | 'Refresh'): string | null => {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};
