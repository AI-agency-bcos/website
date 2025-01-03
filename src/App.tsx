import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/layout/Header/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ToolsSection from './components/tools/ToolsSection';
import BlogSection from './components/blog/BlogSection';
import FooterSection from './components/layout/Footer/FooterSection';
import AuthModal from './components/auth/AuthModal';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/register" element={<AuthModal isOpen={true} onClose={() => {}} />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <div>Protected Content</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Features />
            <ToolsSection />
            <BlogSection />
            <FooterSection />
            <Toaster position="top-right" />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;