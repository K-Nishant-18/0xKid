import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Waves,
  Sun,
  Moon,
  Leaf,
  Wind,
  Mountain,
  Flower2
} from 'lucide-react';

const MindfulnessMission = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [timer, setTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('inhale');

  const activities = [
    {
      id: 1,
      title: "Breathing Circles",
      description: "Follow the animated circle to regulate your breathing",
      duration: 60,
      icon: <Waves className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      type: "breathing"
    },
    {
      id: 2,
      title: "Sunset Meditation",
      description: "Watch a peaceful sunset while coding gentle animations",
      duration: 180,
      icon: <Sun className="w-6 h-6" />,
      color: "from-orange-500 to-pink-500",
      type: "meditation"
    },
    {
      id: 3,
      title: "Forest Sounds",
      description: "Create nature sounds with code while relaxing",
      duration: 300,
      icon: <Leaf className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      type: "nature"
    },
    {
      id: 4,
      title: "Starry Night",
      description: "Code twinkling stars while practicing mindfulness",
      duration: 240,
      icon: <Moon className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      type: "meditation"
    }
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && isPlaying) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer]);

  useEffect(() => {
    if (activities[currentActivity].type === 'breathing' && isPlaying) {
      const breathingInterval = setInterval(() => {
        setBreathingPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
      }, 4000);
      return () => clearInterval(breathingInterval);
    }
  }, [currentActivity, isPlaying]);

  const startActivity = (index) =>  {
    setCurrentActivity(index);
    setTimer(activities[index].duration);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setTimer(activities[currentActivity].duration);
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <Heart className="w-10 h-10 text-pink-400" />
            Mindfulness Mission
          </h1>
          <p className="text-xl text-gray-300">
            Take a mindful break and code your way to calm
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Activity Player */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 h-fit">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">
                  {activities[currentActivity].title}
                </h2>
                <p className="text-gray-300 mb-6">
                  {activities[currentActivity].description}
                </p>

                {/* Breathing Animation */}
                {activities[currentActivity].type === 'breathing' && (
                  <div className="relative w-64 h-64 mx-auto mb-8">
                    <motion.div
                      className={`w-full h-full rounded-full bg-gradient-to-r ${activities[currentActivity].color} opacity-20`}
                      animate={{
                        scale: isPlaying ? (breathingPhase === 'inhale' ? 1.2 : 0.8) : 1,
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: isPlaying ? Infinity : 0,
                      }}
                    />
                    <motion.div
                      className={`absolute inset-8 rounded-full bg-gradient-to-r ${activities[currentActivity].color} opacity-40`}
                      animate={{
                        scale: isPlaying ? (breathingPhase === 'inhale' ? 1.1 : 0.9) : 1,
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: isPlaying ? Infinity : 0,
                      }}
                    />
                    <motion.div
                      className={`absolute inset-16 rounded-full bg-gradient-to-r ${activities[currentActivity].color}`}
                      animate={{
                        scale: isPlaying ? (breathingPhase === 'inhale' ? 1.05 : 0.95) : 1,
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: isPlaying ? Infinity : 0,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">
                        {isPlaying ? (breathingPhase === 'inhale' ? 'Breathe In' : 'Breathe Out') : 'Ready?'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Meditation Animation */}
                {activities[currentActivity].type === 'meditation' && (
                  <div className="relative w-64 h-64 mx-auto mb-8 bg-gradient-to-b from-orange-400 to-pink-600 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent"
                      animate={{
                        opacity: isPlaying ? [0.3, 0.7, 0.3] : 0.5,
                      }}
                      transition={{
                        duration: 8,
                        ease: "easeInOut",
                        repeat: isPlaying ? Infinity : 0,
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sun className="w-16 h-16 text-yellow-200" />
                    </div>
                  </div>
                )}

                {/* Nature Animation */}
                {activities[currentActivity].type === 'nature' && (
                  <div className="relative w-64 h-64 mx-auto mb-8">
                    <div className="w-full h-full bg-gradient-to-b from-green-400 to-green-600 rounded-2xl overflow-hidden">
                      <motion.div
                        className="flex items-end justify-center h-full p-8"
                        animate={{
                          y: isPlaying ? [-2, 2, -2] : 0,
                        }}
                        transition={{
                          duration: 3,
                          ease: "easeInOut",
                          repeat: isPlaying ? Infinity : 0,
                        }}
                      >
                        <Leaf className="w-8 h-8 text-green-200 mx-2" />
                        <Flower2 className="w-10 h-10 text-pink-200 mx-2" />
                        <Leaf className="w-8 h-8 text-green-200 mx-2" />
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Timer */}
                <div className="text-4xl font-bold mb-6">
                  {formatTime(timer)}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={togglePlayPause}
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${activities[currentActivity].color} flex items-center justify-center text-white font-semibold transition-all duration-300 hover:scale-110`}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Selection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Choose Your Activity</h3>
            
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer ${
                  currentActivity === index ? 'ring-2 ring-white/50' : ''
                }`}
                onClick={() => startActivity(index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${activity.color} flex items-center justify-center`}>
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-1">{activity.title}</h4>
                    <p className="text-gray-300 text-sm mb-2">{activity.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{Math.floor(activity.duration / 60)}m {activity.duration % 60}s</span>
                      <span className="capitalize">{activity.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Mindfulness Stats */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Your Mindfulness Journey
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">12</div>
                  <div className="text-sm text-gray-300">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">45m</div>
                  <div className="text-sm text-gray-300">Total Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">7</div>
                  <div className="text-sm text-gray-300">Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">98%</div>
                  <div className="text-sm text-gray-300">Calm Score</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MindfulnessMission;