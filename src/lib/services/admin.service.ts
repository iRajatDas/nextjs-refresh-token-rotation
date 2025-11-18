import { IHttpClient } from "../interfaces/http-client.interface";
import { IAdminService } from "./admin.service.interface";
import {
  User,
  UpdateUserRoleRequest,
  PaginatedResponse,
  ApiResponse,
  UserRole,
} from "../types/auth.types";

export class AdminService implements IAdminService {
  constructor(private readonly httpClient: IHttpClient) {}

  async getAllUsers(
    page = 1,
    limit = 10,
    role?: UserRole
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    let url = `/users/admin/users?page=${page}&limit=${limit}`;
    if (role) {
      url += `&role=${role}`;
    }
    const response = await this.httpClient.get<ApiResponse<PaginatedResponse<User>>>(url);
    return response.data;
  }

  async updateUserRole(userId: string, request: UpdateUserRoleRequest): Promise<ApiResponse<User>> {
    const response = await this.httpClient.patch<ApiResponse<User>>(
      `/users/admin/users/${userId}/role`,
      request
    );
    return response.data;
  }

  async deactivateUser(userId: string): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>(`/users/admin/users/${userId}/deactivate`);
    return response.data;
  }

  async activateUser(userId: string): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>(`/users/admin/users/${userId}/activate`);
    return response.data;
  }
}
