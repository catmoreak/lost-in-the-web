'use client';

import { motion } from 'framer-motion';

export default function GlitchEffect() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
     
      <div className="absolute inset-0 bg-linear-to-r from-red-500/20 via-transparent to-blue-500/20 animate-pulse" />
    
      <div 
        className="absolute inset-0 opacity-30 static-noise-bg"
      />
      
      
      <div 
        className="absolute inset-0 opacity-20 scanlines-bg"
      />
      
      
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-2 bg-red-500/60"
        animate={{
          x: [0, 100, -50, 200, 0],
          scaleX: [1, 0.5, 1.5, 0.8, 1],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-1 bg-cyan-500/60"
        animate={{
          x: [0, -80, 60, -120, 0],
          scaleX: [1, 1.5, 0.5, 1.2, 1],
        }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
    </motion.div>
  );
}