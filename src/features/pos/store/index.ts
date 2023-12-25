import { createSelector, createSlice } from "@reduxjs/toolkit";
import { posRegisterCreators } from "./cashRegister";

const initialState = {
  ...posRegisterCreators.state,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    posRegisterCreators.builder(builder);
  },
});

// const productTableSelector = (state) => state.products.productTable;
// const categoryTableSelector = (state) => state.products.categoryTable;

export default slice.reducer;

export const posStore = {
  registers: {
    actions: {
      //   restartForm: slice.actions.restartProductFormAction,
      ...posRegisterCreators.creators,
    },
    selectors: {
      //   formSelector: (state) => state.products.productForm,
      //   tableSelector: (state) => productTableSelector(state),
    },
  },
};
