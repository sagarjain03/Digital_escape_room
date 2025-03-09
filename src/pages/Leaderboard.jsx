import React from 'react';
import { useSelector } from 'react-redux';

const Leaderboard = () => {

  // Access Redux state for points and timer
  const userScore = useSelector((state) => state.points.score);
  const userTime = useSelector((state) => state.timer.time);

  const leaderboardData = [
    { id: 1, name: 'Sagar', score: 35, time: '1:30' },
    { id: 2, name: 'Vidhit', score: 34, time: '1:45' },
    { id: 3, name: 'Gaurav', score: 33, time: '2:00' },
    { id: 4, name: 'Shreya', score: 32, time: '2:15' },
    { id: 5, name: 'Yogesh', score: 31, time: '2:30' },
    { id: 6, name: 'You', score: userScore, time: `${Math.floor(userTime / 60)}:${userTime % 60 < 10 ? '0' : ''}${userTime % 60}` }
  ];
  
  const sortedLeaderboard = [...leaderboardData].sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
      <h1 className="text-5xl font-bold mb-6 text-center">🎉🎯 CONGRATULATIONS! YOU ESCAPED THE ROOM 🏆🔓</h1>
      <h2 className="text-4xl font-bold mb-8">Leaderboard</h2>
      <div className="w-full max-w-3xl bg-gray-100 rounded-lg shadow-2xl p-6">
        <div className="grid grid-cols-4 gap-4 font-semibold text-lg border-b border-gray-400 pb-4 mb-4">
          <div>Rank</div>
          <div>Name</div>
          <div>Score</div>
          <div>Time</div>
        </div>

        {/* Leaderboard Rows */}
        {sortedLeaderboard.map((entry, index) => (
          <div
            key={entry.id}
            className="grid grid-cols-4 gap-4 text-lg py-3 hover:bg-gray-200 rounded-lg transition-all duration-200"
          >
            <div>#{index + 1}</div>
            <div>{entry.name}</div>
            <div>{entry.score}</div>
            <div>{entry.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
