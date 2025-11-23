
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScoreAnimationProps {
  show: boolean;
  points: number;
  type: 'gain' | 'loss';
}

export default function ScoreAnimation({ show, points, type }: ScoreAnimationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: 1, y: -50, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 font-bold text-4xl pointer-events-none ${
            type === 'gain' 
              ? 'text-green-400' 
              : 'text-orange-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <span>{type === 'gain' ? '+' : '-'}{Math.abs(points)}</span>
            <span className="text-2xl">
              {type === 'gain' ? '🎯' : '💡'}
            </span>
          </div>
          <div className={`text-sm text-center mt-1 ${
            type === 'gain' ? 'text-green-300' : 'text-orange-300'
          }`}>
            {type === 'gain' ? 'Level Complete' : 'Hint Used'}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}










