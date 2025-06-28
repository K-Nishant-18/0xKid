import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  Clock,
  Star,
  Zap,
  Brain,
  Code,
  Heart
} from 'lucide-react';

interface ProgressData {
  totalXP: number;
  level: number;
  streak: number;
  questsCompleted: number;
  projectsBuilt: number;
  skillsLearned: string[];
  weeklyActivity: { day: string; minutes: number; xp: number }[];
  achievements: { icon: string; title: string; date: string }[];
}

interface ProgressTrackerProps {
  data: ProgressData;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ data }) => {
  const skillCategories = [
    { name: 'Problem Solving', progress: 85, color: 'bg-purple-500' },
    { name: 'Logical Thinking', progress: 78, color: 'bg-blue-500' },
    { name: 'Creativity', progress: 92, color: 'bg-pink-500' },
    { name: 'Persistence', progress: 75, color: 'bg-green-500' },
    { name: 'Collaboration', progress: 68, color: 'bg-yellow-500' }
  ];

  const nextLevelXP = (data.level + 1) * 1000;
  const currentLevelProgress = (data.totalXP % 1000) / 10;

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Level Progress
          </h3>
          <div className="text-2xl font-bold text-purple-400">Level {data.level}</div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300">XP Progress</span>
            <span className="text-sm font-medium">{data.totalXP} / {nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${currentLevelProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400">{data.streak}</div>
            <div className="text-sm text-gray-300">Day Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{data.questsCompleted}</div>
            <div className="text-sm text-gray-300">Quests Done</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-400">{data.projectsBuilt}</div>
            <div className="text-sm text-gray-300">Projects Built</div>
          </div>
        </div>
      </motion.div>

      {/* Weekly Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          Weekly Activity
        </h3>
        
        <div className="space-y-3">
          {data.weeklyActivity.map((day, index) => (
            <div key={day.day} className="flex items-center gap-4">
              <div className="w-12 text-sm font-medium">{day.day}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-300">{day.minutes} min</span>
                  <span className="text-sm text-yellow-400">{day.xp} XP</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                    style={{ width: `${(day.minutes / 120) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skill Development */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-400" />
          Skill Development
        </h3>
        
        <div className="space-y-4">
          {skillCategories.map((skill, index) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-gray-300">{skill.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.progress}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className={`h-2 rounded-full ${skill.color} transition-all duration-300`}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-400" />
          Recent Achievements
        </h3>
        
        <div className="space-y-3">
          {data.achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg"
            >
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{achievement.title}</div>
                <div className="text-xs text-gray-400">{achievement.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Learning Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400" />
          Learning Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="font-medium">Best Learning Time</span>
            </div>
            <p className="text-sm text-gray-300">You're most productive between 4-6 PM</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-4 h-4 text-green-400" />
              <span className="font-medium">Favorite Language</span>
            </div>
            <p className="text-sm text-gray-300">JavaScript - 65% of your coding time</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-yellow-400" />
              <span className="font-medium">Next Goal</span>
            </div>
            <p className="text-sm text-gray-300">Complete 5 more quests to reach Level 4</p>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="font-medium">Wellness Score</span>
            </div>
            <p className="text-sm text-gray-300">98% - Great balance of coding and breaks!</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressTracker;