import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastQueue: [],
  onQueue: {},
};

export const toastSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addQueueAction: (state, payload) => {
      console.log(payload);
      state.toastQueue.push(payload?.payload);
    },
    getQueueAction: (state, payload) => {
      state.onQueue = state.toastQueue.pop();
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQueueAction, getQueueAction } = toastSlice.actions;
export default toastSlice.reducer;
