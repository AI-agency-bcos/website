import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Loader2, User, MessageSquare } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => (
  <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
    <div className={`flex items-start max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-[#91be3f]' : 'bg-blue-500'
      } ${isBot ? 'mr-2' : 'ml-2'}`}>
        {isBot ? <Bot className="h-5 w-5 text-white" /> : 
          <User className="h-5 w-5 text-white" />}
      </div>
      <div className="flex flex-col">
        <div className={`px-4 py-2 rounded-lg ${
          isBot ? 'bg-white/10 text-white' : 'bg-blue-500 text-white'
        } shadow-lg`}>
          <p className="text-sm">{message}</p>
        </div>
        {timestamp && (
          <span className="text-xs text-gray-500 mt-1 px-2">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  </div>
);

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [messages, setMessages] = useState<{ text: string; isBot: boolean; timestamp: string }[]>([
    { 
      text: "Hello! How can I help you today?", 
      isBot: true, 
      timestamp: new Date().toLocaleTimeString() 
    },
    { 
      text: "Feel free to ask me anything!", 
      isBot: true, 
      timestamp: new Date().toLocaleTimeString() 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const userMessage = inputMessage.trim();
    setMessages(prev => [...prev, { text: userMessage, isBot: false, timestamp }]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        text: "Thanks for your message! This is a demo response. In a real implementation, you would connect this to your backend API.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1500);
  };

  return (
    <>
      {/* Updated Welcome Popup with responsive positioning */}
      {showWelcomePopup && !isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-24 bg-white rounded-lg shadow-xl p-4 animate-bounce-gentle z-50">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-[#91be3f]" />
            <p className="text-sm font-medium">Hey there! 👋 Need any help?</p>
            <button 
              onClick={() => setShowWelcomePopup(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Updated Chat Button with responsive positioning */}
      <button
        onClick={() => {
          setIsOpen(true);
          setShowWelcomePopup(false);
        }}
        className={`fixed bottom-4 right-4 sm:bottom-10 sm:right-10 p-4 sm:p-5 rounded-full bg-[#91be3f] hover:bg-[#a1ce4f] 
          text-white shadow-lg transition-all duration-300 hover:scale-110 z-50
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <Bot className="h-6 w-6 sm:h-8 sm:w-8" />
      </button>

      {/* Updated Chat Window with responsive positioning and sizing */}
      <div className={`fixed bottom-4 right-4 sm:bottom-20 sm:right-20 w-[calc(100vw-2rem)] sm:w-96 
        h-[80vh] sm:h-[600px] max-h-[calc(100vh-2rem)] 
        bg-gray-900 rounded-2xl shadow-2xl flex flex-col transition-all duration-500 z-50
        border border-gray-800 transform ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-[#91be3f]" />
            <h2 className="text-base sm:text-lg font-semibold text-white">AI Assistant</h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message.text} 
              isBot={message.isBot} 
              timestamp={message.timestamp}
            />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Updated Input section */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-gray-800">
          <div className="flex items-center space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-[#91be3f] placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="p-2 rounded-lg bg-[#91be3f] hover:bg-[#a1ce4f] text-white 
                disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <style>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
      `}</style>
    </>
  );
};

export default ChatBot;