import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Play, Lightbulb, Maximize2, Minimize2, Save, Download, 
  Settings, Copy, RotateCcw, Eye, Code, Monitor, Smartphone,
  Zap, BookOpen, Target, Trophy, Sparkles
} from 'lucide-react';

const languages = [
  { id: 'html', name: 'HTML', icon: '🌐', color: '#e34c26' },
  { id: 'css', name: 'CSS', icon: '🎨', color: '#264de4' },
  { id: 'javascript', name: 'JavaScript', icon: '⚡', color: '#f7df1e' }
];

const themes = [
  { id: 'dark', name: 'Dark', bg: '#1a1a1a', text: '#ffffff' },
  { id: 'light', name: 'Light', bg: '#ffffff', text: '#1a1a1a' },
  { id: 'ocean', name: 'Ocean', bg: '#0f1419', text: '#e6f1ff' },
  { id: 'forest', name: 'Forest', bg: '#0d1117', text: '#7ee787' }
];

const CodeEditor = () => {
  const [selectedLang, setSelectedLang] = useState('html');
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [codeMap, setCodeMap] = useState({
    html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>0xKid - Playground</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        margin: 0;
        padding: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
      .container {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        margin-bottom: 10px;
      }
      .highlight {
        background-color: #667eea;
        color: white;
        padding: 10px 15px;
        margin-top: 15px;
        border-radius: 5px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to 0xKid!</h1>
      <p>Your journey into coding starts here.</p>
      <div class="highlight">Start coding now!</div>
    </div>
    <script>
      console.log("Welcome to 0xKid Playground!");
    </script>
  </body>
  </html>`,
    css: `/* You can write custom CSS here if needed */`,
    javascript: `// You can write custom JS here if needed`
  });
  
  
  const [outputSrc, setOutputSrc] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop, tablet, mobile
  const [autoRun, setAutoRun] = useState(true);
  const [showConsole, setShowConsole] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  
  const textareaRef = useRef(null);
  const iframeRef = useRef(null);

  // Auto-run code when autoRun is enabled
  useEffect(() => {
    if (autoRun && codeMap[selectedLang]) {
      const timeoutId = setTimeout(runCode, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [codeMap, selectedLang, autoRun]);

  const handleCodeChange = (e) => {
    setCodeMap({ ...codeMap, [selectedLang]: e.target.value });
  };

  const runCode = () => {
    setIsRunning(true);
    setConsoleOutput([]);

    const script = `
      <script>
        (function () {
          const oldLog = console.log;
          const oldError = console.error;
          const oldWarn = console.warn;
          const oldInfo = console.info;
          
          function sendToParent(type, ...args) {
            const message = {
              type: type,
              content: args.join(" "),
              timestamp: new Date().toISOString()
            };
            window.parent.postMessage(message, '*');
          }

          console.log = function (...args) {
            sendToParent('log', ...args);
            oldLog.apply(console, args);
          };

          console.error = function (...args) {
            sendToParent('error', ...args);
            oldError.apply(console, args);
          };

          console.warn = function (...args) {
            sendToParent('warn', ...args);
            oldWarn.apply(console, args);
          };

          console.info = function (...args) {
            sendToParent('info', ...args);
            oldInfo.apply(console, args);
          };

          window.onerror = function (msg, src, line, col, err) {
            sendToParent('error', 'Error: ' + msg + ' at line ' + line);
          };
        })();
      </script>
    `;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            ${codeMap.css}
            body { margin: 0; padding: 0; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          ${codeMap.html}
          ${script}
          <script>
            try {
              ${codeMap.javascript}
            } catch (e) {
              window.parent.postMessage({
                type: 'error',
                content: 'Runtime Error: ' + e.message,
                timestamp: new Date().toISOString()
              }, '*');
            }
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'text/html' });
    const src = URL.createObjectURL(blob);
    setOutputSrc(src);
    setIsRunning(false);
  };

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type) {
        setConsoleOutput(prev => [...prev, event.data]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const getAiHelp = () => {
    const suggestions = [
      {
        title: "🎨 Style Enhancement",
        content: "Try adding CSS animations! Use @keyframes for smooth transitions.",
        code: "@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n.element {\n  animation: fadeIn 1s ease-in;\n}"
      },
      {
        title: "⚡ JavaScript Magic",
        content: "Add event listeners to make your page interactive!",
        code: "document.addEventListener('click', function() {\n  console.log('Button clicked!');\n});"
      },
      {
        title: "📱 Responsive Design",
        content: "Make your design mobile-friendly with media queries.",
        code: "@media (max-width: 768px) {\n  .container {\n    padding: 20px;\n    font-size: 16px;\n  }\n}"
      },
      {
        title: "🎯 Modern Layout",
        content: "Use CSS Grid or Flexbox for modern layouts!",
        code: ".container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}"
      },
      {
        title: "✨ Interactive Elements",
        content: "Add hover effects and transitions for better UX.",
        code: ".button {\n  transition: all 0.3s ease;\n}\n.button:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 5px 15px rgba(0,0,0,0.2);\n}"
      }
    ];
    
    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    setAiSuggestion(suggestion);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeMap[selectedLang]);
  };

  const downloadCode = () => {
    const blob = new Blob([codeMap[selectedLang]], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${selectedLang}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveProject = () => {
    if (!projectName.trim()) return;
    
    setShowSaveModal(false);
    setProjectName('');
  };

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  const getThemeColors = () => {
    const theme = themes.find(t => t.id === selectedTheme);
    return theme || themes[0];
  };

  const themeColors = getThemeColors();

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'w-full max-w-7xl mx-auto my-4 sm:my-8'} bg-gray-900 rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700 shadow-2xl`}>
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-gray-700">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Window Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"></div>
          </div>
          
          {/* Language Selector */}
          <div className="flex items-center gap-1 sm:gap-2">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 text-xs sm:text-sm ${
                  selectedLang === lang.id
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                style={{ borderColor: selectedLang === lang.id ? lang.color : 'transparent' }}
              >
                <span className="text-sm sm:text-lg">{lang.icon}</span>
                <span className="font-medium hidden sm:inline">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {/* AI Help */}
          <button
            onClick={getAiHelp}
            className="p-1.5 sm:p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors group"
            title="Get AI Help"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 sm:p-2 text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {/* Copy Code */}
          <button
            onClick={copyCode}
            className="p-1.5 sm:p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
            title="Copy Code"
          >
            <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {/* Download */}
          <button
            onClick={downloadCode}
            className="p-1.5 sm:p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
            title="Download Code"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {/* Save Project */}
          <button
            onClick={() => setShowSaveModal(true)}
            className="p-1.5 sm:p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
            title="Save Project"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {/* Run Code */}
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-medium transition-all duration-200 disabled:opacity-50 shadow-lg text-xs sm:text-sm"
          >
            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{isRunning ? 'Running...' : 'Run Code'}</span>
            <span className="sm:hidden">{isRunning ? '...' : 'Run'}</span>
          </button>
          
          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 sm:p-2 text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 border-b border-gray-700 p-3 sm:p-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Theme Selection */}
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">Theme</label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full bg-gray-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 rounded-md outline-none"
                >
                  {themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                      {theme.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Preview Mode */}
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">Preview Mode</label>
                <div className="flex gap-1 sm:gap-2">
                  <button
                    onClick={() => setPreviewMode('desktop')}
                    className={`p-1.5 sm:p-2 rounded ${previewMode === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    title="Desktop"
                  >
                    <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('tablet')}
                    className={`p-1.5 sm:p-2 rounded ${previewMode === 'tablet' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    title="Tablet"
                  >
                    <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setPreviewMode('mobile')}
                    className={`p-1.5 sm:p-2 rounded ${previewMode === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                    title="Mobile"
                  >
                    <Smartphone className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              
              {/* Options */}
              <div>
                <label className="text-white text-xs sm:text-sm font-medium mb-1 sm:mb-2 block">Options</label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={autoRun}
                      onChange={(e) => setAutoRun(e.target.checked)}
                      className="rounded"
                    />
                    Auto Run
                  </label>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={showConsole}
                      onChange={(e) => setShowConsole(e.target.checked)}
                      className="rounded"
                    />
                    Console
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Code Editor */}
        <div className="border-r border-gray-700 flex flex-col">
          <div className="p-3 sm:p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-white font-medium flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
              <Code className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Code Editor - {languages.find(l => l.id === selectedLang)?.name}</span>
              <span className="sm:hidden">{languages.find(l => l.id === selectedLang)?.name}</span>
            </h3>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setLineNumbers(!lineNumbers)}
                className={`p-1 rounded text-xs ${lineNumbers ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                LN
              </button>
              <button
                onClick={() => setWordWrap(!wordWrap)}
                className={`p-1 rounded text-xs ${wordWrap ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                WW
              </button>
            </div>
          </div>
          
          <div className="relative flex-1">
            {lineNumbers && (
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 text-gray-500 text-xs font-mono p-2 border-r border-gray-700 overflow-hidden">
                {codeMap[selectedLang].split('\n').map((_, i) => (
                  <div key={i} className="text-right">{i + 1}</div>
                ))}
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={codeMap[selectedLang]}
              onChange={handleCodeChange}
              className={`w-full h-full bg-gray-900 text-green-400 font-mono text-sm p-4 resize-none focus:outline-none ${
                lineNumbers ? 'pl-16' : ''
              } ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
              placeholder={`Write your ${selectedLang} code here...`}
              style={{
                backgroundColor: themeColors.bg,
                color: themeColors.text
              }}
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="flex flex-col">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Live Preview
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowConsole(!showConsole)}
                className={`p-2 rounded ${showConsole ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                title="Toggle Console"
              >
                <Code className="w-4 h-4" />
              </button>
              <button
                onClick={clearConsole}
                className="p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                title="Clear Console"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            {/* Preview Container with responsive sizing */}
            <div className={`h-full ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : previewMode === 'tablet' ? 'max-w-2xl mx-auto' : 'w-full'}`}>
              <iframe
                ref={iframeRef}
                title="output"
                src={outputSrc}
                className="w-full h-full bg-white border-0"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
            
            {/* Preview Mode Indicator */}
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-75">
              {previewMode === 'mobile' ? '📱 Mobile' : previewMode === 'tablet' ? '📱 Tablet' : '🖥️ Desktop'}
            </div>
          </div>
        </div>
      </div>

      {/* Console Output */}
      <AnimatePresence>
        {showConsole && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-800 border-t border-gray-700 max-h-64 overflow-hidden"
          >
            <div className="p-3 bg-gray-900 border-b border-gray-700 flex items-center justify-between">
              <h4 className="text-white font-medium flex items-center gap-2">
                <Code className="w-4 h-4" />
                Console Output
              </h4>
              <button
                onClick={clearConsole}
                className="text-gray-400 hover:text-white text-sm"
              >
                Clear
              </button>
            </div>
            <div className="p-3 max-h-48 overflow-y-auto font-mono text-sm">
              {consoleOutput.length === 0 ? (
                <div className="text-gray-500 italic">No console output yet. Run your code to see results!</div>
              ) : (
                consoleOutput.map((output, index) => (
                  <div
                    key={index}
                    className={`mb-1 ${
                      output.type === 'error' ? 'text-red-400' :
                      output.type === 'warn' ? 'text-yellow-400' :
                      output.type === 'info' ? 'text-blue-400' :
                      'text-green-400'
                    }`}
                  >
                    <span className="text-gray-500">[{new Date(output.timestamp).toLocaleTimeString()}]</span> {output.content}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Suggestion */}
      <AnimatePresence>
        {aiSuggestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-t border-purple-500/30 p-4"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg">
                🤖
              </div>
              <div className="flex-1">
                <div className="text-purple-300 font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Mentor Zara
                </div>
                <div className="text-gray-300 text-sm mt-1">{aiSuggestion.content}</div>
                {aiSuggestion.code && (
                  <div className="mt-2 p-3 bg-gray-800 rounded-lg">
                    <div className="text-gray-400 text-xs mb-1">💡 Try this code:</div>
                    <pre className="text-green-400 text-xs overflow-x-auto">{aiSuggestion.code}</pre>
                  </div>
                )}
              </div>
              <button
                onClick={() => setAiSuggestion('')}
                className="text-gray-400 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Project Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 p-6 rounded-lg w-96"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-white font-medium mb-4">Save Project</h3>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name..."
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md outline-none mb-4"
                onKeyPress={(e) => e.key === 'Enter' && saveProject()}
              />
              <div className="flex gap-2">
                <button
                  onClick={saveProject}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CodeEditor;