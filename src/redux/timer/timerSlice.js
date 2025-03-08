import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    time: 0,      // Timer starts at 0
    isRunning: false, // Tracks if the timer is running
    intervalId: null, // Stores the interval ID for clearing it later
  },
  reducers: {
    startTimer: (state) => {
      if (!state.isRunning) {
        state.isRunning = true;
      }
    },
    stopTimer: (state) => {
      state.isRunning = false;
      state.intervalId = null;
    },
    resetTimer: (state) => {
      state.time = 0;
      state.isRunning = false;
      state.intervalId = null;
    },
    incrementTime: (state) => {
      if (state.isRunning) {
        state.time += 1;
      }
    },
  },
});

export const { startTimer, stopTimer, resetTimer, incrementTime } = timerSlice.actions;
export default timerSlice.reducer;
