import React from "react";
import { useSelector } from "react-redux";

const Score = () => {
  const score = useSelector((state) => state.points.score); // Get score from Redux

  return (
    <div className="text-center p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Score</h2>
      <p className="text-4xl mt-2">{score}</p>
    </div>
  );
};

export default Score;
