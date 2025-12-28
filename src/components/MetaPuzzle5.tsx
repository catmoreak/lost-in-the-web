'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface MetaPuzzle5Props {
  gameState: any;
  setGameState: (state: any) => void;
  onComplete: () => void;
}

export default function MetaPuzzle5({ gameState, setGameState, onComplete }: MetaPuzzle5Props) {
  const [inputValue, setInputValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    console.log('%c� CTF CHALLENGE: Digital Forensics', 'color: #ff6600; font-size: 16px; font-weight: bold;');
    console.log('%cFlag format: LOST{...}', 'color: #ffaa00; font-size: 14px;');
    console.log('%c💡 Hint: Check browser cookies AND console for encoded data...', 'color: #00aaff; font-size: 12px;');
    
    
    document.cookie = "ctf_flag=RkxBRzoge0RJR0lUQUxfTUFUUklYX0NPREV9; path=/; max-age=3600";
    
    
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.toUpperCase() === 'LOST{DIGITAL_MATRIX_CODE}') {
      setShowSuccess(true);
      setShowError(false);
      
      
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      console.log('%c◦ Invalid flag format. Try again...', 'color: #ef4444; font-size: 12px;');
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
        <h2 className="text-3xl font-bold text-green-400 mb-4">CTF CHALLENGE 5</h2>
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          You like cookies 🍪
        </p>
      </motion.div>

      <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🍪</div>
            <div className="text-cyan-300 text-lg">
              Find the cookie, decode the secret
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full max-w-md mx-auto bg-black/50 border border-green-500/50 rounded-lg px-6 py-3 text-green-400 focus:border-green-400 focus:outline-none font-mono text-lg text-center"
                placeholder="LOST{...}"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Submit Flag
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
          <h4 className="text-2xl font-bold text-green-400">FLAG CAPTURED!</h4>
          <p className="text-green-300">You've successfully completed the cybersecurity challenge...</p>
        </motion.div>
      )}



    </div>
  );
}