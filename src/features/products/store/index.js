import { createSelector, createSlice } from "@reduxjs/toolkit";
import { categoryCreators } from "./actions/categories";
import { productCreators } from "./actions/products";
const initialState = {
  ...productCreators.state,
  ...categoryCreators.state,
};

const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    restartProductFormAction: productCreators.actions.restartForm,
    updateProductFormAction: productCreators.actions.updateForm,
    restartCategoryFormAction: categoryCreators.actions.restartForm,
    updateCategoryFormAction: categoryCreators.actions.updateForm,
  },
  extraReducers: (builder) => {
    productCreators.builder(builder);
    categoryCreators.builder(builder);
  },
});

const productTableSelector = (state) => state.products.productTable;
const categoryTableSelector = (state) => state.products.categoryTable;

export default productSlice = slice.reducer;

export const productStore = {
  products: {
    actions: {
      restartForm: slice.actions.restartProductFormAction,
      updateForm: slice.actions.updateProductFormAction,
      ...productCreators.creators,
    },
    selectors: {
      formSelector: (state) => state.products.productForm,
      tableSelector: (state) => productTableSelector(state),
    },
  },
  categories: {
    actions: {
      restartForm: slice.actions.restartCategoryFormAction,
      updateForm: slice.actions.updateCategoryFormAction,
      ...categoryCreators.creators,
    },
    selectors: {
      formSelector: (state) => state.products.categoryForm,
      tableSelector: (state) => state.products.categoryTable,
      listSelector: createSelector(
        [
          (state, { table }) => table || categoryTableSelector(state),
          (state, { categoryLookup }) => categoryLookup,
          (state, { rootLookup }) => rootLookup,
        ],
        (table, categoryLookup, rootLookup) =>
          []
            .concat(table.data ?? [])
            .filter(
              (row) =>
                row.id != categoryLookup &&
                row.categoryRootId != categoryLookup &&
                (row.categoryRootId != rootLookup || row.categoryRootId == 0)
            )
      ),
    },
  },
};
