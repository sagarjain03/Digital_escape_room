import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Score from "./Score";
import { updateScore } from "../redux/points/pointsSlice";
import { startTimer, stopTimer, resetTimer, incrementTime } from "../redux/timer/timerSlice";

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
  const [gameState, setGameState] = useState("playing");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(resetTimer());
    dispatch(startTimer());
  };

  const handleSubmit = () => {
    if (userInput.trim() === original) {
      setGameState("won");
      dispatch(updateScore(levels[difficulty].points));
      setTimeout(() => navigate("/reaction"), 2000);
    } else {
      setGameState("lost");
    }
  };

  return (
    <>
    <Score />
    <div className="bg-white text-black h-screen w-screen flex flex-col justify-center items-center text-center">
      <h2 className="text-2xl font-bold mb-4">🔐 Cipher String Game</h2>

      <div className="mb-4">
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`m-1 px-4 py-2 rounded ${
              difficulty === level ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {gameState === "playing" && (
        <>
          <p className="text-lg my-4">🔀 Scrambled: {scrambled}</p>
          <input
            type="text"
            placeholder="Type the correct sentence"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="p-2 w-80 border rounded-md"
          />
          <br />
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>
        </>
      )}

      {gameState === "won" && (
        <div className="mt-4 text-green-600">
          <h2 className="text-xl font-bold">🎉 Congratulations! You Won! 🎉</h2>
          <p>Redirecting to Reaction Game...</p>
        </div>
      )}

      {gameState === "lost" && (
        <div className="mt-4 text-red-600">
          <h2 className="text-xl font-bold">❌ Try Again! ❌</h2>
          <button
            onClick={startNewGame}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            Retry
          </button>
        </div>
      )}
    </div>
    </>
  );
  
};

export default CipherString;
