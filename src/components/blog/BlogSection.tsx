import React from 'react';
import BlogCard from './BlogCard';
import { blogPosts } from './blogData';

const BlogSection = () => {
  return (
    <section className="relative py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-50 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/10 via-transparent to-blue-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,190,63,0.05)_0%,transparent_100%)]" />
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#253b74] dark:text-white font-montserrat mb-4 transition-colors duration-300">
            Latest Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-opensans transition-colors duration-300">
            Stay updated with the latest trends and insights in AI technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;