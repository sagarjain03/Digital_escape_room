import { configureStore } from "@reduxjs/toolkit";
import pointsReducer from './points/pointsSlice'
import timerReducer from './timer/timerSlice'

const store = configureStore({
  reducer: {
    points: pointsReducer,
    timer: timerReducer,
  },
});

export default store;
