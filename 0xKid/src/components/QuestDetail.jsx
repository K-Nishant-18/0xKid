import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Star, 
  Clock, 
  Users,
  Lightbulb,
  Code,
  Target,
  Award,
  MessageCircle
} from 'lucide-react';
import CodeEditor from './CodeEditor';

const QuestDetail = ({ questId, onBack }) => {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [completedChapters, setCompletedChapters] = useState([]);

  const quest = {
    id: questId,
    title: "Space Rescue Mission",
    description: "Help astronauts fix their spaceship using conditional logic",
    icon: "🚀",
    difficulty: "Beginner",
    xp: 150,
    estimatedTime: "45 minutes",
    chapters: [
      {
        id: 0,
        title: "Emergency Signal",
        description: "The spaceship is sending distress signals. Help decode them using if-else statements.",
        objective: "Write code to check if the signal strength is above 50",
        initialCode: "// Check if signal strength is strong enough\nlet signalStrength = 75;\n\n// Your code here",
        hint: "Use an if statement to check if signalStrength > 50"
      },
      {
        id: 1,
        title: "Power Systems",
        description: "The ship's power is failing. Help restore power to critical systems.",
        objective: "Create a function to manage power distribution",
        initialCode: "// Manage power distribution\nlet totalPower = 100;\nlet criticalSystems = ['navigation', 'life-support', 'communications'];\n\n// Your code here",
        hint: "Use a loop to distribute power to each system"
      },
      {
        id: 2,
        title: "Navigation Fix",
        description: "The navigation system needs recalibration. Help plot a safe course home.",
        objective: "Calculate the shortest path using coordinates",
        initialCode: "// Calculate distance between two points\nlet shipPosition = {x: 10, y: 20};\nlet earthPosition = {x: 0, y: 0};\n\n// Your code here",
        hint: "Use the distance formula: √((x2-x1)² + (y2-y1)²)"
      }
    ]
  };

  const currentChapterData = quest.chapters[currentChapter];

  const completeChapter = () => {
    if (!completedChapters.includes(currentChapter)) {
      setCompletedChapters([...completedChapters, currentChapter]);
    }
    if (currentChapter < quest.chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const progress = (completedChapters.length / quest.chapters.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Quest Map
          </button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{quest.icon}</div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{quest.title}</h1>
                <p className="text-xl text-gray-300">{quest.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {quest.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    {quest.xp} XP
                  </div>
                  <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
                    {quest.difficulty}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Quest Progress</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chapter Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Chapters</h3>
              <div className="space-y-3">
                {quest.chapters.map((chapter, index) => (
                  <button
                    key={chapter.id}
                    onClick={() => setCurrentChapter(index)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                      currentChapter === index
                        ? 'bg-purple-500/30 border border-purple-500/50'
                        : completedChapters.includes(index)
                        ? 'bg-green-500/20 border border-green-500/30'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        completedChapters.includes(index)
                          ? 'bg-green-500 text-white'
                          : currentChapter === index
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {completedChapters.includes(index) ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{chapter.title}</div>
                        <div className="text-xs text-gray-400">{chapter.description.slice(0, 40)}...</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* AI Mentor */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl">🤖</div>
                  <span className="font-medium">Zara</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">
                  "Great progress! Remember, conditional statements help computers make decisions. Think of them like choosing which path to take!"
                </p>
                <button className="text-sm bg-purple-500/30 hover:bg-purple-500/40 px-3 py-1 rounded-full transition-colors">
                  Get Hint
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">
                  Chapter {currentChapter + 1}: {currentChapterData.title}
                </h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors">
                    <Lightbulb className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{currentChapterData.description}</p>
              
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-blue-300">Objective</span>
                </div>
                <p className="text-gray-300">{currentChapterData.objective}</p>
              </div>

              {currentChapterData.hint && (
                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium text-yellow-300">Hint</span>
                  </div>
                  <p className="text-gray-300">{currentChapterData.hint}</p>
                </div>
              )}
            </div>

            {/* Code Editor */}
            <CodeEditor
              initialCode={currentChapterData.initialCode}
              language="javascript"
            />

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                disabled={currentChapter === 0}
                onClick={() => setCurrentChapter(Math.max(0, currentChapter - 1))}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
              >
                Previous
              </button>
              
              <button
                onClick={completeChapter}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {currentChapter === quest.chapters.length - 1 ? 'Complete Quest' : 'Next Chapter'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default QuestDetail;