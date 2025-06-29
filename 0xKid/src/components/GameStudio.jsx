import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ghost, 
  BookOpen, 
  Star, 
  Play, 
  CheckCircle, 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  Zap,
  Rocket,
  Brain,
  Code,
  MessageSquare,
  HelpCircle,
  RotateCcw,
  Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const Game = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('start');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [output, setOutput] = useState('');
  const [aiTip, setAiTip] = useState('');
  const [showVictory, setShowVictory] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [combo, setCombo] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  const challenges = [
    {
      id: 1,
      title: "Arjun's Whispering Scroll",
      description: "Help Arjun make the magical scroll speak by arranging printf blocks!",
      concept: "printf",
      difficulty: "Beginner",
      xp: 50,
      correctSequence: ['printf_start', 'text_The scroll speaks!', 'printf_end'],
      blocksAvailable: [
        { id: 'printf_start', type: 'block', text: 'printf(', color: 'bg-blue-600' },
        { id: 'text_The scroll speaks!', type: 'value', text: '"The scroll speaks!"', color: 'bg-green-600' },
        { id: 'printf_end', type: 'block', text: ');', color: 'bg-blue-600' },
        { id: 'dummy_text', type: 'value', text: '"Wrong message"', color: 'bg-red-600' },
        { id: 'dummy_print', type: 'block', text: 'print(', color: 'bg-red-600' }
      ],
      solutionOutput: "The scroll speaks!",
      story: "Arjun needs your help in the Mystery Haveli! The scroll must say 'The scroll speaks!' to reveal its secrets.",
      hints: [
        "Use printf to display text on the screen",
        "Enclose the text in double quotes",
        "Don't forget the semicolon at the end!"
      ]
    },
    {
      id: 2,
      title: "Priya's Enchanted Vault",
      description: "Organize Priya's 75 gems using variable blocks!",
      concept: "variables",
      difficulty: "Beginner",
      xp: 75,
      correctSequence: ['int_start', 'gems', 'assign_75', 'printf_start', 'text_Gems: %d', 'gems_ref', 'printf_end'],
      blocksAvailable: [
        { id: 'int_start', type: 'block', text: 'int', color: 'bg-yellow-600' },
        { id: 'gems', type: 'variable', text: 'gems', color: 'bg-orange-600' },
        { id: 'assign_75', type: 'value', text: '= 75', color: 'bg-green-600' },
        { id: 'printf_start', type: 'block', text: 'printf(', color: 'bg-blue-600' },
        { id: 'text_Gems: %d', type: 'value', text: '"Gems: %d"', color: 'bg-green-600' },
        { id: 'gems_ref', type: 'variable', text: 'gems', color: 'bg-orange-600' },
        { id: 'printf_end', type: 'block', text: ');', color: 'bg-blue-600' },
        { id: 'dummy_int', type: 'block', text: 'char', color: 'bg-red-600' },
        { id: 'dummy_value', type: 'value', text: '= 50', color: 'bg-red-600' }
      ],
      solutionOutput: "Gems: 75",
      story: "Priya's vault is a mess! Use variable blocks to catalog 75 mystical gems for her.",
      hints: [
        "Use int for whole numbers like 75",
        "Assign the value with =",
        "Use %d in printf to display the number"
      ]
    },
    {
      id: 3,
      title: "The Sacred Amulet Mystery",
      description: "Help Priya catalog the sacred amulet marked 'P' using character variables!",
      concept: "char variables",
      difficulty: "Beginner",
      xp: 60,
      correctSequence: ['char_start', 'amulet', 'assign_P', 'printf_start', 'text_Amulet: %c', 'amulet_ref', 'printf_end'],
      blocksAvailable: [
        { id: 'char_start', type: 'block', text: 'char', color: 'bg-purple-600' },
        { id: 'amulet', type: 'variable', text: 'amulet', color: 'bg-pink-600' },
        { id: 'assign_P', type: 'value', text: "= 'P'", color: 'bg-green-600' },
        { id: 'printf_start', type: 'block', text: 'printf(', color: 'bg-blue-600' },
        { id: 'text_Amulet: %c', type: 'value', text: '"Amulet: %c"', color: 'bg-green-600' },
        { id: 'amulet_ref', type: 'variable', text: 'amulet', color: 'bg-pink-600' },
        { id: 'printf_end', type: 'block', text: ');', color: 'bg-blue-600' },
        { id: 'dummy_char', type: 'block', text: 'int', color: 'bg-red-600' },
        { id: 'dummy_assign', type: 'value', text: '= 65', color: 'bg-red-600' }
      ],
      solutionOutput: "Amulet: P",
      story: "Priya discovered a sacred amulet marked with the letter 'P'. Use character variables to catalog this mystical artifact!",
      hints: [
        "Use char for single letters",
        "Enclose the letter in single quotes",
        "Use %c in printf to show the character"
      ]
    },
    {
      id: 4,
      title: "Combined Artifacts Display",
      description: "Display both gems and amulet together in one printf statement!",
      concept: "multiple variables",
      difficulty: "Intermediate",
      xp: 100,
      correctSequence: ['int_start', 'gems', 'assign_75', 'char_start', 'amulet', 'assign_P', 'printf_start', 'text_Vault: %d gems, Amulet %c', 'gems_ref', 'amulet_ref', 'printf_end'],
      blocksAvailable: [
        { id: 'int_start', type: 'block', text: 'int', color: 'bg-yellow-600' },
        { id: 'gems', type: 'variable', text: 'gems', color: 'bg-orange-600' },
        { id: 'assign_75', type: 'value', text: '= 75', color: 'bg-green-600' },
        { id: 'char_start', type: 'block', text: 'char', color: 'bg-purple-600' },
        { id: 'amulet', type: 'variable', text: 'amulet', color: 'bg-pink-600' },
        { id: 'assign_P', type: 'value', text: "= 'P'", color: 'bg-green-600' },
        { id: 'printf_start', type: 'block', text: 'printf(', color: 'bg-blue-600' },
        { id: 'text_Vault: %d gems, Amulet %c', type: 'value', text: '"Vault: %d gems, Amulet %c"', color: 'bg-green-600' },
        { id: 'gems_ref', type: 'variable', text: 'gems', color: 'bg-orange-600' },
        { id: 'amulet_ref', type: 'variable', text: 'amulet', color: 'bg-pink-600' },
        { id: 'printf_end', type: 'block', text: ');', color: 'bg-blue-600' },
        { id: 'dummy_text', type: 'value', text: '"Wrong format"', color: 'bg-red-600' }
      ],
      solutionOutput: "Vault: 75 gems, Amulet P",
      story: "Priya wants to display both the gems and the amulet together. Combine the variables in one printf statement to show the complete vault inventory!",
      hints: [
        "Declare both variables before printing",
        "Use %d for gems and %c for amulet in the same printf",
        "Separate format specifiers with a comma in printf"
      ]
    }
  ];

  useEffect(() => {
    setCurrentChallenge(challenges[0]);
    setBlocks([]);
    setOutput('');
    setAiTip('Drag and drop the blocks to create the correct code sequence!');
  }, []);

  // Timer effect
  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let animationFrameId;

      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw Mystery Haveli background
        const bgImage = new Image();
        bgImage.src = mysteryShackImg;
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

        // Draw animated scroll or vault based on challenge
        if (currentChallenge.id === 1) {
          // Animated scroll
          ctx.fillStyle = 'rgba(0, 191, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, 50 + Math.sin(Date.now() / 500) * 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.font = '20px Creepster';
          ctx.fillText('📜', canvas.width / 2 - 10, canvas.height / 2 + 10);
        } else if (currentChallenge.id === 2) {
          // Animated vault
          ctx.fillStyle = 'rgba(255, 215, 0, 0.5)';
          ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
          ctx.fillStyle = 'white';
          ctx.font = '20px Creepster';
          ctx.fillText('🎁', canvas.width / 2 - 10, canvas.height / 2 + 10);
        } else if (currentChallenge.id === 3) {
          // Animated amulet
          ctx.fillStyle = 'rgba(255, 0, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, 40 + Math.cos(Date.now() / 300) * 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.font = '20px Creepster';
          ctx.fillText('💎', canvas.width / 2 - 10, canvas.height / 2 + 10);
        } else {
          // Combined artifacts
          ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
          ctx.fillRect(canvas.width / 2 - 60, canvas.height / 2 - 40, 120, 80);
          ctx.fillStyle = 'rgba(255, 0, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.font = '16px Creepster';
          ctx.fillText('🎁💎', canvas.width / 2 - 15, canvas.height / 2 + 5);
        }

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [gameState, currentChallenge]);

  const handleDragStart = (e, block) => {
    e.dataTransfer.setData('blockId', block.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const blockId = e.dataTransfer.getData('blockId');
    const block = currentChallenge.blocksAvailable.find(b => b.id === blockId);
    if (block) {
      setBlocks([...blocks, block]);
      setCombo(prev => prev + 1);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveBlock = (index) => {
    setBlocks(blocks.filter((_, i) => i !== index));
    setCombo(0);
  };

  const handleRunCode = () => {
    if (!currentChallenge) return;

    const blockSequence = blocks.map(b => b.id);
    if (JSON.stringify(blockSequence) === JSON.stringify(currentChallenge.correctSequence)) {
      setOutput(currentChallenge.solutionOutput);
      const comboBonus = Math.floor(combo / 3) * 10;
      const timeBonus = Math.max(0, 50 - Math.floor(timeSpent / 10));
      const totalXP = currentChallenge.xp + comboBonus + timeBonus;
      
      setScore(prev => prev + totalXP);
      setShowVictory(true);
      setAiTip(`Fantastic, young detective! You've earned ${totalXP} XP! (${currentChallenge.xp} base + ${comboBonus} combo + ${timeBonus} time bonus)`);
      
      if (level < challenges.length) {
        setTimeout(() => {
          setLevel(prev => prev + 1);
          setCurrentChallenge(challenges[level]);
          setBlocks([]);
          setOutput('');
          setShowVictory(false);
          setCombo(0);
          setTimeSpent(0);
          setAiTip('New challenge awaits! Drag the blocks to solve it.');
        }, 2000);
      }
    } else {
      setOutput('The mystery remains unsolved! Check your block sequence.');
      setAiTip('Try arranging the blocks in the correct order. Need a hint?');
      setCombo(0);
    }
  };

  const handleReset = () => {
    setBlocks([]);
    setOutput('');
    setCombo(0);
    setTimeSpent(0);
    setAiTip('Blocks reset! Try arranging them again to solve the mystery.');
  };

  const handleStartGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setCurrentChallenge(challenges[0]);
    setBlocks([]);
    setOutput('');
    setCombo(0);
    setTimeSpent(0);
    setAiTip('Drag and drop the blocks to create the correct code sequence!');
  };

  const handleShowHints = () => {
    setShowHints(!showHints);
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { user: true, text: chatInput }]);
      // Simulate AI response
      const aiResponses = [
        "Great question! Can you clarify what part of the code is puzzling you?",
        "Let's break it down. Try focusing on the printf syntax first!",
        "I'm here to help! Could you share what output you're seeing?",
        "Remember, the order of blocks matters in programming!",
        "Check if you're using the right format specifiers (%d for numbers, %c for characters)"
      ];
      setTimeout(() => {
        setChatMessages(prev => [...prev, { user: false, text: aiResponses[Math.floor(Math.random() * aiResponses.length)] }]);
      }, 1000);
      setChatInput('');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-green-900 text-white p-4 sm:p-6 font-['Creepster',_cursive]">
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/quests')}
            className="flex items-center gap-2 text-yellow-200 hover:text-yellow-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Mystery Map
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3 text-yellow-200">
                <Ghost className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
                Mystery Code Game
              </h1>
              <p className="text-lg sm:text-xl text-gray-300">
                Drag and drop blocks to solve coding mysteries in the Mystery Haveli!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-800/50">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-200">{score} XP</span>
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-800/50">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-300" />
                  <span className="font-semibold text-yellow-200">Level {level}</span>
                </div>
              </div>
              {gameState === 'playing' && (
                <>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-800/50">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-yellow-200">Combo: {combo}</span>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-800/50">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-400" />
                      <span className="font-semibold text-yellow-200">{formatTime(timeSpent)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Start Screen */}
        <AnimatePresence>
          {gameState === 'start' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 mb-6 text-center"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center justify-center gap-2">
                <Sparkles className="w-6 h-6" />
                Welcome to the Mystery Code Game!
              </h2>
              <p className="text-gray-300 mb-6">
                Join Arjun and Priya in the Mystery Haveli to solve coding challenges using drag-and-drop blocks. Each correct sequence earns you XP and unlocks new mysteries!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-200 mb-2">📜 Printf Magic</h3>
                  <p className="text-sm text-gray-300">Learn to make text appear on screen</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-200 mb-2">🎁 Variable Vault</h3>
                  <p className="text-sm text-gray-300">Store and display numbers and characters</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-yellow-200 mb-2">💎 Combined Powers</h3>
                  <p className="text-sm text-gray-300">Mix different data types together</p>
                </div>
              </div>
              <button
                onClick={handleStartGame}
                className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 mx-auto text-yellow-200"
              >
                <Play className="w-5 h-5" />
                Start Game
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Screen */}
        {gameState === 'playing' && currentChallenge && (
          <>
            {/* Challenge Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                {currentChallenge.title}
              </h2>
              <p className="text-gray-300 mb-4">{currentChallenge.story}</p>
              <div className="flex items-center gap-2 mb-4">
                <Rocket className="w-5 h-5 text-blue-300" />
                <span className="text-sm font-medium text-yellow-200">Task: {currentChallenge.description}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">Difficulty: <span className="text-yellow-200">{currentChallenge.difficulty}</span></span>
                <span className="text-sm text-gray-300">Concept: <span className="text-yellow-200">{currentChallenge.concept}</span></span>
                <span className="text-sm text-gray-300">XP: <span className="text-yellow-200">{currentChallenge.xp}</span></span>
              </div>
            </motion.div>

            {/* Game Canvas and Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Canvas */}
              <div className="lg:col-span-2 bg-gray-900 rounded-2xl p-6 border border-yellow-800/50">
                <h3 className="text-lg font-semibold mb-4 text-yellow-200">Mystery Haveli</h3>
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  className="w-full h-64 sm:h-80 rounded-md bg-gray-800"
                />
                <div
                  className="mt-4 p-4 bg-gray-800 rounded-md min-h-[100px]"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <h4 className="text-sm font-semibold text-yellow-200 mb-2">Code Workspace</h4>
                  <div className="flex flex-wrap gap-2">
                    {blocks.map((block, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 rounded-md ${block.color} text-white cursor-pointer hover:opacity-80 transition-all duration-200`}
                        onClick={() => handleRemoveBlock(index)}
                      >
                        {block.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Block Palette */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
                <h3 className="text-lg font-semibold mb-4 text-yellow-200">Block Palette</h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentChallenge.blocksAvailable.map((block) => (
                    <div
                      key={block.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, block)}
                      className={`px-4 py-2 rounded-md ${block.color} text-white cursor-move hover:opacity-80 text-center transition-all duration-200`}
                    >
                      {block.text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Controls and Output */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-gray-900 rounded-2xl p-6 border border-yellow-800/50 mb-6"
            >
              <div className="flex flex-wrap gap-4 mb-4">
                <button
                  onClick={handleRunCode}
                  className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-yellow-200"
                >
                  <Play className="w-5 h-5" />
                  Run Code
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-800/50 hover:bg-gray-700/50 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-yellow-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset Blocks
                </button>
                <button
                  onClick={handleShowHints}
                  className="bg-gray-800/50 hover:bg-gray-700/50 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-yellow-200"
                >
                  <HelpCircle className="w-5 h-5" />
                  {showHints ? 'Hide Hints' : 'Show Hints'}
                </button>
              </div>
              
              {/* Hints Section */}
              <AnimatePresence>
                {showHints && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-gray-800 rounded-md overflow-hidden"
                  >
                    <h3 className="text-lg font-semibold text-yellow-200 flex items-center gap-2 mb-2">
                      <HelpCircle className="w-5 h-5" />
                      Hints
                    </h3>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {currentChallenge.hints.map((hint, index) => (
                        <li key={index} className="text-sm">{hint}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {output && (
                <div className="mt-4 p-4 bg-gray-800 rounded-md">
                  <h3 className="text-lg font-semibold text-yellow-200">Output:</h3>
                  <p className={`text-${output === currentChallenge.solutionOutput ? 'green-400' : 'red-400'}`}>
                    {output}
                  </p>
                </div>
              )}
            </motion.div>

            {/* AI Mentor Chat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 mb-6"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                AI Mentor Chat
              </h2>
              <div className="h-48 sm:h-64 overflow-y-auto bg-gray-900 p-4 rounded-md mb-4">
                {chatMessages.length === 0 ? (
                  <p className="text-gray-400 text-center">Ask the AI Mentor for help with your code!</p>
                ) : (
                  chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 p-2 rounded-md ${
                        msg.user ? 'bg-blue-600/20 text-blue-300 ml-auto' : 'bg-yellow-600/20 text-yellow-200'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                  className="flex-1 bg-gray-800 p-3 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  placeholder="Ask the AI Mentor a question..."
                />
                <button
                  onClick={handleChatSubmit}
                  className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 px-4 py-3 rounded-full font-semibold transition-all duration-300 text-yellow-200"
                >
                  Send
                </button>
              </div>
            </motion.div>

            {/* AI Mentor Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-blue-600/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-yellow-600 flex items-center justify-center text-2xl">
                  🦁
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-yellow-200">AI Mentor Tip</h3>
                  <p className="text-gray-300">{aiTip}</p>
                </div>
              </div>
            </motion.div>

            {/* Victory Screen */}
            <AnimatePresence>
              {showVictory && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                >
                  <div className="bg-gray-900 rounded-2xl p-8 border border-yellow-800/50 text-center max-w-md mx-4">
                    <h2 className="text-2xl font-semibold mb-4 text-yellow-200 flex items-center justify-center gap-2">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                      Mystery Solved!
                    </h2>
                    <div className="mb-4 space-y-2">
                      <p className="text-gray-300">You've earned {currentChallenge.xp} XP!</p>
                      {combo > 3 && <p className="text-green-400">+{Math.floor(combo / 3) * 10} XP Combo Bonus!</p>}
                      {timeSpent < 50 && <p className="text-blue-400">+{Math.max(0, 50 - Math.floor(timeSpent / 10))} XP Speed Bonus!</p>}
                    </div>
                    <button
                      onClick={() => {
                        setShowVictory(false);
                        if (level < challenges.length) {
                          setCurrentChallenge(challenges[level]);
                          setBlocks([]);
                          setOutput('');
                          setCombo(0);
                          setTimeSpent(0);
                          setAiTip('New challenge awaits! Drag the blocks to solve it.');
                        } else {
                          setGameState('start');
                        }
                      }}
                      className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 text-yellow-200"
                    >
                      {level < challenges.length ? 'Next Challenge' : 'Return to Menu'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;