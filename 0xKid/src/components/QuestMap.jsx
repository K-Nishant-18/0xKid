import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Map, 
  Lock, 
  Star, 
  Play, 
  CheckCircle, 
  Rocket,
  Zap,
  Crown,
  Sparkles,
  Target,
  Code,
  Brain
} from 'lucide-react';

const QuestMap = ({ onQuestSelect }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const quests = [
    {
      id: 1,
      title: "Code Basics Island",
      description: "Learn the fundamentals of programming with drag-and-drop blocks",
      difficulty: "Beginner",
      xp: 100,
      status: "completed",
      progress: 100,
      chapters: 5,
      completedChapters: 5,
      icon: "🏝️",
      color: "from-green-500 to-emerald-500",
      skills: ["Variables", "Loops", "Functions"]
    },
    {
      id: 2,
      title: "Space Rescue Mission",
      description: "Help astronauts fix their spaceship using conditional logic",
      difficulty: "Beginner",
      xp: 150,
      status: "active",
      progress: 75,
      chapters: 6,
      completedChapters: 4,
      icon: "🚀",
      color: "from-purple-500 to-pink-500",
      skills: ["If/Else", "Boolean Logic", "Problem Solving"]
    },
    {
      id: 3,
      title: "Underwater Adventure",
      description: "Explore the ocean depths while learning about arrays and data",
      difficulty: "Intermediate",
      xp: 200,
      status: "locked",
      progress: 0,
      chapters: 7,
      completedChapters: 0,
      icon: "🌊",
      color: "from-blue-500 to-cyan-500",
      skills: ["Arrays", "Data Structures", "Algorithms"]
    },
    {
      id: 4,
      title: "Magical Forest Quest",
      description: "Cast spells with code in an enchanted forest full of mysteries",
      difficulty: "Intermediate",
      xp: 250,
      status: "locked",
      progress: 0,
      chapters: 8,
      completedChapters: 0,
      icon: "🌲",
      color: "from-emerald-500 to-green-500",
      skills: ["Object-Oriented", "Classes", "Inheritance"]
    },
    {
      id: 5,
      title: "Cyberpunk City",
      description: "Hack your way through a futuristic city using advanced algorithms",
      difficulty: "Advanced",
      xp: 350,
      status: "locked",
      progress: 0,
      chapters: 10,
      completedChapters: 0,
      icon: "🌃",
      color: "from-indigo-500 to-purple-500",
      skills: ["APIs", "Databases", "Real-time Data"]
    },
    {
      id: 6,
      title: "AI Robot Factory",
      description: "Build and program AI robots in a high-tech factory",
      difficulty: "Advanced",
      xp: 400,
      status: "locked",
      progress: 0,
      chapters: 12,
      completedChapters: 0,
      icon: "🤖",
      color: "from-red-500 to-orange-500",
      skills: ["Machine Learning", "Neural Networks", "AI Ethics"]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'active':
        return <Play className="w-6 h-6 text-yellow-400" />;
      default:
        return <Lock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400';
      case 'Intermediate':
        return 'text-yellow-400';
      case 'Advanced':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const handleQuestClick = (quest) => {
    if (quest.status !== 'locked') {
      onQuestSelect?.(quest.id);
    }
  };

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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Map className="w-10 h-10 text-purple-400" />
                Quest Map
              </h1>
              <p className="text-xl text-gray-300">
                Choose your adventure and start coding!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">Quest Master</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quest Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest, index) => (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                quest.status === 'locked' ? 'opacity-75' : ''
              }`}
              onClick={() => handleQuestClick(quest)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{quest.icon}</div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(quest.status)}
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quest.difficulty)} bg-white/10`}>
                    {quest.difficulty}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{quest.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{quest.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium">{quest.xp} XP</span>
                </div>
                <div className="text-sm text-gray-300">
                  {quest.completedChapters}/{quest.chapters} chapters
                </div>
              </div>

              {quest.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Progress</span>
                    <span className="text-sm font-medium">{quest.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${quest.color} transition-all duration-300`}
                      style={{ width: `${quest.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {quest.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-2 py-1 bg-white/10 rounded-full text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {selectedQuest === quest.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/20 pt-4 mt-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span>Learn core programming concepts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Code className="w-4 h-4 text-cyan-400" />
                      <span>Build interactive projects</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Brain className="w-4 h-4 text-pink-400" />
                      <span>Solve challenging puzzles</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <button
                className={`w-full mt-4 py-3 rounded-full font-semibold transition-all duration-300 ${
                  quest.status === 'locked'
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : quest.status === 'completed'
                    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                    : `bg-gradient-to-r ${quest.color} hover:shadow-lg transform hover:scale-105`
                }`}
                disabled={quest.status === 'locked'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuestClick(quest);
                }}
              >
                {quest.status === 'locked' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Complete previous quest
                  </span>
                ) : quest.status === 'completed' ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Completed
                  </span>
                ) : quest.status === 'active' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Continue Quest
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Start Quest
                  </span>
                )}
              </button>
            </motion.div>
          ))}
        </div>

        {/* AI Mentor Tip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
              🤖
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI Mentor Tip</h3>
              <p className="text-gray-300">
                "Great work on Space Rescue Mission! 🚀 You're mastering conditional logic. 
                Ready to dive into the Underwater Adventure to learn about arrays and data structures?"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestMap;