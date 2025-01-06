import { useState } from 'react';
import { Bot, Sparkles, ArrowRight, MessageSquare, Pen, Lock, Youtube, Clock, Zap, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import BlogGenerator from './BlogGenerator';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
  isPremium?: boolean;
  features: string[];
  stats?: {
    users?: number;
    avgTime?: string;
    accuracy?: string;
  };
  component: React.ElementType;
}

const tools: Tool[] = [
  {
    id: 'blog-generator',
    name: 'AI Blog Generator',
    description: 'Generate high-quality blog posts with AI assistance. Perfect for content creators and marketers looking to streamline their content production.',
    category: 'Content',
    icon: Pen,
    isPremium: false,
    features: [
      'SEO-optimized content generation',
      'Multiple writing styles',
      'Automatic research integration',
      'Export to WordPress/Medium',
    ],
    stats: {
      users: 15000,
      avgTime: '5 mins',
      accuracy: '95%',
    },
    component: BlogGenerator,
  },
  {
    id: 'youtube-summarizer',
    name: 'YouTube Summarizer',
    description: 'Extract key insights and summaries from any YouTube video. Save time while capturing the essential information from video content.',
    category: 'Video',
    icon: Youtube,
    isPremium: true,
    features: [
      'Automated transcript generation',
      'Key points extraction',
      'Chapter markers',
      'Multiple languages support',
    ],
    stats: {
      users: 8000,
      avgTime: '2 mins',
      accuracy: '92%',
    },
    component: BlogGenerator, // Replace with actual YouTube summarizer component
  },
];

const ToolCard = ({ tool, onClick }: { tool: Tool; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 
      cursor-pointer border border-gray-200 dark:border-gray-700 
      hover:shadow-xl hover:shadow-[#91be3f]/20 
      hover:translate-y-[-4px]
      transition-all duration-300 ease-out
      overflow-hidden"
  >
    {/* Hover gradient effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/5 to-blue-500/5 
      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="bg-[#91be3f]/10 rounded-full w-16 h-16 
          flex items-center justify-center
          group-hover:bg-[#91be3f] 
          transition-colors duration-300">
          <tool.icon className="w-8 h-8 text-[#91be3f] 
            group-hover:text-white 
            transition-colors duration-300" />
        </div>
        <div className="flex space-x-2">
          {tool.isPremium && (
            <span className="flex items-center px-3 py-1 bg-[#91be3f]/10 text-[#91be3f] 
              rounded-full text-sm">
              <Lock className="w-4 h-4 mr-1" />
              Premium
            </span>
          )}
          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 
            rounded-full text-sm">
            {tool.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 
          group-hover:text-[#91be3f] 
          transition-colors duration-300">
          {tool.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {tool.description}
        </p>
      </div>

      {/* Features Section */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Key Features</h4>
        <ul className="grid grid-cols-2 gap-2">
          {tool.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Zap className="w-4 h-4 mr-2 text-[#91be3f]" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Stats Section */}
      {tool.stats && (
        <div className="flex justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {tool.stats.users?.toLocaleString()}+ users
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#91be3f]" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Avg. {tool.stats.avgTime}
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
);

const ToolsPage = () => {
  const { user } = useAuth();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleToolClick = (tool: Tool) => {
    if (tool.isPremium && !user) {
      setIsAuthModalOpen(true);
    } else {
      setSelectedTool(tool);
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/10 via-transparent to-blue-500/10 dark:from-[#91be3f]/20 dark:to-blue-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,190,63,0.1)_0%,transparent_100%)] opacity-30 dark:opacity-20" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <Bot className="w-16 h-16 text-[#91be3f] mx-auto mb-6" 
              style={{ animation: 'float 3s ease-in-out infinite' }} />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
            <span className="bg-gradient-to-r from-[#91be3f] to-blue-500 bg-clip-text text-transparent">
              AI Tools Suite
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-opensans leading-relaxed">
            Explore our collection of powerful AI tools designed to enhance your workflow.
          </p>
        </div>

        {/* Tools Grid or Selected Tool */}
        {selectedTool ? (
          <div className="relative bg-white dark:bg-gray-800 backdrop-blur-lg rounded-xl p-8 border border-gray-200 dark:border-gray-700
            transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedTool(null)}
                className="flex items-center text-[#91be3f] hover:text-[#a1ce4f] 
                  transition-colors duration-300"
              >
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                Back to Tools
              </button>
              <span className="px-4 py-2 bg-[#91be3f]/10 text-[#91be3f] rounded-full text-sm">
                {selectedTool.category}
              </span>
            </div>
            <selectedTool.component />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => handleToolClick(tool)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default ToolsPage;