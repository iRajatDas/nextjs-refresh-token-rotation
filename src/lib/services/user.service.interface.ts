import {
  User,
  UpdateProfileRequest,
  ActivityLog,
  Session,
  PaginatedResponse,
  ApiResponse,
} from "../types/auth.types";

export interface IUserService {
  getProfile(): Promise<ApiResponse<User>>;
  updateProfile(request: UpdateProfileRequest): Promise<ApiResponse<User>>;
  getActivityLog(page?: number, limit?: number): Promise<ApiResponse<PaginatedResponse<ActivityLog>>>;
  getActiveSessions(): Promise<ApiResponse<Session[]>>;
  revokeSession(sessionId: string): Promise<ApiResponse<void>>;
  logoutAllDevices(): Promise<ApiResponse<void>>;
}
