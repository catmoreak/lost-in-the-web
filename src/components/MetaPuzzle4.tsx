'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Brain } from 'lucide-react';

interface MetaPuzzle4Props {
  gameState: any;
  setGameState: (state: any) => void;
  onComplete: () => void;
}

export default function MetaPuzzle4({ gameState, setGameState, onComplete }: MetaPuzzle4Props) {
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    console.log('%c🧠 PUZZLE 4: The Mind Bender', 'color: #ff6600; font-size: 16px; font-weight: bold;');
    console.log('Answer the riddles to proceed...');
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question1.toLowerCase() === 'keyboard' && question2.toLowerCase() === 'echo') {
      setShowSuccess(true);
      setShowError(false);
      console.log('%c◉ RIDDLES SOLVED! Your mind is as sharp as a blade...', 'color: #10b981; font-size: 14px;');
      console.log('%c◦ +100 points awarded', 'color: #22d3ee; font-size: 12px;');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      console.log('%c◦ Incorrect answers. The riddles remain unsolved...', 'color: #ef4444; font-size: 12px;');
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
          Wrong answers! Try again
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-green-400 mb-4">META PUZZLE 4</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          The final test of wit. Answer these two riddles to escape the digital labyrinth.
        </p>
      </motion.div>

      <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 text-green-400 mb-6">
            <Brain className="w-6 h-6" />
            <span className="text-lg">Solve the Riddles</span>
          </div>

          <div className="space-y-4">
            <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6">
              <div className="text-cyan-400 font-mono text-lg mb-2">RIDDLE 1:</div>
              <div className="text-cyan-300 text-lg">
                "I have keys but open no locks. I have space but no room. You can enter, but you can't go outside. What am I?"
              </div>
            </div>

            <div className="bg-black/50 border border-cyan-500/30 rounded-lg p-6">
              <div className="text-cyan-400 font-mono text-lg mb-2">RIDDLE 2:</div>
              <div className="text-cyan-300 text-lg">
                "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?"
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-lg mb-4">
                  Answer to Riddle 1:
                </label>
                <input
                  type="text"
                  value={question1}
                  onChange={(e) => setQuestion1(e.target.value)}
                  className="w-full bg-black/50 border border-green-500/50 rounded-lg px-6 py-3 text-green-400 focus:border-green-400 focus:outline-none font-mono text-lg text-center"
                  placeholder="Your answer"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-lg mb-4">
                  Answer to Riddle 2:
                </label>
                <input
                  type="text"
                  value={question2}
                  onChange={(e) => setQuestion2(e.target.value)}
                  className="w-full bg-black/50 border border-green-500/50 rounded-lg px-6 py-3 text-green-400 focus:border-green-400 focus:outline-none font-mono text-lg text-center"
                  placeholder="Your answer"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Submit Answers
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
          <h4 className="text-2xl font-bold text-green-400">RIDDLES SOLVED!</h4>
          <p className="text-green-300">You have conquered the labyrinth of the mind!</p>
        </motion.div>
      )}
    </div>
  );
}