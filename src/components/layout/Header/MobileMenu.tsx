import React from 'react';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'AI Tools', href: '#tools' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Resources', href: '#resources' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className={`
      fixed inset-0 bg-[#253b74] z-50 transform transition-transform duration-300
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-[#91be3f] transition-colors duration-300"
        >
          <X className="w-8 h-8" />
        </button>

        <nav className="mt-16">
          <ul className="space-y-6">
            {navItems.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={onClose}
                  className="text-white hover:text-[#91be3f] text-2xl font-montserrat font-medium 
                    transition-colors duration-300 block"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button className="mt-8 w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white px-6 py-3 
          rounded-full font-semibold transition-all duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;