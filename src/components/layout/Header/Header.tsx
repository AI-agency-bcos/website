import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import AuthModal from '../../auth/AuthModal';
import logo from '../logo.svg';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { user, signOut } = useAuth();
  useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Tools', href: '/tools' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' }, // Added Contact Page Link
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Mobile Menu Toggler */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <img
              src={logo}
              alt="AI Agency Logo"
              className="w-40 h-30 transition-all duration-300 dark:text-gray-900"
            />

            {/* Mobile Menu Toggler */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className={`w-6 h-6 flex flex-col justify-around ${
                isScrolled ? 'text-[#253b74] dark:text-gray-300' : 'text-white'
              }`}>
                <span className="w-full h-0.5 bg-current transition-all duration-300" />
                <span className="w-full h-0.5 bg-current transition-all duration-300" />
                <span className="w-full h-0.5 bg-current transition-all duration-300" />
              </div>
            </button>
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
            <ThemeToggle isScrolled={isScrolled} />
            {user ? (
              <div className="relative group">
                <User className="w-8 h-8 text-[#91be3f] cursor-pointer" />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 
                  border border-gray-200 dark:border-gray-700 z-40">
                  <div className="p-6 space-y-4">
                    <div className="flex-col justify-items-center space-y-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {user.email}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={signOut}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg 
                          transition-colors text-sm font-medium"
                      >
                        Sign Out
                      </button>
                    </div>
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
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;