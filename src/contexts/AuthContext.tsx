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
  refreshTokenIfNeeded: () => Promise<boolean>;
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
      console.log('🔍 AuthContext: Initializing authentication...');
      
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const userData = localStorage.getItem('user');

        console.log('🔍 AuthContext: Stored tokens check:', {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          hasUserData: !!userData,
          accessTokenLength: accessToken?.length,
          refreshTokenLength: refreshToken?.length
        });

        if (accessToken && userData) {
          try {
            // Parse user data first
            const parsedUser = JSON.parse(userData);
            console.log('🔍 AuthContext: Parsed user data:', parsedUser);
            
            // Check if we have a refresh token and try to refresh if needed
            if (refreshToken) {
              // Only refresh if we suspect the token might be expired
              // For now, we'll trust the stored token and only refresh on actual API failures
              console.log('✅ AuthContext: Setting user from stored data (with refresh token)');
              setUser(parsedUser);
            } else {
              // No refresh token, but we have access token and user data
              // This might be from a previous session, trust it for now
              console.log('✅ AuthContext: Setting user from stored data (no refresh token)');
              setUser(parsedUser);
            }
          } catch (parseError) {
            console.error('❌ AuthContext: Error parsing stored user data:', parseError);
            clearAuthData();
          }
        } else {
          console.log('❌ AuthContext: No valid stored authentication data found');
        }
      } catch (error) {
        console.error('❌ AuthContext: Auth initialization error:', error);
        clearAuthData();
      } finally {
        console.log('🔍 AuthContext: Initialization complete, setting isLoading to false');
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const clearAuthData = () => {
    console.log('🧹 AuthContext: Clearing authentication data');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Function to refresh token when needed
  const refreshTokenIfNeeded = async (): Promise<boolean> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return false;
      }

      const refreshResult = await authAPI.refreshToken({ refreshToken });
      if (refreshResult.success && refreshResult.data) {
        // Handle nested tokens structure from API (note: API uses PascalCase)
        const newAccessToken = refreshResult.data.accessToken || refreshResult.data.tokens?.AccessToken;
        const newRefreshToken = refreshResult.data.refreshToken || refreshResult.data.tokens?.RefreshToken;
        const user = refreshResult.data.user;
        
        // Update tokens
        if (newAccessToken) {
          localStorage.setItem('accessToken', newAccessToken);
        }
        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }
        
        // Update user data if provided
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        }
        
        return true;
      } else {
        clearAuthData();
        return false;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAuthData();
      return false;
    }
  };

  const saveAuthData = (authData: any) => {
    console.log('💾 AuthContext: Raw auth data received:', authData);
    console.log('💾 AuthContext: Tokens object:', authData.tokens);
    
    // Handle nested tokens structure from API (note: API uses PascalCase)
    const accessToken = authData.accessToken || authData.tokens?.AccessToken;
    const refreshToken = authData.refreshToken || authData.tokens?.RefreshToken;
    const user = authData.user;
    
    console.log('💾 AuthContext: Extracted tokens:', {
      accessToken: accessToken,
      refreshToken: refreshToken,
      accessTokenType: typeof accessToken,
      refreshTokenType: typeof refreshToken
    });
    
    console.log('💾 AuthContext: Saving authentication data:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      hasUser: !!user,
      user: user
    });
    
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      console.log('🔐 AuthContext: Attempting login for:', email);
      const result = await authAPI.login({ email, password });
      console.log('🔐 AuthContext: Login API response:', result);
      
      if (result.success && result.data) {
        saveAuthData(result.data);
      }
      
      return result;
    } catch (error) {
      console.error('❌ AuthContext: Login error:', error);
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
    refreshTokenIfNeeded,
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
