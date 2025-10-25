
'use client';

import RealtimeLeaderboard from "~/components/RealtimeLeaderboard";

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-gray-900 text-green-400 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-linear-to-r from-green-400 to-cyan-400 bg-clip-text mb-4 font-mono">
            Reality Hackers Leaderboard
          </h1>
          <p className="text-green-400/80 text-lg">
            The legends who escaped the digital void
          </p>
        </div>
        
        <RealtimeLeaderboard />
        
        <div className="text-center mt-8">
          <a 
            href="/game" 
            className="inline-block px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors border border-green-400"
          >
            Enter the Matrix
          </a>
        </div>
      </div>
    </div>
  );
}




