import React, { useState, useEffect } from "react";
import { Ball } from "../types/Ball"; 
import "../css/GameBoard.css"; 

interface GameBoardProps {
  name: string;
  onGameOver: () => void;
  onNextRound: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ name, onGameOver, onNextRound }) => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [clickedCount, setClickedCount] = useState(0);
  const [round, setRound] = useState(1);
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!started || gameOver) return;

    let ballId = 0;
    const interval = setInterval(() => {
      if (ballId >= 50) {
        clearInterval(interval);
        setGameOver(true);
        onGameOver();
        return;
      }

      const newBall: Ball = {
        id: ballId,
        x: Math.random() * 470,
        y: Math.random() * 470,
      };

      setBalls((prev) => [...prev, newBall]);

      setTimeout(() => {
        setBalls((prev) => prev.filter((ball) => ball.id !== newBall.id));
      }, 3000);

      ballId++;
    }, 500);

    return () => clearInterval(interval);
  }, [started, gameOver, onGameOver]);

  const handleBallClick = (id: number) => {
    setBalls((prev) => prev.filter((ball) => ball.id !== id));
    setClickedCount((prev) => prev + 1);
    setMessage("Ball Clicked!");
    setTimeout(() => setMessage(""), 1000);
  };

  const startGame = () => {
    setBalls([]);
    setClickedCount(0);
    setGameOver(false);
    setStarted(true);
  };

  const restartGame = () => {
    setBalls([]);
    setClickedCount(0);
    setGameOver(false);
    setStarted(false);
    setRound(1);
  };

  const startNextRound = () => {
    setBalls([]);
    setClickedCount(0);
    setGameOver(false);
    setStarted(true);
    setRound((prev) => prev + 1);
    onNextRound();
  };

  return (
    <div className="game-board">
      <h1>Focus Frenzy</h1>
      <h2 className="name">Welcome, {name}!</h2>
      <div className="status-box">
        <div className="status-item">Round: {round}</div>
        <div className="status-item">Score: {clickedCount}</div>
      </div>
      {message && <div className="message">{message}</div>}
      {gameOver ? (
        <>
          <div className="button-row">
            <button onClick={startNextRound}>Next Round</button>
            <button onClick={restartGame}>Restart Game</button>
          </div>
          <h2 className="game-over">Game Over!</h2>
        </>
      ) : !started ? (
        <button onClick={startGame}>Start Game</button>
      ) : null}
      <div className="game-area">
        {balls.map((ball) => (
          <div
            key={ball.id}
            className="ball"
            style={{ top: ball.y, left: ball.x }}
            onClick={() => handleBallClick(ball.id)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
