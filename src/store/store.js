import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/products/productSlice";
import toastSlice from "./slices/toast/toastSlice";
import categoriesSlice from "./slices/products/categoriesSlice";
export const store = configureStore({
  reducer: {
    toast: toastSlice,
    products: productSlice,
    categories: categoriesSlice,
  },
});
