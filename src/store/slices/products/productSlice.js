import { createSelector, createSlice } from "@reduxjs/toolkit";
import { FormState, RequestState, SpinnerState } from "../../../enums/";

import {
  fetchProductAction,
  fetchProductActionBuilder,
  fetchProductDetailAction,
  fetchProductDetailBuilder,
  insertProductAction,
  insertProductBuilder,
  generateProjectIdAction,
  generateProjectIdBuilder,
  updateProductAction,
  updateProductBuilder,
} from "./actions/products";

import {
  fetchCategoryAction,
  fetchCategoryActionBuilder,
  fetchCategoryDetailAction,
  fetchCategoryDetailBuilder,
  insertCategoryAction,
  insertCategoryBuilder,
  // generateProjectIdAction,
  // generateProjectIdBuilder,
  updateCategoryAction,
  updateCategoryBuilder,
} from "./actions/categories";

import {
  fetchProductVariationAction,
  fetchProductVariationActionBuilder,
  fetchProductVariationDetailAction,
  fetchProductVariationDetailBuilder,
  insertProductVariationAction,
  insertProductVariationBuilder,
  // generateProjectIdAction,
  // generateProjectIdBuilder,
  updateProductVariationAction,
  updateProductVariationBuilder,
} from "./actions/productVariations";

const initialState = {
  screenProductSpinner: SpinnerState.show,
  productForm: undefined,
  productTable: {
    state: RequestState.idle,
    data: undefined,
  },
  /**categories */
  screenCategorySpinner: SpinnerState.show,
  categoryForm: undefined,
  categoryTable: {
    state: RequestState.idle,
    data: undefined,
  },
  /**variations */
  screenVariationsCategory: SpinnerState.show,
  productVariationForm: undefined,
  productVariationTable: {
    state: RequestState.idle,
    data: undefined,
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    /**products */
    restartProductFormAction: (state) => {
      return {
        ...state,
        productForm: undefined,
      };
    },
    updateProductFormAction: (state, { payload }) => {
      state.productForm.state = payload.state || FormState.editing;
      if (payload.body) state.productForm.body = payload.body;
    },
    /**categories */
    restartCategoryFormAction: (state) => {
      return {
        ...state,
        categoryForm: undefined,
      };
    },
    updateCategoryFormAction: (state, { payload }) => {
      state.categoryForm.state = payload.state || FormState.editing;
      if (payload.body) state.categoryForm.body = payload.body;
    },
    /**varaitions */
    restartProductVariationFormAction: (state) => {
      return {
        ...state,
        productVariationForm: undefined,
      };
    },
    updateProductVariationFormAction: (state, { payload }) => {
      state.productVariationForm.state = payload.state || FormState.editing;
      if (payload.body) state.productVariationForm.body = payload.body;
    },
  },
  extraReducers: (builder) => {
    /**products */
    fetchProductActionBuilder(builder);
    fetchProductDetailBuilder(builder);
    insertProductBuilder(builder);
    generateProjectIdBuilder(builder);
    updateProductBuilder(builder);
    /**categories**/
    fetchCategoryActionBuilder(builder);
    fetchCategoryDetailBuilder(builder);
    insertCategoryBuilder(builder);
    // generateProjectIdBuilder(builder);
    updateCategoryBuilder(builder);
    /**variations */
    fetchProductVariationActionBuilder(builder);
    fetchProductVariationDetailBuilder(builder);
    insertProductVariationBuilder(builder);
    updateProductVariationBuilder(builder);
  },
});

// Action creators are generated for each case reducer function

/**products */
export const { restartProductFormAction, updateProductFormAction } =
  productSlice.actions;
export {
  fetchProductAction,
  insertProductAction,
  fetchProductDetailAction,
  generateProjectIdAction,
  updateProductAction,
};
export const productTableSelector = (state) => state.products.productTable;
export const productFormSelector = (state) => state.products.productForm;

/**categories */
export const { restartCategoryFormAction, updateCategoryFormAction } =
  productSlice.actions;
export {
  fetchCategoryAction,
  insertCategoryAction,
  fetchCategoryDetailAction,
  // generateProjectIdAction,
  updateCategoryAction,
};
export const categoryTableSelector = (state) => state.products.categoryTable;

// export const categoryListSelector = (state, { level }) =>
//   makeCategoryListSelector()(state, { level });

export const categoryListSelector = createSelector(
  [
    categoryTableSelector,
    (state, { categoryLookup }) => categoryLookup,
    (state, { rootLookup }) => rootLookup,
  ],
  (table, categoryLookup, rootLookup) =>
    table.data.filter(
      (row) =>
        row.id != categoryLookup &&
        row.categoryRootId != categoryLookup &&
        (row.categoryRootId != rootLookup || row.categoryRootId == 0)
    )
);
export const categoryFormSelector = (state) => state.products.categoryForm;

/**variations */
export const {
  restartProductVariationFormAction,
  updateProductVariationFormAction,
} = productSlice.actions;
export {
  fetchProductVariationAction,
  insertProductVariationAction,
  fetchProductVariationDetailAction,
  updateProductVariationAction,
};
export const productVariationTableSelector = (state) =>
  state.products.productVariationTable;

export const productVariationFormSelector = (state) =>
  state.products.productVariationForm;

export default productSlice.reducer;
