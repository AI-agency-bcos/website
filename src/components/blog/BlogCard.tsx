import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from './types';
import { READ_TIME_UNIT } from './constants';
import { formatReadTime } from './utils';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const readTimeText = formatReadTime(post.readTime);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
      hover:shadow-xl transition-all duration-300">
      {/* Image with fixed aspect ratio */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-sm text-[#91be3f]">{post.category}</span>
          <span className="mx-2">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{readTimeText}</span>
        </div>
        <h3 className="text-xl font-bold text-[#253b74] dark:text-white mb-3 font-montserrat">
          {post.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 font-opensans">
          {post.excerpt}
        </p>
        <button className="flex items-center text-[#253b74] dark:text-[#91be3f] font-semibold 
          hover:text-[#91be3f] dark:hover:text-[#a1ce4f] transition-colors duration-300">
          Read More
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </article>
  );
};

export default BlogCard;
