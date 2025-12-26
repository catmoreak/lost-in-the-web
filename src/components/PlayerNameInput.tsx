'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Play } from 'lucide-react';

interface PlayerNameInputProps {
  onNameSubmit: (name: string) => void;
}

export default function PlayerNameInput({ onNameSubmit }: PlayerNameInputProps) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placeholder, setPlaceholder] = useState("Digital Ghost");
  const [mounted, setMounted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim().length < 2) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      onNameSubmit(playerName.trim());
    }, 500);
  };

  const funnyPlaceholders = [
    "Neo's Cooler Sibling",
    "The Matrix Debugger", 
    "Code Whisperer",
    "Digital Ghost",
    "Reality Hacker",
    "Glitch Master",
    "Binary Wizard",
    "Console Ninja"
  ];

  useEffect(() => {
    setMounted(true);
    
    const randomIndex = Math.floor(Math.random() * funnyPlaceholders.length);
    setPlaceholder(funnyPlaceholders[randomIndex] || "Digital Ghost");
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-r from-black via-gray-900 to-black text-green-400 flex items-center justify-center relative overflow-hidden">
      
      
      <div className="absolute inset-0">
        <div className="particles-bg"></div>
      </div>
      
      
      <div className="fixed inset-0 opacity-5">
        <div className="matrix-bg"></div>
      </div>
      
      
      {mounted && (
        <div className="absolute inset-0 opacity-10">
          <div className="text-cyan-400 text-xs font-mono leading-none animate-pulse">
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i} className="whitespace-nowrap overflow-hidden">
                {Array.from({ length: 100 }, (_, j) => 
                  Math.random() > 0.7 ? String.fromCharCode(33 + Math.random() * 94) : ' '
                ).join('')}
              </div>
            ))}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-md w-full mx-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-green-500/20 to-green-500/20 rounded-full border-2 border-green-400 mb-4">
            <User className="w-10 h-10 text-green-400" />
          </div>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-4xl font-bold mb-2 text-transparent bg-linear-to-r from-green-400 via-green-400 to-green-400 bg-clip-text font-mono glitch-text"
        >
          Enter the Matrix
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-green-400 mb-8 text-lg"
        >
          Choose your digital identity, <span className="text-green-400 font-medium">brave soul</span>
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="relative">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder={placeholder}
              maxLength={20}
              className="w-full px-4 py-3 bg-black/70 border-2 border-green-500/30 rounded-lg 
                       text-green-400 placeholder-green-400/50 focus:border-green-400 
                       focus:outline-none focus:ring-2 focus:ring-green-400/20 
                       transition-all duration-300 text-center text-lg font-mono
                       hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/10"
              disabled={isSubmitting}
              autoFocus
            />
           
          </div>

          <motion.button
            type="submit"
            disabled={playerName.trim().length < 2 || isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            className="w-full px-6 py-3 bg-linear-to-r from-green-600 to-green-600 
                     hover:from-green-500 hover:to-green-500 disabled:from-gray-600 disabled:to-gray-700
                     disabled:cursor-not-allowed text-black font-bold text-lg rounded-lg 
                     transition-all duration-300 flex items-center justify-center space-x-2 
                     border-2 border-green-400 hover:shadow-xl hover:shadow-green-500/25
                     relative overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>Initializing...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Begin Reality Hack</span>
              </>
            )}
          </motion.button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-sm text-green-400"
        >
          <p>Your name will appear on the global leaderboard</p>
          <p className="text-xs mt-1 text-green-400">Choose wisely... or choose funny 😉</p>
        </motion.div>
      </motion.div>
    </div>
  );
}