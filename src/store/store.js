import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/store";
import appSlice from "../my-app/store/";
import posSlice from "../features/pos/store/";
export const store = configureStore({
  reducer: {
    app: appSlice,
    products: productSlice,
    pos: posSlice,
  },
});
