import {
  User,
  UpdateUserRoleRequest,
  PaginatedResponse,
  ApiResponse,
  UserRole,
} from "../types/auth.types";

export interface IAdminService {
  getAllUsers(page?: number, limit?: number, role?: UserRole): Promise<ApiResponse<PaginatedResponse<User>>>;
  updateUserRole(userId: string, request: UpdateUserRoleRequest): Promise<ApiResponse<User>>;
  deactivateUser(userId: string): Promise<ApiResponse<void>>;
  activateUser(userId: string): Promise<ApiResponse<void>>;
}
