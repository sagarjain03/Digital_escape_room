import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementTime } from "../redux/timer/timerSlice";


  const Score = () => {


  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.timer.isRunning);
  const time = useSelector((state) => state.timer.time);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch(incrementTime());
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);


  const score = useSelector((state) => state.points.score); // Get score from Redux

  return (
    <div className="text-center p-4 bg-white text-black rounded-lg shadow-lg">
      <div className="flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Score</h2>
          <p className="text-4xl mt-2">{score}</p>
        </div>

        <div>
        <h2 className="text-2xl font-bold">Time</h2>
        <p className="text-4xl mt-2">0{Math.floor(time/60)}:{time%60}</p>
        </div>
      </div>
    </div>
  );
};

export default Score;
