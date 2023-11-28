import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./slices/products/productSlice";
import toastSlice from "./slices/toast/toastSlice";
export const store = configureStore({
  reducer: {
    toast: toastSlice,
    items: itemSlice,
  },
});
