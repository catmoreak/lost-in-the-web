'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock } from 'lucide-react';


interface MetaPuzzle3Props {
  gameState: any;
  setGameState: (state: any) => void;
  onComplete: () => void;
}

export default function MetaPuzzle3({ gameState, setGameState, onComplete }: MetaPuzzle3Props) {
  const [inputValue, setInputValue] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedShift, setSelectedShift] = useState(0);
  const [decodedMessage, setDecodedMessage] = useState('');
  const [showError, setShowError] = useState(false);


  const encodedMessage = "QVTVGNY SERRRQBZ VF GUR XRL GB RFPNCR";
  const correctDecoded = "DIGITAL FREEDOM IS THE KEY TO ESCAPE";
  const correctAnswer = "DIGITAL FREEDOM IS THE KEY TO ESCAPE";

  useEffect(() => {
    
    console.log('You wont find keys here ');
  }, []);

  const caesarDecode = (text: string, shift: number) => {
    return text.split('').map(char => {
      if (char.match(/[A-Z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      } else if (char.match(/[a-z]/)) {
        return String.fromCharCode(((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97);
      }
      return char;
    }).join('');
  };

  useEffect(() => {
    const decoded = caesarDecode(encodedMessage, selectedShift);
    setDecodedMessage(decoded);
  }, [selectedShift, encodedMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.toUpperCase() === correctAnswer) {
      setShowSuccess(true);
      setShowError(false);
      console.log('%c◉ CIPHER CRACKED! The digital realm yields to your expertise...', 'color: #10b981; font-size: 14px;');
      console.log('%c◦ +100 points awarded', 'color: #22d3ee; font-size: 12px;');
      setTimeout(() => {
        onComplete();
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      console.log('%c◦ Incorrect passphrase. The cipher must be properly decoded...', 'color: #ef4444; font-size: 12px;');
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
          Wrong passphrase ! Try again
        </motion.div>
      )}

      
      <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 text-green-400 mb-6">
            <Lock className="w-6 h-6" />
            <span className="text-lg">Decode the encrypted message</span>
          </div>
          
         
          <div className="bg-black/50 border border-red-500/30 rounded-lg p-6 text-center">
            <div className="text-red-400 font-mono text-lg mb-2">ENCRYPTED MESSAGE :</div>
            <div className="text-red-300 font-mono text-xl tracking-wider break-all">
              {encodedMessage}
            </div>
          </div>

          
         

         
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center">
              <label className="block text-gray-300 text-lg mb-4">
                Enter the secret passphrase : 
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full max-w-md mx-auto bg-black/50 border border-green-500/50 rounded-lg px-6 py-3 text-green-400 focus:border-green-400 focus:outline-none font-mono text-lg text-center"
                placeholder="_ _ _ _ _ _ _   _ _ _ _ _ _ _"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Submit Passphrase
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
          <h4 className="text-2xl font-bold text-green-400">CIPHER CRACKED!</h4>
          <p className="text-green-300">You have mastered the ancient arts of cryptography!</p>
        </motion.div>
      )}

     
    </div>
  );
}