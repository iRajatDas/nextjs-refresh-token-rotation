import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  ChangePasswordRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
  VerifyEmailRequest,
  User,
  ApiResponse,
} from "../types/auth.types";

export interface IAuthService {
  register(request: RegisterRequest): Promise<ApiResponse<User>>;
  login(request: LoginRequest): Promise<ApiResponse<LoginResponse>>;
  logout(refreshToken: string): Promise<ApiResponse<void>>;
  refreshToken(request: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>>;
  verifyAccessToken(): Promise<ApiResponse<void>>;
  changePassword(request: ChangePasswordRequest): Promise<ApiResponse<void>>;
  requestPasswordReset(request: PasswordResetRequest): Promise<ApiResponse<void>>;
  resetPassword(request: PasswordResetConfirmRequest): Promise<ApiResponse<void>>;
  verifyEmail(request: VerifyEmailRequest): Promise<ApiResponse<void>>;
  resendVerification(email: string): Promise<ApiResponse<void>>;
}
