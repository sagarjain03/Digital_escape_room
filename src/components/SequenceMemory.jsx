import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from "react-redux"; // Import useDispatch
import { updateScore } from "../redux/points/pointsSlice"; // Import updateScore action

export default function SequenceMemoryGame() {
  const navigate = useNavigate(); // Initialize navigate
  const dispatch = useDispatch(); // Initialize dispatch

  const difficulties = {
    easy: { gridSize: 3, maxLevel: 5, points: 10 },
    medium: { gridSize: 4, maxLevel: 8, points: 20 },
    hard: { gridSize: 5, maxLevel: 8, points: 30 },
  };

  const [difficulty, setDifficulty] = useState("easy");
  const [gridSize, setGridSize] = useState(difficulties.easy.gridSize);
  const [maxLevel, setMaxLevel] = useState(difficulties.easy.maxLevel);
  const [points, setPoints] = useState(difficulties.easy.points);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(0);
  const [clickedBox, setClickedBox] = useState(null);
  const [wrongBox, setWrongBox] = useState(null);
  const [victory, setVictory] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (userInput.length === sequence.length && sequence.length > 0) {
      checkUserInput();
    }
  }, [userInput]);

  useEffect(() => {
    if (victory) {
      dispatch(updateScore(difficulties[difficulty].points)); // Dispatch when victory is achieved
    }
  }, [victory, dispatch, score]);

  const startGame = () => {
    setGameOver(false);
    setVictory(false);
    setSequence([]);
    setUserInput([]);
    setClickedBox(null);
    setWrongBox(null);
    setShowingSequence(false);
    setScore(0);
    setLevel(0);

    setTimeout(() => nextRound([]), 100);
  };

  const nextRound = (prevSequence) => {
    if (level >= maxLevel) {
      setVictory(true);
      setScore((prevScore) => prevScore + points); // Increment score
      setTimeout(() => navigate("/guess"), 2000); // Redirect after 2 seconds
      return;
    }
    const newBox = Math.floor(Math.random() * (gridSize * gridSize));
    const newSequence = [...prevSequence, newBox];
    setSequence(newSequence);
    setUserInput([]);
    setShowingSequence(true);
    showSequence(newSequence);
  };

  const showSequence = (sequence) => {
    sequence.forEach((box, index) => {
      setTimeout(() => {
        document.getElementById(`box-${box}`)?.classList.add("bg-yellow-400");
        setTimeout(() => {
          document.getElementById(`box-${box}`)?.classList.remove("bg-yellow-400");
        }, 500);
      }, (index + 1) * 1000);
    });
    setTimeout(() => setShowingSequence(false), sequence.length * 1000 + 500);
  };

  const handleUserClick = (box) => {
    if (showingSequence || gameOver || victory) return;
    if (box !== sequence[userInput.length]) {
      setWrongBox(box);
      setTimeout(() => setWrongBox(null), 500);
      setGameOver(true);
      return;
    }
    setClickedBox(box);
    setTimeout(() => setClickedBox(null), 300);
    setUserInput([...userInput, box]);
  };

  const checkUserInput = () => {
    if (userInput.every((box, index) => box === sequence[index])) {
      setScore((prevScore) => prevScore + points); // Increment score after a correct sequence
  
      if (userInput.length === sequence.length && level === maxLevel - 1) {
        setVictory(true);
        setTimeout(() => navigate("/guess"), 2000); // Redirect after 2 seconds
        return;
      }
  
      setLevel((prevLevel) => prevLevel + 1);
      setTimeout(() => nextRound(sequence), 1000);
    } else {
      setGameOver(true);
    }
  };
  

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setGridSize(difficulties[newDifficulty].gridSize);
    setMaxLevel(difficulties[newDifficulty].maxLevel);
    setPoints(difficulties[newDifficulty].points);
    setGameOver(false);
    setVictory(false);
    setSequence([]);
    setUserInput([]);
    setLevel(0);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Sequence Memory Game</h1>
      <div className="mb-4">
        {Object.keys(difficulties).map((diff) => (
          <button
            key={diff}
            onClick={() => handleDifficultyChange(diff)}
            className={`px-4 py-2 mx-2 rounded ${
              difficulty === diff ? "bg-blue-500" : "bg-gray-700"
            }`}
          >
            {diff.charAt(0).toUpperCase() + diff.slice(1)}
          </button>
        ))}
      </div>
      {victory ? (
        <div>
          <p className="text-green-500 text-2xl font-bold">🎉 Congratulations! You Won! 🎉</p>
          <p>You earned : {difficulties[difficulty].points} points</p>
          <p>Redirecting to Guess the Number Game...</p>
          <button onClick={startGame} className="mt-4 px-4 py-2 bg-blue-500 rounded">
            Play Again
          </button>
        </div>
      ) : gameOver ? (
        <div>
          <p className="text-red-500 text-2xl font-bold">Game Over! Try Again</p>
          <button onClick={startGame} className="mt-4 px-4 py-2 bg-blue-500 rounded">
            Restart
          </button>
        </div>
      ) : (
        <>
          <p className="mb-2">Level: {level} / {maxLevel}</p>
          <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
            {[...Array(gridSize * gridSize)].map((_, index) => (
              <button
                key={index}
                id={`box-${index}`}
                onClick={() => handleUserClick(index)}
                className={`w-16 h-16 rounded-lg border border-gray-500 transition-colors duration-200 ${
                  clickedBox === index ? "bg-white" : wrongBox === index ? "bg-red-500" : "bg-gray-700"
                }`}
                disabled={showingSequence}
              ></button>
            ))}
          </div>
        </>
      )}
      {!gameOver && !victory && sequence.length === 0 && (
        <button onClick={startGame} className="mt-6 px-4 py-2 bg-blue-500 rounded text-white">
          Start Game
        </button>
      )}
    </div>
  );
}
