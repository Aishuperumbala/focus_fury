import React, { useState, useEffect } from 'react';
import './App.css';

interface Ball {
  id: number;
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [balls, setBalls] = useState<Ball[]>([]);
  const [clickedCount, setClickedCount] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [message, setMessage] = useState<string>(''); // New state to display message

  useEffect(() => {
    if (!started || gameOver) return;

    let ballId = 0;
    const interval = setInterval(() => {
      if (ballId >= 50) {
        clearInterval(interval);
        setGameOver(true);
        return;
      }

      const newBall: Ball = {
        id: ballId,
        x: Math.random() * 470, // Random position inside 500px box
        y: Math.random() * 470,
      };

      setBalls((prev) => [...prev, newBall]);

      setTimeout(() => {
        setBalls((prev) => prev.filter((ball) => ball.id !== newBall.id));
      }, 3000);

      ballId++;
    }, 500);

    return () => clearInterval(interval);
  }, [started, gameOver]);

  const handleBallClick = (id: number) => {
    setBalls((prev) => prev.filter((ball) => ball.id !== id));
    setClickedCount((prev) => prev + 1);
    setMessage('Ball Clicked!'); // Display message when ball is clicked

    setTimeout(() => {
      setMessage(''); // Clear the message after 1 second
    }, 1000);
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
  };

  return (
    <div className="App">
      <h1>Focus Fury</h1>
      <h2>Round: {round}</h2>
      <h2>Score: {clickedCount}</h2>
      
      {gameOver ? (
        <>
          <h2>Game Over!</h2>
          <button onClick={startNextRound}>Next Round</button>
          <button onClick={restartGame}>Restart Game</button>
        </>
      ) : !started ? (
        <button onClick={startGame}>Start Game</button>
      ) : (
        <>
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
      {message && <div className="message">{message}</div>} {/* Show message here */}</>)}
    </div>
  );
};

export default App;
