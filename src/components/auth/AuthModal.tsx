import React, { useState } from 'react';
import { X, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalView = 'login' | 'register' | 'forgotPassword';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp } = useAuth();
  const [view, setView] = useState<ModalView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (view === 'login') {
        await signIn(email, password);
      } else if (view === 'register') {
        await signUp(email, password);
      }
      
      setEmail('');
      setPassword('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // You'll need to implement this in your authService
      await authService.forgotPassword(email);
      setResetEmailSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const switchView = (newView: ModalView) => {
    setView(newView);
    setError(null);
    setResetEmailSent(false);
  };

  if (!isOpen) return null;

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
              {view === 'login' ? 'Sign In' : view === 'register' ? 'Create Account' : 'Reset Password'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors absolute top-4 right-4"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {view === 'forgotPassword' ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              {!resetEmailSent ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Enter your email address and we'll send you instructions to reset your password.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                        rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 
                        dark:text-white outline-none"
                      required
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white py-2 px-4 
                      rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Reset Instructions'}
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-green-500 mb-4">✓ Reset instructions sent!</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check your email for instructions to reset your password.
                  </p>
                </div>
              )}
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 
                    dark:text-white outline-none"
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
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-[#91be3f] dark:bg-gray-700 
                      dark:text-white outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
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
                className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white py-2 px-4 
                  rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Processing...' : view === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          )}

          {view !== 'forgotPassword' && (
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              {view === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => switchView(view === 'login' ? 'register' : 'login')}
                className="text-[#91be3f] hover:text-[#a1ce4f] font-medium"
              >
                {view === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;