'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Brain } from 'lucide-react';
import GlitchEffect from './GlitchEffect';
import CanvasConfetti from './CanvasConfetti';
import RealtimeLeaderboard from './RealtimeLeaderboard';
import { useState } from 'react';

interface VictoryScreenProps {
  finalScore: number;
  hintsUsed: number;
  playerName?: string;
  onRestart: () => void;
  onChangePlayer?: () => void;
}

export default function VictoryScreen({ finalScore, hintsUsed, playerName, onRestart, onChangePlayer }: VictoryScreenProps) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const getScoreRating = (score: number) => {
   
    return { text: "Thank you for completing the levels", color: "text-gray-400", icon: Zap, description: "" };
  };

  const getPerformanceMetrics = () => {
    const baseScore = 100;
    const hintsDeduction = hintsUsed * 20;
    const bonusPoints = Math.max(0, finalScore - baseScore + hintsDeduction);
    
    return {
      baseScore,
      hintsDeduction,
      bonusPoints,
      efficiency: Math.round(((finalScore / (finalScore + hintsDeduction)) * 100))
    };
  };

  const rating = getScoreRating(finalScore);
  const metrics = getPerformanceMetrics();
  const IconComponent = rating.icon;

  if (showLeaderboard) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900/95 border border-gray-700 rounded-lg p-6 max-w-4xl w-full text-center backdrop-blur-sm max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white font-mono">
              GLOBAL LEADERBOARD
            </h2>
            <button
              onClick={() => setShowLeaderboard(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded font-mono transition-colors"
            >
              Back to Results
            </button>
          </div>
          
          <RealtimeLeaderboard 
            currentPlayerName={playerName}
            currentScore={finalScore}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 p-4"
    >
      <CanvasConfetti duration={5000} />
      <GlitchEffect />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gray-900/95 border border-cyan-500/30 rounded-lg p-8 max-w-2xl w-full mx-4 text-center backdrop-blur-sm shadow-2xl shadow-cyan-500/20"
      >
        
     

   
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <IconComponent className="w-16 h-16 text-cyan-400 mr-3 drop-shadow-lg drop-shadow-cyan-400/50" />
            <div>
              <h3 className="text-3xl font-bold font-mono text-cyan-400 tracking-wide">
                MISSION COMPLETE
              </h3>
              <p className="text-gray-400 text-sm font-mono mt-1">{rating.text}</p>
            </div>
          </div>
        </motion.div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800/80 border border-cyan-500/50 rounded-lg p-6 shadow-lg shadow-cyan-500/20"
          >
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-cyan-400 mr-2 drop-shadow-lg drop-shadow-cyan-400/50" />
              <span className="text-cyan-300 text-sm font-semibold font-mono uppercase">FINAL SCORE</span>
            </div>
            <div className="text-4xl font-bold text-cyan-400 font-mono drop-shadow-lg drop-shadow-cyan-400/50">
              {finalScore}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="bg-gray-800/80 border border-cyan-500/50 rounded-lg p-6 shadow-lg shadow-cyan-500/20"
          >
            <div className="flex items-center justify-center mb-2">
              <Brain className="w-6 h-6 text-cyan-400 mr-2 drop-shadow-lg drop-shadow-cyan-400/50" />
              <span className="text-cyan-300 text-sm font-semibold font-mono uppercase">HINTS USED</span>
            </div>
            <div className="text-4xl font-bold text-cyan-400 font-mono drop-shadow-lg drop-shadow-cyan-400/50">
              {hintsUsed}
            </div>
          </motion.div>
          
        </div>

        

        
        

      
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex gap-4 justify-center">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 197, 94, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded font-bold font-mono tracking-wide transition-all border border-green-500/50 shadow-lg shadow-green-500/30"
            >
              PLAY AGAIN
            </motion.button>
            
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 193, 7, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowLeaderboard(true)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded font-bold font-mono tracking-wide transition-all border border-yellow-500/50 shadow-lg shadow-yellow-500/30"
            >
              VIEW LEADERBOARD
            </motion.button>
            
            {onChangePlayer && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99, 102, 241, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onChangePlayer}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded font-bold font-mono tracking-wide transition-all border border-indigo-500/50 shadow-lg shadow-indigo-500/30"
              >
                NEW AGENT
              </motion.button>
            )}
          </div>
          

        </div>
      </motion.div>
    </motion.div>
  );
}

