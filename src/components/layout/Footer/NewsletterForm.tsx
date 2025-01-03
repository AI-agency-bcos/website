import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';


const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Attempting to connect to Supabase...');
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email });
  
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
  
      setMessage('Subscription successful! Please check your email.');
    } catch (error) {
      console.error('Detailed error:', error);
      if (error instanceof Error) {
        setMessage(`Subscription failed. Please try again. Error: ${error.message}`);
      } else {
        setMessage('Subscription failed. Please try again.');
      }
    }
    setEmail('');
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
        />
        <button
          type="submit"
          className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white px-6 py-2 
            rounded-lg font-semibold transition-all duration-300"
        >
          Subscribe
        </button>
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">{message}</p>}
    </div>
  );
};

export default NewsletterForm;