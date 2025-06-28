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
  Code,
  Book,
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
  Phone
} from 'lucide-react';

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0);
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');

  const children = [
    {
      id: 1,
      name: "Aarav",
      age: 12,
      avatar: "🧑‍💻",
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
      mood: "happy",
      strugglingWith: [],
      strengths: ["Problem Solving", "Creativity", "Persistence"]
    },
    {
      id: 2,
      name: "Priya",
      age: 15,
      avatar: "👩‍💻",
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
      mood: "focused",
      strugglingWith: ["Advanced Algorithms"],
      strengths: ["Logical Thinking", "Code Organization", "Debugging"]
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', minutes: 45, quests: 2, mood: 'happy', breaks: 3 },
    { day: 'Tue', minutes: 60, quests: 3, mood: 'excited', breaks: 4 },
    { day: 'Wed', minutes: 30, quests: 1, mood: 'tired', breaks: 2 },
    { day: 'Thu', minutes: 75, quests: 4, mood: 'focused', breaks: 5 },
    { day: 'Fri', minutes: 90, quests: 5, mood: 'happy', breaks: 6 },
    { day: 'Sat', minutes: 120, quests: 6, mood: 'excited', breaks: 8 },
    { day: 'Sun', minutes: 80, quests: 3, mood: 'relaxed', breaks: 5 }
  ];

  const recentAchievements = [
    { 
      icon: "🏆", 
      title: "First Game Created", 
      description: "Built a Space Invaders game",
      date: "2 days ago",
      child: "Aarav",
      category: "Project"
    },
    { 
      icon: "🔥", 
      title: "Two Week Streak", 
      description: "Coded for 14 days straight",
      date: "3 days ago",
      child: "Priya",
      category: "Consistency"
    },
    { 
      icon: "🎯", 
      title: "Quest Master", 
      description: "Completed 25 coding quests",
      date: "5 days ago",
      child: "Priya",
      category: "Learning"
    },
    { 
      icon: "🧘", 
      title: "Mindful Coder", 
      description: "Completed 10 mindfulness sessions",
      date: "1 week ago",
      child: "Aarav",
      category: "Wellness"
    }
  ];

  const skillProgress = [
    { skill: "Problem Solving", progress: 85, color: "bg-purple-500", trend: "+12%" },
    { skill: "Logical Thinking", progress: 78, color: "bg-blue-500", trend: "+8%" },
    { skill: "Creativity", progress: 92, color: "bg-pink-500", trend: "+15%" },
    { skill: "Persistence", progress: 75, color: "bg-green-500", trend: "+5%" },
    { skill: "Collaboration", progress: 68, color: "bg-yellow-500", trend: "+20%" }
  ];

  const learningInsights = [
    {
      type: "strength",
      title: "Visual Learning",
      description: "Aarav excels with visual programming blocks and animations",
      recommendation: "Continue with visual projects, gradually introduce text coding"
    },
    {
      type: "improvement",
      title: "Debugging Skills",
      description: "Could benefit from more practice identifying and fixing errors",
      recommendation: "Introduce debugging challenges and error-finding games"
    },
    {
      type: "wellness",
      title: "Great Balance",
      description: "Excellent balance between coding time and mindfulness breaks",
      recommendation: "Maintain current schedule, consider peer collaboration"
    }
  ];

  const selectedChildData = children[selectedChild];

  const getMoodEmoji = (mood) => {
    const moods = {
      happy: "😊",
      excited: "🤩",
      focused: "🎯",
      tired: "😴",
      relaxed: "😌",
      frustrated: "😤"
    };
    return moods[mood] || "😊";
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'strength': return <Star className="w-5 h-5 text-green-400" />;
      case 'improvement': return <Target className="w-5 h-5 text-yellow-400" />;
      case 'wellness': return <Heart className="w-5 h-5 text-pink-400" />;
      default: return <Brain className="w-5 h-5 text-blue-400" />;
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
                <BarChart3 className="w-10 h-10 text-purple-400" />
                Parent Dashboard
              </h1>
              <p className="text-xl text-gray-300">
                Track your child's coding journey and wellbeing
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
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
                    ? 'bg-white/20 shadow-lg ring-2 ring-purple-400'
                    : 'bg-white/10 hover:bg-white/15'
                }`}
              >
                <div className="text-3xl">{child.avatar}</div>
                <div className="text-left">
                  <div className="font-semibold">{child.name}</div>
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
          <div className="flex gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20 w-fit">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'learning', label: 'Learning', icon: Brain },
              { id: 'wellness', label: 'Wellness', icon: Heart },
              { id: 'safety', label: 'Safety', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
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
              label: "Quests Completed", 
              value: selectedChildData.questsCompleted.toString(), 
              color: "text-purple-400",
              trend: "+8 this week",
              status: "excellent"
            },
            { 
              icon: Code, 
              label: "Projects Built", 
              value: selectedChildData.projectsBuilt.toString(), 
              color: "text-green-400",
              trend: "+2 this week",
              status: "good"
            },
            { 
              icon: Heart, 
              label: "Mindfulness Score", 
              value: "98%", 
              color: "text-pink-400",
              trend: "Excellent balance",
              status: "excellent"
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <div className={`w-3 h-3 rounded-full ${
                  stat.status === 'excellent' ? 'bg-green-400' : 
                  stat.status === 'good' ? 'bg-yellow-400' : 'bg-red-400'
                }`}></div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
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
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Weekly Activity & Mood
                  </h3>
                  <div className="space-y-4">
                    {weeklyActivity.map((day, index) => (
                      <div key={day.day} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium">{day.day}</div>
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
                              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
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
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-green-400" />
                    AI Learning Insights
                  </h3>
                  <div className="space-y-4">
                    {learningInsights.map((insight, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          {getInsightIcon(insight.type)}
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{insight.title}</h4>
                            <p className="text-sm text-gray-300 mb-2">{insight.description}</p>
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="text-xs text-gray-400 mb-1">AI Recommendation:</div>
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
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Skill Development Progress
                  </h3>
                  <div className="space-y-4">
                    {skillProgress.map((skill, index) => (
                      <div key={skill.skill}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill.skill}</span>
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
                  <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      Strengths
                    </h4>
                    <div className="space-y-2">
                      {selectedChildData.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-yellow-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      Areas for Growth
                    </h4>
                    <div className="space-y-2">
                      {selectedChildData.strugglingWith.length > 0 ? (
                        selectedChildData.strugglingWith.map((struggle, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-sm">{struggle}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-sm text-gray-300">No areas of concern - great progress!</div>
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
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    Screen Time & Breaks
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">1h 45m</div>
                      <div className="text-sm text-gray-300">Today's Usage</div>
                      <div className="text-xs text-green-400">15m under limit</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">8</div>
                      <div className="text-sm text-gray-300">Mindful Breaks</div>
                      <div className="text-xs text-green-400">Excellent!</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
                      <div className="text-sm text-gray-300">Balance Score</div>
                      <div className="text-xs text-green-400">Healthy habits</div>
                    </div>
                  </div>
                </div>

                {/* Mood Tracking */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400" />
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
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Safety & Privacy Status
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
                          <span className="text-green-400">AI Monitored</span>
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
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-6">Communication Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Weekly Progress Reports</div>
                        <div className="text-sm text-gray-400">Get detailed weekly summaries</div>
                      </div>
                      <button className="bg-green-500 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Achievement Notifications</div>
                        <div className="text-sm text-gray-400">Instant alerts for milestones</div>
                      </div>
                      <button className="bg-green-500 w-12 h-6 rounded-full relative">
                        <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Concern Alerts</div>
                        <div className="text-sm text-gray-400">Immediate notification of issues</div>
                      </div>
                      <button className="bg-green-500 w-12 h-6 rounded-full relative">
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
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{selectedChildData.avatar}</div>
                <div>
                  <h3 className="text-xl font-bold">{selectedChildData.name}</h3>
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
                  <span className="font-semibold">{selectedChildData.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">XP Points</span>
                  <span className="font-semibold">{selectedChildData.xp.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Streak</span>
                  <span className="font-semibold">{selectedChildData.streak} days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Favorite Language</span>
                  <span className="font-semibold">{selectedChildData.favoriteLanguage}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Last Active</span>
                  <span className="font-semibold">{selectedChildData.lastActive}</span>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {recentAchievements.filter(a => a.child === selectedChildData.name).map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm">{achievement.title}</div>
                      <div className="text-xs text-gray-400">{achievement.description}</div>
                      <div className="text-xs text-gray-500">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                  <Mail className="w-4 h-4" />
                  Message Teacher
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                  <Phone className="w-4 h-4" />
                  Schedule Call
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center">
                  <Settings className="w-4 h-4" />
                  Adjust Settings
                </button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Need Help?
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                If you have concerns about your child's online safety or wellbeing, contact us immediately.
              </p>
              <button className="w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg font-medium transition-colors">
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