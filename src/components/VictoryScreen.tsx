'use client';

import { motion } from 'framer-motion';
import { Skull, Star, Zap, Brain, Trophy } from 'lucide-react';
import GlitchEffect from './GlitchEffect';

interface VictoryScreenProps {
  finalScore: number;
  hintsUsed: number;
  onRestart: () => void;
}

export default function VictoryScreen({ finalScore, hintsUsed, onRestart }: VictoryScreenProps) {
  const getScoreRating = (score: number) => {
    if (score >= 300) return { text: "SHADOW OVERLORD", color: "text-red-400", icon: Skull };
    if (score >= 250) return { text: "VOID MASTER", color: "text-purple-400", icon: Trophy };
    if (score >= 200) return { text: "DIGITAL GHOST", color: "text-cyan-400", icon: Brain };
    if (score >= 150) return { text: "CODE WRAITH", color: "text-orange-400", icon: Star };
    return { text: "LOST SOUL", color: "text-gray-400", icon: Zap };
  };

  const rating = getScoreRating(finalScore);
  const IconComponent = rating.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50"
    >
      <GlitchEffect />
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-linear-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl p-8 max-w-lg w-full mx-4 text-center shadow-2xl shadow-red-500/20"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <IconComponent className={`w-20 h-20 mx-auto mb-4 ${rating.color} drop-shadow-lg`} />
          <h2 className="text-4xl font-bold text-transparent bg-linear-to-r from-red-400 to-purple-400 bg-clip-text mb-2 font-mono tracking-wider">
            ESCAPE FROM THE VOID
          </h2>
          <p className={`text-2xl font-bold mb-6 ${rating.color} font-mono`}>
            {rating.text}
          </p>
          <p className="text-gray-400 text-sm italic mb-4">
            "In the digital abyss, only the worthy survive..."
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-6 mb-8"
        >
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <div className="text-red-400 text-4xl font-bold font-mono mb-2">
              {finalScore}
            </div>
            <div className="text-red-300 text-sm font-semibold">FINAL SCORE</div>
        
          </div>

         

          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
            <div className="text-gray-300 text-sm">
              <span className="font-semibold">Achievement Unlocked:</span> Survivor of the Web
            </div>
            <div className="text-gray-400 text-xs mt-1">
              You have navigated the labyrinth and emerged victorious.
            </div>
          </div>

          
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onRestart}
          className="bg-linear-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white px-10 py-4 rounded-lg font-bold font-mono tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 border border-red-500/30"
        >
          DESCEND AGAIN
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

