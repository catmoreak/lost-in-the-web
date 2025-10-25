'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LeaderboardEntry {
  id: number;
  playerName: string;
  score: number;
  createdAt: string;
  updatedAt?: string;
}

interface RealtimeLeaderboardProps {
  currentPlayerName?: string;
  currentScore?: number;
}

export default function RealtimeLeaderboard({ currentPlayerName, currentScore }: RealtimeLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prevPositions, setPrevPositions] = useState<Record<string, number>>({});

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
      
     
      const newPrevPositions: Record<string, number> = {};
      leaderboard.forEach((entry, index) => {
        newPrevPositions[entry.playerName] = index;
      });
      setPrevPositions(newPrevPositions);
      
      setLeaderboard(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    
    
    const interval = setInterval(fetchLeaderboard, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-green-400 font-bold">#{position + 1}</span>;
    }
  };

  const getPositionChange = (playerName: string, currentIndex: number) => {
    const prevIndex = prevPositions[playerName];
    if (prevIndex === undefined) return 'new';
    if (prevIndex > currentIndex) return 'up';
    if (prevIndex < currentIndex) return 'down';
    return 'same';
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'new':
        return <span className="w-4 h-4 text-yellow-400 font-bold text-xs">NEW</span>;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-black/80 backdrop-blur-sm border-2 border-green-500/30 rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-green-400">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black/80 backdrop-blur-sm border-2 border-red-500/30 rounded-lg p-6 max-w-md w-full">
        <div className="text-center text-red-400">
          <p className="font-semibold">Error loading leaderboard</p>
          <p className="text-sm mt-2">{error}</p>
          <button 
            onClick={fetchLeaderboard}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/80 backdrop-blur-sm border-2 border-green-500/30 rounded-lg p-6 max-w-md w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-300 flex items-center gap-2">
          <Trophy className="w-7 h-7" />
          Reality Hackers
        </h2>
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {leaderboard.map((entry, index) => {
            const change = getPositionChange(entry.playerName, index);
            const isCurrentPlayer = currentPlayerName === entry.playerName;
            
            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                  isCurrentPlayer 
                    ? 'bg-green-500/20 border-green-400 shadow-lg shadow-green-400/20' 
                    : 'bg-gray-800/50 border-gray-600 hover:border-green-500/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {getRankIcon(index)}
                    {getChangeIcon(change)}
                  </div>
                  <div>
                    <p className={`font-semibold ${isCurrentPlayer ? 'text-green-300' : 'text-white'}`}>
                      {entry.playerName}
                      {isCurrentPlayer && <span className="ml-2 text-xs text-green-400">(You)</span>}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${
                    isCurrentPlayer ? 'text-green-300' : 'text-yellow-400'
                  }`}>
                    {entry.score.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">points</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {leaderboard.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No scores yet</p>
          <p className="text-sm">Be the first to hack reality!</p>
        </div>
      )}

      {currentPlayerName && currentScore !== undefined && (
        <div className="mt-4 pt-4 border-t border-green-500/30">
          <div className="text-center">
            <p className="text-green-400 text-sm">Your Current Score</p>
            <p className="text-green-300 font-bold text-xl">{currentScore.toLocaleString()} points</p>
          </div>
        </div>
      )}

      <div className="mt-4 text-center text-xs text-gray-500">
        Updates every 5 seconds
      </div>
    </div>
  );
}