"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { authAPI, otpAPI, AuthResponse, OTPResponse } from "@/lib/api-service";
import Cookies from "js-cookie";
import axios from "axios";

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<AuthResponse>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  resetPassword: (token: string, password: string) => Promise<AuthResponse>;
  generateOTP: (
    email: string,
    type: "signup" | "login" | "forgot_password"
  ) => Promise<OTPResponse>;
  verifyOTP: (
    email: string,
    otp: string,
    type: "signup" | "login" | "forgot_password"
  ) => Promise<OTPResponse>;
  refreshTokenIfNeeded: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {

      try {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");
        const userData = await axios.get(
          "https://api.theschoolofoptions.com/api/v1/auth/get-user",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (accessToken && userData) {
          try {

            // Check if we have a refresh token and try to refresh if needed
            if (refreshToken) {
              // Only refresh if we suspect the token might be expired
              // For now, we'll trust the stored token and only refresh on actual API failures
              setUser(userData);
            } else {
              setUser(userData);
            }
          } catch (parseError) {
            console.error(
              "❌ AuthContext: Error parsing stored user data:",
              parseError
            );
            clearAuthData();
          }
        } else {
          console.log(
            "❌ AuthContext: No valid stored authentication data found"
          );
        }
      } catch (error) {
        console.error("❌ AuthContext: Auth initialization error:", error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const clearAuthData = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
  };

  // Function to refresh token when needed
  const refreshTokenIfNeeded = async (): Promise<boolean> => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        return false;
      }

      const refreshResult = await authAPI.refreshToken({ refreshToken });
      if (refreshResult.success && refreshResult.data) {
        // Handle nested tokens structure from API (note: API uses PascalCase)
        const newAccessToken =
          refreshResult.data.accessToken ||
          (refreshResult.data as any).tokens?.AccessToken;
        const newRefreshToken =
          refreshResult.data.refreshToken ||
          (refreshResult.data as any).tokens?.RefreshToken;
        const user = refreshResult.data.user;

        // Update tokens
        if (newAccessToken) {
          Cookies.set("accessToken", newAccessToken);
        }
        if (newRefreshToken) {
          Cookies.set("refreshToken", newRefreshToken);
        }

        // Update user data if provided
        if (user) {
          Cookies.set("user", JSON.stringify(user));
          setUser(user);
        }

        return true;
      } else {
        clearAuthData();
        return false;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      clearAuthData();
      return false;
    }
  };

  const saveAuthData = (authData: any) => {

    // Handle nested tokens structure from API (note: API uses PascalCase)
    const accessToken = authData.accessToken || authData.tokens?.AccessToken;
    const refreshToken = authData.refreshToken || authData.tokens?.RefreshToken;
    const user = authData.user;

    if (accessToken) {
      Cookies.set("accessToken", accessToken);
    }
    if (refreshToken) {
      Cookies.set("refreshToken", refreshToken);
    }
    if (user) {
      setUser(user);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const result = await authAPI.login({ email, password });

      if (result.success && result.data) {
        saveAuthData(result.data);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: "Login failed. Please try again.",
      };
    }
  };

  const signup = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<AuthResponse> => {
    try {
      const result = await authAPI.signup({ email, password, fullName });
      localStorage.setItem("pass", password);

      if (result.success && result.data) {
        saveAuthData(result.data);
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: "Signup failed. Please try again.",
      };
    }
  };

  const logout = () => {
    clearAuthData();
  };

  const forgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
      return await authAPI.forgotPassword({ email });
    } catch (error) {
      return {
        success: false,
        error: "Failed to send reset email. Please try again.",
      };
    }
  };

  const resetPassword = async (
    token: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      return await authAPI.resetPassword({ token, password });
    } catch (error) {
      return {
        success: false,
        error: "Failed to reset password. Please try again.",
      };
    }
  };

  const generateOTP = async (
    email: string,
    type: "signup" | "login" | "forgot_password"
  ): Promise<OTPResponse> => {
    try {
      return await otpAPI.generate({ email, type });
    } catch (error) {
      return {
        success: false,
        error: "Failed to send OTP. Please try again.",
      };
    }
  };

  const verifyOTP = async (
    email: string,
    otp: string,
    type: "signup" | "login" | "forgot_password"
  ): Promise<OTPResponse> => {
    try {
      const password = localStorage.getItem("pass");
      const result = await otpAPI.verify({
        email,
        otp,
        type,
        password: password ?? "",
      });

      if (result.success && type === "signup" && password) {
    
        const loginResult = await login(email, password);
        if (loginResult.success) {
       
          // Clean up the temporary password
          localStorage.removeItem("pass");
        } else {
          console.error(
            "❌ AuthContext: Failed to auto-login after signup verification"
          );
        }
      }

      return result;
    } catch (error) {
      console.error("Verify OTP error:", error);
      return {
        success: false,
        error: "OTP verification failed. Please try again.",
      };
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
    generateOTP,
    verifyOTP,
    refreshTokenIfNeeded,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
