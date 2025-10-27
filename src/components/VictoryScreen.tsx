'use client';

import { motion } from 'framer-motion';
import { Skull, Star, Zap, Brain, Trophy, HardDrive, Award, Target, Clock, TrendingUp } from 'lucide-react';
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
  
  const clearAllProgress = () => {
    
    localStorage.clear();
    
    window.location.reload();
  };
  
  const getScoreRating = (score: number) => {
    if (score >= 300) return { text: "SHADOW OVERLORD", color: "text-red-400", icon: Skull, description: "Master of the Digital Realm" };
    if (score >= 250) return { text: "VOID MASTER", color: "text-purple-400", icon: Trophy, description: "Elite Reality Hacker" };
    if (score >= 200) return { text: "DIGITAL GHOST", color: "text-cyan-400", icon: Brain, description: "Advanced Code Navigator" };
    if (score >= 150) return { text: "CODE WRAITH", color: "text-orange-400", icon: Star, description: "Skilled Web Explorer" };
    return { text: "LOST SOUL", color: "text-gray-400", icon: Zap, description: "Novice Reality Seeker" };
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
          className="bg-linear-to-br from-slate-900 to-black border border-cyan-500/30 rounded-2xl p-6 max-w-4xl w-full text-center shadow-2xl shadow-cyan-500/20 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-linear-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text font-mono">
              GLOBAL LEADERBOARD
            </h2>
            <button
              onClick={() => setShowLeaderboard(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
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
      className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50"
    >
      <CanvasConfetti duration={5000} />
      <GlitchEffect />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-linear-to-br from-slate-900 via-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 max-w-2xl w-full mx-4 text-center shadow-2xl shadow-cyan-500/20"
      >
        
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-400 drop-shadow-lg mr-3" />
            <div>
              <h2 className="text-4xl font-bold text-transparent bg-linear-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text font-mono">
                MISSION COMPLETE
              </h2>
              <p className="text-gray-400 text-sm mt-1">Reality.exe has been successfully navigated</p>
            </div>
          </div>
        </motion.div>

   
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <IconComponent className={`w-12 h-12 ${rating.color} mr-3`} />
            <div>
              <h3 className={`text-2xl font-bold ${rating.color} font-mono`}>
                {rating.text}
              </h3>
              <p className="text-gray-400 text-sm">{rating.description}</p>
            </div>
          </div>
        </motion.div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-linear-to-r from-cyan-900/30 to-purple-900/30 border border-cyan-500/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-center mb-2">
              <Target className="w-6 h-6 text-cyan-400 mr-2" />
              <span className="text-cyan-400 text-sm font-semibold">FINAL SCORE</span>
            </div>
            <div className="text-4xl font-bold text-white font-mono">
              {finalScore}
            </div>
          </motion.div>

         
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="bg-linear-to-r from-green-900/30 to-cyan-900/30 border border-green-500/30 rounded-xl p-6"
          >
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
              <span className="text-green-400 text-sm font-semibold">EFFICIENCY</span>
            </div>
            <div className="text-4xl font-bold text-white font-mono">
              {metrics.efficiency}%
            </div>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gray-800/50 border border-gray-600/30 rounded-xl p-6 mb-8"
        >
          <h4 className="text-lg font-bold text-gray-300 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            Performance Breakdown
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Base Score:</span>
              <span className="text-green-400 font-mono">+{metrics.baseScore}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Bonus Points:</span>
              <span className="text-cyan-400 font-mono">+{metrics.bonusPoints}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Hints Used:</span>
              <span className="text-orange-400 font-mono">{hintsUsed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Hint Penalty:</span>
              <span className="text-red-400 font-mono">-{metrics.hintsDeduction}</span>
            </div>
          </div>
        </motion.div>

        
        {playerName && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="bg-linear-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center justify-center mb-3">
              <Brain className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-purple-400 text-lg font-bold font-mono">
                {playerName}
              </span>
            </div>
            <p className="text-purple-300 text-sm mb-2">
              Your score has been immortalized in the digital realm!
            </p>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Leaderboard
            </button>
          </motion.div>
        )}

      
        <div className="flex flex-col gap-4 justify-center">
          <div className="flex gap-4 justify-center">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6 }}
              onClick={onRestart}
              className="bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black px-8 py-4 rounded-lg font-bold font-mono tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 border border-green-500/30"
            >
              PLAY AGAIN
            </motion.button>
            
            {onChangePlayer && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
                onClick={onChangePlayer}
                className="bg-linear-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-8 py-4 rounded-lg font-bold font-mono tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg border border-gray-500/30"
              >
                NEW PLAYER
              </motion.button>
            )}
          </div>
          

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0 }}
            onClick={clearAllProgress}
            className="text-red-400 hover:text-red-300 text-sm underline transition-colors mx-auto"
          >
            Clear All Progress & Start Fresh
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

