import React, { useState } from 'react';
import { X, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../services/api';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
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

type ModalView = 'login' | 'register' | 'forgotPassword' | 'verifyCode' | 'resetPassword';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp, setUser } = useAuth();
  const [view, setView] = useState<ModalView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState(false);

  const location = useLocation(); // Call useLocation at the top level
  const navigate = useNavigate(); // Call useNavigate at the top level
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (view === 'register') {
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }

        console.log('AuthModal: Starting registration process');
        await signUp(email, password);
        console.log('AuthModal: Registration successful');
        
        setEmail('');
        setPassword('');
        onClose();
      } else if (view === 'login') {
        await signIn(email, password);
        onClose();
      }
    } catch (err: any) {
      console.error('AuthModal: Form submission error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPasswordReset = async () => {
    setError(null);
    setLoading(true);

    try {
      await authService.requestPasswordReset(email);
      setView('verifyCode');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError(null);
    setLoading(true);

    try {
      await authService.verifyResetCode(email, verificationCode);
      setView('resetPassword');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await authService.updatePassword(email, verificationCode, password);
      setResetSuccess(true);
      setTimeout(() => {
        setView('login');
        setResetSuccess(false);
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const switchView = (newView: ModalView) => {
    setView(newView);
    setError(null);
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      setIsValidPassword(false);
    } else {
      setPasswordError('');
      setIsValidPassword(true);
    }
  };

  if (!isOpen) return null;
  const API_URL = 'http://localhost:4000/api';
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setError(null);
    setLoading(true);

    try {
      const token = credentialResponse.credential;
      if (!token) throw new Error('No Google token received');

      console.log('Google credential token:', token);

      const response = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ token }),
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      const data = JSON.parse(responseText);
      console.log('Parsed response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to authenticate with Google');
      }

      if (!data.success) {
        throw new Error(data.message || 'Authentication failed');
      }
      toast.custom(() => <ToastNotification message="Successfully logged in!" />, {
        duration: 2000,
        position: 'top-right',
      });

      // Handle successful authentication
      const { token: authToken, user } = data.data;

      localStorage.setItem('token', authToken);

      setUser(user); // Use setUser from the top-level useAuth call

      onClose();
    } catch (error: any) {
      console.error('Detailed Google authentication error:', error);
      setError(error.message || 'Failed to authenticate with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

const handleGoogleError = () => {
  console.error('Google sign-in failed');
};

const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto" style={{ height: '100vh' }}>
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full relative">
          <div className="flex justify-between items-center mb-6">
            {view !== 'login' && (
              <button
                onClick={() => switchView('login')}
                className="absolute left-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mx-auto">
              {view === 'login' ? 'Sign In' : 
               view === 'register' ? 'Create Account' : 
               view === 'forgotPassword' ? 'Reset Password' :
               view === 'verifyCode' ? 'Verify Code' :
               'Set New Password'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors absolute top-4 right-4"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {(view === 'login' || view === 'register') && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 dark:text-white outline-none"
                  required
                />
              </div>
                      <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          validatePassword(e.target.value);
                        }}
                        className={`w-full px-4 py-2 border ${
                          passwordError ? 'border-red-500' : 'border-gray-300'
                        } dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 dark:text-white outline-none`}
                        required
                      />
                      {view === 'register' && passwordError && (
                        <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                      )}
                    </div>
                  </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              {view === 'login' && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => switchView('forgotPassword')}
                    className="text-sm text-[#91be3f] hover:text-[#a1ce4f]"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Processing...' : view === 'login' ? 'Sign In' : 'Create Account'}
              </button>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            shape="pill"
            theme={isDarkMode ? "filled_black" : "outline"}
            size="large"
          />
        </div>
            </form>
          )}

          {view === 'forgotPassword' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your email to receive a verification code.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 dark:text-white outline-none"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleRequestPasswordReset}
                className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Verification Code'}
              </button>
            </div>
          )}

          {view === 'verifyCode' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter the verification code sent to your email.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 dark:text-white outline-none"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleVerifyCode}
                className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          )}

          {view === 'resetPassword' && (
            <div className="space-y-4">
              {resetSuccess ? (
                <p className="text-green-500 text-center">Password reset successful! Redirecting to login...</p>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 dark:text-white outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 dark:text-white outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    onClick={handleUpdatePassword}
                    className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </>
              )}
            </div>
          )}

          {view === 'login' ? (
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={() => switchView('register')}
                className="text-[#91be3f] hover:text-[#a1ce4f]"
              >
                Sign up
              </button>
            </p>
          ) : view === 'register' ? (
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => switchView('login')}
                className="text-[#91be3f] hover:text-[#a1ce4f]"
              >
                Sign in
              </button>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

