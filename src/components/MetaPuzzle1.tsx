'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Eye, Search } from 'lucide-react';

interface MetaPuzzle1Props {
  gameState: any;
  setGameState: (state: any) => void;
  onComplete: () => void;
}

export default function MetaPuzzle1({ gameState, setGameState, onComplete }: MetaPuzzle1Props) {
  const [inputValue, setInputValue] = useState('');
  const [hasFoundSecret, setHasFoundSecret] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
   
    const handleContextMenu = () => {
      setGameState((prev: any) => ({ ...prev, hasInspected: true }));
      console.log('🔍 Good! You\'re thinking like a hacker. Now inspect the secret element...');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        setGameState((prev: any) => ({ ...prev, hasInspected: true }));
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setGameState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.toUpperCase() === 'REALITY_IS_CODE') {
      setShowSuccess(true);
      setHasFoundSecret(true);
      setShowError(false);
      console.log('%c◉ CORRECT! First layer decoded...', 'color: #10b981; font-size: 14px;');
      console.log('%c◦ +100 points awarded', 'color: #22d3ee; font-size: 12px;');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      console.log('%c◦ Incorrect cipher. The truth remains hidden...', 'color: #ef4444; font-size: 12px;');
    }
  };

  return (
    <>
 
      {showError && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-9999 bg-red-700/90 text-white font-bold px-8 py-4 rounded-xl shadow-2xl text-lg"
        >
          Wrong answer !  Try again
        </motion.div>
      )}
      <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        
      
      </motion.div>

    
      <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 text-green-400 mb-6">
            <Search className="w-6 h-6" />
            <span className="text-lg">Seek what is hidden</span>
          </div>
          
          {gameState.hasInspected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-cyan-400 text-center p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30"
            >
              The deeper layers are now accessible. Continue your search.
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <label className="block text-gray-300 text-lg mb-4">
                Enter the cipher:
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full max-w-md mx-auto bg-black/50 border border-green-500/50 rounded-lg px-6 py-3 text-green-400 focus:border-green-400 focus:outline-none font-mono text-lg text-center"
                placeholder="_ _ _ _ _ _ _   _ _   _ _ _ _"
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
          <h4 className="text-2xl font-bold text-green-400">LEVEL COMPLETE!</h4>
          <p className="text-green-300">You've uncovered the first layer of reality...</p>
        </motion.div>
      )}

    {/* //Here is the Secret .You found it */}
      <div className="hidden" id="puzzle1-secret" data-secret="REALITY_IS_CODE">
        
      </div>

     
      

      
    </div>
    </>
  );
}