import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import ReactMarkdown from 'react-markdown';

interface BlogGenerationFormProps {
  token: string;
}

interface BlogContent {
  title?: string;
  introduction?: string;
  content?: string;
  conclusion?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  featuredImage?: string;
  category?: string;
  seoMetadata?: {
    keywords?: string[];
  };
}

const BlogGenerationForm = ({ token }: BlogGenerationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [generatedBlog, setGeneratedBlog] = useState<BlogContent | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    prompt: '',
  });

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:4000/api/blogs/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate blog');
      }

      setGeneratedBlog(data.data);
      setSuccess('Blog post generated successfully! Review it below.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:4000/api/blogs/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to save blog');
      }

      setSuccess('Blog post saved successfully!');
      setGeneratedBlog(null);
      setFormData({ category: '', prompt: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
            className="w-full bg-gray-800/50 rounded-lg border border-gray-700 p-2 text-white"
            placeholder="Enter blog category"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Content Prompt</label>
          <textarea
            value={formData.prompt}
            onChange={(e) => setFormData((prev) => ({ ...prev, prompt: e.target.value }))}
            className="w-full bg-gray-800/50 rounded-lg border border-gray-700 p-2 text-white min-h-[100px]"
            placeholder="Describe what you want the blog post to be about..."
            required
          />
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-500/20 text-green-500 border-green-500/50">
            <Sparkles className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#91be3f] hover:bg-[#82ac39] text-black font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Generating...' : 'Generate Blog Post'}
        </button>
      </form>

      {generatedBlog && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-6">Generated Blog Post</h3>
          <div className="bg-gray-800/50 rounded-lg p-6">
            {/* Title above the image */}
            <h1 className="text-2xl font-bold mb-4">{generatedBlog.title}</h1>

            {/* Featured image */}
            {generatedBlog.featuredImage && (
              <div className="w-full h-64 overflow-hidden rounded-lg mb-6">
                <img
                  src={generatedBlog.featuredImage?.startsWith('http') ? generatedBlog.featuredImage : '/fallback.jpg'}
                  alt={generatedBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Blog content with proper spacing */}
            <ReactMarkdown
              className="prose prose-invert"
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mb-4 mt-6" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-bold mb-3 mt-5" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-lg font-bold mb-2 mt-4" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4" {...props} />,
              }}
            >
              {generatedBlog.content}
            </ReactMarkdown>

            {/* Keywords section */}
            {(generatedBlog.keywords || generatedBlog.seoMetadata?.keywords) && (
              <div className="mt-6">
                <h5 className="text-lg font-semibold mb-2">Keywords</h5>
                <div className="flex flex-wrap gap-2">
                  {(generatedBlog.keywords || generatedBlog.seoMetadata?.keywords || []).map((keyword, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full mt-6 bg-[#91be3f] hover:bg-[#82ac39] text-black font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : 'Save Blog Post'}
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogGenerationForm;