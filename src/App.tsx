import React, { useState } from 'react';
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
import ToolsPage from './components/tools/ToolsPage';
import BlogPage from './components/blog/blogPage';
import ContactPage from './components/layout/ContactPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    // Redirect to the login page with the current location passed as state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <ToolsSection />
    <BlogSection />
  </>
);

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Tools page now accessible without authentication */}
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} /> {/* Add the Contact Page route */}
              <Route
                path="/register"
                element={
                  <>
                    <AuthModal isOpen={authModalOpen} onClose={closeAuthModal} />
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={openAuthModal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
                      >
                        Open Registration
                      </button>
                    </div>
                  </>
                }
              />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <div>Protected Content</div>
                  </ProtectedRoute>
                }
              />
            </Routes>
            <FooterSection />
            <Toaster position="top-right" />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
