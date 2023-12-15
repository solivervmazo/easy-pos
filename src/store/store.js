import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/store";
import appSlice from "../my-app/store/";
export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
  },
});
