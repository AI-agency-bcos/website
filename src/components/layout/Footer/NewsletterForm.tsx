import React, { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    const API_URL = 'http://localhost:4000/api';

    try {
        const response = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      setMessage(data.message || 'Subscription successful! Please check your email.');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className="font-montserrat font-bold text-lg mb-6">Stay Updated</h3>
      <p className="text-gray-400 mb-4">
        Subscribe to our newsletter for the latest AI insights and updates.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
            focus:outline-none focus:border-[#91be3f] text-white placeholder-gray-500"
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white px-6 py-2 
            rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 
            disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-center text-sm ${
          message.includes('successful') 
            ? 'text-green-500 dark:text-green-400' 
            : 'text-red-500 dark:text-red-400'
        }`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default NewsletterForm;