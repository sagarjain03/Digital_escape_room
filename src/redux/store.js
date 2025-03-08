import { configureStore } from "@reduxjs/toolkit";
import pointsReducer from './points/pointsSlice'
const store = configureStore({
  reducer: {
    points: pointsReducer,
  },
});

export default store;
