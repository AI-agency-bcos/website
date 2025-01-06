import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import AuthModal from '../../auth/AuthModal';
import logo from '../logo.svg';
import logo1 from '../logo1.png';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [logoSrc, setLogoSrc] = useState(logo);

  // Set dark mode as default when component mounts
  useEffect(() => {
    document.body.classList.add('dark');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setScrollPosition(window.scrollY);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      window.scrollTo(0, scrollPosition);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Tools', href: '/tools' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const isHomePage = location.pathname === '/';
  useEffect(() => {
    if (!isHomePage) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isHomePage]);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setScrollPosition(window.scrollY);

      if (theme === 'light' && window.scrollY > 20 && isHomePage ){
        setLogoSrc(logo1);
      } else {
        setLogoSrc(logo);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled || isMobileMenuOpen ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <img
              src={logoSrc}
              alt="AI Agency Logo"
              className="w-40 h-30 transition-all duration-300 dark:text-gray-900 cursor-pointer"
              onClick={() => navigate('/')}
            />
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`w-6 h-6 flex flex-col justify-around ${
              isScrolled || isMobileMenuOpen ? 'text-[#253b74] dark:text-gray-300' : 'text-white'
            }`}>
              <span className="w-full h-0.5 bg-current transition-all duration-300" />
              <span className="w-full h-0.5 bg-current transition-all duration-300" />
              <span className="w-full h-0.5 bg-current transition-all duration-300" />
            </div>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {navItems.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`text-lg font-medium transition-colors duration-300 ${
                    (isScrolled || isMobileMenuOpen ? 'text-gray-800 dark:text-gray-300' : 'text-white dark:text-gray-300')
                  } hover:text-[#91be3f] dark:hover:text-[#91be3f]`}
                >
                  {label}
                </a>
              ))}
            </nav>
            {/* Only show ThemeToggle on homepage */}
            {isHomePage && <ThemeToggle isScrolled={isScrolled} />}
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

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;

