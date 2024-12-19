import React, { useState } from "react";
import "../css/NameEntry.css";

interface NameEntryProps {
  onSubmit: (name: string) => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>(
    () => sessionStorage.getItem("playerName") || ""
  );

  const handleNameSubmit = () => {
    sessionStorage.setItem("playerName", name);
    onSubmit(name);
  };

  return (
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
  );
};

export default NameEntry;
