// src/components/AIAssistant.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap } from 'lucide-react';

const AIAssistant = ({ quest, chapter, userCode, output }) => {
  // Sample AI suggestions based on user input and quest context
  const getSuggestion = () => {
    if (!userCode) {
      return `Start by typing some code for ${chapter.title}. Try using ${quest.skills.join(' or ')}!`;
    }
    if (output.includes('resists')) {
      return `The mystery resists! Check if your code matches the expected syntax: \n${chapter.challenge.solution}`;
    }
    return `Great progress! Want a hint to make your code even more magical? Try adding comments to explain your steps!`;
  };

  return (
    <div className="space-y-4 font-['Creepster',_cursive]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-yellow-600 flex items-center justify-center">
          <Brain className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-yellow-200">AI Mentor: Zara</h3>
      </div>
      <p className="text-gray-300">{getSuggestion()}</p>
      {userCode && (
        <div className="bg-gray-900 p-4 rounded-md">
          <p className="text-sm text-gray-300">Your Code:</p>
          <pre className="text-sm text-yellow-200">{userCode}</pre>
        </div>
      )}
      <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-yellow-600 hover:from-blue-700 hover:to-yellow-700 px-4 py-2 rounded-full text-yellow-200 transition-all duration-300">
        <Zap className="w-5 h-5" />
        Get More Hints
      </button>
    </div>
  );
};

export default AIAssistant;