import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Ghost, BookOpen, Brain, Heart } from 'lucide-react';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const LoadingScreen = ({ message = "Unraveling your coding mystery..." }) => {
  const icons = [
    { Icon: Ghost, color: 'text-blue-300', delay: 0 },
    { Icon: BookOpen, color: 'text-yellow-600', delay: 0.2 },
    { Icon: Brain, color: 'text-green-400', delay: 0.4 },
    { Icon: Heart, color: 'text-red-600', delay: 0.6 }
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-gray-800 to-green-900 flex items-center justify-center z-50 font-['Creepster',_cursive]">
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
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ghost className="w-12 h-12 text-blue-300" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-300 to-yellow-600 bg-clip-text text-transparent">
              _____0xKid_____
            </h1>
            <BookOpen className="w-12 h-12 text-yellow-600" /><br />
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
        <div className="w-64 h-2 bg-gray-800/50 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-blue-600 to-yellow-600 rounded-full"
          />
        </div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-8 text-sm text-gray-400"
        >
          <p>🔍 Did you know? The first computer cipher was cracked by Ada Lovelace in 1843!</p>
        </motion.div>
      </div>
    </div>
  );
};

LoadingScreen.propTypes = {
  message: PropTypes.string
};

LoadingScreen.defaultProps = {
  message: "Unraveling your coding mystery..."
};

export default LoadingScreen;