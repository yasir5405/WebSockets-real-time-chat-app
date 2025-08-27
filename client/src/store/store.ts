import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./roomIdSLice";

export const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});
