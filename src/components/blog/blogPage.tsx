import React, { useState } from 'react';
import { Book, Sparkles, ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from './blogData';
import { formatReadTime } from './utils';

interface BlogDetails {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: number;
  date: string;
  excerpt: string;
}

const BlogDetailsPage = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogDetails | null>(null);

  const handleBlogClick = (blog: BlogDetails) => {
    setSelectedBlog(blog);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Background Effects with z-index */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/20 via-transparent to-blue-500/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,190,63,0.1)_0%,transparent_100%)] opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <Book className="w-16 h-16 text-[#91be3f] mx-auto mb-6" 
              style={{ animation: 'float 3s ease-in-out infinite' }} />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4">
            <span className="bg-gradient-to-r from-[#91be3f] to-blue-500 bg-clip-text text-transparent">
              Our Blogs
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-opensans leading-relaxed">
            Discover the latest insights and trends in AI technology
          </p>
        </div>

        {/* Blog Content */}
        {selectedBlog ? (
          <div className="relative bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setSelectedBlog(null)}
                className="flex items-center text-[#91be3f] hover:text-[#a1ce4f] transition-colors duration-300"
              >
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                Back to Blogs
              </button>
              <span className="px-4 py-2 bg-[#91be3f]/20 text-[#91be3f] rounded-full text-sm">
                {selectedBlog.category}
              </span>
            </div>

            <img 
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-96 object-cover rounded-xl mb-8 transition-transform duration-300"
            />

            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-400">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {selectedBlog.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(selectedBlog.date)}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {formatReadTime(selectedBlog.readTime)}
              </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">
              {selectedBlog.title}
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              {selectedBlog.content || "Full content would go here..."}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((blog) => (
              <div
                key={blog.id}
                onClick={() => handleBlogClick(blog)}
                className="group relative bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden 
                  cursor-pointer border border-gray-800 transition-all duration-300
                  hover:shadow-lg hover:shadow-[#91be3f]/10 hover:translate-y-[-4px]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
                
                <img 
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 
                    group-hover:scale-105"
                />
                
                <div className="relative p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-sm text-[#91be3f]">{blog.category}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-400">{formatReadTime(blog.readTime)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#91be3f] 
                    transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-400">
                    <User className="w-4 h-4 mr-2" />
                    {blog.author}
                    <span className="mx-2 text-gray-500">•</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(blog.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};

export default BlogDetailsPage;