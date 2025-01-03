import React from 'react';

const navigationLinks = {
  'Products & Services': [
    'AI Solutions',
    'Machine Learning',
    'Data Analytics',
    'Consulting',
    'API Access'
  ],
  'Resources': [
    'Documentation',
    'Tutorials',
    'Blog',
    'Case Studies',
    'Help Center'
  ]
};

const FooterNavigation = () => {
  return (
    <>
      {Object.entries(navigationLinks).map(([category, links]) => (
        <div key={category}>
          <h3 className="font-montserrat font-bold text-lg mb-6">{category}</h3>
          <ul className="space-y-3">
            {links.map(link => (
              <li key={link}>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default FooterNavigation;