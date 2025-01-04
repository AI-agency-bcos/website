import { useState } from 'react';
import { Bot, Sparkles, ArrowRight, MessageSquare, Pen, Lock } from 'lucide-react';
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
  features?: string[];
  component: React.ElementType;
}

const tools: Tool[] = [
  {
    id: 'blog-generator',
    name: 'AI Blog Generator',
    description: 'Generate high-quality blog posts with AI assistance.',
    category: 'Content',
    icon: Pen,
    isPremium: false,
    component: BlogGenerator,
  },
];

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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/20 via-transparent to-blue-500/20" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(145,190,63,0.1)_0%,transparent_100%)]" />

      <div className="relative container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <Bot className="w-16 h-16 text-[#91be3f] mx-auto mb-6 animate-float" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-[#91be3f] to-blue-500 mb-4">
            AI Tools Suite
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-opensans leading-relaxed">
            Explore our collection of powerful AI tools designed to enhance your workflow.
          </p>
        </div>

        {/* Tools Grid or Selected Tool */}
        {selectedTool ? (
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedTool(null)}
                className="flex items-center text-[#91be3f] hover:text-[#a1ce4f] transition-colors"
              >
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                Back to Tools
              </button>
              <span className="px-4 py-2 bg-[#91be3f]/20 text-[#91be3f] rounded-full text-sm">
                {selectedTool.category}
              </span>
            </div>
            {/* Render the Selected Tool Component */}
            <selectedTool.component />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => handleToolClick(tool)}
                className="group bg-white/5 backdrop-blur-lg rounded-xl p-8 cursor-pointer transform hover:scale-102 transition-all duration-300 hover:shadow-xl hover:shadow-[#91be3f]/10 border border-gray-800"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-[#253b74]/10 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-[#91be3f] transition-colors duration-300">
                    <tool.icon className="w-8 h-8 text-[#91be3f] group-hover:text-white transition-colors duration-300" />
                  </div>
                  {tool.isPremium && (
                    <span className="px-3 py-1 bg-[#91be3f]/20 text-[#91be3f] rounded-full text-sm">
                      Premium
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#91be3f] transition-colors duration-300">
                  {tool.name}
                </h3>
                <p className="text-gray-300">{tool.description}</p>
              </div>
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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default ToolsPage;