import React from 'react';
import { Bot, Mail, Phone, MapPin } from 'lucide-react';
import FooterNavigation from './FooterNavigation';
import NewsletterForm from './NewsletterForm';
import SocialLinks from './SocialLinks';

const FooterSection = () => {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Bot className="w-8 h-8 text-[#91be3f]" />
              <span className="font-montserrat font-bold text-xl">AI Agency</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering enterprises with cutting-edge AI solutions that drive growth,
              efficiency, and innovation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>contact@aiagency.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>123 AI Street, Tech City, TC 12345</span>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <FooterNavigation />

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} AI Agency. All rights reserved.
            </div>
            <SocialLinks />
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;