import React, { useState } from "react";
import NameEntry from "./components/NameEntry";
import GameBoard from "./components/GameBoard";
import "./css/App.css";

const App: React.FC = () => {
  const [name, setName] = useState<string>(sessionStorage.getItem("playerName") || "");
  const [nameEntered, setNameEntered] = useState<boolean>(!!sessionStorage.getItem("playerName"));

  const handleNameSubmit = (name: string) => {
    setName(name);
    setNameEntered(true);
  };

  const handleGameOver = () => {
    setNameEntered(false);
  };

  const handleNextRound = () => {
    setNameEntered(true); // Or handle round-specific logic here
  };

  return (
    <div className="App">
      {!nameEntered ? (
        <NameEntry onSubmit={handleNameSubmit} />
      ) : (
        <GameBoard name={name} onGameOver={handleGameOver} onNextRound={handleNextRound} />
      )}
    </div>
  );
};

export default App;
