import React, { useState, useEffect } from "react";
import "./App.css";

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
  const [message, setMessage] = useState<string>(""); // Message state
  const [name, setName] = useState<string>(
    () => sessionStorage.getItem("playerName") || ""
  ); // Player name
  const [nameEntered, setNameEntered] = useState<boolean>(
    !!sessionStorage.getItem("playerName")
  );

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
    setMessage("Ball Clicked!");
    setTimeout(() => setMessage(""), 1000); // Clear message after 1 second
  };

  const handleNameSubmit = () => {
    sessionStorage.setItem("playerName", name);
    setNameEntered(true);
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
      {!nameEntered ? (
        <div className="name-entry">
          <h1>Welcome to Focus Frenzy!</h1>
          <p>Enter Your Name to Start:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
          />
          <button onClick={handleNameSubmit} disabled={!name.trim()}>
            Submit
          </button>
        </div>
      ) : (
        <>
          <h1 >Focus Frenzy</h1>
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
        </>
      )}
    </div>
  );
};

export default App;
