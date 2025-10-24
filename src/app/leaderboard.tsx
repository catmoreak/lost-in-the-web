
import { useEffect, useState } from "react";
type LeaderboardEntry = { name: string; score: number };

const API_URL = "http://localhost:3000/api/leaderboard"; // Replace with your actual API endpoint

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [prevScores, setPrevScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => {
       
        const sorted = [...json].sort((a, b) => b.score - a.score);
        
        setPrevScores((prev) => {
          const newPrev: Record<string, number> = {};
          sorted.forEach(entry => {
            newPrev[entry.name] = prev[entry.name] ?? entry.score;
          });
          return newPrev;
        });
        setLeaderboardData(sorted);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-yellow-400 text-2xl">Loading leaderboard...</div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400 text-2xl">Error: {error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to- from-slate-900 via-yellow-900 to-slate-900 text-white flex items-center justify-center px-2">
      <div className="coc-card max-w-2xl w-full mx-auto p-8 shadow-2xl relative" style={{ border: '5px solid var(--coc-border)', borderRadius: '24px', background: '#3a2f1b', boxShadow: '0 8px 32px #000a' }}>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center justify-center">
          <span style={{ fontSize: '4rem', color: '#e6b800', textShadow: '2px 2px 0 #a52a2a, 4px 4px 0 #000' }}>🏆</span>
        </div>
        <h1 className="text-5xl font-bold mb-6 text-yellow-400 tracking-wide" style={{ fontFamily: 'var(--coc-font)', textShadow: '2px 2px 0 var(--coc-border), 4px 4px 0 #000', marginTop: '2rem' }}>
          Leaderboard
        </h1>
        <table className="w-full text-lg mt-4" style={{ borderCollapse: 'separate', borderSpacing: '0 0.5em', background: '#2d230f', borderRadius: '16px' }}>
          <thead>
            <tr style={{ background: '#a52a2a44', color: '#e6b800', fontWeight: 700 }}>
              <th className="py-3 text-left pl-6 rounded-tl-xl" style={{ fontSize: '1.2rem' }}>Chief</th>
              <th className="py-3 text-right pr-6 rounded-tr-xl" style={{ fontSize: '1.2rem' }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.length === 0 ? (
              <tr>
                <td colSpan={2} className="py-8 text-center text-yellow-400 font-bold opacity-80" style={{ fontSize: '1.3rem' }}>
                  No scores yet. Be the first to claim glory!
                </td>
              </tr>
            ) : leaderboardData.map((entry, idx) => {
             
              let rowClass = "hover:bg-yellow-900/20 transition";
              let style: React.CSSProperties = { borderRadius: '12px' };
              if (idx === 0) {
                rowClass = "bg-yellow-900/60 animate-pulse";
                style.boxShadow = '0 2px 12px #e6b80099';
              } else if (idx === 1) {
                rowClass = "bg-yellow-900/40";
                style.boxShadow = '0 2px 8px #e6b80055';
              } else if (idx === 2) {
                rowClass = "bg-yellow-900/20";
                style.boxShadow = '0 2px 4px #e6b80033';
              }
            
              const prevScore = prevScores[entry.name] ?? entry.score;
              const scoreChanged = entry.score !== prevScore;
              return (
                <tr key={entry.name} className={rowClass} style={style}>
                  <td className="py-3 pl-6 font-bold flex items-center gap-2" style={{ color: idx < 3 ? '#e6b800' : '#fff', fontSize: idx === 0 ? '1.25rem' : '1.1rem' }}>
                    {idx === 0 && <span style={{ fontSize: '1.5rem', marginRight: '0.5em' }}>👑</span>}
                    {idx === 1 && <span style={{ fontSize: '1.2rem', marginRight: '0.5em' }}>🥈</span>}
                    {idx === 2 && <span style={{ fontSize: '1.1rem', marginRight: '0.5em' }}>🥉</span>}
                    {entry.name}
                  </td>
                  <td className="py-3 pr-6 text-right" style={{ color: idx < 3 ? '#e6b800' : '#fff', fontWeight: idx === 0 ? 700 : 500, fontSize: idx === 0 ? '1.25rem' : '1.1rem', transition: 'color 0.3s' }}>
                    <span style={{ transition: 'background 0.5s, color 0.5s', background: scoreChanged ? '#e6b80044' : undefined, borderRadius: '8px', padding: scoreChanged ? '0 0.5em' : undefined }}>
                      {entry.score}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}




