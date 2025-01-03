import React from 'react';
import { Brain, Cpu, Lock, Globe, Gauge, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced ML Models',
    description: 'Custom-built machine learning models tailored to your business needs'
  },
  {
    icon: Cpu,
    title: 'Process Automation',
    description: 'Streamline operations with intelligent automation solutions'
  },
  {
    icon: Lock,
    title: 'Secure Integration',
    description: 'Enterprise-grade security with seamless system integration'
  },
  {
    icon: Globe,
    title: 'Global Scalability',
    description: 'Solutions that scale across markets and regions'
  },
  {
    icon: Gauge,
    title: 'Real-time Analytics',
    description: 'Instant insights and predictive analytics capabilities'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: '24/7 dedicated support from AI specialists'
  }
];

const Features = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#253b74] dark:text-white font-montserrat">
            Powerful AI Solutions
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-opensans">
            Discover how our AI-powered features can transform your business operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="group bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg 
              hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-[#253b74]/10 dark:bg-[#253b74]/20 rounded-full w-16 h-16 flex items-center 
                justify-center mb-6 group-hover:bg-[#253b74] transition-colors duration-300">
                <Icon className="w-8 h-8 text-[#253b74] dark:text-[#91be3f] group-hover:text-white 
                  transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-[#253b74] dark:text-white mb-4">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;