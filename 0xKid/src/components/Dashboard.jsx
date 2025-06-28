import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Calendar, 
  Trophy, 
  Clock, 
  Star,
  Play,
  BookOpen,
  Code,
  Heart,
  TrendingUp,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      icon: <Play className="w-6 h-6" />,
      title: "Continue Quest",
      subtitle: "Space Rescue Mission",
      progress: 75,
      color: "from-purple-500 to-pink-500",
      href: "/quests"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "New Project",
      subtitle: "Build a game",
      progress: 0,
      color: "from-cyan-500 to-blue-500",
      href: "/projects"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Mindful Break",
      subtitle: "Breathing animation",
      progress: 0,
      color: "from-green-500 to-teal-500",
      href: "/mindfulness"
    }
  ];

  const achievements = [
    { icon: "🏆", title: "First Quest", description: "Completed your first coding quest!" },
    { icon: "🔥", title: "Week Streak", description: "Coded for 7 days straight!" },
    { icon: "🎯", title: "Bug Hunter", description: "Fixed 10 code bugs!" },
    { icon: "🚀", title: "Project Master", description: "Built your first game!" }
  ];

  const todaysGoals = [
    { task: "Complete 2 coding challenges", completed: true },
    { task: "Work on Space Rescue quest", completed: true },
    { task: "Take a mindfulness break", completed: false },
    { task: "Create a new project", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-xl text-gray-300">
                Ready for another coding adventure?
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">Streak: {user?.streak} days</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Level {user?.level}</span>
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
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { icon: Star, label: "XP Points", value: user?.xp.toLocaleString() || "0", color: "text-yellow-400" },
            { icon: Target, label: "Quests Completed", value: "12", color: "text-purple-400" },
            { icon: Code, label: "Projects Built", value: "5", color: "text-cyan-400" },
            { icon: Clock, label: "Time Coding", value: "24h", color: "text-green-400" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Play className="w-6 h-6 text-purple-400" />
              Quick Actions
            </h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{action.title}</h3>
                        <p className="text-gray-300">{action.subtitle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{action.progress}%</div>
                      <div className="text-sm text-gray-300">Complete</div>
                    </div>
                  </div>
                  {action.progress > 0 && (
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${action.color} transition-all duration-300`}
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
            className="space-y-8"
          >
            {/* Today's Goals */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                Today's Goals
              </h3>
              <div className="space-y-3">
                {todaysGoals.map((goal, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      goal.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400'
                    }`}>
                      {goal.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className={`${goal.completed ? 'line-through text-gray-400' : ''}`}>
                      {goal.task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="font-semibold text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-400">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Mentor Message */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                  🤖
                </div>
                <div>
                  <div className="font-semibold">AI Mentor</div>
                  <div className="text-sm text-gray-300">Zara</div>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                "Great progress on your Space Rescue quest! 🚀 Ready to learn about loops in your next challenge?"
              </p>
              <button className="mt-3 text-sm bg-purple-500/30 hover:bg-purple-500/40 px-3 py-1 rounded-full transition-colors">
                Chat with Zara
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;