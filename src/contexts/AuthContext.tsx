import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../components/services/api';
import { Check } from 'lucide-react';

export interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
  credits: number; 
}

export interface AuthResponse {
  token: string;
  user: User;
  success: boolean; // Add this property
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signInWithGoogle: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: () => boolean;
  fetchUserDetails: () => Promise<void>;
  setUser: (user: User | null) => void; // Add this line
}

interface ToastNotificationProps {
  message: string;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 min-w-[200px] p-4 bg-white rounded-lg shadow-lg border border-green-100 animate-slide-in">
      <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
        <Check className="w-4 h-4 text-green-600" />
      </div>
      <p className="text-sm font-medium text-gray-900">{message}</p>
    </div>
  );
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('AuthContext: Fetching user details, token exists:', !!token);
      
      if (!token) {
        setUser(null);
        setLoading(false);
        setInitialized(true);
        return;
      }

      // Set token in axios instance
      authService.setAuthToken(token);

      // Verify token and get user details
      const response = await authService.verifyToken();
      console.log('AuthContext: Token verification response:', response);

      if (response?.success && response?.data?.user) {
        setUser(response.data.user);
        console.log('AuthContext: User state updated:', response.data.user);
      } else {
        console.error('AuthContext: Invalid response structure:', response);
        throw new Error('Invalid token verification response');
      }
    } catch (error) {
      console.error('AuthContext: Error fetching user details:', error);
      // Clear auth state on error
      setUser(null);
      localStorage.removeItem('token');
      authService.removeAuthToken();
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };
  // Initial auth state setup
  useEffect(() => {
    if (!initialized) {
      console.log('AuthContext: Initializing auth state');
      fetchUserDetails();
    }
  }, [initialized]);

  // Setup auth interceptor
  useEffect(() => {
    if (initialized) {
      const interceptor = authService.setupAuthInterceptor(() => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
      });

      return () => {
        authService.removeAuthInterceptor(interceptor);
      };
    }
  }, [initialized, navigate]);

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token') && !!user;
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.setAuthToken(token);
    }
  }, []);
  const handleAuthSuccess = (token: string, user: User) => {
    console.log('AuthContext: Handling successful authentication', { user });
    localStorage.setItem('token', token);
    authService.setAuthToken(token);
    setUser(user);
    toast.custom(() => <ToastNotification message="Successfully logged in!" />, {
      duration: 2000,
      position: 'top-right',
    });
// Navigate to home page or dashboard
    const from = location.state?.from || '/';
    navigate(from);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);  // Store token
        authService.setAuthToken(response.token);      // Set token in axios headers
        setUser(response.user);
        toast.custom(() => <ToastNotification message="Successfully logged in!" />, {
          duration: 2000,
          position: 'top-right',
        });
        return response;
      }
      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };


  const signUp = async (email: string, password: string): Promise<void> => {
    try {
      console.log('AuthContext: Starting signup process');
      const response = await authService.register(email, password);
      const { token, user } = response;
      
      console.log('AuthContext: Registration successful, setting up session');
      localStorage.setItem('token', token);
      authService.setAuthToken(token);
      setUser(user);
  
      toast.custom(() => <ToastNotification message="Registration successful! Welcome!" />, {
        duration: 2000,
        position: 'top-right',
      });
  
      // Navigate to home page or dashboard
      const from = location.state?.from || '/';
      navigate(from);
    } catch (error: any) {
      console.error('AuthContext: Registration error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(errorMessage);
      throw error;
    }
  };



  const signInWithGoogle = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
  
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to authenticate with Google');
      }
      toast.custom(() => <ToastNotification message="Successfully logged in!" />, {
        duration: 2000,
        position: 'top-right',
      });
      // Directly handle the authentication success
      handleAuthSuccess(data.data.token, data.data.user);
      toast.custom(() => <ToastNotification message="Successfully logged in!" />, {
        duration: 2000,
        position: 'top-right',
      });
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);

      toast.custom(() => <ToastNotification message="Successfully logged out!" />, {
        duration: 2000,
        position: 'top-right',
      });

      navigate('/');
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        loading, 
        signUp, 
        signIn, 
        signInWithGoogle, 
        signOut, 
        isAuthenticated, 
        fetchUserDetails,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};