import React from 'react';
import ToolCard from './ToolCard';
import { Brain, MessageSquare, Image, BarChart } from 'lucide-react';
import { Tool } from './types';

const tools: Tool[] = [
  {
    id: 'text-gen',
    icon: MessageSquare,
    title: 'Text Generation',
    description: 'Create high-quality content with our advanced AI writing assistant',
    category: 'content',
  },
  {
    id: 'image-process',
    icon: Image,
    title: 'Image Processing',
    description: 'Transform and enhance images with state-of-the-art AI models',
    category: 'media',
  },
  {
    id: 'data-analysis',
    icon: BarChart,
    title: 'Data Analysis',
    description: 'Extract meaningful insights from your data using AI-powered analytics',
    category: 'analysis',
  },
  {
    id: 'ml-models',
    icon: Brain,
    title: 'ML Models',
    description: 'Custom machine learning models tailored to your business needs',
    category: 'ml',
  },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#253b74] dark:text-white font-montserrat mb-4">
            AI-Powered Tools
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-opensans">
            Discover our suite of advanced AI tools designed to transform your workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;