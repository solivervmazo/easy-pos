import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./slices/products/productSlice";
export const store = configureStore({
  reducer: {
    items: itemSlice,
  },
});
