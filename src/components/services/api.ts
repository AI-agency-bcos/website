import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from '../../contexts/AuthContext';

const API_URL =  'http://localhost:4000/api';

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Make sure this is true
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);
export const authService = {
  setAuthToken: (token: string) => {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  removeAuthToken: () => {
    delete axiosInstance.defaults.headers.common['Authorization'];
  },

  setupAuthInterceptor: (onUnauthorized: () => void) => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          onUnauthorized();
        }
        return Promise.reject(error);
      }
    );
    return interceptor;
  },

  removeAuthInterceptor: (interceptor: number) => {
    axiosInstance.interceptors.response.eject(interceptor);
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', { 
      email, 
      password 
    });
    return response.data;
  },

  async register(email: string, password: string): Promise<AuthResponse> {
    console.log('authService: Starting registration process');
    try {
      const response = await axiosInstance.post<AuthResponse>('/auth/register', { 
        email, 
        password 
      });
      console.log('authService: Registration successful:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('authService: Registration failed:', error.response?.data || error.message);
      throw error;
    }
  },

  async verifyToken() {
    try {
      console.log('authService: Verifying token...');
      const response = await axiosInstance.get('/auth/me');  // Use axiosInstance instead of axios
      console.log('authService: Token verification response:', response.data);
      return response.data;
    } catch (error) {
      console.error('authService: Token verification failed:', error);
      throw error;
    }
  },


  async requestPasswordReset(email: string) {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send reset email');
    }

    return response.json();
  },

  async verifyResetCode(email: string, verificationCode: string) {
    const response = await fetch(`${API_URL}/auth/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, verificationCode }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Invalid verification code');
    }

    return response.json();
  },

  // Fixed to use the correct endpoint
  async updatePassword(email: string, verificationCode: string, newPassword: string) {
    const response = await fetch(`${API_URL}/auth/update-password`, {  // Changed from reset-password to update-password
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        verificationCode, 
        newPassword 
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update password');
    }

    return response.json();
  },
  googleSignIn: async (credential: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/google`, {
        token: credential
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to sign in with Google');
    }
  }
};
