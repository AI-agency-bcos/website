import React from 'react';
import { Bot } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 text-white overflow-hidden flex items-center justify-center z-50">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/20 via-transparent to-blue-500/20" />
      
      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Outer rotating ring */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-[#91be3f]/30 border-t-[#91be3f] animate-spin" />
          
          {/* Inner rotating ring */}
          <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-blue-500/30 border-b-blue-500 animate-spin-reverse" />
          
          {/* Center bot icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Bot className="w-12 h-12 text-[#91be3f] animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-2xl font-bold text-[#91be3f] animate-pulse">Loading</div>
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#91be3f] animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;