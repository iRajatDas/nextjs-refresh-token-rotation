import {
  TwoFactorSetupResponse,
  TwoFactorConfirmRequest,
  DisableTwoFactorRequest,
  ApiResponse,
} from "../types/auth.types";

export interface ITwoFactorService {
  enable(): Promise<ApiResponse<TwoFactorSetupResponse>>;
  confirm(request: TwoFactorConfirmRequest): Promise<ApiResponse<void>>;
  disable(request: DisableTwoFactorRequest): Promise<ApiResponse<void>>;
}
