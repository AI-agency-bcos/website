import React, { useState, useEffect } from 'react';
import { Book, Sparkles, ArrowRight, Calendar, Clock, User, Shield } from 'lucide-react';
import BlogGenerationForm from './blogFormG';
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
  status?: 'draft' | 'published';
}

const BlogDetailsPage = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogDetails | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showGenerationForm, setShowGenerationForm] = useState(false);

  useEffect(() => {
    // Check if user is admin
    const checkAdminStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) return;

        // Call the /auth/is-admin endpoint
        const response = await fetch('http://localhost:4000/api/auth/is-admin', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to check admin status');
        }

        const data = await response.json();
        setIsAdmin(data.isAdmin); // Set the admin status based on the response
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();
  }, []);

  // Get the token from localStorage
  const token = localStorage.getItem('token') || '';

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Your existing background effects */}

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our latest blog posts on technology, design, and more.
          </p>

          {/* Show the "Generate New Blog" and "Manage Blogs" buttons only if the user is an admin */}
          {isAdmin && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => setShowGenerationForm(!showGenerationForm)}
                className="flex items-center gap-2 bg-[#91be3f] hover:bg-[#82ac39] text-black px-6 py-3 rounded-lg 
                  transition-colors duration-300"
              >
                <Sparkles className="w-5 h-5" />
                {showGenerationForm ? 'Hide Generation Form' : 'Generate New Blog'}
              </button>
              <button
                onClick={() => window.location.href = '/admin/blogs'}
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg 
                  transition-colors duration-300"
              >
                <Shield className="w-5 h-5" />
                Manage Blogs
              </button>
            </div>
          )}
        </div>

        {/* Blog Generation Form */}
        {isAdmin && showGenerationForm && (
          <div className="mb-12">
            <BlogGenerationForm token={token} /> {/* Pass the token prop */}
          </div>
        )}

        {/* Blog Posts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                  <Clock className="w-4 h-4 ml-4" />
                  <span>{formatReadTime(post.readTime)}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <a
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-[#91be3f] hover:text-[#82ac39] transition-colors duration-300"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;