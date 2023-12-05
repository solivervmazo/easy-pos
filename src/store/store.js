import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/products/productSlice";
import toastSlice from "./slices/toast/toastSlice";
import headerSlice from "./slices/header/headerSlice";
export const store = configureStore({
  reducer: {
    header: headerSlice,
    toast: toastSlice,
    products: productSlice,
  },
});
