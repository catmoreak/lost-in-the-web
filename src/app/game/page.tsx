'use client';
import { ShieldCheck  } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Zap } from 'lucide-react';
import MetaPuzzle1 from '~/components/MetaPuzzle1';
import MetaPuzzle2 from '~/components/MetaPuzzle2';
import MetaPuzzle3 from '~/components/MetaPuzzle3';
import MetaPuzzle4 from '~/components/MetaPuzzle4';
import DevToolsDetector from '~/components/DevToolsDetector';
import GlitchEffect from '~/components/GlitchEffect';
import ScoreAnimation from '~/components/ScoreAnimation';
import VictoryScreen from '~/components/VictoryScreen';
import PlayerNameInput from '~/components/PlayerNameInput';

export default function MetaRealityGame() {
  const [playerName, setPlayerName] = useState<string>('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState({
    devToolsOpen: false,
    hasInspected: false,
    secretCode: '',
    realityGlitches: 0,
    playerConsciousness: 100,
    score: 0,
    hintsUsed: 0,
    hintsUsedPerLevel: [] as number[] 
  });
  const [showHint, setShowHint] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [scoreAnimation, setScoreAnimation] = useState({
    show: false,
    points: 0,
    type: 'gain' as 'gain' | 'loss'
  });
  const [gameComplete, setGameComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const savedPlayerName = localStorage.getItem('lost-in-web-player-name');
    const savedGameStarted = localStorage.getItem('lost-in-web-game-started');
    const savedCurrentLevel = localStorage.getItem('lost-in-web-current-level');
    const savedGameState = localStorage.getItem('lost-in-web-game-state');
    const savedGameComplete = localStorage.getItem('lost-in-web-game-complete');

    if (savedPlayerName) {
      setPlayerName(savedPlayerName);
    }
    if (savedGameStarted === 'true') {
      setGameStarted(true);
    }
    if (savedCurrentLevel) {
      setCurrentLevel(parseInt(savedCurrentLevel));
    }
    if (savedGameState) {
      try {
        const parsedState = JSON.parse(savedGameState);
        setGameState(parsedState);
      } catch (error) {
        console.error('Error parsing saved game state:', error);
      }
    }
    if (savedGameComplete === 'true') {
      setGameComplete(true);
    }
    
    setIsLoaded(true);
  }, []);

  
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('lost-in-web-player-name', playerName);
      localStorage.setItem('lost-in-web-game-started', gameStarted.toString());
      localStorage.setItem('lost-in-web-current-level', currentLevel.toString());
      localStorage.setItem('lost-in-web-game-state', JSON.stringify(gameState));
      localStorage.setItem('lost-in-web-game-complete', gameComplete.toString());
    }
  }, [playerName, gameStarted, currentLevel, gameState, gameComplete, isLoaded]);

  const levels = [
    {
      title: "Welcome to Reality.exe",
      description: "Every digital reality has layers. What you see is rarely everything there is. The key exists, but not where ordinary perception can find it.",
      component: MetaPuzzle1
    },
    {
      title: "The Developer's Secret",
      description: "You must look beneath the surface. Inspect what others cannot see.",
      component: MetaPuzzle2
    },
    {
        title : "The Ancient Cipher",
        description : "The final lock uses an ancient method of encryption.  ",
        component : MetaPuzzle3
    },
    {
        title : " ",
        description : "",
        component : MetaPuzzle4
    }
  ];
   
  useEffect(() => {
   
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          triggerRealityGlitch();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerRealityGlitch = () => {
    setIsGlitching(true);
    setGameState(prev => ({ ...prev, realityGlitches: prev.realityGlitches + 1 }));
    
    
    document.body.style.filter = 'hue-rotate(180deg) invert(1)';
    setTimeout(() => {
      document.body.style.filter = '';
      setIsGlitching(false);
    }, 2000);
    
    console.log('🔥 REALITY GLITCH DETECTED  🔥');
    console.log('You\'ve found a secret. The matrix has cracks...');
  };

  const submitScore = async (finalScore: number) => {
    try {
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          score: finalScore,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit score');
      }
      
      console.log('Score submitted successfully!');
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  };

  const advanceLevel = () => {
   
    setGameState(prev => ({ ...prev, score: prev.score + 100 }));
    setScoreAnimation({ show: true, points: 100, type: 'gain' });
    
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      
      setTimeout(() => {
        const finalScore = gameState.score + 100; 
        submitScore(finalScore);
        setGameComplete(true);
      }, 2000);
    }
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setGameStarted(true);
  };

  const restartGame = () => {
    setCurrentLevel(0);
    setGameState({
      devToolsOpen: false,
      hasInspected: false,
      secretCode: '',
      realityGlitches: 0,
      playerConsciousness: 100,
      score: 0,
      hintsUsed: 0,
      hintsUsedPerLevel: []
    });
    setGameComplete(false);
    setShowHint(false);
    
   
    localStorage.removeItem('lost-in-web-current-level');
    localStorage.removeItem('lost-in-web-game-state');
    localStorage.removeItem('lost-in-web-game-complete');
  };

  const goBackToNameInput = () => {
    setPlayerName('');
    setGameStarted(false);
    restartGame();
    
    
    localStorage.removeItem('lost-in-web-player-name');
    localStorage.removeItem('lost-in-web-game-started');
  };

  const useHint = () => {
    console.log('Hint button clicked!'); 
    
  
    const hasUsedHintForCurrentLevel = gameState.hintsUsedPerLevel.includes(currentLevel);
    
    if (!hasUsedHintForCurrentLevel) {
      
      setGameState(prev => ({ 
        ...prev, 
        score: Math.max(0, prev.score - 50),
        hintsUsed: prev.hintsUsed + 1,
        hintsUsedPerLevel: [...prev.hintsUsedPerLevel, currentLevel]
      }));
      setScoreAnimation({ show: true, points: 50, type: 'loss' });
      console.log('Points deducted for first hint use on this level');
    } else {
      console.log('Hint already used for this level - no additional cost');
    }
    
    setShowHint(!showHint);
  };

  const getHintForCurrentLevel = () => {
    const hints = [
      "Inspect Element. Look for hidden secret attributes in the HTML structure.Some secrets are just a sight away",
      "Use Developer Tools (F12) to find elements with 'display: none' or 'opacity: 0'. Modify these CSS properties to reveal hidden content.",
      "Do you know that Caesar cipher is named after Julius Caesar, the famous Roman emperor and military general.",
      "Think about objects that have keys but don't open locks, and things that speak without mouths."
    ];
    return hints[currentLevel] || "Look deeper. The surface rarely tells the whole story.";
  };

  
 
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono">Loading reality...</p>
        </div>
      </div>
    );
  }
  
  if (!gameStarted) {
    return <PlayerNameInput onNameSubmit={handleNameSubmit} />;
  }

  return (
    <div className="min-h-screen bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <DevToolsDetector 
        onDevToolsToggle={(open: boolean) => setGameState(prev => ({ ...prev, devToolsOpen: open }))}
      />
      
      {isGlitching && <GlitchEffect />}

      <div className="fixed inset-0 opacity-5">
        <div className="matrix-bg"></div>
      </div>

      
      <motion.header 
        className="relative z-10 p-6 border-b border-green-500/20 backdrop-blur-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ShieldCheck  className="w-8 h-8 text-green-400" />
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text font-mono">
               LOST IN THE WEB
              </h1>
              <p className="text-sm text-green-300/70">
                Challenge {currentLevel + 1} of {levels.length} 
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm text-green-300 border-b border-green-500/30"><strong>Score : </strong></div>
              <div className="text-green-400 font-mono text-lg font-bold">
                <strong>{gameState.score}</strong>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-orange-300 border-b border-orange-500/30"><strong>Hints Used :</strong></div>
              <div className="text-orange-400 font-mono text-lg">
                <strong>{gameState.hintsUsed}</strong>
              </div>
            </div>
            {gameState.devToolsOpen && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 text-cyan-400"
              >
                <Eye className="w-5 h-5 animate-pulse" />
                <span className="text-sm font-mono">ACTIVE</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

     
      <main className="relative z-10 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-black/40 backdrop-blur-md border border-green-500/20 rounded-xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-transparent bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text mb-4 font-mono">
                  {levels[currentLevel]?.title || "Loading..."}
                </h2>
                <p className="text-gray-300 text-lg">
                  {levels[currentLevel]?.description || ""}
                </p>
              </div>

            
              {currentLevel === 0 && (
                <MetaPuzzle1 
                  gameState={gameState} 
                  setGameState={setGameState}
                  onComplete={advanceLevel}
                />
              )}
              {currentLevel === 1 && (
                <MetaPuzzle2 
                  gameState={gameState} 
                  setGameState={setGameState}
                  onComplete={advanceLevel}
                />
              )}
              {currentLevel === 2 && (
                <MetaPuzzle3 
                  gameState={gameState} 
                  setGameState={setGameState}
                  onComplete={advanceLevel}
                />
              )}
              {currentLevel === 3 && (
                <MetaPuzzle4 
                  gameState={gameState} 
                  setGameState={setGameState}
                  onComplete={advanceLevel}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

     
      <div 
        id="secret-element" 
        className="hidden"
        data-secret="REALITY_IS_CODE"
      >
        The truth is hidden in plain sight
      </div>

     
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
        {(() => {
          const hasUsedHintForCurrentLevel = gameState.hintsUsedPerLevel.includes(currentLevel);
          
          return (
            <motion.button
              className={`${
                hasUsedHintForCurrentLevel 
                  ? 'bg-gray-600 hover:bg-gray-500 border-gray-400' 
                  : 'bg-orange-600 hover:bg-orange-500 border-orange-400 hint-button-pulse'
              } active:bg-opacity-80 text-white p-4 rounded-full shadow-2xl border-2 relative group cursor-pointer`}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              onClick={useHint}
              style={{ zIndex: 1000 }}
              type="button"
            >
              <Zap className="w-7 h-7" />
              {!hasUsedHintForCurrentLevel && (
                <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-8 h-8 flex items-center justify-center font-bold border-2 border-white shadow-lg">
                  -50
                </div>
              )}
              {hasUsedHintForCurrentLevel && (
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold border border-white">
                  ✓
                </div>
              )}
              
             
              <div className="absolute bottom-full right-0 mb-3 hidden group-hover:block z-50">
                <div className={`${
                  hasUsedHintForCurrentLevel 
                    ? 'bg-gray-600 border-gray-400' 
                    : 'bg-orange-600 border-orange-400'
                } text-white text-sm rounded-lg p-3 whitespace-nowrap shadow-xl`}>
                  {hasUsedHintForCurrentLevel ? (
                    <>
                      💡 Hint already revealed
                      <div className="text-xs text-gray-200 mt-1">No additional cost</div>
                    </>
                  ) : (
                    <>
                      💡 Need help? Click for hint 
                      <div className="text-xs text-orange-200 mt-1">Cost: 50 points</div>
                    </>
                  )}
                </div>
              </div>
              
            
              {!hasUsedHintForCurrentLevel && (
                <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping opacity-30"></div>
              )}
            </motion.button>
          );
        })()}
      </div>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 bg-black/95 border border-orange-500/50 rounded-xl p-5 max-w-sm backdrop-blur-sm shadow-2xl z-50"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-bold">
              {gameState.hintsUsedPerLevel.includes(currentLevel) 
                ? "HINT REVEALED " 
                : "HINT REVEALED (-50 points)"
              }
            </span>
          </div>
          <p className="text-gray-300">
            {getHintForCurrentLevel()}
          </p>
          <button 
            onClick={() => setShowHint(false)}
            className="mt-3 text-orange-400 hover:text-orange-300 text-sm underline"
          >
            Close
          </button>
        </motion.div>
      )}

     
      <ScoreAnimation 
        show={scoreAnimation.show}
        points={scoreAnimation.points}
        type={scoreAnimation.type}
      />

      
      {gameComplete && (
        <VictoryScreen
          finalScore={gameState.score}
          hintsUsed={gameState.hintsUsed}
          playerName={playerName}
          onRestart={restartGame}
          onChangePlayer={goBackToNameInput}
        />
      )}

      
    </div>
  );
}