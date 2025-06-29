import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  Star,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Ghost,
  Zap,
  Sparkles
} from 'lucide-react';
import CodeEditor from './CodeEditor';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const AITeachingStudio = () => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [learningMode, setLearningMode] = useState('visual'); // visual, hybrid, text
  const [difficulty, setDifficulty] = useState('beginner');

  const lessons = [
    {
      id: 1,
      title: "Mystery Variables",
      description: "Uncover the secrets of storing data in your code journal",
      concept: "Variables are like Dipper's journal entries, storing clues for later",
      visualExample: "📖 Journal entry 'creature' holds 'Gnome'",
      codeExample: "let creature = 'Gnome';\nlet name = 'Dipper';\nconsole.log('Found ' + name + ' investigating ' + creature + '!');",
      explanation: "Variables are like pages in Dipper's journal, each with a name and a secret to hold. Just as Dipper writes clues about creatures, variables store information for your program to use.",
      interactiveSteps: [
        {
          instruction: "Create a variable called 'mysteryItem' and set it to 'Amulet'",
          hint: "Use 'let' followed by the variable name, then '=' and the value",
          solution: "let mysteryItem = 'Amulet';",
          validation: (code) => code.includes('mysteryItem') && code.includes('Amulet')
        },
        {
          instruction: "Create a variable for your investigation level",
          hint: "Numbers don't need quotes around them",
          solution: "let level = 5;",
          validation: (code) => code.includes('level') && /\d+/.test(code)
        }
      ],
      quiz: [
        {
          question: "What symbol do we use to record a clue in a variable?",
          options: ["=", "+", "*", "/"],
          correct: 0,
          explanation: "The equals sign (=) is used to store clues in variables"
        }
      ]
    },
    {
      id: 2,
      title: "Decoding with If Statements",
      description: "Learn how to make choices like Mabel solving mysteries",
      concept: "If statements help your code decide like choosing to trust a cipher",
      visualExample: "🔍 If clue is 'Weird' → Investigate, Otherwise → Ignore",
      codeExample: "let clue = 'Weird';\n\nif (clue === 'Weird') {\n  console.log('Investigate now! 🕵️');\n} else {\n  console.log('Ignore it! 😎');\n}",
      explanation: "If statements are like Mabel deciding whether to follow a strange clue. They let your program choose what to do based on the situation, just like solving a Gravity Falls mystery.",
      interactiveSteps: [
        {
          instruction: "Write an if statement to check if a clue level is above 5",
          hint: "Use 'if (condition) { }' structure",
          solution: "if (clueLevel > 5) {\n  console.log('High priority clue!');\n}",
          validation: (code) => code.includes('if') && code.includes('>')
        }
      ],
      quiz: [
        {
          question: "What happens if the clue in an if statement is false?",
          options: ["The code runs anyway", "The code is skipped", "An error occurs", "The program stops"],
          correct: 1,
          explanation: "When the clue is false, the code inside the if block is skipped"
        }
      ]
    },
    {
      id: 3,
      title: "Loops: Repeating Investigations",
      description: "Learn to repeat actions like Soos fixing the Mystery Shack",
      concept: "Loops repeat tasks without rewriting code, like checking journal pages",
      visualExample: "🔄 Investigate 3 clues = for (i = 0; i < 3; i++) { checkClue(); }",
      codeExample: "for (let i = 0; i < 5; i++) {\n  console.log('Clue number ' + i);\n}\n\n// This prints:\n// Clue number 0\n// Clue number 1\n// Clue number 2\n// Clue number 3\n// Clue number 4",
      explanation: "Loops are like Soos repeating repairs on the Mystery Shack. Instead of writing the same code multiple times, you can tell the program to repeat an action, like checking multiple journal entries.",
      interactiveSteps: [
        {
          instruction: "Create a loop to check clues 1 to 5",
          hint: "Use 'for (let i = 1; i <= 5; i++)' structure",
          solution: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
          validation: (code) => code.includes('for') && code.includes('i++')
        }
      ],
      quiz: [
        {
          question: "What does 'i++' mean in a for loop?",
          options: ["Subtract 1 from i", "Add 1 to i", "Multiply i by 2", "Reset i to 0"],
          correct: 1,
          explanation: "i++ means 'add 1 to i', moving to the next clue in the loop"
        }
      ]
    }
  ];

  const currentLessonData = lessons[currentLesson];
  const [currentStep, setCurrentStep] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null);

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      speakText("I'm ready to hear your questions about this mystery!");
    }
  };

  const validateStep = () => {
    const step = currentLessonData.interactiveSteps[currentStep];
    if (step.validation(userCode)) {
      setCompletedSteps([...completedSteps, currentStep]);
      if (currentStep < currentLessonData.interactiveSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setUserCode('');
        speakText("Nice work, detective! Let's move to the next clue.");
      } else {
        setShowQuiz(true);
        speakText("Great job cracking all the steps! Time for a quick mystery quiz!");
      }
    } else {
      speakText("That's not quite right. Check the journal hint and try again!");
    }
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setCurrentStep(0);
      setCompletedSteps([]);
      setUserCode('');
      setShowQuiz(false);
      setQuizAnswer(null);
    }
  };

  const previousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
      setCurrentStep(0);
      setCompletedSteps([]);
      setUserCode('');
      setShowQuiz(false);
      setQuizAnswer(null);
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
                Mystery Coding Studio
              </h1>
              <p className="text-xl text-gray-300">
                Unravel code with your Gravity Falls AI mentor
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={learningMode}
                onChange={(e) => setLearningMode(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-sm border border-yellow-800/50 rounded-lg px-4 py-2 text-yellow-200"
              >
                <option value="visual">Mystery Visual</option>
                <option value="hybrid">Hybrid Cipher</option>
                <option value="text">Journal Text</option>
              </select>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-sm border border-yellow-800/50 rounded-lg px-4 py-2 text-yellow-200"
              >
                <option value="beginner">New Sleuth</option>
                <option value="intermediate">Mystery Hunter</option>
                <option value="advanced">Master Detective</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* AI Mentor Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8 text-center"
        >
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-600 to-red-800 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
              📖
            </div>
            {isSpeaking && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
              >
                <Volume2 className="w-3 h-3 text-white" />
              </motion.div>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2 text-yellow-200">Meet Grunkle Stan, Your Mystery Mentor</h2>
          <p className="text-gray-300">I'll guide you through each coding clue!</p>
        </motion.div>

        {/* Lesson Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-yellow-200">Journal Progress</h3>
              <div className="text-sm text-gray-300">
                {currentLesson + 1} of {lessons.length}
              </div>
            </div>
            <div className="flex gap-2 mb-4">
              {lessons.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-full ${
                    index < currentLesson ? 'bg-green-500' :
                    index === currentLesson ? 'bg-blue-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={previousLesson}
                disabled={currentLesson === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-yellow-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="text-center">
                <div className="font-semibold text-yellow-200">{currentLessonData.title}</div>
                <div className="text-sm text-gray-300">{currentLessonData.description}</div>
              </div>
              <button
                onClick={nextLesson}
                disabled={currentLesson === lessons.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-yellow-200"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Concept Explanation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2 text-yellow-200">
                  <BookOpen className="w-5 h-5 text-blue-300" />
                  Decoding the Mystery
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakText(currentLessonData.explanation)}
                    className={`p-2 rounded-lg transition-colors ${
                      isSpeaking ? 'bg-green-500/30 text-green-400' : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                  >
                    {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    {showHints ? <Star className="w-4 h-4 text-yellow-300" /> : <Ghost className="w-4 h-4 text-blue-300" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-300" />
                    <span className="font-medium text-blue-300">Key Mystery</span>
                  </div>
                  <p className="text-gray-200">{currentLessonData.concept}</p>
                </div>

                {learningMode === 'visual' && (
                  <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-yellow-300" />
                      <span className="font-medium text-yellow-300">Visual Clue</span>
                    </div>
                    <p className="text-gray-200 text-lg">{currentLessonData.visualExample}</p>
                  </div>
                )}

                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Ghost className="w-5 h-5 text-green-300" />
                    <span className="font-medium text-green-300">Code Journal</span>
                  </div>
                  <pre className="text-gray-200 font-mono text-sm bg-black/30 p-3 rounded overflow-x-auto">
                    {currentLessonData.codeExample}
                  </pre>
                </div>

                <div className="bg-gray-700/50 rounded-lg p-4">
                  <p className="text-gray-300">{currentLessonData.explanation}</p>
                </div>
              </div>
            </motion.div>

            {/* Interactive Practice */}
            {!showQuiz && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-200">
                  <BookOpen className="w-5 h-5 text-blue-300" />
                  Mystery Practice
                </h3>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-yellow-300" />
                    <span className="font-medium text-yellow-200">Clue {currentStep + 1} of {currentLessonData.interactiveSteps.length}</span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {currentLessonData.interactiveSteps[currentStep].instruction}
                  </p>
                  
                  {showHints && (
                    <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb className="w-4 h-4 text-yellow-300" />
                        <span className="text-sm font-medium text-yellow-300">Journal Hint</span>
                      </div>
                      <p className="text-sm text-gray-300">
                        {currentLessonData.interactiveSteps[currentStep].hint}
                      </p>
                    </div>
                  )}
                </div>

                <CodeEditor
                  initialCode={userCode}
                  onCodeChange={setUserCode}
                  language="javascript"
                />

                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={() => setUserCode(currentLessonData.interactiveSteps[currentStep].solution)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors text-yellow-200"
                  >
                    Reveal Solution
                  </button>
                  <button
                    onClick={validateStep}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-yellow-200"
                  >
                    Check Clue
                  </button>
                </div>
              </motion.div>
            )}

            {/* Quiz Section */}
            {showQuiz && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-200">
                  <Ghost className="w-5 h-5 text-blue-300" />
                  Mystery Quiz
                </h3>

                <div className="space-y-4">
                  <p className="text-lg font-medium text-yellow-200">{currentLessonData.quiz[0].question}</p>
                  
                  <div className="space-y-2">
                    {currentLessonData.quiz[0].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => setQuizAnswer(index)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                          quizAnswer === index
                            ? index === currentLessonData.quiz[0].correct
                              ? 'bg-green-500/30 border border-green-500/50'
                              : 'bg-red-500/30 border border-red-500/50'
                            : 'bg-gray-800/50 hover:bg-gray-700/50 border border-yellow-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            quizAnswer === index
                              ? index === currentLessonData.quiz[0].correct
                                ? 'border-green-400 bg-green-400'
                                : 'border-red-400 bg-red-400'
                              : 'border-gray-400'
                          }`}>
                            {quizAnswer === index && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <span className="text-yellow-200">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {quizAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        quizAnswer === currentLessonData.quiz[0].correct
                          ? 'bg-green-500/20 border border-green-500/30'
                          : 'bg-red-500/20 border border-red-500/30'
                      }`}
                    >
                      <p className="font-medium mb-2 text-yellow-200">
                        {quizAnswer === currentLessonData.quiz[0].correct ? '🎉 Correct!' : '❌ Try Again!'}
                      </p>
                      <p className="text-sm text-gray-300">{currentLessonData.quiz[0].explanation}</p>
                    </motion.div>
                  )}

                  {quizAnswer === currentLessonData.quiz[0].correct && (
                    <button
                      onClick={nextLesson}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-yellow-600 to-red-800 hover:from-yellow-700 hover:to-red-900 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-yellow-200"
                    >
                      Next Mystery Lesson
                    </button>
                  )}
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
            {/* AI Mentor Controls */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-200">
                <BookOpen className="w-5 h-5 text-blue-300" />
                Mystery Mentor
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={toggleListening}
                  className={`w-full flex items-center gap-2 justify-center py-3 rounded-lg font-medium transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-600 hover:bg-red-700 text-yellow-200' 
                      : 'bg-blue-600 hover:bg-blue-700 text-yellow-200'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening ? 'Stop Listening' : 'Ask a Clue'}
                </button>

                <button
                  onClick={() => speakText(currentLessonData.explanation)}
                  className="w-full flex items-center gap-2 justify-center py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors text-yellow-200"
                >
                  <Volume2 className="w-4 h-4" />
                  Explain Again
                </button>

                <button
                  onClick={() => speakText("Here's a clue: " + currentLessonData.interactiveSteps[currentStep]?.hint)}
                  className="w-full flex items-center gap-2 justify-center py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg font-medium transition-colors text-yellow-200"
                >
                  <Lightbulb className="w-4 h-4" />
                  Get Journal Hint
                </button>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-200">
                <Star className="w-5 h-5 text-yellow-300" />
                Your Investigation
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-300 mb-1">
                    {Math.round(((currentLesson + (showQuiz ? 1 : currentStep / currentLessonData.interactiveSteps.length)) / lessons.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-300">Mystery Complete</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Lessons Solved</span>
                    <span>{currentLesson} / {lessons.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Clue</span>
                    <span>{currentStep + 1} / {currentLessonData.interactiveSteps.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Mystery Points</span>
                    <span className="text-yellow-300">+{(currentLesson + 1) * 50} XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-red-800/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/30">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-yellow-200">
                <Sparkles className="w-5 h-5 text-blue-300" />
                Mystery Tips
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span>Take breaks like Mabel with glitter</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-300" />
                  <span>Investigate code daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ghost className="w-4 h-4 text-green-300" />
                  <span>Embrace mysterious bugs</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  <span>Ask Stan when stuck</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50">
              <h3 className="text-lg font-semibold mb-4 text-yellow-200">Recent Discoveries</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl">🧢</div>
                  <div>
                    <div className="font-medium text-sm text-yellow-200">First Clue</div>
                    <div className="text-xs text-gray-300">Logged your first variable</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl">🌈</div>
                  <div>
                    <div className="font-medium text-sm text-yellow-200">Loop Sleuth</div>
                    <div className="text-xs text-gray-300">Mastered loop mysteries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-gray-700/50 rounded-lg">
                  <div className="text-2xl">🔧</div>
                  <div>
                    <div className="font-medium text-sm text-yellow-200">Quick Detective</div>
                    <div className="text-xs text-gray-300">Solved lesson in record time</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AITeachingStudio;