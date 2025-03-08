import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateScore } from "../redux/points/pointsSlice";
import { stopTimer } from "../redux/timer/timerSlice";

const GuessAndG = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [gridSize, setGridSize] = useState(6);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);
  const [score, setScore] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Set grid size based on difficulty
  useEffect(() => {
    const difficultySettings = {
      easy: 4,
      medium: 6,
      hard: 8,
    };
    setGridSize(difficultySettings[difficulty]);
  }, [difficulty]);

  // Initialize the game
  const initialGame = () => {
    setWon(false);
    setScore(0);
    const totalCards = gridSize * gridSize;
    const pairCount = Math.floor(totalCards / 2);
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);

    // Shuffle and create pairs
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => ({
        id: index,
        number,
      }));

    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
  };

  useEffect(() => {
    initialGame();
  }, [gridSize]);

  // Handle card click
  const handleClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      setFlipped([...flipped, id]);
      setDisabled(true);

      const firstCard = cards.find((card) => card.id === flipped[0]);
      const secondCard = cards.find((card) => card.id === id);

      if (firstCard.number === secondCard.number) {
        setTimeout(() => {
          setSolved([...solved, firstCard.id, secondCard.id]);
          setFlipped([]);
          setDisabled(false);
        }, 800);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  // Check if the game is won and navigate to Leaderboard
  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);
      const points = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30;
      dispatch(updateScore(points));
      setScore(points);
      dispatch(stopTimer());

      // Navigate to the leaderboard after 2 seconds
      setTimeout(() => {
        navigate("/Leaderboard");
      }, 2000);
    }
  }, [solved, cards, difficulty, dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Guess and Gather</h1>

      {/* Difficulty Selection */}
      <div className="flex gap-4 mb-4">
        {["easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => setDifficulty(level)}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              difficulty === level ? "bg-blue-600 text-white" : "bg-gray-300"
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Winning Message & Score */}
      {won && <p className="text-xl text-green-600 font-bold mb-4">🎉 You won! Score: {score} 🎉</p>}

      {/* Game Grid */}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className={`flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                        shadow-md border rounded-lg text-xl font-bold cursor-pointer 
                        transition duration-300 
                        ${
                          solved.includes(card.id)
                            ? "bg-green-500 text-white"
                            : flipped.includes(card.id)
                            ? "bg-blue-400 text-white"
                            : "bg-white text-gray-800 hover:bg-blue-100"
                        }`}
            onClick={() => handleClick(card.id)}
          >
            {flipped.includes(card.id) || solved.includes(card.id) ? card.number : "?"}
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default GuessAndG;
