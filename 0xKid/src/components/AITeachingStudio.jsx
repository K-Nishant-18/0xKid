import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Lightbulb,
  Target,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Code,
  Eye,
  EyeOff,
  Zap,
  Heart,
  Star,
  BookOpen,
  PenTool,
  Gamepad2
} from 'lucide-react';
import CodeEditor from './CodeEditor';

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
      title: "Understanding Variables",
      description: "Learn how to store and use data in your programs",
      concept: "Variables are like labeled boxes that store information",
      visualExample: "🎁 Box labeled 'age' contains the number 12",
      codeExample: "let age = 12;\nlet name = 'Udity';\nconsole.log('Hello ' + name + ', you are ' + age + ' years old!');",
      explanation: "Think of variables like labeled containers. Just like you might have a box labeled 'toys' that contains your favorite games, in programming we have containers labeled with names that hold different types of information.",
      interactiveSteps: [
        {
          instruction: "Create a variable called 'favoriteColor' and set it to 'blue'",
          hint: "Use 'let' followed by the variable name, then '=' and the value",
          solution: "let favoriteColor = 'blue';",
          validation: (code) => code.includes('favoriteColor') && code.includes('blue')
        },
        {
          instruction: "Create a variable for your age",
          hint: "Numbers don't need quotes around them",
          solution: "let myAge = 12;",
          validation: (code) => code.includes('myAge') && /\d+/.test(code)
        }
      ],
      quiz: [
        {
          question: "What symbol do we use to assign a value to a variable?",
          options: ["=", "+", "*", "/"],
          correct: 0,
          explanation: "The equals sign (=) is used to assign values to variables"
        }
      ]
    },
    {
      id: 2,
      title: "Making Decisions with If Statements",
      description: "Learn how computers make choices using conditional logic",
      concept: "If statements help computers make decisions based on conditions",
      visualExample: "🌧️ If it's raining → Take umbrella, Otherwise → Wear sunglasses",
      codeExample: "let weather = 'sunny';\n\nif (weather === 'sunny') {\n  console.log('Wear sunglasses! ☀️');\n} else {\n  console.log('Take an umbrella! ☔');\n}",
      explanation: "If statements are like decision trees. They help your program choose what to do based on different situations, just like how you decide what to wear based on the weather.",
      interactiveSteps: [
        {
          instruction: "Write an if statement that checks if a number is greater than 10",
          hint: "Use 'if (condition) { }' structure",
          solution: "if (number > 10) {\n  console.log('Big number!');\n}",
          validation: (code) => code.includes('if') && code.includes('>')
        }
      ],
      quiz: [
        {
          question: "What happens if the condition in an if statement is false?",
          options: ["The code inside runs anyway", "The code inside is skipped", "An error occurs", "The program stops"],
          correct: 1,
          explanation: "When the condition is false, the code inside the if block is skipped"
        }
      ]
    },
    {
      id: 3,
      title: "Loops: Repeating Actions",
      description: "Learn how to make your code repeat actions efficiently",
      concept: "Loops help us repeat actions without writing the same code over and over",
      visualExample: "🔄 Brush teeth 3 times = for (i = 0; i < 3; i++) { brush(); }",
      codeExample: "for (let i = 0; i < 5; i++) {\n  console.log('Hello number ' + i);\n}\n\n// This prints:\n// Hello number 0\n// Hello number 1\n// Hello number 2\n// Hello number 3\n// Hello number 4",
      explanation: "Loops are like giving instructions to repeat something. Instead of writing 'clap your hands' 10 times, you can say 'clap your hands 10 times' - that's what loops do in programming!",
      interactiveSteps: [
        {
          instruction: "Create a loop that counts from 1 to 5",
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
          explanation: "i++ is shorthand for 'add 1 to i', which moves the loop to the next iteration"
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
      speakText("I'm listening! Ask me anything about this lesson.");
    }
  };

  const validateStep = () => {
    const step = currentLessonData.interactiveSteps[currentStep];
    if (step.validation(userCode)) {
      setCompletedSteps([...completedSteps, currentStep]);
      if (currentStep < currentLessonData.interactiveSteps.length - 1) {
        setCurrentStep(currentStep + 1);
        setUserCode('');
        speakText("Great job! Let's move to the next step.");
      } else {
        setShowQuiz(true);
        speakText("Excellent! You've completed all the coding steps. Now let's test your understanding with a quick quiz.");
      }
    } else {
      speakText("Not quite right. Check the hint and try again!");
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
                <Brain className="w-10 h-10 text-purple-400" />
                AI Teaching Studio
              </h1>
              <p className="text-xl text-gray-300">
                Learn coding with your personal AI mentor
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={learningMode}
                onChange={(e) => setLearningMode(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white"
              >
                <option value="visual">Visual Mode</option>
                <option value="hybrid">Hybrid Mode</option>
                <option value="text">Text Mode</option>
              </select>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
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
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
              🤖
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
          <h2 className="text-2xl font-bold mb-2">Meet Zara, Your AI Coding Mentor</h2>
          <p className="text-gray-300">I'll guide you through each concept step by step!</p>
        </motion.div>

        {/* Lesson Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Lesson Progress</h3>
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
                    index === currentLesson ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={previousLesson}
                disabled={currentLesson === 0}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="text-center">
                <div className="font-semibold">{currentLessonData.title}</div>
                <div className="text-sm text-gray-300">{currentLessonData.description}</div>
              </div>
              <button
                onClick={nextLesson}
                disabled={currentLesson === lessons.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
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
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  Understanding the Concept
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakText(currentLessonData.explanation)}
                    className={`p-2 rounded-lg transition-colors ${
                      isSpeaking ? 'bg-green-500/30 text-green-400' : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {isSpeaking ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setShowHints(!showHints)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {showHints ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-blue-300">Key Concept</span>
                  </div>
                  <p className="text-gray-200">{currentLessonData.concept}</p>
                </div>

                {learningMode === 'visual' && (
                  <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-5 h-5 text-purple-400" />
                      <span className="font-medium text-purple-300">Visual Example</span>
                    </div>
                    <p className="text-gray-200 text-lg">{currentLessonData.visualExample}</p>
                  </div>
                )}

                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-green-300">Code Example</span>
                  </div>
                  <pre className="text-gray-200 font-mono text-sm bg-black/30 p-3 rounded overflow-x-auto">
                    {currentLessonData.codeExample}
                  </pre>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
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
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <PenTool className="w-5 h-5 text-purple-400" />
                  Interactive Practice
                </h3>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Step {currentStep + 1} of {currentLessonData.interactiveSteps.length}</span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    {currentLessonData.interactiveSteps[currentStep].instruction}
                  </p>
                  
                  {showHints && (
                    <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Lightbulb className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium text-yellow-300">Hint</span>
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
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Show Solution
                  </button>
                  <button
                    onClick={validateStep}
                    className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Check Answer
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
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-pink-400" />
                  Quick Quiz
                </h3>

                <div className="space-y-4">
                  <p className="text-lg font-medium">{currentLessonData.quiz[0].question}</p>
                  
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
                            : 'bg-white/10 hover:bg-white/20 border border-white/20'
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
                          <span>{option}</span>
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
                      <p className="font-medium mb-2">
                        {quizAnswer === currentLessonData.quiz[0].correct ? '🎉 Correct!' : '❌ Not quite right'}
                      </p>
                      <p className="text-sm text-gray-300">{currentLessonData.quiz[0].explanation}</p>
                    </motion.div>
                  )}

                  {quizAnswer === currentLessonData.quiz[0].correct && (
                    <button
                      onClick={nextLesson}
                      className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Continue to Next Lesson
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
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Mentor
              </h3>
              
              <div className="space-y-4">
                <button
                  onClick={toggleListening}
                  className={`w-full flex items-center gap-2 justify-center py-3 rounded-lg font-medium transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening ? 'Stop Listening' : 'Ask Question'}
                </button>

                <button
                  onClick={() => speakText(currentLessonData.explanation)}
                  className="w-full flex items-center gap-2 justify-center py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  Explain Again
                </button>

                <button
                  onClick={() => speakText("Let me give you a hint: " + currentLessonData.interactiveSteps[currentStep]?.hint)}
                  className="w-full flex items-center gap-2 justify-center py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-medium transition-colors"
                >
                  <Lightbulb className="w-4 h-4" />
                  Get Hint
                </button>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Your Progress
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-1">
                    {Math.round(((currentLesson + (showQuiz ? 1 : currentStep / currentLessonData.interactiveSteps.length)) / lessons.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-300">Course Complete</div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Lessons Completed</span>
                    <span>{currentLesson} / {lessons.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Current Step</span>
                    <span>{currentStep + 1} / {currentLessonData.interactiveSteps.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>XP Earned</span>
                    <span className="text-yellow-400">+{(currentLesson + 1) * 50} XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Tips */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Learning Tips
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>Take breaks every 20 minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span>Practice coding daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span>Don't be afraid to make mistakes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span>Ask questions when stuck</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Recent Achievements</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <div className="font-medium text-sm">First Variable</div>
                    <div className="text-xs text-gray-400">Created your first variable</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <div className="text-2xl">🔄</div>
                  <div>
                    <div className="font-medium text-sm">Loop Master</div>
                    <div className="text-xs text-gray-400">Completed loop exercises</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                  <div className="text-2xl">🧠</div>
                  <div>
                    <div className="font-medium text-sm">Quick Learner</div>
                    <div className="text-xs text-gray-400">Finished lesson in record time</div>
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