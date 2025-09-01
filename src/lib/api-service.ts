import axios from 'axios';

// Configure axios instance with default settings
const api = axios.create({
  baseURL: 'https://api.theschoolofoptions.com/api/v1',
  timeout: 15000, // 15 seconds for slower connections
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Handle CORS if needed
  withCredentials: false,
});

// Add request interceptor for authentication and logging
api.interceptors.request.use(
  (config) => {
    // Add Authorization header if access token exists
    const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (accessToken && !config.url?.includes('/auth/') && !config.url?.includes('/otp/')) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (unauthorized) by attempting token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
        if (refreshToken) {
          const refreshResult = await api.post('/auth/refresh-token', { refreshToken });
          
          // Handle nested tokens structure from API (note: API uses PascalCase)
          const newAccessToken = refreshResult.data?.accessToken || refreshResult.data?.tokens?.AccessToken;
          const newRefreshToken = refreshResult.data?.refreshToken || refreshResult.data?.tokens?.RefreshToken;
          
          if (newAccessToken) {
            // Update stored token
            localStorage.setItem('accessToken', newAccessToken);
            if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
            }
            
            // Update the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            
            // Retry the original request
            return api(originalRequest);
          }
        }
      } catch (refreshError) {
        // Refresh failed, clear auth data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
        }
        console.error('Token refresh failed:', refreshError);
      }
    }
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface OTPGenerateRequest {
  email: string;
  type: 'signup' | 'login' | 'forgot_password';
}

export interface OTPVerifyRequest {
  email: string;
  otp: string;
  type: 'signup' | 'login' | 'forgot_password';
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user?: {
      id: string;
      email: string;
      fullName: string;
    };
    accessToken?: string;
    refreshToken?: string;
  };
  error?: string;
}

export interface OTPResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// Newsletter interfaces
export interface SubscribeRequest {
  email: string;
}

export interface SubscribeResponse {
  success: boolean;
  message?: string;
}

// Retry function for network requests
const retryRequest = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 2,
  delay: number = 1000
): Promise<T> => {
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries) throw error;
      
      // Only retry on network errors or timeouts
      if (axios.isAxiosError(error) && (
        error.code === 'ECONNABORTED' || 
        error.code === 'ENOTFOUND' || 
        error.code === 'ECONNREFUSED' ||
        !error.response
      )) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
        continue;
      }
      
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
};

// Authentication API
export const authAPI = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      console.log('🌐 API: Sending login request for:', data.email);
      const response = await retryRequest(() => api.post('/auth/login', data));
      console.log('🌐 API: Login response received:', response.data);
      
      return {
        success: true,
        message: 'Login successful',
        data: response.data,
      };
    } catch (error) {
      console.error('🌐 API: Login request failed:', error);
      return handleAuthError(error, 'Login failed');
    }
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      const response = await retryRequest(() => api.post('/auth/signup', data));
      
      return {
        success: true,
        message: 'Account created successfully',
        data: response.data,
      };
    } catch (error) {
      return handleAuthError(error, 'Signup failed');
    }
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<AuthResponse> => {
    try {
      const response = await retryRequest(() => api.post('/auth/forgot-password', data));
      
      return {
        success: true,
        message: 'Password reset instructions sent to your email',
        data: response.data,
      };
    } catch (error) {
      return handleAuthError(error, 'Failed to send reset email');
    }
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<AuthResponse> => {
    try {
      const response = await retryRequest(() => api.post('/auth/reset-password', data));
      
      return {
        success: true,
        message: 'Password reset successfully',
        data: response.data,
      };
    } catch (error) {
      return handleAuthError(error, 'Failed to reset password');
    }
  },

  refreshToken: async (data: RefreshTokenRequest): Promise<AuthResponse> => {
    try {
      const response = await retryRequest(() => api.post('/auth/refresh-token', data));
      
      return {
        success: true,
        message: 'Token refreshed successfully',
        data: response.data,
      };
    } catch (error) {
      return handleAuthError(error, 'Failed to refresh token');
    }
  },
};

// OTP API
export const otpAPI = {
  generate: async (data: OTPGenerateRequest): Promise<OTPResponse> => {
    try {
      const response = await retryRequest(() => api.post('/otp/generate', data));
      
      return {
        success: true,
        message: 'OTP sent successfully',
      };
    } catch (error) {
      return handleOTPError(error, 'Failed to send OTP');
    }
  },

  verify: async (data: OTPVerifyRequest): Promise<OTPResponse> => {
    try {
      const response = await retryRequest(() => api.post('/otp/verify', data));
      
      return {
        success: true,
        message: 'OTP verified successfully',
      };
    } catch (error) {
      return handleOTPError(error, 'OTP verification failed');
    }
  },
};

// Helper function to handle auth errors
const handleAuthError = (error: any, defaultMessage: string): AuthResponse => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: 'Connection timeout. Please try again later.',
      };
    } else if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data?.message || error.response.data?.error;
      
      if (status === 401) {
        return {
          success: false,
          error: 'Invalid credentials. Please check your email and password.',
        };
      } else if (status === 409) {
        return {
          success: false,
          error: 'Email already exists. Please use a different email or try logging in.',
        };
      } else if (status === 400) {
        return {
          success: false,
          error: errorMessage || 'Invalid request. Please check your information.',
        };
      } else if (status >= 500) {
        return {
          success: false,
          error: 'Server error. Please try again in a few minutes.',
        };
      } else {
        return {
          success: false,
          error: errorMessage || defaultMessage,
        };
      }
    } else if (error.request) {
      return {
        success: false,
        error: 'Unable to connect to server. Please check your internet connection.',
      };
    }
  }
  
  return {
    success: false,
    error: defaultMessage,
  };
};

// Helper function to handle OTP errors
const handleOTPError = (error: any, defaultMessage: string): OTPResponse => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: 'Connection timeout. Please try again later.',
      };
    } else if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data?.message || error.response.data?.error;
      
      if (status === 400) {
        return {
          success: false,
          error: errorMessage || 'Invalid OTP. Please check and try again.',
        };
      } else if (status === 429) {
        return {
          success: false,
          error: 'Too many attempts. Please wait before trying again.',
        };
      } else if (status >= 500) {
        return {
          success: false,
          error: 'Server error. Please try again in a few minutes.',
        };
      } else {
        return {
          success: false,
          error: errorMessage || defaultMessage,
        };
      }
    } else if (error.request) {
      return {
        success: false,
        error: 'Unable to connect to server. Please check your internet connection.',
      };
    }
  }
  
  return {
    success: false,
    error: defaultMessage,
  };
};

// Newsletter subscription API
export const newsletterAPI = {
  subscribe: async (data: SubscribeRequest): Promise<SubscribeResponse> => {
    try {
      const response = await retryRequest(() => api.post('/subscriber', data));
      
      return {
        success: true,
        message: 'Successfully subscribed! Welcome to our newsletter.',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Connection timeout. The server is taking too long to respond. Please try again later.');
        } else if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          const errorMessage = error.response.data?.message || error.response.data?.error;
          
          if (status === 409) {
            throw new Error('This email is already subscribed to our newsletter.');
          } else if (status === 400) {
            throw new Error(errorMessage || 'Invalid email address. Please check and try again.');
          } else if (status >= 500) {
            throw new Error('Server error. Please try again in a few minutes.');
          } else {
            throw new Error(errorMessage || 'Subscription failed. Please try again.');
          }
        } else if (error.request) {
          // Network error - no response received
          throw new Error('Unable to connect to server. Please check your internet connection.');
        } else {
          throw new Error('Request setup failed. Please try again.');
        }
      } else {
        throw new Error('Unexpected error occurred. Please try again.');
      }
    }
  },
};

export default api;
