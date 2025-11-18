import { IHttpClient } from "../interfaces/http-client.interface";
import { IRecoveryService } from "./recovery.service.interface";
import {
  RecoveryEmailRequest,
  BackupCodeRequest,
  RegenerateBackupCodesRequest,
  ApiResponse,
} from "../types/auth.types";

export class RecoveryService implements IRecoveryService {
  constructor(private readonly httpClient: IHttpClient) {}

  async addRecoveryEmail(request: RecoveryEmailRequest): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/recovery/recovery-email/add", request);
    return response.data;
  }

  async getRecoveryOptions(): Promise<ApiResponse<unknown>> {
    const response = await this.httpClient.get<ApiResponse<unknown>>("/recovery/recovery-options");
    return response.data;
  }

  async removeRecoveryOption(optionId: string): Promise<ApiResponse<void>> {
    const response = await this.httpClient.delete<ApiResponse<void>>(`/recovery/recovery-options/${optionId}`);
    return response.data;
  }

  async getBackupCodeStatus(): Promise<ApiResponse<{ remaining: number; twoFactorEnabled: boolean }>> {
    const response = await this.httpClient.get<ApiResponse<{ remaining: number; twoFactorEnabled: boolean }>>(
      "/recovery/backup-codes/status"
    );
    return response.data;
  }

  async useBackupCode(request: BackupCodeRequest): Promise<ApiResponse<void>> {
    const response = await this.httpClient.post<ApiResponse<void>>("/recovery/backup-code/use", request);
    return response.data;
  }

  async regenerateBackupCodes(
    request: RegenerateBackupCodesRequest
  ): Promise<ApiResponse<{ backupCodes: string[] }>> {
    const response = await this.httpClient.post<ApiResponse<{ backupCodes: string[] }>>(
      "/recovery/backup-codes/regenerate",
      request
    );
    return response.data;
  }
}
