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

  // Updated grid configuration for better mobile responsiveness
  const [gridConfig, setGridConfig] = useState({
    cols: 12,
    rows: 12,
    gap: '1px'
  });

  useEffect(() => {
    const updateGridConfig = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setGridConfig({ cols: 6, rows: 8, gap: '2px' }); // Reduced grid density for mobile
      } else if (window.innerWidth < 1024) { // md breakpoint
        setGridConfig({ cols: 8, rows: 10, gap: '1px' });
      } else {
        setGridConfig({ cols: 12, rows: 12, gap: '1px' });
      }
    };

    updateGridConfig();
    window.addEventListener('resize', updateGridConfig);
    return () => window.removeEventListener('resize', updateGridConfig);
  }, []);

  // Animation effect for counts
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
      
      {/* Updated grid container with dynamic gap */}
      <div 
        className="absolute inset-0" 
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridConfig.rows}, 1fr)`,
          gap: gridConfig.gap
        }}
      >
        {[...Array(gridConfig.cols * gridConfig.rows)].map((_, i) => (
          <GridSection 
            key={i}
            delay={Math.random() * 2}
            className="animate-pulse-subtle"
          />
        ))}
      </div>

      {/* Updated responsive content container */}
      <div className="relative container mx-auto px-4 py-8 sm:py-12 md:py-20 flex min-h-screen items-center justify-center z-10">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 md:space-y-8 max-w-4xl">
          <Bot className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#91be3f] animate-float" />
          
          <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-[#91be3f] to-blue-500">
            <TypewriterEffect text="Transforming Business Through AI Innovation" delay={50} />
          </h1>
          
          <p className="text-base sm:text-lg md:text-2xl max-w-2xl text-gray-300 font-opensans px-2 sm:px-4">
            Empowering enterprises with cutting-edge AI solutions that drive growth, 
            efficiency, and innovation.
          </p>

          <button
            type="button"
            onClick={user ? () => navigate('/tools') : () => setIsAuthModalOpen(true)}
            className="group bg-[#91be3f] hover:bg-[#a1ce4f] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full 
              font-semibold transition-all duration-300 flex items-center space-x-2 
              hover:shadow-lg hover:shadow-[#91be3f]/25 active:scale-95"
          >
            <span>{user ? 'Explore Tools' : 'Get Started'}</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Updated metrics grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-8 mt-6 sm:mt-8 md:mt-16 w-full px-2 sm:px-4">
            {metrics.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-3 sm:p-4 md:p-6 
                  transform hover:scale-105 transition-all duration-300
                  hover:shadow-xl hover:shadow-[#91be3f]/10 border border-gray-800"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-[#91be3f] mx-auto" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 sm:mt-3 md:mt-4">{value}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .cursor {
          animation: blink 1s infinite;
        }

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