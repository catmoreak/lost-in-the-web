'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import CanvasConfetti from './CanvasConfetti';

interface ScoreAnimationProps {
  show: boolean;
  points: number;
  type: 'gain' | 'loss';
  message?: string;
  emoji?: string;
  triggerConfetti?: boolean;
}

export default function ScoreAnimation({ show, points, type, message, emoji, triggerConfetti = false }: ScoreAnimationProps) {
  const [visible, setVisible] = useState(false);
  const [animatedPoints, setAnimatedPoints] = useState(0);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setAnimatedPoints(0);
      const increment = Math.abs(points) / 50; // Animate over 50 steps
      const interval = setInterval(() => {
        setAnimatedPoints(prev => {
          const next = prev + increment;
          if (next >= Math.abs(points)) {
            clearInterval(interval);
            return Math.abs(points);
          }
          return next;
        });
      }, 20);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [show, points]);

  const defaultMessage = type === 'gain' ? 'Level Complete' : 'Hint Used';
  const defaultEmoji = type === 'gain' ? '🎯' : '💡';
  const displayMessage = message || defaultMessage;
  const displayEmoji = emoji || defaultEmoji;

  const shakeVariants = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    },
    normal: {
      x: 0
    }
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -50, scale: 1, ...(type === 'loss' ? shakeVariants.shake : {}) }}
            exit={{ opacity: 0, y: -100, scale: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 font-bold text-4xl pointer-events-none drop-shadow-2xl ${
              type === 'gain' 
                ? 'text-green-400' 
                : 'text-orange-400'
            }`}
          >
            <div className="flex items-center gap-2 bg-black bg-opacity-50 rounded-lg p-4 border-2 border-white border-opacity-20">
              <span>{type === 'gain' ? '+' : '-'}{Math.round(animatedPoints)}</span>
              <span className="text-2xl">
                {displayEmoji}
              </span>
            </div>
            <div className={`text-sm text-center mt-2 ${
              type === 'gain' ? 'text-green-300' : 'text-orange-300'
            }`}>
              {displayMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {triggerConfetti && type === 'gain' && visible && (
        <CanvasConfetti duration={2000} />
      )}
    </>
  );
}