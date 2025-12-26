'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, Code } from 'lucide-react';

interface MetaPuzzle5Props {
  gameState: any;
  setGameState: (state: any) => void;
  onComplete: () => void;
}

export default function MetaPuzzle5({ gameState, setGameState, onComplete }: MetaPuzzle5Props) {
  const [inputValue, setInputValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [sourceViewed, setSourceViewed] = useState(false);

  useEffect(() => {
    console.log('%c📄 PUZZLE 5: The Hidden Source', 'color: #ff6600; font-size: 16px; font-weight: bold;');
    console.log('Sometimes the truth is hidden in plain sight, but only visible to those who know where to look...');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.toUpperCase() === 'SOURCE_CODE_ILLUSION') {
      setShowSuccess(true);
      setShowError(false);
      console.log('%c◉ SOURCE DISCOVERED! You\'ve peered into the code that builds reality...', 'color: #10b981; font-size: 14px;');
      console.log('%c◦ +100 points awarded', 'color: #22d3ee; font-size: 12px;');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      console.log('%c◦ Incorrect code. The source remains hidden...', 'color: #ef4444; font-size: 12px;');
    }
  };

  return (
    <div className="space-y-8">
      {showError && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-9999 bg-red-700/90 text-white font-bold px-8 py-4 rounded-xl shadow-2xl text-lg"
        >
          Wrong code! Try again
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-green-400 mb-4">META PUZZLE 5</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          The final frontier of digital exploration. What you see on the surface is just the beginning. 
          The real secrets are written in the language that creates everything.
        </p>
      </motion.div>

      <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 text-green-400 mb-6">
            <FileText className="w-6 h-6" />
            <span className="text-lg">View the Source of Reality</span>
          </div>
          
          <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6 text-center">
            <div className="text-cyan-400 font-mono text-lg mb-2">HINT:</div>
            <div className="text-cyan-300 text-lg">
              Press <kbd className="bg-cyan-900/50 px-2 py-1 rounded text-cyan-200">Ctrl+U</kbd> (or <kbd className="bg-cyan-900/50 px-2 py-1 rounded text-cyan-200">Cmd+U</kbd> on Mac) to view the page source
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <label className="block text-gray-300 text-lg mb-4">
                Enter the secret found in the source:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full max-w-md mx-auto bg-black/50 border border-green-500/50 rounded-lg px-6 py-3 text-green-400 focus:border-green-400 focus:outline-none font-mono text-lg text-center"
                placeholder="_ _ _ _ _ _   _ _ _ _   _ _ _ _ _ _ _ _"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h4 className="text-2xl font-bold text-green-400">SOURCE MASTERED!</h4>
          <p className="text-green-300">You've uncovered the code behind the illusion...</p>
        </motion.div>
      )}


      <div className="hidden" id="puzzle5-secret" data-secret="SOURCE_CODE_ILLUSION"></div>
    </div>
  );
}