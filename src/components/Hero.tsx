import { useState, useEffect } from 'react';
import { Bot, ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import TypewriterEffect from './TypewriterEffect';
import { useNavigate } from 'react-router-dom';
import AuthModal from './auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';

import { ReactNode } from 'react';

const GridSection = ({ children, className = '', delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => (
  <div 
    className={`relative border border-gray-800 ${className}`}
    style={{ animation: `fadeInSection 0.5s ease-out ${delay}s forwards` }}
  >
    {children}
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [counts, setCounts] = useState({
    projects: 0,
    satisfaction: 0,
    response: 0
  });

  useEffect(() => {
    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCounts({
          projects: Math.min(Math.floor(500 * progress), 500),
          satisfaction: Math.min(Math.floor(99 * progress), 99),
          response: Math.min(Math.floor(24 * progress), 24)
        });
        requestAnimationFrame(animate);
      } else {
        setCounts({
          projects: 500,
          satisfaction: 99,
          response: 24
        });
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const metrics = [
    { icon: Activity, label: 'Projects Delivered', value: `${counts.projects}+` },
    { icon: Shield, label: 'Client Satisfaction', value: `${counts.satisfaction}%` },
    { icon: Zap, label: 'Response Time', value: `<${counts.response}h` },
  ];

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/20 via-transparent to-blue-500/20" />
      
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
        {[...Array(144)].map((_, i) => (
          <GridSection 
            key={i}
            delay={Math.random() * 2}
            className="animate-pulse-subtle" children={undefined}          >
            {/* Add any children content here if needed */}
          </GridSection>
        ))}
        
        {[...Array(5)].map((_, i) => (
          <div
            key={`vline-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#91be3f]/40 to-transparent animate-slide-down"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
        
        {[...Array(5)].map((_, i) => (
          <div
            key={`hline-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#91be3f]/40 to-transparent animate-slide-right"
            style={{
              top: `${20 + i * 20}%`,
              animationDelay: `${i * 1.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-20 flex min-h-screen items-center justify-center z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl">
          <Bot className="w-16 h-16 text-[#91be3f] animate-float" />
          
          <h1 className="text-4xl md:text-6xl font-bold font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-[#91be3f] to-blue-500">
            <TypewriterEffect text="Transforming Business Through AI Innovation" delay={50} />
          </h1>
          
          <p className="text-xl md:text-2xl max-w-2xl text-gray-300 font-opensans">
            Empowering enterprises with cutting-edge AI solutions that drive growth, 
            efficiency, and innovation.
          </p>

          <button
            type="button"
            onClick={user ? () => navigate('/services') : () => setIsAuthModalOpen(true)}
            className="group bg-[#91be3f] hover:bg-[#a1ce4f] text-white px-8 py-4 rounded-full 
              font-semibold transition-all duration-300 flex items-center space-x-2 
              hover:shadow-lg hover:shadow-[#91be3f]/25 active:scale-95"
          >
            <span>{user ? 'Explore Services' : 'Get Started'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {metrics.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 
                  transform hover:scale-105 transition-all duration-300
                  hover:shadow-xl hover:shadow-[#91be3f]/10 border border-gray-800"
              >
                <Icon className="w-8 h-8 text-[#91be3f] mx-auto" />
                <h3 className="text-3xl font-bold mt-4">{value}</h3>
                <p className="text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <style>{`
        @keyframes fadeInSection {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes slideDown {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        
        @keyframes slideRight {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulseSlow 4s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .animate-slide-down {
          animation: slideDown 10s linear infinite;
        }
        
        .animate-slide-right {
          animation: slideRight 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;