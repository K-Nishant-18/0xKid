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
  Ghost,
  Target,
  BookOpen,
  Brain
} from 'lucide-react';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const QuestMap = ({ onQuestSelect }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  const quests = [
    {
      id: 1,
      title: "The Whispering Journal",
      description: "In Mystery-Land, help Dipper make his journal speak using printf!",
      difficulty: "Beginner",
      xp: 100,
      status: "completed",
      progress: 100,
      chapters: 1,
      completedChapters: 1,
      icon: "📜",
      color: "from-blue-600 to-green-600",
      skills: ["printf", "Output"],
      code: `printf("The journal speaks!");`,
      lesson: "printf reveals messages hidden in your code."
    },
    {
      id: 2,
      title: "Grunkle Stan’s Mystery Boxes",
      description: "Organize Stan’s artifacts using variables to track mystical items.",
      difficulty: "Beginner",
      xp: 150,
      status: "active",
      progress: 75,
      chapters: 2,
      completedChapters: 1,
      icon: "🎁",
      color: "from-yellow-600 to-red-600",
      skills: ["Variables", "Data Types"],
      code: `int artifacts = 50;\nchar relic = 'S';`,
      lesson: "Variables store secrets in named containers."
    },
    {
      id: 3,
      title: "The Cipher Wheel",
      description: "Activate Mabel’s Cipher Wheel with arithmetic operations.",
      difficulty: "Beginner",
      xp: 200,
      status: "locked",
      progress: 0,
      chapters: 2,
      completedChapters: 0,
      icon: "🔢",
      color: "from-green-600 to-blue-600",
      skills: ["Arithmetic", "Operators"],
      code: `int a = 6, b = 3;\nprintf("%d", a + b);`,
      lesson: "Use arithmetic operators to decode calculations."
    },
    {
      id: 4,
      title: "The Mystic Gate",
      description: "Navigate a cryptic gate using if-else decision-making.",
      difficulty: "Intermediate",
      xp: 250,
      status: "locked",
      progress: 0,
      chapters: 3,
      completedChapters: 0,
      icon: "🌀",
      color: "from-purple-600 to-blue-600",
      skills: ["if-else", "Conditional Logic"],
      code: `int code = 12;\nif(code > 10) {\n  printf("Gate opens!");\n} else {\n  printf("Gate sealed!");\n}`,
      lesson: "Use if-else to choose paths in your mystery."
    },
    {
      id: 5,
      title: "The Enchanted Forest Loops",
      description: "Plant a mystical forest using for loops to automate tasks.",
      difficulty: "Intermediate",
      xp: 300,
      status: "locked",
      progress: 0,
      chapters: 3,
      completedChapters: 0,
      icon: "🌲",
      color: "from-green-600 to-teal-600",
      skills: ["for loop", "Iteration"],
      code: `for(int i = 1; i <= 10; i++) {\n  printf("Planting tree %d\\n", i);\n}`,
      lesson: "For loops repeat actions a set number of times."
    },
    {
      id: 6,
      title: "The Oracle’s Call",
      description: "Create an interactive program that listens using scanf.",
      difficulty: "Intermediate",
      xp: 350,
      status: "locked",
      progress: 0,
      chapters: 3,
      completedChapters: 0,
      icon: "🔮",
      color: "from-red-600 to-yellow-600",
      skills: ["scanf", "User Input"],
      code: `char name[20];\nint age;\nscanf("%s", name);\nscanf("%d", &age);`,
      lesson: "Use scanf to hear whispers from the user."
    },
    {
      id: 7,
      title: "Mabel’s Spell Book",
      description: "Craft reusable spells with functions to aid Mabel’s adventures.",
      difficulty: "Advanced",
      xp: 400,
      status: "locked",
      progress: 0,
      chapters: 4,
      completedChapters: 0,
      icon: "📖",
      color: "from-blue-600 to-indigo-600",
      skills: ["Functions", "Code Reusability"],
      code: `void cast_spell() {\n  printf("Magic unleashed!");\n}`,
      lesson: "Functions let you reuse magical code blocks."
    },
    {
      id: 8,
      title: "The Mystery Train",
      description: "Deliver relics efficiently using arrays to store multiple values.",
      difficulty: "Advanced",
      xp: 450,
      status: "locked",
      progress: 0,
      chapters: 4,
      completedChapters: 0,
      icon: "🚂",
      color: "from-yellow-600 to-red-600",
      skills: ["Arrays", "Data Storage"],
      code: `int relics[5] = {1, 2, 3, 4, 5};\nprintf("%d", relics[2]); // 3`,
      lesson: "Arrays hold many secrets in one container."
    },
    {
      id: 9,
      title: "The Whispering Cave",
      description: "Master while loops to make echoes repeat in the mystic cave.",
      difficulty: "Advanced",
      xp: 500,
      status: "locked",
      progress: 0,
      chapters: 4,
      completedChapters: 0,
      icon: "🔊",
      color: "from-cyan-600 to-blue-600",
      skills: ["while loop", "Iteration"],
      code: `int count = 1;\nwhile(count <= 3) {\n  printf("Echo %d\\n", count);\n  count++;\n}`,
      lesson: "While loops repeat as long as the spell is true."
    },
    {
      id: 10,
      title: "The Shadowy Path",
      description: "Take steps in a dark path using do-while loops.",
      difficulty: "Advanced",
      xp: 550,
      status: "locked",
      progress: 0,
      chapters: 4,
      completedChapters: 0,
      icon: "🌑",
      color: "from-gray-600 to-indigo-600",
      skills: ["do-while loop", "Iteration"],
      code: `int steps = 1;\ndo {\n  printf("Step %d\\n", steps);\n  steps++;\n} while(steps <= 3);`,
      lesson: "Do-while loops venture forth at least once."
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'active':
        return <Play className="w-6 h-6 text-yellow-600" />;
      default:
        return <Lock className="w-6 h-6 text-gray-400" />;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-400';
      case 'Intermediate':
        return 'text-yellow-600';
      case 'Advanced':
        return 'text-red-600';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-green-900 text-white p-4 font-['Creepster',_cursive]">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
          body {
            background-image: url('${mysteryShackImg}');
            background-size: cover;
            background-attachment: fixed;
            background-position: center;
          }
        `}
      </style>
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
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 text-yellow-200">
                <Map className="w-10 h-10 text-blue-300" />
                Mystery Code Map
              </h1>
              <p className="text-xl text-gray-300">
                Embark on a coding adventure in Mystery-Land with Dipper and Mabel!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl px-6 py-4 border border-yellow-800/50">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-200">Mystery Master</span>
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
              className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                quest.status === 'locked' ? 'opacity-75' : ''
              }`}
              onClick={() => handleQuestClick(quest)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{quest.icon}</div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(quest.status)}
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(quest.difficulty)} bg-gray-800/50`}>
                    {quest.difficulty}
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2 text-yellow-200">{quest.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{quest.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-200">{quest.xp} XP</span>
                </div>
                <div className="text-sm text-gray-300">
                  {quest.completedChapters}/{quest.chapters} chapters
                </div>
              </div>

              {quest.progress > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Progress</span>
                    <span className="text-sm font-medium text-yellow-200">{quest.progress}%</span>
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
                    className="px-2 py-1 bg-gray-800/50 rounded-full text-xs font-medium text-gray-300"
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
                  className="border-t border-yellow-800/50 pt-4 mt-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-blue-300" />
                      <span>Code Example:</span>
                    </div>
                    <pre className="bg-gray-900 p-3 rounded-md text-sm overflow-x-auto">
                      <code>{quest.code}</code>
                    </pre>
                    <div className="flex items-center gap-2 text-sm">
                      <Brain className="w-4 h-4 text-red-600" />
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
                    ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
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
                    Solve previous mystery
                  </span>
                ) : quest.status === 'completed' ? (
                  <span className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Mystery Solved
                  </span>
                ) : quest.status === 'active' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Continue Mystery
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Rocket className="w-4 h-4" />
                    Start Mystery
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
          className="mt-8 bg-gradient-to-r from-blue-600/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-yellow-600 flex items-center justify-center text-2xl">
              🦁
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-200">AI Mentor Tip</h3>
              <p className="text-gray-300">
                "Great job cracking The Whispering Journal! 📜 You're mastering printf. Ready to organize Grunkle Stan’s artifacts with variables in the next mystery?"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuestMap;