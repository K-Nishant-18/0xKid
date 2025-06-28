import React from 'react';

const GamifiedLevel = ({ progress, setProgress, level, setLevel, setMessage, advanceProgress }) => {
  return (
    <div className="bg-purple-800/20 p-4 rounded-lg text-white">
      <h4 className="text-lg font-bold mb-2">Level Progress</h4>
      <div className="w-full bg-white/10 rounded-full h-4 mb-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mb-2">Current Level: {level}</p>
      <p className="text-sm text-yellow-400 mb-2">{progress === 100 ? 'You’ve mastered this track!' : `Progress: ${progress}%`}</p>
      <button
        onClick={advanceProgress}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm"
      >
        Simulate Progress
      </button>
    </div>
  );
};

export default GamifiedLevel;
