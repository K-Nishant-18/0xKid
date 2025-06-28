import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen,
  Code,
  CheckCircle,
  Play,
  Lock,
  ArrowLeft,
  Zap,
  Star,
  Trophy,
  Brain,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import GameStudio from './GameStudio';

const QuestDetail = ({ quest, onBackToQuests, onQuestComplete }) => {
  const [activeTab, setActiveTab] = useState('lesson');
  const [showGameStudio, setShowGameStudio] = useState(false);
  const [completedChapters, setCompletedChapters] = useState(quest.completedChapters);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const chapters = [
    {
      id: 1,
      title: "Introduction",
      content: `Welcome to ${quest.title}! In this quest, you'll learn about ${quest.skills.join(' and ')}.`,
      codeExample: quest.code,
      interactive: true
    },
    {
      id: 2,
      title: "Deep Dive",
      content: `Let's explore ${quest.skills[0]} in more detail. ${quest.lesson}`,
      codeExample: quest.code,
      interactive: true
    },
    {
      id: 3,
      title: "Practice Time",
      content: "Now it's your turn to try it out! Complete the interactive challenge.",
      codeExample: quest.code,
      interactive: true
    }
  ];

  const handleChapterComplete = (chapterId) => {
    if (!completedChapters.includes(chapterId)) {
      setCompletedChapters([...completedChapters, chapterId]);
    }
    
    if (chapterId === quest.chapters) {
      onQuestComplete(quest.id);
    }
  };

  const progress = Math.round((completedChapters.length / quest.chapters) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      {showGameStudio ? (
        <GameStudio 
          activeQuest={quest} 
          onBackToQuests={() => setShowGameStudio(false)}
          onQuestComplete={() => {
            setShowGameStudio(false);
            onQuestComplete(quest.id);
          }}
        />
      ) : (
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <button
                  onClick={onBackToQuests}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Quests
                </button>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <span className="text-4xl">{quest.icon}</span>
                  {quest.title}
                </h1>
                <p className="text-xl text-gray-300">{quest.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold">{quest.xp} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3 space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Quest Progress</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span>{completedChapters.length} of {quest.chapters} chapters completed</span>
                    </div>
                  </div>
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#333"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke={getQuestColor(quest)}
                        strokeWidth="3"
                        strokeDasharray={`${progress}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm font-bold">{progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full bg-gradient-to-r ${quest.color} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex border-b border-white/10 mb-4">
                  <button
                    className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'lesson' ? 'text-white border-b-2 border-purple-400' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('lesson')}
                  >
                    <BookOpen className="w-4 h-4" />
                    Lesson
                  </button>
                  <button
                    className={`px-4 py-2 font-medium flex items-center gap-2 ${activeTab === 'code' ? 'text-white border-b-2 border-purple-400' : 'text-gray-400'}`}
                    onClick={() => setActiveTab('code')}
                  >
                    <Code className="w-4 h-4" />
                    Code
                  </button>
                </div>

                {activeTab === 'lesson' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Brain className="w-5 h-5 text-pink-400" />
                      What You'll Learn
                    </h3>
                    <div className="bg-black/30 p-4 rounded-lg mb-6">
                      <p>{quest.lesson}</p>
                    </div>

                    <div className="space-y-4">
                      {chapters.map((chapter, index) => (
                        <div 
                          key={chapter.id} 
                          className={`border rounded-xl overflow-hidden transition-all duration-300 ${completedChapters.includes(chapter.id) ? 'border-green-500/30 bg-green-500/10' : 'border-white/10'}`}
                        >
                          <div 
                            className="flex items-center justify-between p-4 cursor-pointer"
                            onClick={() => toggleSection(chapter.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${completedChapters.includes(chapter.id) ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white'}`}>
                                {completedChapters.includes(chapter.id) ? (
                                  <CheckCircle className="w-4 h-4" />
                                ) : (
                                  <span>{index + 1}</span>
                                )}
                              </div>
                              <h4 className="font-medium">{chapter.title}</h4>
                            </div>
                            {expandedSections[chapter.id] ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          
                          {expandedSections[chapter.id] && (
                            <div className="p-4 pt-0 border-t border-white/10">
                              <div className="prose prose-invert max-w-none mb-4">
                                <p>{chapter.content}</p>
                              </div>
                              
                              {chapter.codeExample && (
                                <div className="mb-4">
                                  <div className="flex items-center gap-2 text-sm mb-2">
                                    <Code className="w-4 h-4 text-cyan-400" />
                                    <span className="font-medium">Code Example:</span>
                                  </div>
                                  <pre className="bg-gray-800 p-3 rounded-md text-sm overflow-x-auto">
                                    <code>{chapter.codeExample}</code>
                                  </pre>
                                </div>
                              )}
                              
                              {chapter.interactive && (
                                <button
                                  onClick={() => {
                                    if (!completedChapters.includes(chapter.id)) {
                                      handleChapterComplete(chapter.id);
                                    }
                                    setShowGameStudio(true);
                                  }}
                                  className={`w-full mt-4 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                    completedChapters.includes(chapter.id)
                                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                      : `bg-gradient-to-r ${quest.color} hover:shadow-lg`
                                  }`}
                                >
                                  {completedChapters.includes(chapter.id) ? (
                                    <>
                                      <CheckCircle className="w-4 h-4" />
                                      Practice Again
                                    </>
                                  ) : (
                                    <>
                                      <Play className="w-4 h-4" />
                                      Start Interactive Lesson
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'code' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Code className="w-5 h-5 text-cyan-400" />
                      Code Examples
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Basic Syntax</h4>
                        <pre className="bg-gray-800 p-4 rounded-md text-sm overflow-x-auto">
                          <code>{quest.code}</code>
                        </pre>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Common Patterns</h4>
                        <pre className="bg-gray-800 p-4 rounded-md text-sm overflow-x-auto">
                          <code>{getExtendedCodeExample(quest.id)}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Skills You'll Gain
                </h3>
                <div className="space-y-3">
                  {quest.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-sm">{index + 1}</span>
                      </div>
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  Quest Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Difficulty</span>
                    <span className={`font-semibold ${getDifficultyColor(quest.difficulty)}`}>
                      {quest.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Estimated Time</span>
                    <span className="font-semibold">{getEstimatedTime(quest.difficulty)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Chapters</span>
                    <span className="font-semibold">{quest.chapters}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Completed</span>
                    <span className="font-semibold">{completedChapters.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowGameStudio(true)}
                    className="w-full flex items-center gap-2 justify-center py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-medium transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Start Interactive Lesson
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(quest.code)}
                    className="w-full flex items-center gap-2 justify-center py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    Copy Code Example
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function getQuestColor(quest) {
  const colorMap = {
    'from-blue-500 to-cyan-500': '#3B82F6',
    'from-green-500 to-emerald-500': '#10B981',
    'from-yellow-500 to-orange-500': '#F59E0B',
    'from-purple-500 to-pink-500': '#8B5CF6',
    'from-emerald-500 to-teal-500': '#10B981',
    'from-red-500 to-pink-500': '#EF4444',
    'from-indigo-500 to-blue-500': '#6366F1',
    'from-orange-500 to-red-500': '#F97316',
    'from-cyan-500 to-blue-500': '#06B6D4',
    'from-gray-500 to-indigo-500': '#6B7280',
  };
  return colorMap[quest.color] || '#3B82F6';
}

function getDifficultyColor(difficulty) {
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
}

function getEstimatedTime(difficulty) {
  switch (difficulty) {
    case 'Beginner':
      return '15-30 mins';
    case 'Intermediate':
      return '30-45 mins';
    case 'Advanced':
      return '45-60 mins';
    default:
      return '20-40 mins';
  }
}

function getExtendedCodeExample(questId) {
  const examples = {
    1: `#include <stdio.h>

int main() {
    // Print a message to the screen
    printf("Hello, C-Land!\\n");
    printf("I'm learning C programming!\\n");
    
    return 0;
}`,
    2: `#include <stdio.h>

int main() {
    // Declare variables to store different types of data
    int coins = 50;          // Integer variable
    float temperature = 23.5; // Floating point variable
    char grade = 'A';        // Character variable
    
    // Print the values
    printf("I have %d coins\\n", coins);
    printf("Temperature is %.1f°C\\n", temperature);
    printf("My grade is %c\\n", grade);
    
    return 0;
}`,
    3: `#include <stdio.h>

int main() {
    int a = 10, b = 4;
    
    // Basic arithmetic operations
    printf("%d + %d = %d\\n", a, b, a + b);
    printf("%d - %d = %d\\n", a, b, a - b);
    printf("%d * %d = %d\\n", a, b, a * b);
    printf("%d / %d = %d\\n", a, b, a / b);
    printf("%d %% %d = %d\\n", a, b, a % b);
    
    // Compound assignment
    a += 5; // Same as a = a + 5
    printf("a is now %d\\n", a);
    
    return 0;
}`
  };
  
  return examples[questId] || `// No extended example available for this quest`;
}

export default QuestDetail;