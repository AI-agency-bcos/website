import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../components/services/api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authService.getCurrentUser(token);
      if (response.success) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleAuthSuccess = (token: string, user: User) => {
    localStorage.setItem('token', token);
    setUser(user);
    
    // Stay on the current page if we're on /tools
    if (location.pathname === '/tools') {
      return; // Don't navigate away
    }
    
    // Otherwise, navigate to the previous page or home
    const from = location.state?.from || '/';
    navigate(from);
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        handleAuthSuccess(response.data.token, response.data.user);
        toast.success('Successfully signed in!');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in');
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const response = await authService.register(email, password);
      if (response.success) {
        handleAuthSuccess(response.data.token, response.data.user);
        toast.success('Registration successful!');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
      throw error;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Successfully signed out!');
      if (location.pathname === '/tools') {
        return; // Don't navigate away
      }
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign out');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};