import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Sparkles, Code, Brain, Heart } from 'lucide-react';

const LoadingScreen = ({ message = "Loading your coding adventure..." }) => {
  const icons = [
    { Icon: Sparkles, color: 'text-yellow-400', delay: 0 },
    { Icon: Code, color: 'text-cyan-400', delay: 0.2 },
    { Icon: Brain, color: 'text-purple-400', delay: 0.4 },
    { Icon: Heart, color: 'text-pink-400', delay: 0.6 }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CodeVerse
            </h1>
            <Code className="w-12 h-12 text-cyan-400" />
          </div>
        </motion.div>

        {/* Animated Icons */}
        <div className="flex justify-center gap-4 mb-8">
          {icons.map(({ Icon, color, delay }, index) => (
            <motion.div
              key={index}
              initial={{ y: 0 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
              }}
              className={`w-12 h-12 ${color}`}
            >
              <Icon className="w-full h-full" />
            </motion.div>
          ))}
        </div>

        {/* Loading Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-300 mb-6"
        >
          {message}
        </motion.p>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          />
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-gray-400"
        >
          <p>💡 Did you know? The first computer program was written by Ada Lovelace in 1843!</p>
        </motion.div>
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  message: PropTypes.string
};

LoadingScreen.defaultProps = {
  message: "Loading your coding adventure..."
};

export default LoadingScreen;