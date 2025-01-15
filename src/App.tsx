import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import LoadingWrapper from './components/LoadingWrapper';
import Header from './components/layout/Header/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ToolsAndBlog from './components/section2';
import BookingSection from './components/BookingSection';
import FooterSection from './components/layout/Footer/FooterSection';
import AuthModal from './components/auth/AuthModal';
import LoadingScreen from './components/LoadingScreen';
import { CreditProvider } from './contexts/creditsContext';
import ChatBot from './components/chatbot';
// Lazy load pages for code splitting
const ToolsPage = React.lazy(() => import('./components/tools/ToolsPage'));
const BlogPage = React.lazy(() => import('./components/blog/blogPage'));
const ContactPage = React.lazy(() => import('./components/layout/ContactPage'));

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <ToolsAndBlog />
    <BookingSection />
  </>
);

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <CreditProvider>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<LoadingWrapper><HomePage /></LoadingWrapper>} />
                  <Route path="/tools" element={<LoadingWrapper><ToolsPage /></LoadingWrapper>} />
                  <Route path="/blog" element={<LoadingWrapper><BlogPage /></LoadingWrapper>} />
                  <Route path="/contact" element={<LoadingWrapper><ContactPage /></LoadingWrapper>} />
                  <Route
                    path="/register"
                    element={
                      <LoadingWrapper>
                        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
                        <div className="flex justify-center mt-8">
                          <button
                            onClick={() => setAuthModalOpen(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
                          >
                            Open Registration
                          </button>
                        </div>
                      </LoadingWrapper>
                    }
                  />
                  <Route
                    path="/protected"
                    element={
                      <ProtectedRoute>
                        <LoadingWrapper>
                          <div>Protected Content</div>
                        </LoadingWrapper>
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Suspense>
              <FooterSection />
              <Toaster position="top-right" />
            </div>
            <ChatBot />
          </CreditProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;