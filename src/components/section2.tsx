import React from 'react';
import { ArrowRight, Pen, Youtube, Zap, Users, Clock, Lock, Bot, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  isPremium?: boolean;
  features: string[];
  stats?: {
    users?: number;
    avgTime?: string;
    accuracy?: string;
  };
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
    }
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
    }
  },
  {
    id: 'seo-audit',
    name: 'SEO Audit Tool',
    description: 'Analyze and optimize your website for search engines. Get actionable insights to improve your SEO performance and rankings.',
    category: 'SEO',
    icon: Zap,
    isPremium: true,
    features: [
      'Website health analysis',
      'Keyword performance tracking',
      'Backlink analysis',
      'Page speed optimization',
    ],
    stats: {
      users: 12000,
      avgTime: '10 mins',
      accuracy: '98%',
    }
  }
];

const ToolCard = ({ tool }: { tool: Tool }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    // Navigate to the tools page with the tool's ID
    navigate(`/tools/${tool.id}`);
  };

  const Icon = tool.icon;

  return (
    <div
      onClick={handleClick} // Add onClick handler
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
            <Icon className="w-8 h-8 text-[#91be3f] 
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
};

const ToolsAndBlog = () => {
  return (
    <div className="w-full">
      {/* Title Section */}
      <section className="py-5 bg-white dark:bg-gray-900">
        <div className="text-center ">
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
      </section>

      {/* Tools Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {/* Blog content goes here */}
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default ToolsAndBlog;