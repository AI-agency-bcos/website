import React, { useState } from 'react';
import { Mail, Phone, Sparkles } from 'lucide-react';
import TypewriterEffect from '../TypewriterEffect';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#91be3f]/20 via-transparent to-blue-500/20" />
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(145,190,63,0.1)_0%,transparent_100%)]" />

      <div className="relative container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <Mail className="w-16 h-16 text-[#91be3f] mx-auto mb-6 animate-float" />
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-blue-400 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-[#91be3f] to-blue-500 mb-4">
            <TypewriterEffect text="Contact Us" delay={50} />
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-opensans leading-relaxed">
            We'd love to hear from you! Reach out to us for any inquiries, collaborations, or feedback.
          </p>
        </div>

        {/* Contact Information and Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Contact Information</h2>
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
                <Mail className="w-8 h-8 text-[#91be3f]" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-gray-300">contact@aiagency.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-800">
                <Phone className="w-8 h-8 text-[#91be3f]" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#91be3f]"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#91be3f]"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="mt-1 block w-full bg-gray-700/50 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#91be3f]"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#91be3f] hover:bg-[#a1ce4f] text-white px-6 py-3 rounded-md font-semibold transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;