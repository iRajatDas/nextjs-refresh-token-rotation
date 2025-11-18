import { IHttpClient } from "../interfaces/http-client.interface";
import { ITwoFactorService } from "./two-factor.service.interface";
import {
  TwoFactorSetupResponse,
  TwoFactorConfirmRequest,
  DisableTwoFactorRequest,
  ApiResponse,
} from "../types/auth.types";

export class TwoFactorService implements ITwoFactorService {
  constructor(private readonly httpClient: IHttpClient) {}

  async enable(): Promise<ApiResponse<TwoFactorSetupResponse>> {
    const response = await this.httpClient.post<ApiResponse<TwoFactorSetupResponse>>("/users/2fa/enable");
    return response.data;
  }

  async confirm(request: TwoFactorConfirmRequest): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/users/2fa/confirm", request);
    return response.data;
  }

  async disable(request: DisableTwoFactorRequest): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/users/2fa/disable", request);
    return response.data;
  }
}
