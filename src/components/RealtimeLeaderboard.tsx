'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      const data = await response.json();
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

  const getClassification = (score: number) => {
    if (score >= 300) return "CRITICAL";
    if (score >= 250) return "HIGH";
    if (score >= 200) return "MEDIUM";
    if (score >= 150) return "LOW";
    return "MINIMAL";
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "CRITICAL": return "text-red-400";
      case "HIGH": return "text-orange-400";
      case "MEDIUM": return "text-yellow-400";
      case "LOW": return "text-green-400";
      case "MINIMAL": return "text-gray-400";
      default: return "text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900/95 border border-gray-700 rounded-lg p-6 max-w-4xl w-full backdrop-blur-sm">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 font-mono">Loading security database...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 max-w-4xl w-full backdrop-blur-sm">
        <div className="text-center">
          <h3 className="text-red-400 font-mono text-lg mb-2">CONNECTION FAILED</h3>
          <p className="text-red-300 mb-4">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-mono transition-colors"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/95 border border-gray-700 rounded-lg max-w-4xl w-full backdrop-blur-sm">
      {/* Header */}
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">

          
        </div>
      </div>

      
      <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="col-span-1 text-gray-400 text-xs font-mono uppercase">RANK</div>
        <div className="col-span-4 text-gray-400 text-xs font-mono uppercase">AGENT ID</div>
        <div className="col-span-3 text-gray-400 text-xs font-mono uppercase">SCORE</div>
        
        <div className="col-span-4 text-gray-400 text-xs font-mono uppercase">TIMESTAMP</div>
      </div>


      <div className="max-h-96 overflow-y-auto">
        {leaderboard.map((entry, index) => {
          const isCurrentPlayer = currentPlayerName === entry.playerName;
          const classification = getClassification(entry.score);
          const classColor = getClassificationColor(classification);
          
          return (
            <div
              key={entry.id}
              className={`grid grid-cols-12 gap-4 p-4 border-b border-gray-800 hover:bg-gray-800/30 transition-colors ${
                isCurrentPlayer ? 'bg-green-900/20 border-green-600/50' : ''
              }`}
            >
             
              <div className="col-span-1 text-white font-mono font-bold">
                {String(index + 1).padStart(2, '0')}
              </div>
              
             
              <div className="col-span-4">
                <div className={`font-mono ${isCurrentPlayer ? 'text-green-300' : 'text-white'}`}>
                  {entry.playerName}
                </div>
                {isCurrentPlayer && (
                  <div className="text-green-400 text-xs font-mono">CURRENT SESSION</div>
                )}
              </div>
              
      
              <div className="col-span-3">
                <div className={`font-mono font-bold ${isCurrentPlayer ? 'text-green-300' : 'text-cyan-400'}`}>
                  {entry.score.toLocaleString()}
                </div>
              </div>
              
            
             
              
            
              <div className="col-span-4 text-gray-400 font-mono text-xs">
                {new Date(entry.createdAt).toLocaleDateString('en-US', { 
                  month: '2-digit', 
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          );
        })}
      </div>

  
      {leaderboard.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 font-mono text-lg mb-2">NO ACTIVE THREATS</div>
          <div className="text-gray-600 font-mono text-sm">Security database is empty</div>
        </div>
      )}

      {currentPlayerName && currentScore !== undefined && (
        <div className="border-t border-gray-700 p-4 bg-gray-800/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            
         
          </div>
        </div>
      )}

      
      
    </div>
  );
}

