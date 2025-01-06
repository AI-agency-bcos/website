import React from 'react';
import { Brain, Cpu, Lock, Globe, Gauge, Users, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Advanced ML Models',
    description: 'Custom-built machine learning models tailored to your business needs',
    link: '/ml-models'
  },
  {
    icon: Cpu,
    title: 'Process Automation',
    description: 'Streamline operations with intelligent automation solutions',
    link: '/automation'
  },
  {
    icon: Lock,
    title: 'Secure Integration',
    description: 'Enterprise-grade security with seamless system integration',
    link: '/security'
  },
  {
    icon: Globe,
    title: 'Global Scalability',
    description: 'Solutions that scale across markets and regions',
    link: '/scalability'
  },
  {
    icon: Gauge,
    title: 'Real-time Analytics',
    description: 'Instant insights and predictive analytics capabilities',
    link: '/analytics'
  },
  {
    icon: Users,
    title: 'Expert Support',
    description: '24/7 dedicated support from AI specialists',
    link: '/support'
  }
];

const Features = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[center_-1px] [mask-image:linear-gradient(0deg,transparent,black,transparent)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4">
        {/* Header with animated gradient underline */}
        <div className="text-center mb-20 relative">
          <div className="inline-block">
            <h2 className="text-5xl font-bold text-[#253b74] dark:text-white font-montserrat mb-4 
              tracking-tight animate-fade-in">
              Transformative AI Solutions
            </h2>
            <div className="h-1 w-full bg-gradient-to-r from-[#253b74] via-[#91be3f] to-[#253b74] 
              rounded-full animate-gradient-x" />
          </div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto 
            font-opensans leading-relaxed animate-fade-in-up">
            Empower your business with cutting-edge AI technology that drives innovation and growth
          </p>
        </div>

        {/* Features grid with staggered animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, link }, index) => (
            <div
              key={title}
              className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm 
                rounded-2xl p-8 shadow-lg hover:shadow-2xl
                transform hover:-translate-y-2 hover:rotate-1
                transition-all duration-300 ease-out
                animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-2xl  via-transparent to-[#91be3f]/20 
                group-hover:from-[#253b74]/30 group-hover:to-[#91be3f]/30
                transition-colors duration-300" />

              {/* Icon container with animated background */}
              <div className="relative bg-gradient-to-br from-[#253b74]/10 to-[#91be3f]/10 
                dark:from-[#253b74]/20 dark:to-[#91be3f]/20
                rounded-2xl w-16 h-16 flex items-center justify-center mb-6
                group-hover:from-[#253b74] group-hover:to-[#91be3f]
                transition-all duration-300 transform group-hover:scale-110">
                <Icon className="w-8 h-8 text-[#253b74] dark:text-[#91be3f] 
                  group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-[#253b74] dark:text-white mb-4 
                  group-hover:text-[#91be3f] transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
                
                {/* Animated link */}
                <a href={link} className="inline-flex items-center text-[#253b74] dark:text-[#91be3f] 
                  font-semibold group-hover:text-[#91be3f] transition-colors duration-300">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 
                    transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;