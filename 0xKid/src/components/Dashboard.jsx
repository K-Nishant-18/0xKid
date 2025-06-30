import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Star, 
  Calendar, 
  Trophy, 
  Clock, 
  Ghost,
  Zap,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      icon: <BookOpen className="w-6 h-6 text-yellow-300" />,
      title: "Continue Mystery Quest",
      subtitle: "Dipper's Code Journal",
      progress: 75,
      color: "from-yellow-600 to-red-800",
      href: "/quests"
    },
    {
      icon: <Ghost className="w-6 h-6 text-blue-300" />,
      title: "New Supernatural Script",
      subtitle: "Mabel's Glittery Game",
      progress: 0,
      color: "from-blue-600 to-purple-800",
      href: "/projects"
    },
    {
      icon: <Star className="w-6 h-6 text-green-300" />,
      title: "Mystery Break",
      subtitle: "Soos' Relaxation Riddle",
      progress: 0,
      color: "from-green-600 to-teal-800",
      href: "/mindfulness"
    }
  ];

  const achievements = [
    { icon: "🧢", title: "First Mystery", description: "Cracked your first coding journal!" },
    { icon: "🌈", title: "Shack Streak", description: "Coded for 7 days in Gravity Falls!" },
    { icon: "🔧", title: "Cipher Hunter", description: "Fixed 10 mysterious code bugs!" },
    { icon: "📖", title: "Journal Master", description: "Built your first supernatural app!" }
  ];

  const todaysGoals = [
    { task: "Solve 2 journal puzzles", completed: true },
    { task: "Work on Dipper's Code Quest", completed: true },
    { task: "Take a mystery break", completed: false },
    { task: "Create a new shack project", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-green-900 text-white font-['Creepster',_cursive] p-3 sm:p-4">
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-yellow-200">
                Welcome back, {user?.name}! 🧢
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-300">
                Ready for another Gravity Falls coding mystery?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-800/50 flex-1 sm:flex-none">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                  <span className="font-semibold text-sm sm:text-base">Shack Streak: {user?.streak} days</span>
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-800/50 flex-1 sm:flex-none">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                  <span className="font-semibold text-sm sm:text-base">Mystery Level {user?.level}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8"
        >
          {[
            { icon: Star, label: "Mystery Points", value: user?.xp.toLocaleString() || "0", color: "text-yellow-300" },
            { icon: BookOpen, label: "Quests Solved", value: "12", color: "text-blue-300" },
            { icon: Ghost, label: "Scripts Written", value: "5", color: "text-green-300" },
            { icon: Clock, label: "Time in Shack", value: "24h", color: "text-red-600" }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-800/50 hover:bg-gray-700/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <div className="text-lg sm:text-xl md:text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-300 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-yellow-200">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-300" />
              Mystery Actions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {quickActions.map((action, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-800/50 hover:bg-gray-700/50 transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {action.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-yellow-200 truncate">{action.title}</h3>
                        <p className="text-gray-300 text-sm sm:text-base truncate">{action.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-200">{action.progress}%</div>
                      <div className="text-xs sm:text-sm text-gray-300">Complete</div>
                    </div>
                  </div>
                  {action.progress > 0 && (
                    <div className="w-full bg-gray-700 rounded-full h-1.5 sm:h-2">
                      <div 
                        className={`h-1.5 sm:h-2 rounded-full bg-gradient-to-r ${action.color} transition-all duration-300`}
                        style={{ width: `${action.progress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Today's Goals */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-800/50">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-yellow-200">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />
                Today's Mysteries
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {todaysGoals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      goal.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400'
                    }`}>
                      {goal.completed && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className={`text-sm sm:text-base ${goal.completed ? 'line-through text-gray-400' : 'text-gray-300'}`}>
                      {goal.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-yellow-800/50">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-yellow-200">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                Shack Achievements
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-sm sm:text-base">{achievement.title}</div>
                      <div className="text-xs sm:text-sm">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Mentor Message */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-red-800/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-600 to-red-800 flex items-center justify-center text-xl">
                  📖
                </div>
                <div>
                  <div className="font-semibold text-yellow-200">Mystery Mentor</div>
                  <div className="text-sm text-gray-300">Grunkle Stan</div>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                "Nice work on Dipper's Code Quest, kid! 🚪 Ready to unravel loops in the next journal puzzle?"
              </p>
              <button className="mt-3 text-sm bg-yellow-600/30 hover:bg-yellow-600/40 px-3 py-1 rounded-full transition-colors">
                Chat with Stan
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;