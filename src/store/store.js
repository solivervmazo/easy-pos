import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./slices/itemSlice";
export const store = configureStore({
  reducer: {
    items: itemSlice,
  },
});
