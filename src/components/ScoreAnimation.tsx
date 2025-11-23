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
  duration?: number;
  size?: 'small' | 'medium' | 'large';
  streak?: number;
  customClass?: string;
  delay?: number;
  combo?: number;
}

export default function ScoreAnimation({ show, points, type, message, emoji, triggerConfetti = false, duration = 2000, size = 'medium', streak, customClass, delay = 0, combo = 1 }: ScoreAnimationProps) {
  const [visible, setVisible] = useState(false);
  const [animatedPoints, setAnimatedPoints] = useState(0);

  useEffect(() => {
    if (show) {
      const delayTimer = setTimeout(() => {
        setVisible(true);
        setAnimatedPoints(0);
        const increment = Math.abs(points) / 50; 
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
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, duration);
        return () => {
          clearTimeout(hideTimer);
          clearInterval(interval);
        };
      }, delay);
      return () => clearTimeout(delayTimer);
    }
  }, [show, points, duration, delay]);

  const defaultMessage = type === 'gain' ? 'Level Complete' : 'Hint Used';
  const defaultEmoji = type === 'gain' ? '🎯' : '💡';
  const displayMessage = message || defaultMessage;
  const displayEmoji = emoji || defaultEmoji;

  const sizeClasses = {
    small: 'text-2xl p-2',
    medium: 'text-4xl p-4',
    large: 'text-6xl p-6'
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.6 }
    },
    normal: {
      x: 0
    }
  };

  const bounceVariants = {
    bounce: {
      y: [0, -20, 0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      {visible && type === 'gain' && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm z-40 pointer-events-none" />
      )}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={type === 'loss' ? { opacity: 1, y: -50, scale: 1, ...shakeVariants.shake } : { opacity: 1, scale: 1, ...bounceVariants.bounce } as any}
            exit={{ opacity: 0, y: -100, scale: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ boxShadow: type === 'gain' ? '0 0 20px rgba(34, 197, 94, 0.5)' : '0 0 20px rgba(251, 146, 60, 0.5)' }}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 font-bold pointer-events-none drop-shadow-2xl ${sizeClasses[size]} ${customClass || ''} ${
              type === 'gain' 
                ? 'text-green-400' 
                : 'text-orange-400'
            }`}
          >
            <div className={`flex items-center gap-2 bg-linear-r ${type === 'gain' ? 'from-green-600 to-green-800' : 'from-orange-600 to-orange-800'} bg-opacity-80 rounded-lg border-2 ${type === 'gain' ? 'border-green-300' : 'border-orange-300'} border-opacity-50 shadow-lg ${type === 'gain' ? 'shadow-green-500/50' : 'shadow-orange-500/50'}`}>
              <span className="font-extrabold text-white drop-shadow-md">{type === 'gain' ? '+' : '-'}{Math.round(animatedPoints)}</span>
              <span className="text-2xl">
                {displayEmoji.repeat(Math.min(combo, 3))}
              </span>
            </div>
            <div className={`text-sm text-center mt-2 font-semibold ${type === 'gain' ? 'text-green-300' : 'text-orange-300'} drop-shadow-md`}>
              {displayMessage}
            </div>
            {streak && streak > 1 && (
              <div className="text-xs text-center mt-1 text-yellow-400 font-bold drop-shadow-md">
                🔥 Streak x{streak}!
              </div>
            )}
            {combo && combo > 1 && (
              <div className="text-xs text-center mt-1 text-purple-400 font-bold drop-shadow-md">
                ⚡ Combo x{combo}!
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {triggerConfetti && type === 'gain' && visible && (
        <CanvasConfetti duration={duration} />
      )}
    </>
  );
}