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
      title: "The Talking Screen",
      description: "In C-Land, help Captain Code make his silent robot speak using printf!",
      difficulty: "Beginner",
      xp: 100,
      status: "completed",
      progress: 100,
      chapters: 1,
      completedChapters: 1,
      icon: "🗣️",
      color: "from-blue-500 to-cyan-500",
      skills: ["printf", "Output"],
      code: `printf("Hello, I am a robot!");`,
      lesson: "printf lets your code show messages to the user."
    },
    {
      id: 2,
      title: "Captain Code’s Treasure Boxes",
      description: "Organize Captain Code’s treasures using variables to keep track of items.",
      difficulty: "Beginner",
      xp: 150,
      status: "active",
      progress: 75,
      chapters: 2,
      completedChapters: 1,
      icon: "🎒",
      color: "from-green-500 to-emerald-500",
      skills: ["Variables", "Data Types"],
      code: `int coins = 50;\nchar grade = 'A';`,
      lesson: "Variables are used to store data in named containers."
    },
    {
      id: 3,
      title: "The Math Machine",
      description: "Power up the legendary Math Machine with arithmetic operations.",
      difficulty: "Beginner",
      xp: 200,
      status: "locked",
      progress: 0,
      chapters: 2,
      completedChapters: 0,
      icon: "➕",
      color: "from-yellow-500 to-orange-500",
      skills: ["Arithmetic", "Operators"],
      code: `int a = 6, b = 3;\nprintf("%d", a + b);`,
      lesson: "Use arithmetic operators to do math in C."
    },
    {
      id: 4,
      title: "The Gate of Choices",
      description: "Navigate a talking gate by mastering if-else decision-making.",
      difficulty: "Intermediate",
      xp: 250,
      status: "locked",
      progress: 0,
      chapters: 3,
      completedChapters: 0,
      icon: "🚪",
      color: "from-purple-500 to-pink-500",
      skills: ["if-else", "Conditional Logic"],
      code: `int num = 12;\nif(num > 10) {\n  printf("You may enter!");\n} else {\n  printf("Access denied!");\n}`,
      lesson: "Use if-else to choose different paths in your program."
    },
    {
      id: 5,
      title: "The Garden of Loops",
      description: "Plant a blooming garden using for loops to automate tasks.",
      difficulty: "Intermediate",
      xp: 300,
      status: "locked",
      progress: 0,
      chapters: 3,
      completedChapters: 0,
      icon: "🌼",
      color: "from-emerald-500 to-teal-500",
      skills: ["for loop", "Iteration"],
      code: `for(int i = 1; i <= 10; i++) {\n  printf("Planting flower %d\\n", i);\n}`,
      lesson: "Use for loops to repeat something a set number of times."
    },
    {
      id: 6,
      title: "Ask and You Shall Code",
      description: "Create an interactive program that listens to kids using scanf.",
      difficulty: "Intermediate",
      xp: 350,
      status: "locked",
      progress: 0,
      chapters: 3,
      completedChapters: 0,
      icon: "🎤",
      color: "from-red-500 to-pink-500",
      skills: ["scanf", "User Input"],
      code: `char name[20];\nint age;\nscanf("%s", name);\nscanf("%d", &age);`,
      lesson: "Use scanf to get input from the user."
    },
    {
      id: 7,
      title: "Captain Code’s Tool Kit",
      description: "Build reusable tools with functions to simplify Captain Code’s tasks.",
      difficulty: "Advanced",
      xp: 400,
      status: "locked",
      progress: 0,
      chapters: 4,
      completedChapters: 0,
      icon: "🔧",
      color: "from-indigo-500 to-blue-500",
      skills: ["Functions", "Code Reusability"],
      code: `void jump() {\n  printf("Jumping high!");\n}`,
      lesson: "Functions let you reuse blocks of code by giving them names."
    },
    {
      id: 8,
      title: "The Train of Numbers",
      description: "Deliver gifts efficiently using arrays to store multiple values.",
      difficulty: "Advanced",
      xp: 450,
      status: "locked",
      progress: 0,
      chapters: 4,
      completedChapters: 0,
      icon: "🚂",
      color: "from-orange-500 to-red-500",
      skills: ["Arrays", "Data Storage"],
      code: `int gifts[5] = {1, 2, 3, 4, 5};\nprintf("%d", gifts[2]); // 3`,
      lesson: "Arrays store many values in one container."
    },
    {
      id: 9,
      title: "The Echo Cave",
      description: "Master while loops to make echoes repeat in the mysterious cave.",
      difficulty: "Advanced",
      xp: 500,
      status: "locked",
      progress: 0,
      chapters: 4,
      completedChapters: 0,
      icon: "🔄",
      color: "from-cyan-500 to-blue-500",
      skills: ["while loop", "Iteration"],
      code: `int count = 1;\nwhile(count <= 3) {\n  printf("Echo %d\\n", count);\n  count++;\n}`,
      lesson: "while loops repeat as long as the condition is true."
    },
    {
      id: 10,
      title: "The Tunnel of One Step",
      description: "Take at least one step in a dark tunnel using do-while loops.",
      difficulty: "Advanced",
      xp: 550,
      status: "locked",
      progress: 0,
      chapters: 4,
      completedChapters: 0,
      icon: "🚶",
      color: "from-gray-500 to-indigo-500",
      skills: ["do-while loop", "Iteration"],
      code: `int steps = 1;\ndo {\n  printf("Step %d\\n", steps);\n  steps++;\n} while(steps <= 3);`,
      lesson: "do-while loops run at least once, even if the condition is false."
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
      setSelectedQuest(quest.id === selectedQuest ? null : quest.id);
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
                C Programming Quest Map
              </h1>
              <p className="text-xl text-gray-300">
                Embark on a coding adventure in C-Land with Captain Code!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">Code Master</span>
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
                      <Code className="w-4 h-4 text-cyan-400" />
                      <span>Code Example:</span>
                    </div>
                    <pre className="bg-gray-800 p-3 rounded-md text-sm overflow-x-auto">
                      <code>{quest.code}</code>
                    </pre>
                    <div className="flex items-center gap-2 text-sm">
                      <Brain className="w-4 h-4 text-pink-400" />
                      <span>Lesson: {quest.lesson}</span>
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
                "Great work on The Talking Screen! 🗣️ You're mastering printf. Ready to organize Captain Code’s treasures with variables in the next quest?"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestMap;