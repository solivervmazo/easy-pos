import { createAsyncThunk } from "@reduxjs/toolkit";
import { productTransform, selectProductsQuery } from "../../../../db/products";
import * as SQLlite from "expo-sqlite";
import { RequestState, SpinnerState } from "../../../../enums";
import { categoryTransform } from "../../../../db/categories";
import { requestProductCategoryDetail } from "../../../../context/products/categories";
import { requestProductList } from "../../../../context/products/products";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchProductAction = createAsyncThunk(
  "products/fetchProductAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "id", desc = true } = payload;
    const productList = await requestProductList(db, {
      db,
      orderBy,
      desc,
    });
    const tableRows = productList?.body || [];
    return tableRows;
  }
);

export const fetchProductActionBuilder = (builder) => {
  return builder
    .addCase(fetchProductAction.pending, (state) => {
      state.screenProductSpinner = SpinnerState.show;
    })
    .addCase(fetchProductAction.fulfilled, (state, action) => {
      return {
        ...state,
        productTable: {
          state: RequestState.fulfilled,
          data: action.payload?.map((product) => ({
            ...productTransform(product),
            productCategory: categoryTransform(product.product_category),
          })),
        },
        screenProductSpinner: SpinnerState.hidden,
      };
    })
    .addCase(fetchProductAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.screenProductSpinner = SpinnerState.show;
    });
};
