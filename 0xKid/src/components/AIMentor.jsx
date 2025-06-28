import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Lightbulb,
  Heart,
  Sparkles,
  X,
  Minimize2
} from 'lucide-react';

const AIMentor = ({ isOpen, onClose, context = 'general' }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: "Hi there! I'm Zara, your AI coding mentor. I'm here to help you learn, solve problems, and make coding fun! What would you like to work on today?",
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const quickSuggestions = [
    "Explain this code to me",
    "I'm stuck on this problem",
    "Can you give me a hint?",
    "How do I fix this error?",
    "What should I learn next?",
    "I need a break"
  ];

  const sendMessage = (content) => {
    if (!content.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Great question! Let me break this down for you step by step...",
        "I can see you're working hard! Here's a helpful tip that might solve your problem:",
        "That's a common challenge many coders face. Let's tackle it together!",
        "Excellent thinking! You're on the right track. Here's what I'd suggest:",
        "I love your curiosity! This is exactly the kind of question that leads to great learning.",
        "No worries, everyone gets stuck sometimes! Let's figure this out together."
      ];

      const aiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would use Web Speech API
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // In a real implementation, this would use Text-to-Speech API
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className={`fixed bottom-4 right-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        } transition-all duration-300`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Mentor Zara</h3>
              <div className="flex items-center gap-1 text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Online
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSpeaking}
              className={`p-2 rounded-lg transition-colors ${
                isSpeaking ? 'bg-blue-500/30 text-blue-400' : 'text-gray-400 hover:bg-white/10'
              }`}
            >
              {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 text-gray-400 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100% - 140px)' }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-gray-100'
                  }`}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-purple-300">Zara</span>
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(suggestion)}
                    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-gray-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
                    placeholder="Ask me anything about coding..."
                    className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-full transition-colors ${
                    isListening ? 'bg-red-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => sendMessage(inputMessage)}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AIMentor;