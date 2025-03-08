import React, { useState, useEffect } from "react";

const levels = {
  easy: { points: 10, strings: ["Hello, World!", "React is fun"] },
  medium: { points: 20, strings: ["Scrambled words are tricky", "JavaScript Rocks!"] },
  hard: { points: 30, strings: ["Complexity is the enemy of execution", "Encrypt this text!"] },
};

const shuffleString = (str) => {
  return str
    .split(" ")
    .map((word) => word.split("").sort(() => Math.random() - 0.5).join(""))
    .join(" ");
};

const CipherString = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [scrambled, setScrambled] = useState("");
  const [original, setOriginal] = useState("");
  const [userInput, setUserInput] = useState("");
  const [gameState, setGameState] = useState("playing"); // playing | won | lost
  const [points, setPoints] = useState(0);

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const startNewGame = () => {
    const words = levels[difficulty].strings;
    const chosen = words[Math.floor(Math.random() * words.length)];
    setOriginal(chosen);
    setScrambled(shuffleString(chosen));
    setUserInput("");
    setGameState("playing");
  };

  const handleSubmit = () => {
    if (userInput.trim() === original) {
      setGameState("won");
      setPoints(levels[difficulty].points);
    } else {
      setGameState("lost");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#121212",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h2>🔐 Cipher String Game</h2>
      <div>
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            style={{
              margin: "5px",
              padding: "10px",
              background: difficulty === level ? "#4c8bf5" : "#555",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {gameState === "playing" && (
        <>
          <p style={{ fontSize: "18px", margin: "20px 0" }}>🔀 Scrambled: {scrambled}</p>
          <input
            type="text"
            placeholder="Type the correct sentence"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{
              padding: "10px",
              width: "80%",
              maxWidth: "400px",
              borderRadius: "5px",
            }}
          />
          <br />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              background: "green",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Submit
          </button>
        </>
      )}

      {gameState === "won" && (
        <div style={{ marginTop: "20px", color: "lime" }}>
          <h2>🎉 Congratulations! You Won! 🎉</h2>
          <p>You earned {points} points!</p>
          <button
            onClick={startNewGame}
            style={{
              padding: "10px 20px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Play Again
          </button>
        </div>
      )}

      {gameState === "lost" && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h2>❌ Try Again! ❌</h2>
          <p>The correct sentence was: "{original}"</p>
          <button
            onClick={startNewGame}
            style={{
              padding: "10px 20px",
              background: "blue",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default CipherString;
