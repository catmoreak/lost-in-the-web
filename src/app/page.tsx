import Link from "next/link";
import GameCanvas from "./_components/GameCanvas";
import "./game/game.css";

export default function Home() {
  return (
    <main className="game-container">
      <GameCanvas />
      <div className="game-content">
        <h1 className="game-title">Lost in the Web</h1>
        <p className="game-text">
          You are a digital explorer, lost in the vast and intricate network of the internet. To find your way back, you must solve a series of puzzles and challenges that will test your knowledge of the web.
        </p>
        <Link href="/game" className="game-button">
          Start Game
        </Link>
      </div>
    </main>
  );
}
