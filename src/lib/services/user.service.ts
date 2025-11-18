import { IHttpClient } from "../interfaces/http-client.interface";
import { IUserService } from "./user.service.interface";
import {
  User,
  UpdateProfileRequest,
  ActivityLog,
  Session,
  PaginatedResponse,
  ApiResponse,
} from "../types/auth.types";

export class UserService implements IUserService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await this.httpClient.get<ApiResponse<User>>("/users/profile");
    return response.data;
  }

  async updateProfile(request: UpdateProfileRequest): Promise<ApiResponse<User>> {
    const response = await this.httpClient.patch<ApiResponse<User>>("/users/profile", request);
    return response.data;
  }

  async getActivityLog(page = 1, limit = 10): Promise<ApiResponse<PaginatedResponse<ActivityLog>>> {
    const response = await this.httpClient.get<ApiResponse<PaginatedResponse<ActivityLog>>>(
      `/users/activity?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async getActiveSessions(): Promise<ApiResponse<Session[]>> {
    const response = await this.httpClient.get<ApiResponse<Session[]>>("/users/sessions");
    return response.data;
  }

  async revokeSession(sessionId: string): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>(`/users/sessions/${sessionId}/revoke`);
    return response.data;
  }

  async logoutAllDevices(): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/users/sessions/logout-all");
    return response.data;
  }
}
