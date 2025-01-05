import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to login');
    }

    return response.json();
  },

  async register(email: string, password: string) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to register');
    }

    return response.json();
  },

  async getCurrentUser(token: string) {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get user data');
    }

    return response.json();
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
