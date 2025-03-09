import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { FaLock, FaStopwatch, FaBrain, FaPuzzlePiece, FaRocket, FaPlay } from "react-icons/fa";

const Home = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-[#1F1C2C] via-[#3A354D] to-[#928DAB] text-[#928DAB]">
      <div className="w-full bg-transparent px-6 py-4 mb-36">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-white hover:scale-110 hover:text-[#928DAB] transition-all">
            Digital Escape Room
          </Link>

          <div className="flex-1" />

          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link
                to="/string-game"
                className="text-lg text-white hover:scale-110 hover:text-[#928DAB] transition-all"
              >
                Let's Go 🎯
              </Link>
              <UserButton />
            </div>
          ) : (
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-gray-500 text-[#928DAB] rounded">
                <SignUpButton />
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded">
                <SignInButton />
              </button>
            </div>
          )}
        </div>
      </div>

      <h1 className="text-8xl text-white font-bold mb-3">
        Welcome to the Digital Escape Room!
      </h1>
      <p className="text-2xl max-w-7xl opacity-90">
        You find yourself trapped in a digital labyrinth. Only <i className="text-white">your intelligence, speed, and memory </i>can set you free!  
        Solve puzzles, react fast, remember sequences, and <i className="text-white">crack the final mystery</i> to escape! 🚪💨
      </p>

      <hr className="my-5 border-gray-500 w-full" />

      <div className="flex gap-4 my-4">
        <span className="text-lg px-4 py-2 rounded-full bg-green-500 text-white">Easy → 10 Points</span>
        <span className="text-lg px-4 py-2 rounded-full bg-yellow-500 text-white">Medium → 20 Points</span>
        <span className="text-lg px-4 py-2 rounded-full bg-red-500 text-white">Hard → 30 Points</span>
      </div>
      <p className="text-lg italic">🛑 BUT… You must pass <i className="text-white">ALL 4 CHALLENGES</i> to escape! Think you're up for it?</p>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {[
          { icon: FaLock, color: "text-blue-400", title: " Round 1: Cipher String – Unjumble the Code!", description: "Decipher the scrambled code before time runs out! Can you find the hidden word? " },
          { icon: FaStopwatch, color: "text-yellow-400", title: " Round 2: Reaction Game – Click Before It's Too Late!", description: "Test your reflexes! Click the button as FAST as you can! " },
          { icon: FaBrain, color: "text-purple-400", title: " Round 3: Sequence Memory – Remember or Restart!", description: "Memorize the sequence… but can you recall it correctly? " },
          { icon: FaPuzzlePiece, color: "text-teal-400", title: " Round 4: Guess & Gather – Match the Pairs!", description: "Find and match all pairs before the clock runs out! " }
        ].map((round, index) => (
          <div
            key={index}
            className="w-full max-w-md p-5 bg-[#1F1C2C] rounded-md border-2 border-[#928DAB] shadow-lg m-3 transition-all duration-300 hover:bg-[#928DAB] hover:text-[#1F1C2C] hover:scale-105"
          >
            <div className="flex gap-3 items-center">
              <round.icon className={`w-6 h-6 ${round.color}`} />
              <p className="text-xl font-bold">{round.title}</p>
            </div>
            <p className="mt-2 text-md opacity-80">{round.description}</p>
          </div>
        ))}
      </div>
      <p className="text-lg font-bold text-[#1F1C2C] mt-6">
        🔓 The final lock is right in front of you—can you <i>crack the code and escape victoriously?</i>🚀🏆
      </p>

      <button
        className="mt-5 px-6 py-3 text-xl font-bold bg-[#1F1C2C] text-[#928DAB] hover:bg-[#928DAB] hover:text-[#1F1C2C] hover:scale-110 transition-all duration-300 flex items-center gap-2"
        onClick={() => navigate("/string-game")}
      >
        <FaPlay />
        Start Your Escape Adventure 🚀
      </button>
    </div>
  );
};

export default Home;