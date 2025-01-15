import { useState, useEffect } from 'react';
import { User, Coins, Menu, X } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import AuthModal from '../../auth/AuthModal';
import logo from '../logo.svg';
import logo1 from '../logo1.png';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCredits } from '../../../contexts/creditsContext';
import ThemeToggle from './ThemeToggle'; // Import the ThemeToggle component

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [logoSrc, setLogoSrc] = useState(logo);
  const { credits } = useCredits();
  const isHomePage = location.pathname === '/';
  const isToolsPage = location.pathname === '/tools';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showMobileMenu]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Tools', href: '/tools' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const CreditsDisplay = () => {
    if (!user || !isToolsPage) return null;
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
        <Coins className="w-5 h-5 text-[#91be3f]" />
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {credits} credits
        </span>
      </div>
    );
  };

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={logoSrc}
                alt="AI Agency Logo"
                className="w-32 md:w-40 transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                {navItems.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className={`text-lg font-medium transition-colors duration-300 ${
                      isScrolled ? 'text-gray-800 dark:text-gray-300' : 'text-white dark:text-gray-300'
                    } hover:text-[#91be3f] dark:hover:text-[#91be3f]`}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              {isHomePage && <ThemeToggle isScrolled={isScrolled} />}
              <CreditsDisplay />
              {user ? (
                <div className="relative group">
                  <User className="w-8 h-8 text-[#91be3f] cursor-pointer" />
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 
                    border border-gray-200 dark:border-gray-700">
                    <div className="p-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{user.email}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <Coins className="w-4 h-4 text-[#91be3f]" />
                        <p className="text-gray-600 dark:text-gray-400">{credits} credits</p>
                      </div>
                      <button
                        onClick={signOut}
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg 
                          transition-colors text-sm font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className="bg-[#91be3f] hover:bg-[#a1ce4f] text-white px-6 py-2 rounded-full 
                    font-semibold transition-all duration-300"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Register
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(true)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-gray-900/95 transform transition-transform duration-300 ${
        showMobileMenu ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-8">
            <img
              src={logo}
              alt="AI Agency Logo"
              className="w-32"
            />
            <button
              onClick={() => setShowMobileMenu(false)}
              className="p-2 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {user && (
            <div className="mb-8 p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Signed in as</p>
                  <p className="text-white font-medium">{user.email}</p>
                </div>
                {isToolsPage && (
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-[#91be3f]" />
                    <span className="text-white font-medium">{credits}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <nav className="mb-8">
            {navItems.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setShowMobileMenu(false)}
                className="block py-4 text-gray-300 hover:text-white text-lg font-medium border-b border-gray-800"
              >
                {label}
              </a>
            ))}
          </nav>

          {!user ? (
            <button
              onClick={() => {
                setShowMobileMenu(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white py-3 rounded-lg 
                font-semibold transition-all duration-300"
            >
              Register
            </button>
          ) : (
            <button
              onClick={() => {
                signOut();
                setShowMobileMenu(false);
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg 
                font-semibold transition-all duration-300"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;