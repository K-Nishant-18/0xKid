import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle, 
  Play, 
  Rocket, 
  Star, 
  Code, 
  Brain, 
  ArrowLeft, 
  Sparkles, 
  Ghost, 
  Zap, 
  Save, 
  HelpCircle, 
  MessageSquare, 
  Trophy,
  RotateCcw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Gravity Falls themed background
const mysteryShackImg = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

const QuestDetail = ({ questId, onBack }) => {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState('');
  const [output, setOutput] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [progress, setProgress] = useState(0);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [errorLine, setErrorLine] = useState(null);

  const quests = [
    {
      id: 1,
      title: "The Whispering Scroll",
      description: "Help Arjun uncover the secrets of a glowing scroll in the Mystery Haveli using printf!",
      difficulty: "Beginner",
      xp: 100,
      icon: "📜",
      color: "from-blue-600 to-green-600",
      skills: ["printf", "Output"],
      story: `
        In the ancient Mystery Haveli, Arjun discovers a glowing scroll hidden in a dusty trunk. The scroll pulses with energy but remains silent. "If only this scroll could speak its secrets!" Arjun sighs. Your mission is to use the printf function in C to make the scroll reveal its message: "The scroll speaks!". Can you help Arjun awaken the scroll's voice and uncover the first clue to the Haveli's mysteries?
      `,
      chapters: [
        {
          title: "Chapter 1: Awakening the Scroll",
          content: `
            The scroll requires a magical incantation to speak. In C, we use printf to display text on the screen. Try writing:
            \`\`\`c
            printf("The scroll speaks!");
            \`\`\`
            This command makes the scroll display its message. Ensure you include the semicolon (;) at the end, as it's a crucial part of C's syntax. The scroll's magic depends on precision!
          `,
          task: "Write code to make the scroll display 'The scroll speaks!'",
          solution: `printf("The scroll speaks!");`,
          hints: [
            "Use printf to display text.",
            "Enclose the text in double quotes (\" \").",
            "Don't forget the semicolon at the end of the statement!"
          ],
          testCases: [
            { input: "", expected: "The scroll speaks!" }
          ]
        },
        {
          title: "Chapter 2: The Scroll's Greeting",
          content: `
            The scroll now wants to greet Arjun personally! Use printf to display a personalized message:
            \`\`\`c
            printf("Welcome, Arjun!");
            \`\`\`
            This will make the scroll address Arjun directly. Ensure the text is enclosed in quotes and ends with a semicolon.
          `,
          task: "Make the scroll display 'Welcome, Arjun!'",
          solution: `printf("Welcome, Arjun!");`,
          hints: [
            "Use printf with the exact text 'Welcome, Arjun!'.",
            "Check that your quotes are double quotes (\" \").",
            "The semicolon is essential to complete the command."
          ],
          testCases: [
            { input: "", expected: "Welcome, Arjun!" }
          ]
        }
      ],
      progress: 50,
      completedChapters: 1,
      status: "active"
    },
    {
      id: 2,
      title: "Priya's Enchanted Vault",
      description: "Organize Priya's mystical artifacts in the Mystery Haveli's vault using variables.",
      difficulty: "Beginner",
      xp: 150,
      icon: "🎁",
      color: "from-yellow-600 to-red-600",
      skills: ["Variables", "Data Types"],
      story: `
        Priya, the keeper of the Mystery Haveli's vault, is overwhelmed! The vault is filled with enchanted artifacts, including 75 mystical gems and a sacred amulet marked 'P'. "I need to organize these treasures!" she exclaims. Your task is to use variables in C to catalog Priya's artifacts. Can you help her bring order to the vault and keep the Haveli's magic intact?
      `,
      chapters: [
        {
          title: "Chapter 1: Counting the Gems",
          content: `
            To organize Priya's 75 mystical gems, you'll use an integer variable. In C, variables store data like numbers. Try this:
            \`\`\`c
            int gems = 75;
            printf("Gems: %d", gems);
            \`\`\`
            The int type is for whole numbers, and %d in printf displays the number stored in gems. Make sure to declare the variable and print it correctly.
          `,
          task: "Create an integer variable to store 75 gems and display it.",
          solution: `int gems = 75;\nprintf("Gems: %d", gems);`,
          hints: [
            "Use int for whole numbers like 75.",
            "Assign the value with =.",
            "Use %d in printf to display the number."
          ],
          testCases: [
            { input: "", expected: "Gems: 75" }
          ]
        },
        {
          title: "Chapter 2: The Sacred Amulet",
          content: `
            Now, Priya needs to catalog a sacred amulet marked with the letter 'P'. Use a character variable:
            \`\`\`c
            char amulet = 'P';
            printf("Amulet: %c", amulet);
            \`\`\`
            The char type stores single characters in single quotes (' '), and %c in printf displays the character. Ensure proper syntax!
          `,
          task: "Create a char variable for the amulet 'P' and display it.",
          solution: `char amulet = 'P';\nprintf("Amulet: %c", amulet);`,
          hints: [
            "Use char for single letters like 'P'.",
            "Enclose the letter in single quotes (' ').",
            "Use %c in printf to show the character."
          ],
          testCases: [
            { input: "", expected: "Amulet: P" }
          ]
        },
        {
          title: "Chapter 3: Combining the Artifacts",
          content: `
            Priya wants to display both the gems and the amulet together. Combine the variables in one printf statement:
            \`\`\`c
            int gems = 75;
            char amulet = 'P';
            printf("Vault: %d gems, Amulet %c", gems, amulet);
            \`\`\`
            This shows both values in a single message. Use %d for the integer and %c for the character.
          `,
          task: "Display both 75 gems and amulet 'P' in one printf statement.",
          solution: `int gems = 75;\nchar amulet = 'P';\nprintf("Vault: %d gems, Amulet %c", gems, amulet);`,
          hints: [
            "Declare both variables before printing.",
            "Use %d for gems and %c for amulet in the same printf.",
            "Separate format specifiers with a comma in printf."
          ],
          testCases: [
            { input: "", expected: "Vault: 75 gems, Amulet P" }
          ]
        }
      ],
      progress: 33,
      completedChapters: 1,
      status: "active"
    }
  ];

  const quest = quests.find(q => q.id === questId) || quests[0];
  const currentChapter = quest.chapters[currentChapterIndex];

  useEffect(() => {
    setProgress(quest.progress);
    setCurrentChapterIndex(quest.completedChapters);
  }, [questId]);

  const validateCode = (input, solution) => {
    const normalizedInput = input.trim().replace(/\s+/g, ' ');
    const normalizedSolution = solution.trim().replace(/\s+/g, ' ');
    return normalizedInput === normalizedSolution;
  };

  const handleCodeSubmit = () => {
    if (validateCode(codeInput, currentChapter.solution)) {
      setOutput(currentChapter.testCases[0].expected);
      setIsCompleted(true);
      setProgress(prev => Math.min(prev + (100 / quest.chapters.length), 100));
      setAiSuggestion(`Amazing work, young detective! You've solved this chapter. ${currentChapterIndex + 1 < quest.chapters.length ? 'Ready for the next chapter?' : 'You\'ve completed the quest!'}`);
      if (currentChapterIndex + 1 < quest.chapters.length) {
        setTimeout(() => {
          setCurrentChapterIndex(prev => prev + 1);
          setIsCompleted(false);
          setCodeInput('');
          setOutput('');
          setAiSuggestion('');
        }, 2000);
      }
    } else {
      const errors = [
        "Hmm, the scroll's magic isn't responding. Check for typos in your code!",
        "Something's off in the syntax. Did you include the semicolon?",
        "The output doesn't match the mystery. Try again with the correct format!"
      ];
      setOutput(errors[Math.floor(Math.random() * errors.length)]);
      setAiSuggestion(currentChapter.hints[Math.floor(Math.random() * currentChapter.hints.length)]);
      setErrorLine(Math.floor(Math.random() * codeInput.split('\n').length) + 1);
    }
  };

  const handleSaveProgress = () => {
    // Simulate saving progress
    alert(`Progress saved for ${quest.title}!`);
  };

  const handleResetCode = () => {
    setCodeInput('');
    setOutput('');
    setAiSuggestion('Code reset! Start fresh and unravel the mystery.');
    setErrorLine(null);
  };

  const handlePreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      setIsCompleted(false);
      setCodeInput('');
      setOutput('');
      setAiSuggestion('Welcome back to the previous chapter! Continue your journey.');
      setErrorLine(null);
      setProgress(prev => Math.max(prev - (100 / quest.chapters.length), 0));
    }
  };

  const handleShowHints = () => {
    setShowHints(!showHints);
    if (!showHints) {
      setAiSuggestion("Here are some clues to guide you through the mystery!");
    }
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { user: true, text: chatInput }]);
      // Simulate AI response
      const aiResponses = [
        "Great question! Can you clarify what part of the code is puzzling you?",
        "Let's break it down. Try focusing on the printf syntax first!",
        "I'm here to help! Could you share what output you're seeing?"
      ];
      setTimeout(() => {
        setChatMessages(prev => [...prev, { user: false, text: aiResponses[Math.floor(Math.random() * aiResponses.length)] }]);
      }, 1000);
      setChatInput('');
    }
  };

  const handleBackToMap = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/quests');
    }
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
        <div
          className="mb-8"
        >
          <button
            onClick={handleBackToMap}
            className="flex items-center gap-2 text-yellow-200 hover:text-yellow-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Mystery Map
          </button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3 text-yellow-200">
                <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-blue-300" />
                {quest.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-300">{quest.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-800/50">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-200">{quest.xp} XP</span>
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 border border-yellow-800/50">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-blue-300" />
                  <span className="font-semibold text-yellow-200">{quest.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <Ghost className="w-6 h-6" />
            The Mystery Unfolds
          </h2>
          <p className="text-gray-300 leading-relaxed">{quest.story}</p>
        </div>

        {/* Chapter Content */}
        <div
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200">
            Chapter {currentChapterIndex + 1}: {currentChapter.title}
          </h2>
          <p className="text-gray-300 mb-4">{currentChapter.content}</p>
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="w-5 h-5 text-blue-300" />
            <span className="text-sm font-medium text-yellow-200">Task: {currentChapter.task}</span>
          </div>
          <AnimatePresence>
            {showHints && (
              <div
                className="mt-4 p-4 bg-gray-900 rounded-md"
              >
                <h3 className="text-lg font-semibold text-yellow-200 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Hints
                </h3>
                <ul className="list-disc list-inside text-gray-300">
                  {currentChapter.hints.map((hint, index) => (
                    <li key={index} className="text-sm">{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Code Editor */}
        <div
          className="bg-gray-900 rounded-2xl p-6 border border-yellow-800/50 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Code Journal
          </h2>
          <textarea
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            className="w-full h-48 sm:h-64 bg-gray-800 p-4 rounded-md text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-600"
            placeholder="Write your code here..."
          />
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={handlePreviousChapter}
              disabled={currentChapterIndex === 0}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                currentChapterIndex === 0 
                  ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-800/50 hover:bg-gray-700/50 text-yellow-200'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Previous Chapter
            </button>
            <button
              onClick={handleCodeSubmit}
              className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-yellow-200"
            >
              <Play className="w-5 h-5" />
              Run Code
            </button>
            <button
              onClick={handleSaveProgress}
              className="bg-gray-800/50 hover:bg-gray-700/50 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-yellow-200"
            >
              <Save className="w-5 h-5" />
              Save Progress
            </button>
            <button
              onClick={handleResetCode}
              className="bg-gray-800/50 hover:bg-gray-700/50 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-yellow-200"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Code
            </button>
            <button
              onClick={handleShowHints}
              className="bg-gray-800/50 hover:bg-gray-700/50 px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-yellow-200"
            >
              <HelpCircle className="w-5 h-5" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
          </div>
          {output && (
            <div className="mt-4 p-4 bg-gray-800 rounded-md">
              <h3 className="text-lg font-semibold text-yellow-200">Output:</h3>
              <p className={`text-${isCompleted ? 'green-400' : 'red-400'}`}>
                {output}
                {errorLine && !isCompleted && <span> (Possible error on line {errorLine})</span>}
              </p>
            </div>
          )}
        </div>

        {/* AI Mentor Chat */}
        <div
          className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-800/50 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-yellow-200 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            AI Mentor Chat
          </h2>
          <div className="h-48 sm:h-64 overflow-y-auto bg-gray-900 p-4 rounded-md mb-4">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-md ${
                  msg.user ? 'bg-blue-600/20 text-blue-300 ml-auto' : 'bg-yellow-600/20 text-yellow-200'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
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
        </div>

        {/* AI Mentor Suggestion */}
        <div
          className="bg-gradient-to-r from-blue-600/20 to-yellow-600/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/30 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-yellow-600 flex items-center justify-center text-2xl">
              🦁
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-yellow-200">AI Mentor Tip</h3>
              <p className="text-gray-300">{aiSuggestion || "Type the code exactly as shown in the example. I'm here to guide you through the mystery!"}</p>
            </div>
          </div>
        </div>

        {/* Progress and Completion */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Quest Progress</span>
            <span className="text-sm font-medium text-yellow-200">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${quest.color} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-4 text-center text-gray-300">
            Chapter {currentChapterIndex + 1} of {quest.chapters.length}
          </div>
          {isCompleted && (
            <div
              className="mt-4 p-4 bg-green-600/20 rounded-md text-center"
            >
              <h3 className="text-lg font-semibold text-green-400 flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Chapter Complete!
              </h3>
              <p className="text-gray-300">You've earned {Math.round(quest.xp / quest.chapters.length)} XP! {currentChapterIndex + 1 < quest.chapters.length ? 'Ready for the next chapter?' : 'Quest completed!'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

QuestDetail.propTypes = {
  questId: PropTypes.number.isRequired,
  onBack: PropTypes.func
};

export default QuestDetail;