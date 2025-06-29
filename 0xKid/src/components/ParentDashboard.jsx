import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Star,
  Target,
  Heart,
  BookOpen,
  Award,
  Activity,
  Eye,
  Shield,
  Settings,
  Brain,
  AlertTriangle,
  CheckCircle,
  Download,
  Mail,
  Phone,
  Ghost,
  Sparkles
} from 'lucide-react';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0);
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  const children = [
    {
      id: 1,
      name: "Dipper",
      age: 12,
      avatar: "🧢",
      level: 3,
      xp: 1250,
      streak: 7,
      totalTime: "24h 30m",
      questsCompleted: 12,
      projectsBuilt: 5,
      mindfulnessMinutes: 45,
      favoriteLanguage: "Blockly",
      lastActive: "2 hours ago",
      screenTimeToday: "1h 45m",
      screenTimeLimit: "2h 00m",
      mood: "curious",
      strugglingWith: [],
      strengths: ["Mystery Solving", "Code Exploration", "Determination"]
    },
    {
      id: 2,
      name: "Mabel",
      age: 12,
      avatar: "🌈",
      level: 5,
      xp: 2890,
      streak: 12,
      totalTime: "48h 15m",
      questsCompleted: 25,
      projectsBuilt: 12,
      mindfulnessMinutes: 120,
      favoriteLanguage: "Python",
      lastActive: "1 hour ago",
      screenTimeToday: "2h 30m",
      screenTimeLimit: "3h 00m",
      mood: "cheerful",
      strugglingWith: ["Complex Ciphers"],
      strengths: ["Creative Coding", "Pattern Recognition", "Debugging"]
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', minutes: 45, quests: 2, mood: 'curious', breaks: 3 },
    { day: 'Tue', minutes: 60, quests: 3, mood: 'cheerful', breaks: 4 },
    { day: 'Wed', minutes: 30, quests: 1, mood: 'puzzled', breaks: 2 },
    { day: 'Thu', minutes: 75, quests: 4, mood: 'focused', breaks: 5 },
    { day: 'Fri', minutes: 90, quests: 5, mood: 'excited', breaks: 6 },
    { day: 'Sat', minutes: 120, quests: 6, mood: 'adventurous', breaks: 8 },
    { day: 'Sun', minutes: 80, quests: 3, mood: 'relaxed', breaks: 5 }
  ];

  const recentAchievements = [
    { 
      icon: "📖", 
      title: "First Mystery Game", 
      description: "Built a Gnome Invasion game",
      date: "2 days ago",
      child: "Dipper",
      category: "Project"
    },
    { 
      icon: "🔥", 
      title: "Two Week Streak", 
      description: "Investigated code for 14 days straight",
      date: "3 days ago",
      child: "Mabel",
      category: "Consistency"
    },
    { 
      icon: "🔍", 
      title: "Mystery Master", 
      description: "Completed 25 coding quests",
      date: "5 days ago",
      child: "Mabel",
      category: "Learning"
    },
    { 
      icon: "🧘", 
      title: "Mindful Sleuth", 
      description: "Completed 10 mindfulness sessions",
      date: "1 week ago",
      child: "Dipper",
      category: "Wellness"
    }
  ];

  const skillProgress = [
    { skill: "Mystery Solving", progress: 85, color: "bg-blue-600", trend: "+12%" },
    { skill: "Pattern Recognition", progress: 78, color: "bg-green-600", trend: "+8%" },
    { skill: "Creative Coding", progress: 92, color: "bg-yellow-600", trend: "+15%" },
    { skill: "Determination", progress: 75, color: "bg-red-600", trend: "+5%" },
    { skill: "Team Investigation", progress: 68, color: "bg-purple-600", trend: "+20%" }
  ];

  const learningInsights = [
    {
      type: "strength",
      title: "Visual Clues",
      description: "Dipper excels with visual coding mysteries and animations",
      recommendation: "Continue with visual projects, introduce text-based ciphers"
    },
    {
      type: "improvement",
      title: "Debugging Ciphers",
      description: "Could use more practice cracking code errors",
      recommendation: "Introduce cipher-breaking challenges and bug-hunting quests"
    },
    {
      type: "wellness",
      title: "Mystic Balance",
      description: "Great balance between coding adventures and mindfulness breaks",
      recommendation: "Maintain schedule, explore group mystery-solving"
    }
  ];

  const selectedChildData = children[selectedChild];

  const getMoodEmoji = (mood) => {
    const moods = {
      curious: "🔍",
      cheerful: "🌈",
      focused: "🎯",
      puzzled: "❓",
      relaxed: "😌",
      adventurous: "🗺️",
      frustrated: "😤"
    };
    return moods[mood] || "🔍";
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'strength': return <Star className="w-5 h-5 text-green-400" />;
      case 'improvement': return <Target className="w-5 h-5 text-yellow-300" />;
      case 'wellness': return <Heart className="w-5 h-5 text-red-600" />;
      default: return <Brain className="w-5 h-5 text-blue-300" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-green-900 text-white font-['Creepster',_cursive] p-4">
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
                <BookOpen className="w-10 h-10 text-blue-300" />
                Parents Dashboard
              </h1>
              <p className="text-xl text-gray-300">
                Track your young detective's coding adventures
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-sm border border-yellow-800/50 rounded-lg px-4 py-2 text-yellow-200"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-yellow-200">
                <Download className="w-4 h-4" />
                Export Journal
              </button>
              <button className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-yellow-200" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Child Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-4">
            {children.map((child, index) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  selectedChild === index
                    ? 'bg-gray-800/50 shadow-lg ring-2 ring-blue-300'
                    : 'bg-gray-800/30 hover:bg-gray-700/50'
                }`}
              >
                <div className="text-3xl">{child.avatar}</div>
                <div className="text-left">
                  <div className="font-semibold text-yellow-200">{child.name}</div>
                  <div className="text-sm text-gray-300">Age {child.age} • Level {child.level}</div>
                  <div className="text-xs text-gray-400 flex items-center gap-1">
                    {getMoodEmoji(child.mood)} {child.mood}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex gap-4 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-yellow-800/50 w-fit">
            {[
              { id: 'overview', label: 'Mystery Overview', icon: BarChart3 },
              { id: 'learning', label: 'Code Learning', icon: Brain },
              { id: 'wellness', label: 'Mystic Wellness', icon: Heart },
              { id: 'safety', label: 'Safety Charms', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gray-800/50 text-yellow-200 shadow-lg'
                    : 'text-gray-300 hover:text-yellow-200 hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              icon: Clock, 
              label: "Screen Time Today", 
              value: selectedChildData.screenTimeToday, 
              color: "text-cyan-400",
              trend: `${selectedChildData.screenTimeLimit} limit`,
              status: "good"
            },
            { 
              icon: Target, 
              label: "Mysteries Solved", 
              value: selectedChildData.questsCompleted.toString(), 
              color: "text-blue-300",
              trend: "+8 this week",
              status: "excellent"
            },
            { 
              icon: BookOpen, 
              label: "Projects Decoded", 
              value: selectedChildData.projectsBuilt.toString(), 
              color: "text-green-400",
              trend: "+2 this week",
              status: "good"
            },
            { 
              icon: Heart, 
              label: "Mindfulness Score", 
              value: "98%", 
              color: "text-red-600",
              trend: "Mystic balance",
              status: "excellent"
            }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className={`w-3 h-3 rounded-full ${
                  stat.status === 'excellent' ? 'bg-green-400' : 
                  stat.status === 'good' ? 'bg-yellow-300' : 'bg-red-600'
                }`}></div>
              </div>
              <div className="text-2xl font-bold mb-1 text-yellow-200">{stat.value}</div>
              <div className="text-gray-300 text-sm mb-1">{stat.label}</div>
              <div className="text-xs text-gray-400">{stat.trend}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Weekly Activity Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-yellow-200">
                    <Activity className="w-5 h-5 text-blue-300" />
                    Weekly Mystery Activity
                  </h3>
                  <div className="space-y-4">
                    {weeklyActivity.map((day, index) => (
                      <div key={day.day} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium text-yellow-200">{day.day}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-300">{day.minutes} min</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-300">{day.quests} quests</span>
                              <span className="text-lg">{getMoodEmoji(day.mood)}</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-yellow-600 transition-all duration-300"
                              style={{ width: `${(day.minutes / 120) * 100}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">{day.breaks} mindful breaks</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Learning Insights */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-yellow-200">
                    <Brain className="w-5 h-5 text-blue-300" />
                    Mystery Insights
                  </h3>
                  <div className="space-y-4">
                    {learningInsights.map((insight, index) => (
                      <div key={index} className="bg-gray-700/50 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          {getInsightIcon(insight.type)}
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1 text-yellow-200">{insight.title}</h4>
                            <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
                            <div className="bg-gray-800/50 rounded-lg p-3">
                              <div className="text-xs text-gray-400 mb-1">Grunkle Stan's Tip:</div>
                              <div className="text-sm text-gray-200">{insight.recommendation}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === 'learning' && (
              <>
                {/* Skill Development */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-yellow-200">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Code Skill Progress
                  </h3>
                  <div className="space-y-4">
                    {skillProgress.map((skill, index) => (
                      <div key={skill.skill}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-yellow-200">{skill.skill}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-300">{skill.progress}%</span>
                            <span className="text-xs text-green-400">{skill.trend}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${skill.color} transition-all duration-300`}
                            style={{ width: `${skill.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Strengths & Struggles */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="bg-green-600/20 backdrop-blur-sm rounded-2xl p-6 border border-green-600/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-200">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Detective Strengths
                    </h4>
                    <div className="space-y-2">
                      {selectedChildData.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-200">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-600/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-600/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-200">
                      <AlertTriangle className="w-5 h-5 text-yellow-300" />
                      Mystery Challenges
                    </h4>
                    <div className="space-y-2">
                      {selectedChildData.strugglingWith.length > 0 ? (
                        selectedChildData.strugglingWith.map((struggle, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                            <span className="text-sm text-gray-200">{struggle}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-300">No mysteries too tough!</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </>
            )}

            {activeTab === 'wellness' && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Screen Time Analysis */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-yellow-200">
                    <Clock className="w-5 h-5 text-blue-300" />
                    Screen Time & Breaks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">1h 45m</div>
                      <div className="text-sm text-gray-300">Today's Investigation</div>
                      <div className="text-xs text-green-400">15m under limit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">8</div>
                      <div className="text-sm text-gray-300">Mindful Breaks</div>
                      <div className="text-xs text-green-400">Mystic!</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-300 mb-2">98%</div>
                      <div className="text-sm text-gray-300">Balance Score</div>
                      <div className="text-xs text-green-400">Supernatural habits</div>
                    </div>
                  </div>
                </div>

                {/* Mood Tracking */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-yellow-200">
                    <Heart className="w-5 h-5 text-red-600" />
                    Mood & Engagement
                  </h3>
                  <div className="grid grid-cols-7 gap-2">
                    {weeklyActivity.map((day, index) => (
                      <div key={day.day} className="text-center">
                        <div className="text-xs text-gray-400 mb-2">{day.day}</div>
                        <div className="text-2xl mb-1">{getMoodEmoji(day.mood)}</div>
                        <div className="text-xs text-gray-300 capitalize">{day.mood}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'safety' && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6"
              >
                {/* Safety Status */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-yellow-200">
                    <Shield className="w-5 h-5 text-green-400" />
                    Mystic Safety Charms
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Content Filter</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Active</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Chat Moderation</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Grunkle Stan Monitored</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Screen Time Limits</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Enforced</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Break Reminders</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Every 30min</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Mentor Supervision</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">24/7 Available</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Privacy Protection</span>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">Secured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Communication Settings */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
                  <h3 className="text-xl font-semibold mb-6 text-yellow-200">Communication Ciphers</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-yellow-200">Weekly Mystery Reports</div>
                        <div className="text-sm text-gray-400">Get detailed weekly summaries</div>
                      </div>
                      <button className="bg-green-600 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-yellow-200">Achievement Notices</div>
                        <div className="text-sm text-gray-400">Instant alerts for milestones</div>
                      </div>
                      <button className="bg-green-600 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-yellow-200">Concern Alerts</div>
                        <div className="text-sm text-gray-400">Immediate notification of mysteries</div>
                      </div>
                      <button className="bg-green-600 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-6"
          >
            {/* Child Profile */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{selectedChildData.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-200">{selectedChildData.name}</h3>
                  <p className="text-gray-300">{selectedChildData.age} years old</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg">{getMoodEmoji(selectedChildData.mood)}</span>
                    <span className="text-sm text-gray-400 capitalize">{selectedChildData.mood}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Level</span>
                  <span className="font-semibold text-yellow-200">{selectedChildData.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Mystery Points</span>
                  <span className="font-semibold text-yellow-200">{selectedChildData.xp.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Streak</span>
                  <span className="font-semibold text-yellow-200">{selectedChildData.streak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Favorite Code</span>
                  <span className="font-semibold text-yellow-200">{selectedChildData.favoriteLanguage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Active</span>
                  <span className="font-semibold text-yellow-200">{selectedChildData.lastActive}</span>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-200">
                <Award className="w-5 h-5 text-yellow-300" />
                Recent Discoveries
              </h3>
              <div className="space-y-3">
                {recentAchievements.filter(a => a.child === selectedChildData.name).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-yellow-200">{achievement.title}</div>
                      <div className="text-xs text-gray-400">{achievement.description}</div>
                      <div className="text-xs text-gray-500">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
              <h3 className="text-xl font-semibold mb-4 text-yellow-200">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-yellow-600 hover:bg-yellow-700 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center text-yellow-200">
                  <Mail className="w-4 h-4" />
                  Message Grunkle Stan
                </button>
                <button className="w-full bg-gray-800/50 hover:bg-gray-700/50 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center text-yellow-200">
                  <Phone className="w-4 h-4" />
                  Schedule Mystery Call
                </button>
                <button className="w-full bg-gray-800/50 hover:bg-gray-700/50 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center text-yellow-200">
                  <Settings className="w-4 h-4" />
                  Adjust Shack Settings
                </button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-600/20 backdrop-blur-sm rounded-2xl p-6 border border-red-600/30">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-yellow-200">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Need Help?
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Concerned about your detective's safety or wellbeing? Contact the Mystery Shack immediately.
              </p>
              <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg font-medium transition-colors text-yellow-200">
                Emergency Contact
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;