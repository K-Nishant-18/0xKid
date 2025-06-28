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
} from 'lucide-react';

const GameStudio = () => {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameObjects, setGameObjects] = useState([
    {
      id: 'player-1',
      type: 'player',
      x: 50,
      y: 200,
      width: 40,
      height: 40,
      color: '#3B82F6',
      emoji: '🚀',
      behavior: 'player-controlled',
    },
  ]);
  const [selectedTool, setSelectedTool] = useState('player');
  const [score, setScore] = useState(0);
  const [gameCode, setGameCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const animationFrameRef = useRef(null);

  const tools = [
    { id: 'player', name: 'Player', emoji: '🚀', color: '#3B82F6' },
    { id: 'enemy', name: 'Enemy', emoji: '👾', color: '#EF4444' },
    { id: 'collectible', name: 'Coin', emoji: '🪙', color: '#F59E0B' },
    { id: 'obstacle', name: 'Wall', emoji: '🧱', color: '#6B7280' },
  ];

  const gameTemplates = [
    {
      id: 'platformer',
      name: 'Platform Adventure',
      description: 'Jump and collect coins while avoiding enemies',
      difficulty: 'Beginner',
      objects: [
        { type: 'player', x: 50, y: 200, emoji: '🚀' },
        { type: 'collectible', x: 200, y: 150, emoji: '🪙' },
        { type: 'collectible', x: 350, y: 100, emoji: '🪙' },
        { type: 'enemy', x: 300, y: 220, emoji: '👾' },
        { type: 'obstacle', x: 150, y: 240, emoji: '🧱' },
      ],
    },
    {
      id: 'space',
      name: 'Space Shooter',
      description: 'Fly through space and shoot asteroids',
      difficulty: 'Intermediate',
      objects: [
        { type: 'player', x: 50, y: 200, emoji: '🚀' },
        { type: 'enemy', x: 400, y: 100, emoji: '☄️' },
        { type: 'enemy', x: 500, y: 200, emoji: '☄️' },
        { type: 'collectible', x: 300, y: 150, emoji: '⭐' },
      ],
    },
    {
      id: 'maze',
      name: 'Maze Runner',
      description: 'Navigate through a maze to reach the goal',
      difficulty: 'Advanced',
      objects: [
        { type: 'player', x: 50, y: 50, emoji: '🏃' },
        { type: 'obstacle', x: 100, y: 0, emoji: '🧱' },
        { type: 'obstacle', x: 100, y: 40, emoji: '🧱' },
        { type: 'obstacle', x: 100, y: 80, emoji: '🧱' },
        { type: 'collectible', x: 450, y: 200, emoji: '🏆' },
      ],
    },
  ];

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
        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(obj.emoji, obj.x + obj.width / 2, obj.y + obj.height / 2 + 8);
      });

      // Draw score
      ctx.fillStyle = 'white';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Score: ${score}`, 10, 30);
    };

    const update = () => {
      if (!isPlaying) return;

      // Update enemy movement
      setGameObjects((prev) =>
        prev.map((obj) => {
          if (obj.type === 'enemy') {
            return { ...obj, x: obj.x + Math.sin(Date.now() * 0.001) * 2 };
          }
          return obj;
        })
      );

      // Check collisions
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
  }, [gameObjects, isPlaying, score]);

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
          newX = Math.max(0, Math.min(newX, canvasRef.current.width - obj.width));
          newY = Math.max(0, Math.min(newY, canvasRef.current.height - obj.height));

          // Check for collisions with obstacles
          const willCollide = gameObjects.some(
            (other) =>
              other.type === 'obstacle' &&
              other.id !== obj.id &&
              checkCollision(
                { ...obj, x: newX, y: newY },
                other
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

  // Collision Detection
  const checkCollision = (obj1, obj2) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  };

  // Canvas Click Handler
  const handleCanvasClick = (event) => {
    if (isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const tool = tools.find((t) => t.id === selectedTool);
    if (!tool) return;

    // Prevent adding multiple players
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

  // Generate Game Code
  const generateGameCode = () => {
    const code = `
      // Auto-generated game code
      class Game {
        constructor() {
          this.canvas = document.getElementById('gameCanvas');
          this.ctx = this.canvas.getContext('2d');
          this.objects = ${JSON.stringify(gameObjects, null, 2)};
          this.score = 0;
          this.isRunning = false;
        }

        start() {
          this.isRunning = true;
          this.gameLoop();
          this.setupControls();
        }

        setupControls() {
          window.addEventListener('keydown', (e) => {
            const player = this.objects.find(obj => obj.type === 'player');
            if (!player) return;
            const speed = 5;
            let newX = player.x;
            let newY = player.y;

            if (e.key === 'ArrowLeft' || e.key === 'a') newX -= speed;
            if (e.key === 'ArrowRight' || e.key === 'd') newX += speed;
            if (e.key === 'ArrowUp' || e.key === 'w') newY -= speed;
            if (e.key === 'ArrowDown' || e.key === 's') newY += speed;

            newX = Math.max(0, Math.min(newX, this.canvas.width - player.width));
            newY = Math.max(0, Math.min(newY, this.canvas.height - player.height));

            const willCollide = this.objects.some(
              (other) =>
                other.type === 'obstacle' &&
                other.id !== player.id &&
                newX < other.x + other.width &&
                newX + player.width > other.x &&
                newY < other.y + other.height &&
                newY + player.height > other.y
            );

            if (!willCollide) {
              player.x = newX;
              player.y = newY;
            }
          });
        }

        gameLoop() {
          if (!this.isRunning) return;
          this.update();
          this.draw();
          requestAnimationFrame(() => this.gameLoop());
        }

        update() {
          const player = this.objects.find(obj => obj.type === 'player');
          this.objects = this.objects.filter(obj => {
            if (obj.type === 'enemy') {
              obj.x += Math.sin(Date.now() * 0.001) * 2;
            }
            if (obj.type === 'collectible' && player && this.checkCollision(player, obj)) {
              this.score += 10;
              return false;
            }
            if (obj.type === 'enemy' && player && this.checkCollision(player, obj)) {
              this.isRunning = false;
              alert('Game Over! You hit an enemy.');
              return true;
            }
            return true;
          });
        }

        checkCollision(obj1, obj2) {
          return (
            obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y
          );
        }

        draw() {
          this.ctx.fillStyle = '#1F2937';
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

          this.ctx.strokeStyle = '#374151';
          this.ctx.lineWidth = 1;
          for (let x = 0; x < this.canvas.width; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
          }
          for (let y = 0; y < this.canvas.height; y += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
          }

          this.objects.forEach(obj => {
            this.ctx.fillStyle = obj.color;
            this.ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
            this.ctx.font = '24px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(obj.emoji, obj.x + obj.width / 2, obj.y + obj.height / 2 + 8);
          });

          this.ctx.fillStyle = 'white';
          this.ctx.font = '20px Arial';
          this.ctx.textAlign = 'left';
          this.ctx.fillText('Score: ' + this.score, 10, 30);
        }
      }

      // Initialize game
      const game = new Game();
      game.start();
    `;
    setGameCode(code);
  };

  // Load Template
  const loadTemplate = (template) => {
    const objects = template.objects.map((obj, index) => ({
      id: `${obj.type}-${index}`,
      type: obj.type,
      x: obj.x,
      y: obj.y,
      width: 40,
      height: 40,
      color: tools.find((t) => t.id === obj.type)?.color || '#6B7280',
      emoji: obj.emoji,
      behavior: obj.type === 'player' ? 'player-controlled' : 'static',
    }));
    setGameObjects(objects);
    setScore(0);
  };

  // Clear Canvas
  const clearCanvas = () => {
    setGameObjects([]);
    setScore(0);
    setIsPlaying(false);
  };

  // Play/Stop Game
  const playGame = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      generateGameCode();
    }
  };

  // Save Game (Placeholder)
  const saveGame = () => {
    const gameData = { gameObjects, score };
    console.log('Game saved:', gameData);
    alert('Game saved to console! (Implement actual saving logic)');
  };

  // Share Game (Placeholder)
  const shareGame = () => {
    alert('Share functionality not implemented. You can copy the game code to share!');
  };

  // Export Code
  const exportCode = () => {
    generateGameCode();
    const blob = new Blob([gameCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game.js';
    a.click();
    URL.revokeObjectURL(url);
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
                Game Studio
              </h1>
              <p className="text-xl text-gray-300">
                Create your own games with drag-and-drop simplicity!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <Code className="w-4 h-4" />
                {showCode ? 'Hide Code' : 'Show Code'}
              </button>
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
                <h3 className="text-xl font-semibold">Game Canvas</h3>
                <div className="flex items-center gap-2">
                  <div className="text-lg font-bold">Score: {score}</div>
                  <button
                    onClick={clearCanvas}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
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
                {!isPlaying && (
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
                    Generated Game Code
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(gameCode)}
                      className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-sm transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={generateGameCode}
                      className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded text-sm transition-colors"
                    >
                      Regenerate
                    </button>
                  </div>
                </div>
                <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto text-sm font-mono text-gray-300 max-h-96">
                  {gameCode || '// Click "Play Game" to generate code'}
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

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Game Templates
              </h3>
              <div className="space-y-3">
                {gameTemplates.map((template) => (
                  <div key={template.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{template.name}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          template.difficulty === 'Beginner'
                            ? 'bg-green-500/20 text-green-400'
                            : template.difficulty === 'Intermediate'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {template.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{template.description}</p>
                    <button
                      onClick={() => loadTemplate(template)}
                      className="w-full py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-sm transition-colors"
                    >
                      Load Template
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={saveGame}
                  className="w-full flex items-center gap-2 justify-center py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Game
                </button>
                <button
                  onClick={shareGame}
                  className="w-full flex items-center gap-2 justify-center py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share Game
                </button>
                <button
                  onClick={exportCode}
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
  // Add PropTypes if needed
};

export default GameStudio;