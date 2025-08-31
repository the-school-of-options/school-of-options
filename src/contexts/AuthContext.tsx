'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, otpAPI, AuthResponse, OTPResponse } from '@/lib/api-service';

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
  signup: (email: string, password: string, fullName: string) => Promise<AuthResponse>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<AuthResponse>;
  resetPassword: (token: string, password: string) => Promise<AuthResponse>;
  generateOTP: (email: string, type: 'signup' | 'login' | 'forgot_password') => Promise<OTPResponse>;
  verifyOTP: (email: string, otp: string, type: 'signup' | 'login' | 'forgot_password') => Promise<OTPResponse>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userData = localStorage.getItem('user');

        if (accessToken && userData) {
          // Validate token by trying to refresh it
          if (refreshToken) {
            const refreshResult = await authAPI.refreshToken({ refreshToken });
            if (refreshResult.success && refreshResult.data) {
              // Update tokens
              if (refreshResult.data.accessToken) {
                localStorage.setItem('accessToken', refreshResult.data.accessToken);
              }
              if (refreshResult.data.refreshToken) {
                localStorage.setItem('refreshToken', refreshResult.data.refreshToken);
              }
              
              // Set user from stored data or refresh response
              const userToSet = refreshResult.data.user || JSON.parse(userData);
              setUser(userToSet);
            } else {
              // Token refresh failed, clear storage
              clearAuthData();
            }
          } else {
            // No refresh token, assume user is logged in but might need to re-auth soon
            setUser(JSON.parse(userData));
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const saveAuthData = (authData: any) => {
    if (authData.accessToken) {
      localStorage.setItem('accessToken', authData.accessToken);
    }
    if (authData.refreshToken) {
      localStorage.setItem('refreshToken', authData.refreshToken);
    }
    if (authData.user) {
      localStorage.setItem('user', JSON.stringify(authData.user));
      setUser(authData.user);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const result = await authAPI.login({ email, password });
      
      if (result.success && result.data) {
        saveAuthData(result.data);
      }
      
      return result;
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Login failed. Please try again.',
      };
    }
  };

  const signup = async (email: string, password: string, fullName: string): Promise<AuthResponse> => {
    try {
      const result = await authAPI.signup({ email, password, fullName });
      
      if (result.success && result.data) {
        saveAuthData(result.data);
      }
      
      return result;
    } catch (error) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: 'Signup failed. Please try again.',
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
      console.error('Forgot password error:', error);
      return {
        success: false,
        error: 'Failed to send reset email. Please try again.',
      };
    }
  };

  const resetPassword = async (token: string, password: string): Promise<AuthResponse> => {
    try {
      return await authAPI.resetPassword({ token, password });
    } catch (error) {
      console.error('Reset password error:', error);
      return {
        success: false,
        error: 'Failed to reset password. Please try again.',
      };
    }
  };

  const generateOTP = async (email: string, type: 'signup' | 'login' | 'forgot_password'): Promise<OTPResponse> => {
    try {
      return await otpAPI.generate({ email, type });
    } catch (error) {
      console.error('Generate OTP error:', error);
      return {
        success: false,
        error: 'Failed to send OTP. Please try again.',
      };
    }
  };

  const verifyOTP = async (email: string, otp: string, type: 'signup' | 'login' | 'forgot_password'): Promise<OTPResponse> => {
    try {
      return await otpAPI.verify({ email, otp, type });
    } catch (error) {
      console.error('Verify OTP error:', error);
      return {
        success: false,
        error: 'OTP verification failed. Please try again.',
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
