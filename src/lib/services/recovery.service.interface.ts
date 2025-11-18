import {
  RecoveryEmailRequest,
  BackupCodeRequest,
  RegenerateBackupCodesRequest,
  ApiResponse,
} from "../types/auth.types";

export interface IRecoveryService {
  addRecoveryEmail(request: RecoveryEmailRequest): Promise<ApiResponse<void>>;
  getRecoveryOptions(): Promise<ApiResponse<unknown>>;
  removeRecoveryOption(optionId: string): Promise<ApiResponse<void>>;
  getBackupCodeStatus(): Promise<ApiResponse<{ remaining: number; twoFactorEnabled: boolean }>>;
  useBackupCode(request: BackupCodeRequest): Promise<ApiResponse<void>>;
  regenerateBackupCodes(request: RegenerateBackupCodesRequest): Promise<ApiResponse<{ backupCodes: string[] }>>;
}
