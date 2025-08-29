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

// Add request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
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
