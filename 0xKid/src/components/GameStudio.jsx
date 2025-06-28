import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Play,
  Pause,
  RotateCcw,
  Save,
  Share2,
  Download,
  Palette,
  Star,
  Trophy,
  Code,
  BookOpen,
  MessageSquare,
  CheckCircle,
  Lock,
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const GameStudio = ({ activeQuest = null, onBackToQuests = () => {}, onQuestComplete = () => {} }) => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameObjects, setGameObjects] = useState([]);
  const [selectedTool, setSelectedTool] = useState('player');
  const [score, setScore] = useState(0);
  const [gameCode, setGameCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [questProgress, setQuestProgress] = useState(0);
  const [showLessonComplete, setShowLessonComplete] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeTutorialStep, setActiveTutorialStep] = useState(0);
  const animationFrameRef = useRef(null);

  const tools = [
    { id: 'player', name: 'Player', emoji: '🚀', color: '#3B82F6' },
    { id: 'enemy', name: 'Enemy', emoji: '👾', color: '#EF4444' },
    { id: 'collectible', name: 'Coin', emoji: '🪙', color: '#F59E0B' },
    { id: 'obstacle', name: 'Wall', emoji: '🧱', color: '#6B7280' },
  ];

  // Quest-specific game configurations
  const questGames = {
    1: { // The Talking Screen
      objects: [
        { type: 'player', x: 50, y: 200, emoji: '🤖', behavior: 'print-messages' },
      ],
      behavior: (ctx, canvas, objects, setObjects, score, setScore) => {
        const robot = objects.find(obj => obj.type === 'player');
        if (!robot) return;
        
        // Draw speech bubble
        if (Date.now() % 3000 < 1500) {
          ctx.fillStyle = 'white';
          ctx.strokeStyle = '#ddd';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(robot.x + 50, robot.y - 40, 200, 40, 10);
          ctx.fill();
          ctx.stroke();
          
          ctx.fillStyle = 'black';
          ctx.font = '14px Arial';
          ctx.textAlign = 'left';
          ctx.fillText('Hello, I am a robot!', robot.x + 60, robot.y - 20);
        }

        // Complete quest when player sees the message
        if (score === 0) {
          setScore(1);
          setTimeout(() => {
            setShowLessonComplete(true);
            setQuestProgress(100);
          }, 3000);
        }
      },
      successCondition: (score) => score > 0,
      tutorialSteps: [
        {
          title: "Welcome to C-Land!",
          content: "This robot needs your help to learn how to speak using printf in C.",
          position: { x: 100, y: 100 }
        },
        {
          title: "The printf Function",
          content: "In C, we use printf to display messages on the screen. Try making the robot talk!",
          position: { x: 150, y: 150 }
        }
      ]
    },
    2: { // Captain Code's Treasure Boxes
      objects: [
        { type: 'player', x: 100, y: 200, emoji: '🧑‍💻', behavior: 'variable-boxes' },
        { type: 'collectible', x: 200, y: 150, emoji: '💰', name: 'coins', value: 50 },
        { type: 'collectible', x: 300, y: 150, emoji: '🏆', name: 'grade', value: 'A' },
      ],
      behavior: (ctx, canvas, objects, setObjects, score, setScore) => {
        // Draw variable boxes with their values
        objects.forEach(obj => {
          if (obj.type === 'collectible') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.strokeStyle = '#ddd';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(obj.x - 20, obj.y - 50, 100, 40, 5);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(`${obj.name} = ${obj.value}`, obj.x - 15, obj.y - 30);
          }
        });

        // Complete quest when player collects both variables
        const player = objects.find(obj => obj.type === 'player');
        const collected = objects.filter(obj => obj.type === 'collectible').length;
        if (player && collected === 0 && score < 2) {
          setScore(2);
          setShowLessonComplete(true);
          setQuestProgress(100);
        }
      },
      successCondition: (score) => score >= 2,
      tutorialSteps: [
        {
          title: "Variables in C",
          content: "Variables are like treasure boxes that store values. Collect them to learn!",
          position: { x: 200, y: 100 }
        },
        {
          title: "Different Data Types",
          content: "Variables can hold numbers (int), letters (char), and more. Each has its own box.",
          position: { x: 300, y: 100 }
        }
      ]
    },
    3: { // The Math Machine
      objects: [
        { type: 'player', x: 100, y: 200, emoji: '🧑‍🏫', behavior: 'math-machine' },
        { type: 'obstacle', x: 250, y: 150, emoji: '➕', width: 100, height: 100, operation: '+', a: 6, b: 3 },
        { type: 'obstacle', x: 400, y: 150, emoji: '➖', width: 100, height: 100, operation: '-', a: 8, b: 5 },
      ],
      behavior: (ctx, canvas, objects, setObjects, score, setScore) => {
        // Draw current math problem
        const machine = objects.find(obj => obj.emoji === '➕' || obj.emoji === '➖');
        if (machine) {
          const a = machine.a || Math.floor(Math.random() * 10) + 1;
          const b = machine.b || Math.floor(Math.random() * 10) + 1;
          
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.strokeStyle = '#ddd';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(machine.x - 30, machine.y - 60, 160, 50, 5);
          ctx.fill();
          ctx.stroke();
          
          ctx.fillStyle = 'black';
          ctx.font = '20px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(`${a} ${machine.operation} ${b} = ?`, machine.x + 50, machine.y - 30);
          
          // Check if player is on the machine to answer
          const player = objects.find(obj => obj.type === 'player');
          if (player && checkCollision(player, machine)) {
            const answer = machine.operation === '+' ? a + b : a - b;
            if (score < answer) {
              setScore(answer);
              if (answer === 9 || answer === 3) { // Correct answers for our problems
                setQuestProgress(100);
                setShowLessonComplete(true);
              }
            }
          }
        }
      },
      successCondition: (score) => score === 9 || score === 3,
      tutorialSteps: [
        {
          title: "Math in C",
          content: "C can perform calculations like addition (+) and subtraction (-).",
          position: { x: 250, y: 100 }
        },
        {
          title: "Operators",
          content: "Try solving the math problems by moving to the operators.",
          position: { x: 400, y: 100 }
        }
      ]
    }
  };

  // Load the current quest game
  useEffect(() => {
    if (activeQuest && questGames[activeQuest.id]) {
      const gameConfig = questGames[activeQuest.id];
      const objects = gameConfig.objects.map((obj, index) => ({
        id: `${obj.type}-${index}`,
        type: obj.type,
        x: obj.x,
        y: obj.y,
        width: obj.width || 40,
        height: obj.height || 40,
        color: tools.find((t) => t.id === obj.type)?.color || '#6B7280',
        emoji: obj.emoji,
        behavior: obj.behavior || 'static',
        ...obj
      }));
      setGameObjects(objects);
      setScore(0);
      setIsPlaying(true); // Auto-start quest games
      setQuestProgress(activeQuest.progress || 0);
      setShowTutorial(true);
      setActiveTutorialStep(0);
    } else {
      setGameObjects([]);
      setScore(0);
      setQuestProgress(0);
      setShowTutorial(false);
    }
  }, [activeQuest]);

  // Game Loop and Rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = '#1F2937';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw game objects
      gameObjects.forEach((obj) => {
        ctx.fillStyle = obj.color || '#6B7280';
        ctx.fillRect(obj.x, obj.y, obj.width || 40, obj.height || 40);
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obj.emoji, obj.x + (obj.width || 40) / 2, obj.y + (obj.height || 40) / 2 + 8);
      });

      // Draw score
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${score}`, 10, 30);

      // Draw quest progress if in quest mode
      if (activeQuest) {
        ctx.fillText(`Quest: ${activeQuest.title}`, 10, 60);
        
        // Draw progress bar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(10, 70, 200, 10);
        ctx.fillStyle = getQuestColor(activeQuest);
        ctx.fillRect(10, 70, 200 * (questProgress / 100), 10);
      }

      // Run quest-specific behavior
      if (activeQuest && questGames[activeQuest.id]?.behavior) {
        questGames[activeQuest.id].behavior(ctx, canvas, gameObjects, setGameObjects, score, setScore);
      }
    };

    const update = () => {
      if (!isPlaying) return;

      // Check for quest completion
      if (activeQuest && questGames[activeQuest.id]?.successCondition(score) && !showLessonComplete) {
        setShowLessonComplete(true);
        if (onQuestComplete) {
          onQuestComplete(activeQuest.id);
        }
      }

      // Update enemy movement (for generic enemies)
      setGameObjects((prev) =>
        prev.map((obj) => {
          if (obj.type === 'enemy' && !activeQuest) {
            return { ...obj, x: obj.x + Math.sin(Date.now() * 0.001) * 2 };
          }
          return obj;
        })
      );

      // Check collisions (for generic game objects)
      if (!activeQuest) {
        const player = gameObjects.find((obj) => obj.type === 'player');
        if (player) {
          setGameObjects((prev) => {
            const newObjects = prev.filter((obj) => {
              if (obj.type === 'collectible' && checkCollision(player, obj)) {
                setScore((prevScore) => prevScore + 10);
                return false; // Remove collected item
              }
              if (obj.type === 'enemy' && checkCollision(player, obj)) {
                setIsPlaying(false); // End game on enemy collision
                alert('Game Over! You hit an enemy.');
                return true;
              }
              if (obj.type === 'obstacle' && checkCollision(player, obj)) {
                return true; // Prevent movement through obstacles
              }
              return true;
            });
            return newObjects;
          });
        }
      }
    };

    const gameLoop = () => {
      update();
      draw();
      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }
    };

    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else {
      draw();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameObjects, isPlaying, score, activeQuest, questProgress, showLessonComplete]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;

      const speed = 5;
      setGameObjects((prev) =>
        prev.map((obj) => {
          if (obj.type !== 'player') return obj;

          let newX = obj.x;
          let newY = obj.y;

          if (e.key === 'ArrowLeft' || e.key === 'a') newX -= speed;
          if (e.key === 'ArrowRight' || e.key === 'd') newX += speed;
          if (e.key === 'ArrowUp' || e.key === 'w') newY -= speed;
          if (e.key === 'ArrowDown' || e.key === 's') newY += speed;

          // Keep player within canvas bounds
          newX = Math.max(0, Math.min(newX, canvasRef.current.width - (obj.width || 40)));
          newY = Math.max(0, Math.min(newY, canvasRef.current.height - (obj.height || 40)));

          // Check for collisions with obstacles
          const willCollide = gameObjects.some(
            (other) =>
              other.type === 'obstacle' &&
              other.id !== obj.id &&
              checkCollision(
                { ...obj, x: newX, y: newY, width: obj.width || 40, height: obj.height || 40 },
                { ...other, width: other.width || 40, height: other.height || 40 }
              )
          );

          if (!willCollide) {
            return { ...obj, x: newX, y: newY };
          }
          return obj;
        })
      );
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameObjects]);

  const checkCollision = (obj1, obj2) => {
    return (
      obj1.x < obj2.x + (obj2.width || 40) &&
      obj1.x + (obj1.width || 40) > obj2.x &&
      obj1.y < obj2.y + (obj2.height || 40) &&
      obj1.y + (obj1.height || 40) > obj2.y
    );
  };

  const getQuestColor = (quest) => {
    const colorMap = {
      'from-blue-500 to-cyan-500': '#3B82F6',
      'from-green-500 to-emerald-500': '#10B981',
      'from-yellow-500 to-orange-500': '#F59E0B',
      'from-purple-500 to-pink-500': '#8B5CF6',
      'from-emerald-500 to-teal-500': '#10B981',
      'from-red-500 to-pink-500': '#EF4444',
      'from-indigo-500 to-blue-500': '#6366F1',
      'from-orange-500 to-red-500': '#F97316',
      'from-cyan-500 to-blue-500': '#06B6D4',
      'from-gray-500 to-indigo-500': '#6B7280',
    };
    return colorMap[quest.color] || '#3B82F6';
  };

  const handleCanvasClick = (event) => {
    if (isPlaying || activeQuest) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const tool = tools.find((t) => t.id === selectedTool);
    if (!tool) return;

    if (selectedTool === 'player' && gameObjects.some((obj) => obj.type === 'player')) {
      alert('Only one player can be added!');
      return;
    }

    const newObject = {
      id: `${selectedTool}-${Date.now()}`,
      type: selectedTool,
      x: Math.floor(x / 20) * 20,
      y: Math.floor(y / 20) * 20,
      width: 40,
      height: 40,
      color: tool.color,
      emoji: tool.emoji,
      behavior: selectedTool === 'player' ? 'player-controlled' : 'static',
    };

    setGameObjects((prev) => [...prev, newObject]);
  };

  const playGame = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && !activeQuest) {
      generateGameCode();
    }
  };

  const generateGameCode = () => {
    if (activeQuest) {
      setGameCode(activeQuest.code);
      return;
    }
    
    const code = `
      // Auto-generated game code
      const gameObjects = ${JSON.stringify(gameObjects, null, 2)};
      
      function update() {
        // Game logic would go here
      }
      
      function draw() {
        // Rendering would go here
      }
      
      function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
      }
      
      gameLoop();
    `;
    setGameCode(code);
  };

  const clearCanvas = () => {
    setGameObjects([]);
    setScore(0);
    setIsPlaying(false);
    setQuestProgress(0);
  };

  const nextTutorialStep = () => {
    if (activeQuest && questGames[activeQuest.id]?.tutorialSteps) {
      if (activeTutorialStep < questGames[activeQuest.id].tutorialSteps.length - 1) {
        setActiveTutorialStep(activeTutorialStep + 1);
      } else {
        setShowTutorial(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Gamepad2 className="w-10 h-10 text-purple-400" />
                {activeQuest ? activeQuest.title : 'C-Land Game Studio'}
              </h1>
              <p className="text-xl text-gray-300">
                {activeQuest ? activeQuest.description : 'Create games and learn C programming!'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {activeQuest && (
                <button
                  onClick={onBackToQuests}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Quests
                </button>
              )}
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Code className="w-4 h-4" />
                {showCode ? 'Hide Code' : 'Show Code'}
              </button>
              {!activeQuest && (
                <button
                  onClick={playGame}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isPlaying
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isPlaying ? 'Stop Game' : 'Play Game'}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {activeQuest ? 'Quest Game' : 'Game Canvas'}
                </h3>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold">Score: {score}</div>
                  {!activeQuest && (
                    <button
                      onClick={clearCanvas}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={400}
                  onClick={handleCanvasClick}
                  className="border border-gray-600 rounded-lg cursor-crosshair bg-gray-800"
                />
                {!isPlaying && !activeQuest && gameObjects.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="text-center">
                      <Gamepad2 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">Click to add game objects!</p>
                      <p className="text-gray-300">Select a tool from the sidebar and click on the canvas</p>
                    </div>
                  </div>
                )}
              </div>

              {isPlaying && (
                <div className="mt-4 p-4 bg-black/30 rounded-lg">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-400 mb-1">Controls</div>
                      <div className="flex gap-2">
                        <kbd className="px-2 py-1 bg-white/20 rounded text-xs">WASD</kbd>
                        <span className="text-gray-400">or</span>
                        <kbd className="px-2 py-1 bg-white/20 rounded text-xs">Arrow Keys</kbd>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {showLessonComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg"
                >
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl max-w-md text-center">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 text-white" />
                    <h3 className="text-2xl font-bold mb-2">Lesson Complete!</h3>
                    <p className="mb-4">{activeQuest?.lesson}</p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          setShowLessonComplete(false);
                          onBackToQuests();
                        }}
                        className="px-6 py-2 bg-white text-emerald-600 rounded-lg font-semibold"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {showTutorial && activeQuest && questGames[activeQuest.id]?.tutorialSteps && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-4 shadow-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 p-2 rounded-full">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">
                        {questGames[activeQuest.id].tutorialSteps[activeTutorialStep].title}
                      </h4>
                      <p className="text-sm">
                        {questGames[activeQuest.id].tutorialSteps[activeTutorialStep].content}
                      </p>
                    </div>
                    <button
                      onClick={nextTutorialStep}
                      className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                    >
                      {activeTutorialStep < questGames[activeQuest.id].tutorialSteps.length - 1 ? (
                        <ChevronRight className="w-4 h-4" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {showCode && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Code className="w-5 h-5 text-green-400" />
                    {activeQuest ? 'Code Example' : 'Generated Game Code'}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(gameCode || activeQuest?.code || '')}
                      className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-sm transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-300 max-h-96">
                  {activeQuest ? activeQuest.code : gameCode || '// Click "Play Game" to generate code'}
                </pre>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {!activeQuest && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-purple-400" />
                  Game Objects
                </h3>
                <div className="space-y-2">
                  {tools.map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => setSelectedTool(tool.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        selectedTool === tool.id
                          ? 'bg-white/20 border border-white/30'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-2xl">{tool.emoji}</div>
                      <div className="text-left">
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-gray-400">Click to select</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Game Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Objects</span>
                  <span className="font-semibold">{gameObjects.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Players</span>
                  <span className="font-semibold">
                    {gameObjects.filter((obj) => obj.type === 'player').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Enemies</span>
                  <span className="font-semibold">
                    {gameObjects.filter((obj) => obj.type === 'enemy').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Collectibles</span>
                  <span className="font-semibold">
                    {gameObjects.filter((obj) => obj.type === 'collectible').length}
                  </span>
                </div>
                {activeQuest && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Progress</span>
                      <span className="font-semibold">{questProgress}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">XP Reward</span>
                      <span className="font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {activeQuest.xp}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    const code = activeQuest ? activeQuest.code : gameCode;
                    navigator.clipboard.writeText(code || '');
                    alert('Code copied to clipboard!');
                  }}
                  className="w-full flex items-center gap-2 justify-center py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Copy Code
                </button>
                <button
                  onClick={() => {
                    const code = activeQuest ? activeQuest.code : gameCode;
                    const blob = new Blob([code], { type: 'text/javascript' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = activeQuest ? `${activeQuest.title.toLowerCase().replace(/\s+/g, '-')}.c` : 'game.js';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full flex items-center gap-2 justify-center py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export Code
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

GameStudio.propTypes = {
  activeQuest: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    xp: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    chapters: PropTypes.number.isRequired,
    completedChapters: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    code: PropTypes.string.isRequired,
    lesson: PropTypes.string.isRequired
  }),
  onBackToQuests: PropTypes.func,
  onQuestComplete: PropTypes.func
};

GameStudio.defaultProps = {
  activeQuest: null,
  onBackToQuests: () => {},
  onQuestComplete: () => {}
};

export default GameStudio;