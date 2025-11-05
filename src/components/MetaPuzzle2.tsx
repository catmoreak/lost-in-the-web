'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Palette, Code } from 'lucide-react';

interface MetaPuzzle2Props {
  gameState: any;
  setGameState: (state: any) => void;
  onComplete: () => void;
}

const SECRET_CODE = 'CSS_REALITY_HACKER';
const SUCCESS_DELAY = 2000;
const ERROR_DISPLAY_TIME = 2000;
const CSS_REVEAL_DELAY = 1000;

const hiddenBoxStyles = {
  display: 'none',
  background: 'linear-gradient(45deg, #00ff00, #00ffff)',
  color: '#000',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center' as const,
  fontWeight: 'bold',
};
const hiddenBoxVisibleStyles = {
  display : 'block',
  background : 'linear-gradient(45deg, #00ff00, #00ffff)',
color : '#000',
  padding: '20px',
  borderRadius: '10px',

  textAlign: 'center' as const,
  fontWeight: 'bold',

}
const errorBoxStyles = {
  position : 'fixed' as const,
  top : '20 px',
  left : '50%',
  transform : 'translateX(-50%)',
  backgroundColor : 'rgba(255, 0, 0, 0.9)',
  color : '#fff',
  fontWeight : 'bold' as const,
  padding : '16 px 32 px',
  borderRadius : '12 px',
  zIndex : 9999,
  webKitURL : 'none',

}

export default function MetaPuzzle2({ gameState, setGameState, onComplete }: MetaPuzzle2Props) {
  const [puzzleState, setPuzzleState] = useState({
    hiddenElementRevealed: false,
    cssModified: false,
    showSuccess: false,
    inputValue: '',
    showError: false,
  });

  const updatePuzzleState = useCallback((updates: Partial<typeof puzzleState>) => {
    setPuzzleState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleSuccess = useCallback(() => {
    updatePuzzleState({ showSuccess: true });
    setTimeout(onComplete, SUCCESS_DELAY);
  }, [onComplete, updatePuzzleState]);

  useEffect(() => {
    const hiddenBox = document.getElementById('hidden-box');
    if (!hiddenBox || puzzleState.cssModified) return;

    const isElementVisible = (element: HTMLElement) => {
      const computedStyle = window.getComputedStyle(element);
      return computedStyle.display !== 'none' && 
             computedStyle.visibility !== 'hidden' &&
             computedStyle.opacity !== '0';
    };

    const observer = new MutationObserver(() => {
      if (isElementVisible(hiddenBox)) {
        updatePuzzleState({ hiddenElementRevealed: true, cssModified: true });
        console.log('🎨 Excellent! You\'ve manipulated the CSS to reveal the hidden truth!');
        setTimeout(handleSuccess, CSS_REVEAL_DELAY);
      }
    });

    observer.observe(hiddenBox, { 
      attributes: true, 
      attributeFilter: ['style', 'class'] 
    });

    return () => observer.disconnect();
  }, [puzzleState.cssModified, handleSuccess, updatePuzzleState]);

  useEffect(() => {
    console.log('%c🎨 PUZZLE 2: CSS MANIPULATION', 'color: #ff6600; font-size: 16px; font-weight: bold;');
    console.log('There\'s a hidden element on this page. You need to make it visible using CSS!');
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (puzzleState.inputValue.toUpperCase() === SECRET_CODE) {
      updatePuzzleState({ showError: false });
      handleSuccess();
    } else {
      updatePuzzleState({ showError: true });
      setTimeout(() => updatePuzzleState({ showError: false }), ERROR_DISPLAY_TIME);
    }
  }, [puzzleState.inputValue, handleSuccess, updatePuzzleState]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updatePuzzleState({ inputValue: e.target.value });
  }, [updatePuzzleState]);

  return (
    <>
 
      {puzzleState.showError && (
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-9999 bg-red-700/90 text-white font-bold px-8 py-4 rounded-xl shadow-2xl text-lg"
        >
          Wrong answer! Try again
        </motion.div>
      )}
      <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        
        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
          Reality bends to those who understand its rules. 
          There is something concealed here that must be revealed through will and knowledge.
        </p>
      </motion.div>

     
      <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 text-green-400 mb-6">
            <Palette className="w-6 h-6" />
            <span className="text-lg">Transform what cannot be seen</span>
          </div>
          
          {gameState.devToolsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center"
            >
              <Code className="w-5 h-5 inline mr-2 text-green-400" />
              <span className="text-green-300">
                The tools of transformation are now accessible...
              </span>
            </motion.div>
          )}

          {puzzleState.cssModified && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-4 text-center"
            >
              <span className="text-cyan-300 text-lg">
                ✨ Reality has been altered by your will
              </span>
            </motion.div>
          )}
        </div>
      </div>

     
      <form onSubmit={handleSubmit} className="space-y-6 mt-8">
        <div className="text-center">
          <label className="block text-gray-300 text-lg mb-4">
            Enter the secret code:
          </label>
          <input
            type="text"
            value={puzzleState.inputValue}
            onChange={handleInputChange}
            className="w-full max-w-md mx-auto bg-black/50 border border-green-500/50 rounded-lg px-6 py-3 text-green-400 focus:border-green-400 focus:outline-none font-mono text-lg text-center"
            placeholder="_ _ _   _ _ _ _ _ _ _   _ _ _ _ _ _"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
          >
            Submit Code
          </button>
        </div>
      </form>

      <div 
        id="hidden-box"
        style={hiddenBoxStyles}
      >
        <h4 className="text-2xl mb-2">🎊 CONGRATULATIONS  🎊</h4>
       
        <p className="text-sm mt-2">The secret code for this level is: <strong>CSS_REALITY_HACKER</strong></p>
      </div>

      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center hover:bg-red-500/20 transition-colors">
          <div className="text-red-400 font-mono text-lg mb-2">
            display: none;
          </div>
          <p className="text-red-300/70 text-sm">The invisible state</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 text-center hover:bg-blue-500/20 transition-colors">
          <div className="text-blue-400 font-mono text-lg mb-2">
            opacity: 0;
          </div>
          <p className="text-blue-300/70 text-sm">The transparent veil</p>
        </div>
      </div>

    
      {puzzleState.showSuccess && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h4 className="text-2xl font-bold text-green-400">REALITY HACKED!</h4>
          
        </motion.div>
      )}

     
      
    </div>
    </>
  );
}


