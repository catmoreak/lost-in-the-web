'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Zap, Brain } from 'lucide-react';

interface VictoryScreenProps {
  finalScore: number;
  hintsUsed: number;
  onRestart: () => void;
}

export default function VictoryScreen({ finalScore, hintsUsed, onRestart }: VictoryScreenProps) {
  const getScoreRating = (score: number) => {
    if (score >= 300) return { text: "MASTER HACKER", color: "text-green-400", icon: Trophy };
    if (score >= 250) return { text: "ELITE CODER", color: "text-cyan-400", icon: Star };
    if (score >= 200) return { text: "SKILLED NAVIGATOR", color: "text-blue-400", icon: Brain };
    if (score >= 150) return { text: "APPRENTICE", color: "text-purple-400", icon: Zap };
    return { text: "NOVICE", color: "text-gray-400", icon: Zap };
  };

  const rating = getScoreRating(finalScore);
  const IconComponent = rating.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-linear-to-br from-slate-800 to-slate-900 border border-green-500/30 rounded-2xl p-8 max-w-md w-full mx-4 text-center"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <IconComponent className={`w-16 h-16 mx-auto mb-4 ${rating.color}`} />
          <h2 className="text-3xl font-bold text-transparent bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text mb-2">
            ESCAPE COMPLETE 
          </h2>
          <p className={`text-xl font-bold mb-6 ${rating.color}`}>
            {rating.text}
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 mb-8"
        >
          <div className="bg-black/50 rounded-lg p-4">
            <div className="text-green-400 text-3xl font-bold font-mono mb-2">
              {finalScore}
            </div>
            <div className="text-green-300 text-sm">FINAL SCORE</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-900/30 rounded-lg p-3">
              <div className="text-blue-400 font-bold">3/3</div>
              <div className="text-blue-300">Levels Complete</div>
            </div>
            <div className="bg-orange-900/30 rounded-lg p-3">
              <div className="text-orange-400 font-bold">{hintsUsed}</div>
              <div className="text-orange-300">Hints Used</div>
            </div>
          </div>
<div className='text-gray-400 text-xs mt-2'>
    See you again Young Hacker
    </div>
          
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onRestart}
          className="bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
        >
          Play Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

