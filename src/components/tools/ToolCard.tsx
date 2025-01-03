import React from 'react';
import { Tool } from './types';
import { ArrowRight } from 'lucide-react';

interface ToolCardProps {
  tool: Tool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { icon: Icon, title, description } = tool;

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl 
      transform hover:-translate-y-1 transition-all duration-300">
      <div className="bg-[#253b74]/10 dark:bg-[#253b74]/20 rounded-full w-14 h-14 flex items-center justify-center mb-6
        group-hover:bg-[#253b74] transition-colors duration-300">
        <Icon className="w-7 h-7 text-[#253b74] dark:text-[#91be3f] group-hover:text-white transition-colors duration-300" />
      </div>

      <h3 className="text-xl font-bold text-[#253b74] dark:text-white mb-3 font-montserrat">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 font-opensans">{description}</p>

      <button className="flex items-center text-[#253b74] dark:text-[#91be3f] font-semibold hover:text-[#91be3f] 
        transition-colors duration-300 group-hover:translate-x-1">
        Try Now
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

export default ToolCard;