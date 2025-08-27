import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  roomId: string | null;
}

const initialState: InitialState = {
  roomId: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    add: (state, action) => {
      state.roomId = action.payload.roomId;
    },
    remove: (state) => {
      state.roomId = null;
    },
  },
});

export const { add, remove } = roomSlice.actions;
export default roomSlice.reducer;
