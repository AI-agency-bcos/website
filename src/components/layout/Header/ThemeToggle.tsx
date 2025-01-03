import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface ThemeToggleProps {
  isScrolled: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isScrolled }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-300 ${
        isScrolled 
          ? 'hover:bg-gray-100 dark:hover:bg-gray-700' 
          : 'hover:bg-white/10'
      } ${
        isScrolled 
          ? 'text-gray-700 dark:text-gray-300' 
          : 'text-white'
      }`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;