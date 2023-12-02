import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/products/productSlice";
import toastSlice from "./slices/toast/toastSlice";
export const store = configureStore({
  reducer: {
    toast: toastSlice,
    products: productSlice,
  },
});
