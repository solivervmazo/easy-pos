import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastQueue: [],
  onQueue: {},
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addQueueAction: (state, payload) => {
      return {
        ...state,
        // toastQueue: state.toastQueue.push(payload?.payload),
      };
    },
    getQueueAction: (state, payload) => {
      return {
        ...state,
        onQueue: state.toastQueue.pop(),
        toastQueue: state.toastQueue,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQueueAction, getQueueAction } = toastSlice.actions;
export default toastSlice.reducer;
