import { httpClient } from "../http/http-client";
import { AuthService } from "./auth.service";
import { UserService } from "./user.service";
import { TwoFactorService } from "./two-factor.service";
import { RecoveryService } from "./recovery.service";
import { AdminService } from "./admin.service";
import { IAuthService } from "./auth.service.interface";
import { IUserService } from "./user.service.interface";
import { ITwoFactorService } from "./two-factor.service.interface";
import { IRecoveryService } from "./recovery.service.interface";
import { IAdminService } from "./admin.service.interface";

class ServiceFactory {
  private authService: IAuthService | null = null;
  private userService: IUserService | null = null;
  private twoFactorService: ITwoFactorService | null = null;
  private recoveryService: IRecoveryService | null = null;
  private adminService: IAdminService | null = null;

  getAuthService(): IAuthService {
    if (!this.authService) {
      this.authService = new AuthService(httpClient);
    }
    return this.authService;
  }

  getUserService(): IUserService {
    if (!this.userService) {
      this.userService = new UserService(httpClient);
    }
    return this.userService;
  }

  getTwoFactorService(): ITwoFactorService {
    if (!this.twoFactorService) {
      this.twoFactorService = new TwoFactorService(httpClient);
    }
    return this.twoFactorService;
  }

  getRecoveryService(): IRecoveryService {
    if (!this.recoveryService) {
      this.recoveryService = new RecoveryService(httpClient);
    }
    return this.recoveryService;
  }

  getAdminService(): IAdminService {
    if (!this.adminService) {
      this.adminService = new AdminService(httpClient);
    }
    return this.adminService;
  }
}

export const serviceFactory = new ServiceFactory();

export const authService = serviceFactory.getAuthService();
export const userService = serviceFactory.getUserService();
export const twoFactorService = serviceFactory.getTwoFactorService();
export const recoveryService = serviceFactory.getRecoveryService();
export const adminService = serviceFactory.getAdminService();
