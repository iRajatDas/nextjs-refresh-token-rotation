"use client";
import React from "react";
import { Button } from "./ui/button";
import { authApi } from "@/lib/auth-api";
import { clearAuthCookies } from "@/lib/utils/token.utils";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const { logout } = authApi();
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthCookies();
      router.push("/login");
    }
  };

  return <Button onClick={onLogout}>Logout</Button>;
};

export default LogoutButton;
