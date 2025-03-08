import { createSlice } from "@reduxjs/toolkit";

const scoreSlice = createSlice({
  name: "points",
  initialState: { score: 0 },
  reducers: {
    updateScore: (state, action) => {
      state.score += action.payload; // Add points
    },
  },
});

export const { updateScore } = scoreSlice.actions;
export default scoreSlice.reducer;
