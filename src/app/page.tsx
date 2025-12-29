'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [showBackupButton, setShowBackupButton] = useState(false);

  const handleButtonHover = () => {
    if (isMoving) return; 

    setIsMoving(true);
    setMoveCount(0);
    setShowBackupButton(false);

 
    setTimeout(() => {
      setShowBackupButton(true);
    }, 5000);

   
    const moveInterval = setInterval(() => {
      
      const maxX = window.innerWidth - 300; 
      const maxY = window.innerHeight - 100; 

      const randomX = Math.random() * maxX - (maxX / 2);
      const randomY = Math.random() * maxY - (maxY / 2);

      setButtonPosition({ x: randomX, y: randomY });
      setMoveCount(prev => prev + 1);
    }, 300);

    
    (window as any).runningButtonInterval = moveInterval;
  };

  
  const resetButton = () => {
    if ((window as any).runningButtonInterval) {
      clearInterval((window as any).runningButtonInterval);
    }
    setButtonPosition({ x: 0, y: 0 });
    setIsMoving(false);
    setMoveCount(0);
    setShowBackupButton(false);
  };


  useEffect(() => {
    return () => {
      if ((window as any).runningButtonInterval) {
        clearInterval((window as any).runningButtonInterval);
      }
    };
  }, []);
  return (
    <div className="min-h-screen bg-linear-to-r from-black via-gray-900 to-black text-green-400 relative overflow-hidden">
      
      <div className="absolute inset-0">
        <div className="particles-bg"></div>
      </div>

     
      <div className="fixed inset-0 opacity-5">
        <div className="matrix-bg"></div>
      </div>

      <main className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center max-w-3xl mx-auto p-8">
          <div className="mb-12">
            <h1 className="text-7xl font-bold text-transparent bg-linear-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text mb-6 font-mono glitch-text">
              Lost in the Web
            </h1>
            <div className="h-1 bg-linear-to-r from-green-400 via-cyan-400 to-purple-400 rounded mb-8 opacity-80"></div>
          </div>
          
          <p className="text-xl text-green-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            You are trapped in the digital realm. The only way out is to understand the very fabric of this reality.
            <span className="block mt-4 text-green-400 font-medium">
              Some paths are hidden from ordinary sight.
            </span>
          </p>
          
          <div className="mb-12 relative">
            
            <div 
              className="inline-block transition-transform duration-200 ease-out"
              style={{ 
                transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                pointerEvents: isMoving ? 'none' : 'auto',
                position: isMoving ? 'fixed' : 'relative',
                zIndex: isMoving ? 9999 : 'auto'
              }}
            >
              <Link 
                href="/game" 
                className="game-button inline-block bg-linear-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black px-12 py-4 rounded-xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 relative overflow-hidden"
                onMouseEnter={!isMoving ? handleButtonHover : undefined}
              >
                <span className="relative z-10">
                  {isMoving ? 'Catch me if you can 😄' : 'Enter the Digital Realm'}
                </span>
              </Link>
            </div>

          
            {isMoving && showBackupButton && (
              <div className="inline-block animate-pulse">
                <Link 
                  href="/game" 
                  className="game-button inline-block bg-linear-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 relative overflow-hidden border-2 border-green-400"
                  onClick={resetButton}
                >
                  <span className="relative z-10">Click Here to Start</span>
                </Link>
              </div>
            )}
            
            {isMoving && (
              <div className="mt-4 text-green-400 text-sm animate-pulse">
                {showBackupButton 
                  ? "The button escaped! Use the backup button above! 🏃‍♂️"
                  : "The button is escaping! Try to catch it! 🏃‍♂️"
                }
              </div>
            )}
          </div>
          
         
        </div>
      </main>
    </div>
  );
}
