import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

interface NavigationProps {
  isScrolled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  const { isAuthenticated, user, signOut, fetchUserDetails } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      fetchUserDetails(); // Fetch details only if user state is empty
    }
  }, [user, fetchUserDetails]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Tools', href: '/tools' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav>
      <ul className="flex space-x-8">
        {navItems.map(({ label, href }) => (
          <li key={label}>
            <Link
              to={href}
              className={`font-montserrat font-medium hover:text-[#91be3f] ${
                isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
        {isAuthenticated() ? (
          <>
            <li>
              <span className="font-montserrat font-medium">{user?.email}</span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="font-montserrat font-medium hover:text-[#91be3f] transition-colors duration-300"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="font-montserrat font-medium hover:text-[#91be3f] transition-colors duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="font-montserrat font-medium hover:text-[#91be3f] transition-colors duration-300"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
