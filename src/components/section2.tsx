import React, { useState } from 'react';
import { ArrowRight, Code, Bot, Database } from 'lucide-react';

const tools = [
  {
    icon: Code,
    title: 'AI Development Kit',
    description: 'Complete toolkit for building and deploying AI solutions'
  },
  {
    icon: Bot,
    title: 'Model Training Platform',
    description: 'Intuitive platform for training and fine-tuning AI models'
  },
  {
    icon: Database,
    title: 'Data Processing Engine',
    description: 'High-performance engine for large-scale data processing'
  }
];

const blogPosts = [
  {
    title: 'The Future of AI in Enterprise',
    category: 'Technology',
    excerpt: 'Explore how artificial intelligence is reshaping enterprise operations and decision-making processes.',
    image: '/api/placeholder/800/600',
    readTime: 8
  },
  {
    title: 'Machine Learning Best Practices',
    category: 'Development',
    excerpt: 'Learn the essential best practices for implementing machine learning in your organization.',
    image: '/api/placeholder/800/600',
    readTime: 12
  },
  {
    title: 'Scaling AI Solutions',
    category: 'Solutions',
    excerpt: 'Strategies and insights for scaling AI solutions across your enterprise infrastructure.',
    image: '/api/placeholder/800/600',
    readTime: 10
  }
];

interface Tool {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const ToolCard = ({ tool }: { tool: Tool }) => {
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

interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: number;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const readTimeText = `${post.readTime} min read`;

  return (
    <article className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
      shadow-lg hover:shadow-xl dark:shadow-gray-900/30
      transform hover:-translate-y-1
      transition-all duration-300 ease-out">
      
      {/* Card border gradient */}
      <div className="absolute inset-0 border border-gray-100 dark:border-gray-700
        bg-gradient-to-b from-gray-50/50 to-transparent 
        dark:from-gray-700/50 dark:to-transparent
        rounded-2xl transition-colors duration-300" />

      {/* Image container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
        {/* Loading skeleton */}
        <div className={`absolute inset-0 animate-pulse
          ${imageLoaded ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-500`} />
        
        {/* Image */}
        <div className="relative h-full overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className={`w-full h-full object-cover transform
              ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
              group-hover:scale-105
              transition-all duration-700 ease-out`}
            onLoad={() => setImageLoaded(true)}
          />
          {/* Image overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t 
            from-black/20 to-transparent opacity-0 
            group-hover:opacity-100
            transition-opacity duration-300" />
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-center mb-4 space-x-2">
          <span className="text-sm text-[#91be3f] dark:text-[#a1ce4f]
            font-medium transition-colors duration-300">
            {post.category}
          </span>
          <span className="text-gray-500 dark:text-gray-400 transition-colors duration-300">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            {readTimeText}
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#253b74] dark:text-white mb-3 
          font-montserrat tracking-tight group-hover:text-[#91be3f] dark:group-hover:text-[#a1ce4f]
          transition-colors duration-300">
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 
          font-opensans leading-relaxed line-clamp-3
          transition-colors duration-300">
          {post.excerpt}
        </p>

        <button className="inline-flex items-center font-semibold
          text-[#253b74] dark:text-[#91be3f]
          group-hover:text-[#91be3f] dark:group-hover:text-[#a1ce4f]
          transition-all duration-300">
          <span>Read More</span>
          <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1
            transition-transform duration-300" />
        </button>
      </div>
    </article>
  );
};

const ToolsAndBlog = () => {
  return (
    <div className="w-full">
      {/* Tools Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <ToolCard key={tool.title} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsAndBlog;