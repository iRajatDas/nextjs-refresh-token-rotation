# Authentication API Usage Guide

This document provides examples for using the authentication services in this Next.js application.

## Architecture Overview

The application follows SOLID principles with a clean, maintainable architecture:

- **Interface Segregation**: Separate interfaces for each service domain
- **Dependency Inversion**: Services depend on abstractions, not concrete implementations
- **Single Responsibility**: Each service handles one specific domain
- **Open/Closed**: Services can be extended without modification

## Services Available

### 1. AuthService
Handles user authentication and password management.

```typescript
import { authService } from "@/lib/api";

// Register a new user
const registerUser = async () => {
  const response = await authService.register({
    email: "user@example.com",
    username: "johndoe",
    password: "SecurePass123!",
    firstName: "John",
    lastName: "Doe"
  });
};

// Login
const login = async () => {
  const response = await authService.login({
    email: "user@example.com",
    password: "SecurePass123!"
  });
  // For 2FA enabled accounts, use:
  // const response = await authService.login({
  //   email: "user@example.com",
  //   password: "SecurePass123!",
  //   twoFactorToken: "123456",
  //   tempToken: "<temp-token-from-first-login-attempt>"
  // });
};

// Logout
const logout = async () => {
  await authService.logout("refresh-token-here");
};

// Change Password
const changePassword = async () => {
  await authService.changePassword({
    oldPassword: "OldPass123!",
    newPassword: "NewPass123!"
  });
};

// Request Password Reset
const requestReset = async () => {
  await authService.requestPasswordReset({
    email: "user@example.com"
  });
};

// Reset Password with Token
const resetPassword = async () => {
  await authService.resetPassword({
    token: "reset-token-from-email",
    newPassword: "NewPass123!"
  });
};

// Verify Email
const verifyEmail = async () => {
  await authService.verifyEmail({
    token: "verification-token-from-email"
  });
};

// Resend Verification Email
const resendVerification = async () => {
  await authService.resendVerification("user@example.com");
};
```

### 2. UserService
Manages user profile, activity logs, and sessions.

```typescript
import { userService } from "@/lib/api";

// Get User Profile
const getProfile = async () => {
  const response = await userService.getProfile();
  console.log(response.data);
};

// Update Profile
const updateProfile = async () => {
  await userService.updateProfile({
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith"
  });
};

// Get Activity Log
const getActivityLog = async () => {
  const response = await userService.getActivityLog(1, 20); // page 1, 20 items
  console.log(response.data);
};

// Get Active Sessions
const getSessions = async () => {
  const response = await userService.getActiveSessions();
  console.log(response.data);
};

// Revoke Specific Session
const revokeSession = async (sessionId: string) => {
  await userService.revokeSession(sessionId);
};

// Logout from All Devices
const logoutAll = async () => {
  await userService.logoutAllDevices();
};
```

### 3. TwoFactorService
Handles two-factor authentication setup and management.

```typescript
import { twoFactorService } from "@/lib/api";

// Enable 2FA (Step 1: Get QR Code)
const enable2FA = async () => {
  const response = await twoFactorService.enable();
  // response.data contains: secret, qrCode, backupCodes
  // Show QR code to user to scan with authenticator app
};

// Confirm 2FA (Step 2: Verify with Token)
const confirm2FA = async () => {
  await twoFactorService.confirm({
    twoFactorToken: "123456", // from authenticator app
    secret: "secret-from-enable-step"
  });
};

// Disable 2FA
const disable2FA = async () => {
  await twoFactorService.disable({
    password: "UserPassword123!"
  });
};
```

### 4. RecoveryService
Manages backup codes and recovery options.

```typescript
import { recoveryService } from "@/lib/api";

// Add Recovery Email
const addRecoveryEmail = async () => {
  await recoveryService.addRecoveryEmail({
    recoveryEmail: "recovery@example.com"
  });
};

// Get Recovery Options
const getRecoveryOptions = async () => {
  const response = await recoveryService.getRecoveryOptions();
  console.log(response.data);
};

// Remove Recovery Option
const removeRecoveryOption = async (optionId: string) => {
  await recoveryService.removeRecoveryOption(optionId);
};

// Get Backup Code Status
const getBackupCodeStatus = async () => {
  const response = await recoveryService.getBackupCodeStatus();
  console.log(`Remaining codes: ${response.data?.remaining}`);
};

// Use Backup Code
const useBackupCode = async () => {
  await recoveryService.useBackupCode({
    userId: "user-id",
    backupCode: "XXXX-XXXX-XXXX"
  });
};

// Regenerate Backup Codes
const regenerateBackupCodes = async () => {
  const response = await recoveryService.regenerateBackupCodes({
    password: "UserPassword123!"
  });
  // response.data.backupCodes contains new codes
};
```

### 5. AdminService
Admin-only functions for user management (requires ADMIN role).

```typescript
import { adminService, UserRole } from "@/lib/api";

// Get All Users
const getAllUsers = async () => {
  const response = await adminService.getAllUsers(1, 10, UserRole.USER);
  console.log(response.data);
};

// Update User Role
const updateUserRole = async (userId: string) => {
  await adminService.updateUserRole(userId, {
    role: UserRole.MODERATOR
  });
};

// Deactivate User
const deactivateUser = async (userId: string) => {
  await adminService.deactivateUser(userId);
};

// Activate User
const activateUser = async (userId: string) => {
  await adminService.activateUser(userId);
};
```

## Role-Based Access Control

The application supports three user roles with hierarchical permissions:

- **USER**: Basic user access
- **MODERATOR**: Moderate content and users
- **ADMIN**: Full system access

### Configuring Protected Routes

Edit `src/middlewares/with-role-based-auth.ts` to configure route access:

```typescript
const protectedRoutes: RouteConfig[] = [
  { path: "/admin", roles: [UserRole.ADMIN] },
  { path: "/moderator", roles: [UserRole.MODERATOR, UserRole.ADMIN] },
  { path: "/protected", roles: [UserRole.USER, UserRole.MODERATOR, UserRole.ADMIN] },
];
```

## Environment Variables

Set the following in your `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## HTTP Client Configuration

The HTTP client is configured with automatic token refresh and cookie handling:

- Automatically attaches cookies in server-side requests
- Handles 401 responses with token refresh
- Queues failed requests during token refresh
- Redirects to login on authentication failure

## Error Handling

All services throw errors that can be caught:

```typescript
try {
  await authService.login({ email, password });
} catch (error) {
  if (error instanceof AxiosError) {
    console.error('Login failed:', error.response?.data);
  }
}
```

## TypeScript Types

All request and response types are exported from `@/lib/api`:

```typescript
import {
  User,
  UserRole,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ApiResponse,
  // ... and more
} from "@/lib/api";
```

## Backend API Specification

The complete API specification is available in `postman_collection.json`. Import it into Postman for detailed endpoint documentation and testing.
