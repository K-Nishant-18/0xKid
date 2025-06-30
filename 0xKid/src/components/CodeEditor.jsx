import React, { useState } from 'react';
import {
  Play, Lightbulb, Maximize2, Minimize2, Copy, Download, RotateCcw, Sun, Moon, Monitor, Smartphone, Code
} from 'lucide-react';

const languages = ['html', 'css', 'javascript'];

const defaultCode = {
  html: '<!DOCTYPE html>\n<html>\n  <head><title>Live Preview</title></head>\n  <body>\n    <h1>Hello, Welcome to 0xKid.</h1>\n <h3>Try this live code editor.</h3>\n  </body>\n</html>',
  css: 'body { font-family: sans-serif; background-color: #111; color: white; }',
  javascript: "console.log('Hello from JavaScript!');"
};

const CodeEditor = () => {
  const [selectedLang, setSelectedLang] = useState('html');
  const [codeMap, setCodeMap] = useState({ ...defaultCode });
  const [outputSrc, setOutputSrc] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [theme, setTheme] = useState('dark');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showConsole, setShowConsole] = useState(true);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);

  const handleCodeChange = (e) => {
    setCodeMap({ ...codeMap, [selectedLang]: e.target.value });
  };

  const runCode = () => {
    setIsRunning(true);

    const script = `
      <script>
        (function () {
          const oldLog = console.log;
          const oldError = console.error;
          const outputEl = document.getElementById('console-output');

          console.log = function (...args) {
            const msg = args.join(" ");
            outputEl.innerHTML += '<div class="console-line">' + msg + '</div>';
            oldLog.apply(console, args);
          };

          console.error = function (...args) {
            const msg = args.join(" ");
            outputEl.innerHTML += '<div class="console-line error">' + msg + '</div>';
            oldError.apply(console, args);
          };

          window.onerror = function (msg, src, line, col, err) {
            outputEl.innerHTML += '<div class="console-line error">Error: ' + msg + '</div>';
          };
        })();
      </script>
    `;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <style>
            ${codeMap.css}
            .console-container {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              background: #1a1a1a;
              color: #e0e0e0;
              font-family: 'Fira Code', monospace, sans-serif;
              border-top: 1px solid #333;
              z-index: 1000;
              max-height: 40vh;
              overflow-y: auto;
            }
            .console-header {
              padding: 8px 16px;
              background: #222;
              color: #fff;
              font-weight: bold;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #333;
            }
            .console-output {
              padding: 12px 16px;
              line-height: 1.5;
            }
            .console-line {
              margin: 4px 0;
              padding: 2px 0;
              word-break: break-word;
            }
            .console-line.error {
              color: #ff6b6b;
            }
            .preview-container {
              padding-bottom: 40vh;
            }
            .clear-console {
              background: none;
              border: none;
              color: #aaa;
              cursor: pointer;
              font-size: 12px;
            }
            .clear-console:hover {
              color: #fff;
            }
          </style>
        </head>
        <body>
          <div class="preview-container">
            ${codeMap.html}
          </div>

          ${showConsole ? `<div class="console-container"><div class="console-header"><span>Console</span><button class="clear-console" onclick="document.getElementById('console-output').innerHTML = ''">Clear</button></div><div id="console-output" class="console-output"></div></div>` : ''}

          ${script}
          <script>
            try {
              ${codeMap.javascript}
            } catch (e) {
              const el = document.getElementById('console-output');
              if (el) el.innerHTML += '<div class="console-line error">Runtime Error: ' + e.message + '</div>';
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

  const getAiHelp = () => {
    const suggestions = [
      "Try centering your text using CSS!",
      "Use functions to avoid repetition in JS.",
      "Your HTML structure looks clean! Add some interaction with JS.",
      "Consider adding media queries for responsiveness.",
      "Great! Now try adding a button and handle its click."
    ];
    setAiSuggestion(suggestions[Math.floor(Math.random() * suggestions.length)]);
  };

  // --- New: Copy, Download, Reset ---
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
  const resetCode = () => {
    setCodeMap({ ...codeMap, [selectedLang]: defaultCode[selectedLang] });
  };

  // --- New: Theme Switcher ---
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`rounded-2xl overflow-hidden border border-gray-700 ${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none' : 'w-full max-w-4xl mx-auto my-8'} ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className={`px-6 py-4 flex items-center justify-between border-b border-gray-700 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className={`text-sm px-3 py-1 rounded-md outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={getAiHelp}
            className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-lg transition-colors"
            title="Get AI Help"
          >
            <Lightbulb className="w-5 h-5" />
          </button>
          <button
            onClick={copyCode}
            className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
            title="Copy Code"
          >
            <Copy className="w-5 h-5" />
          </button>
          <button
            onClick={downloadCode}
            className="p-2 text-green-400 hover:bg-green-500/20 rounded-lg transition-colors"
            title="Download Code"
          >
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={resetCode}
            className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run'}
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-68px)]">
        <div className="border-r border-gray-700 flex flex-col">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-white font-medium">Code - {selectedLang.toUpperCase()}</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => setLineNumbers(!lineNumbers)} className={`p-1 rounded text-xs ${lineNumbers ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>LN</button>
              <button onClick={() => setWordWrap(!wordWrap)} className={`p-1 rounded text-xs ${wordWrap ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}>WW</button>
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
              value={codeMap[selectedLang]}
              onChange={handleCodeChange}
              className={`w-full h-full font-mono text-sm p-4 resize-none focus:outline-none ${theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-white text-gray-800'} ${lineNumbers ? 'pl-16' : ''} ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
              placeholder={`Write your ${selectedLang} code here...`}
            />
          </div>
        </div>

        {/* Live Output */}
        <div className="flex flex-col">
          <div className="p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-white font-medium">Live Preview</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowConsole(!showConsole)} className={`p-2 rounded ${showConsole ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`} title="Toggle Console">
                <Code className="w-4 h-4" />
              </button>
              <button onClick={runCode} className="p-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600" title="Refresh Preview">
                <RotateCcw className="w-4 h-4" />
              </button>
              <button onClick={() => setPreviewMode('desktop')} className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`} title="Desktop Preview">
                <Monitor className="w-4 h-4" />
              </button>
              <button onClick={() => setPreviewMode('tablet')} className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`} title="Tablet Preview">
                <Code className="w-4 h-4" />
              </button>
              <button onClick={() => setPreviewMode('mobile')} className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`} title="Mobile Preview">
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className={`h-full ${previewMode === 'mobile' ? 'max-w-xs mx-auto' : previewMode === 'tablet' ? 'max-w-2xl mx-auto' : 'w-full'}`}>
              <iframe
                title="output"
                src={outputSrc}
                className="w-full h-full bg-white border-0"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
            <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-75">
              {previewMode === 'mobile' ? '📱 Mobile' : previewMode === 'tablet' ? '📱 Tablet' : '🖥️ Desktop'}
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestion */}
      {aiSuggestion && (
        <div
          className="bg-purple-500/20 border-t border-purple-500/30 p-4 "
        >
          <div className="flex items-center gap-3 z-1000">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
              🤖
            </div>
            <div>
              <div className="text-purple-300 font-medium">AI Mentor Zara</div>
              <div className="text-gray-300 text-sm">{aiSuggestion}</div>
            </div>
            <button
              onClick={() => setAiSuggestion('')}
              className="ml-auto text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;