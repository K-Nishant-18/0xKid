import React from 'react';
import { motion } from 'framer-motion';
import { Star, Pin } from 'lucide-react';

const Map = ({ progress, advanceProgress }) => {
  // Define path coordinates for a winding journey (SVG points)
  const pathData = `
    M 50 300
    Q 150 250, 250 300
    Q 350 350, 450 300
    Q 550 250, 650 300
    L 750 300
  `;

  // Calculate position along the path based on progress
  const pathLength = 700; // Approximate total length of the path in pixels
  const progressPosition = (progress / 100) * pathLength;

  // Level markers (aligned with the levels array)
  const levels = [
    { threshold: 0, name: 'Novice Forest', x: 50, y: 300 },
    { threshold: 20, name: 'Apprentice Village', x: 250, y: 300 },
    { threshold: 40, name: 'Journeyman Castle', x: 450, y: 300 },
    { threshold: 60, name: 'Expert Kingdom', x: 650, y: 300 },
    { threshold: 80, name: 'Master Citadel', x: 750, y: 300 }, // Fixed line
  ];

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden border border-white/20">
      {/* Background Map Texture with Moving Elements */}
      <div className="absolute inset-0 bg-black opacity-50">

        {/* Animated Clouds */}
        <div className="absolute top-0 w-full h-1/3 overflow-hidden">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="absolute w-32 h-16 bg-white/20 rounded-full blur-md animate-cloud"
              style={{
                left: `${index * 33}%`,
                animationDelay: `${index * -2}s`,
              }}
            />
          ))}
        </div>

        {/* Twinkling Stars */}
        {[...Array(10)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 70 + 10}%`, // Avoid overlapping with path
            }}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* SVG Path and Markers */}
      <svg className="w-full h-full" viewBox="0 0 800 400">
        {/* Winding Path */}
        <path
          d={pathData}
          fill="none"
          stroke="#FFD700"
          strokeWidth="8"
          strokeLinecap="round"
          className="drop-shadow-lg"
        />

        {/* Level Markers */}
        {levels.map((level, index) => (
          <g key={index} transform={`translate(${level.x}, ${level.y})`}>
            <motion.circle
              cx="0"
              cy="0"
              r={progress >= level.threshold ? 20 : 15}
              fill={progress >= level.threshold ? '#4CAF50' : '#757575'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
            <text
              x="0"
              y="30"
              textAnchor="middle"
              fill="white"
              fontSize="12"
              className="font-bold"
            >
              {level.name.split(' ')[0]}
            </text>
            {progress >= level.threshold && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Star className="w-6 h-6 text-yellow-400 absolute -top-8 left-1/2 transform -translate-x-1/2" />
              </motion.div>
            )}
          </g>
        ))}

        {/* Progress Indicator (Character) */}
        <motion.circle
          cx={50}
          cy={300}
          r="15"
          fill="#FF5722"
          animate={{
            path: pathData,
            offset: `${progressPosition}px`,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <animateMotion
            dur="0.5s"
            repeatCount="0"
            path={pathData}
            keyPoints={`${progress / 100}`}
            keyTimes="0;1"
          />
        </motion.circle>
      </svg>

      {/* Continue Journey Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={advanceProgress}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 justify-center"
        disabled={progress === 100}
      >
        <Pin className="w-5 h-5" />
        Continue Journey
      </motion.button>
    </div>
  );
};

// CSS Animation for Clouds
const styles = `
  @keyframes cloud {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-cloud {
    animation: cloud 20s linear infinite;
  }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [styleSheet];

export default Map;