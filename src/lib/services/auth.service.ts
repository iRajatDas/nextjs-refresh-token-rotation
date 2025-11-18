import { IHttpClient } from "../interfaces/http-client.interface";
import { IAuthService } from "./auth.service.interface";
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

export class AuthService implements IAuthService {
  constructor(private readonly httpClient: IHttpClient) {}

  async register(request: RegisterRequest): Promise<ApiResponse<User>> {
    const response = await this.httpClient.post<ApiResponse<User>>("/auth/register", request);
    return response.data;
  }

  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.httpClient.post<ApiResponse<LoginResponse>>("/auth/login", request);
    return response.data;
  }

  async logout(refreshToken: string): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/auth/logout", { refreshToken });
    return response.data;
  }

  async refreshToken(request: RefreshTokenRequest): Promise<ApiResponse<RefreshTokenResponse>> {
    const response = await this.httpClient.post<ApiResponse<RefreshTokenResponse>>("/auth/refresh", request);
    return response.data;
  }

  async verifyAccessToken(): Promise<ApiResponse<void>> {
    const response = await this.httpClient.get<ApiResponse<void>>("/auth/verify");
    return response.data;
  }

  async changePassword(request: ChangePasswordRequest): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/auth/change-password", request);
    return response.data;
  }

  async requestPasswordReset(request: PasswordResetRequest): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/auth/request-password-reset", request);
    return response.data;
  }

  async resetPassword(request: PasswordResetConfirmRequest): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/auth/reset-password", request);
    return response.data;
  }

  async verifyEmail(request: VerifyEmailRequest): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/auth/verify-email", request);
    return response.data;
  }

  async resendVerification(email: string): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/auth/resend-verification", { email });
    return response.data;
  }
}
