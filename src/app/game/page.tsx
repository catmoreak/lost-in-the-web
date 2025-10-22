import Link from "next/link";
import GameCanvas from "../_components/GameCanvas";
import "./game.css";

export default function Game() {
  return (
    <main className="game-container bg-black text-green-400 font-mono">
      <GameCanvas />
      <div className="game-content transform rotate-x-6">
        <h1 className="game-title text-shadow-glow text-4xl mb-4">Lost in the Web</h1>
        <p className="game-text text-shadow-glow mb-2">
          You wake up in a strange place. It feels like... the internet.
        </p>
        <p className="game-text text-shadow-glow mb-4">
          You see a single button. What does it do?
        </p>
        <Link href="/game/level2" className="game-button px-6 py-3 bg-green-700 text-black rounded-lg shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-green-400">
          Escape?
        </Link>
        {/* The first clue is hidden here. The flag is: flag{w3lc0me_t0_th3_w3b} */}
      </div>
    </main>
  );
}

