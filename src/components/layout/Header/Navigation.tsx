import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SolutionsDropdown from './dropdowns/SolutionsDropdown';
import ToolsDropdown from './dropdowns/ToolsDropdown';

interface NavigationProps {
  isScrolled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ isScrolled }) => {
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);
  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
  const toolsDropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = (dropdown: 'solutions' | 'tools') => {
    setTimeout(() => {
      if (dropdown === 'solutions' && !solutionsDropdownRef.current?.matches(':hover')) {
        setShowSolutionsDropdown(false);
      }
      if (dropdown === 'tools' && !toolsDropdownRef.current?.matches(':hover')) {
        setShowToolsDropdown(false);
      }
    }, 200); // Adjust the delay as needed
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      solutionsDropdownRef.current &&
      !solutionsDropdownRef.current.contains(event.target as Node)
    ) {
      setShowSolutionsDropdown(false);
    }
    if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(event.target as Node)) {
      setShowToolsDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Tools', href: '/#tools' },
    { label: 'Solutions', href: '/#solutions' },
    { label: 'Blog', href: '/#blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav>
      <ul className="flex space-x-8">
        {navItems.map(({ label, href }) => (
          <li
            key={label}
            className="relative group"
            onMouseEnter={() => {
              if (label === 'Solutions') setShowSolutionsDropdown(true);
              if (label === 'AI Tools') setShowToolsDropdown(true);
            }}
            onMouseLeave={() => handleMouseLeave(label === 'Solutions' ? 'solutions' : 'tools')}
          >
            <Link
              to={href}
              className={`font-montserrat font-medium hover:text-[#91be3f] transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
              }`}
            >
              {label}
            </Link>
            {label === 'Solutions' && showSolutionsDropdown && (
              <div ref={solutionsDropdownRef} className="absolute left-0 w-full">
                <SolutionsDropdown />
              </div>
            )}
            {label === 'AI Tools' && showToolsDropdown && (
              <div ref={toolsDropdownRef} className="absolute left-0 w-full">
                <ToolsDropdown />
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;