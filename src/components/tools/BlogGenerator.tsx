import { useState } from 'react';
import { Send, Loader2, Tag } from 'lucide-react';

interface BlogGeneratorResponse {
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
}

interface FormData {
  topic: string;
  tone: string;
  length: string;
}

const BlogGenerator = () => {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    tone: 'professional',
    length: 'medium',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedBlog, setGeneratedBlog] = useState<BlogGeneratorResponse | null>(null);
  const API_URL = 'http://localhost:4000/api';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/generate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // First check if the response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate blog content');
      }

      setGeneratedBlog(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/20 via-transparent to-blue-500/20 rounded-xl" />
        <div className="relative bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Input */}
            <div>
              <label className="block text-gray-300 mb-2 font-medium">Blog Topic</label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:border-[#91be3f] transition-colors placeholder-gray-500 text-white"
                placeholder="Enter your blog topic"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tone Selection */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Writing Tone</label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:border-[#91be3f] transition-colors text-white"
                >
                  <option value="professional" className="text-gray-900">Professional</option>
                  <option value="casual" className="text-gray-900">Casual</option>
                  <option value="formal" className="text-gray-900">Formal</option>
                  <option value="friendly" className="text-gray-900">Friendly</option>
                </select>
              </div>

              {/* Length Selection */}
              <div>
                <label className="block text-gray-300 mb-2 font-medium">Article Length</label>
                <select
                  name="length"
                  value={formData.length}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:border-[#91be3f] transition-colors text-white"
                >
                  <option value="short" className="text-gray-900">Short (~300 words)</option>
                  <option value="medium" className="text-gray-900">Medium (~600 words)</option>
                  <option value="long" className="text-gray-900">Long (~1000 words)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#91be3f] to-[#a1ce4f] hover:shadow-lg hover:shadow-[#91be3f]/25'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Generate Blog
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {/* Generated Blog Content */}
      {generatedBlog && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/10 via-transparent to-blue-500/10 rounded-xl" />
          <div className="relative bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
            <div className="space-y-6">
              <div>
                <h4 className="text-gray-400 mb-2">Title</h4>
                <p className="text-xl font-bold text-white">{generatedBlog.title}</p>
              </div>
              
              <div>
                <h4 className="text-gray-400 mb-2">Excerpt</h4>
                <p className="text-gray-300">{generatedBlog.excerpt}</p>
              </div>
              
              <div>
                <h4 className="text-gray-400 mb-2">Content</h4>
                <div className="bg-white/5 rounded-lg p-6 text-gray-300 whitespace-pre-wrap">
                  {generatedBlog.content}
                </div>
              </div>
              
              <div>
                <h4 className="text-gray-400 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedBlog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center px-3 py-1 bg-[#91be3f]/20 text-[#91be3f] rounded-full text-sm"
                    >
                      <Tag className="w-4 h-4 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;