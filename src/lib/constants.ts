/**
 * Application-wide constants for frontend
 * Centralizes magic strings and configuration values
 */

// Token/Cookie names
export const TOKENS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  BASE_URL: 'http://localhost:3000/api/v1/auth',
  LOGIN: '/login',
  LOGOUT: '/logout',
  VERIFY: '/verify',
  REFRESH: '/refresh',
  REGISTER: '/register',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROTECTED: '/protected',
  PROTECTED_SERVER: '/protected/server',
  PROTECTED_CLIENT: '/protected/client',
} as const;

// Time constants (milliseconds)
export const TIME = {
  ONE_SECOND: 1000,
  ONE_MINUTE: 60 * 1000,
  FIVE_MINUTES: 5 * 60 * 1000,
  FIFTEEN_MINUTES: 15 * 60 * 1000,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Unauthorized. Please log in again.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  TOKEN_EXPIRED: 'Your session has expired. Please log in again.',
  NETWORK_ERROR: 'Network error. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logged out successfully.',
  SESSION_VERIFIED: 'Session verified.',
} as const;
