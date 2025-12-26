'use client';

import { motion } from 'framer-motion';
import { Zap, Target, Brain, Star } from 'lucide-react';
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
    
    if (score >= 150) {
      return { text: "", color: "text-emerald-300", icon: Zap, description: "Outstanding performance" };
    }

    if (score >= 120) {
      return { text: "", color: "text-green-300", icon: Zap, description: "Strong performance" };
    }

    if (score >= 100) {
      return { text: "", color: "text-green-300", icon: Zap, description: "Completed with good efficiency" };
    }

    return { text: "Nice work — you finished the mission", color: "text-gray-400", icon: Zap, description: "Keep improving" };
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

  const getRank = (score: number) => {
    if (score >= 150) return { name: 'ELITE', color: 'text-emerald-300' };
    if (score >= 120) return { name: 'PRO', color: 'text-green-300' };
    if (score >= 100) return { name: 'AGENT', color: 'text-green-300' };
    return { name: 'NOVICE', color: 'text-gray-400' };
  };

  const rank = getRank(finalScore);

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
        className="bg-black/90 border border-green-600/30 rounded-2xl p-8 max-w-4xl w-full mx-4 text-left backdrop-blur-sm shadow-2xl shadow-green-700/20 overflow-hidden"
      >
        
     

   
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 bg-linear-to-tr from-green-800/40 to-transparent border border-green-600/20">
                <IconComponent className="w-14 h-14 text-green-300 drop-shadow-lg drop-shadow-green-500/30" />
              </div>

              <div>
                <h3 className="text-3xl font-bold font-mono text-green-300 tracking-wide">MISSION COMPLETE</h3>
                <p className="text-sm text-gray-400 font-mono mt-1">{rating.text}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-300 font-mono uppercase tracking-wider">Secure Terminal</div>
              <div className="px-3 py-1 rounded-full bg-black/70 border border-green-700/30 text-xs text-green-200 font-mono flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <div className="font-semibold text-sm">{rank.name}</div>
              </div>
            </div>
          </div>
        </motion.div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
       
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="relative bg-linear-to-br from-green-900/80 to-black/60 border border-green-700/30 rounded-2xl p-8 shadow-2xl shadow-green-700/20 flex flex-col items-center justify-center overflow-hidden"
          >
            <Target className="w-10 h-10 text-green-300 mb-3 drop-shadow-lg drop-shadow-green-400/60" />
            <div className="text-sm text-green-200 font-semibold tracking-wider uppercase mb-2 font-mono">Final Score</div>
            <div className="rounded-md px-6 py-4 bg-black/30 border border-green-500/10 w-full">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-6xl font-extrabold text-white font-mono drop-shadow-xl">{finalScore}</div>
                
                </div>
             
              </div>
            </div>
          </motion.div>

         
          <motion.div
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="bg-gray-900/80 border border-green-700/20 rounded-2xl p-6 shadow-lg shadow-green-700/10 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-green-300 drop-shadow-sm" />
                <div>
                  <div className="text-xs text-green-200 font-semibold uppercase font-mono">Hints Used</div>
                  <div className="text-2xl font-bold text-white font-mono">{hintsUsed}</div>
                </div>
              </div>
              {playerName ? (
                <div className="text-right text-sm text-gray-300 font-mono">Agent: <span className="font-semibold text-white">{playerName}</span></div>
              ) : (
                <div className="text-right text-sm text-gray-400 font-mono">Agent: —</div>
              )}
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs text-green-200 font-semibold font-mono">Efficiency</div>
                <div className="text-xs text-gray-300 font-mono">{metrics.efficiency}%</div>
              </div>
              <div aria-hidden className="w-full bg-black/20 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, metrics.efficiency))}%` }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="h-3 rounded-full bg-linear-to-r from-green-400 via-green-400 to-emerald-300 shadow-inner"
                  />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center mt-3">
                <div className="rounded-lg bg-black/30 p-2 border border-green-700/20">
                  <div className="text-xs text-gray-300 font-mono">Base</div>
                  <div className="text-sm font-semibold text-white font-mono">{metrics.baseScore}</div>
                </div>
                <div className="rounded-lg bg-black/30 p-2 border border-green-700/20">
                  <div className="text-xs text-gray-300 font-mono">Deduct</div>
                  <div className="text-sm font-semibold text-amber-400 font-mono">-{metrics.hintsDeduction}</div>
                </div>
                <div className="rounded-lg bg-black/30 p-2 border border-green-700/20">
                  <div className="text-xs text-gray-300 font-mono">Bonus</div>
                  <div className="text-sm font-semibold text-emerald-300 font-mono">{metrics.bonusPoints}</div>
                </div>
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
  );}

