import React from 'react';
import { Github, Twitter, Linkedin, Facebook } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Facebook, href: '#', label: 'Facebook' }
];

const SocialLinks = () => {
  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="w-8 h-8 flex items-center justify-center rounded-full
            bg-gray-800 text-gray-400 hover:bg-[#91be3f] hover:text-white
            transition-all duration-300"
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;