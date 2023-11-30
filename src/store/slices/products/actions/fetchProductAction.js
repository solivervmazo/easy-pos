import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectProductsQuery } from "../../../../db/products";
import * as SQLlite from "expo-sqlite";
import { RequestState, SpinnerState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchProductAction = createAsyncThunk(
  "products/fetchProductAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "id", desc = true } = payload;
    const { query, args } = selectProductsQuery({ orderBy, desc });
    let rows = [];
    await db.transactionAsync(async (tx) => {
      rows = await tx.executeSqlAsync(query, args);
    });
    return rows?.rows || [];
  }
);

export const fetchProductActionBuilder = (builder) => {
  return builder
    .addCase(fetchProductAction.pending, (state) => {
      state.screenSpinner = SpinnerState.show;
    })
    .addCase(fetchProductAction.fulfilled, (state, action) => {
      return {
        ...state,
        productTable: {
          state: RequestState.fulfilled, //No use
          data: action.payload?.map((product) => ({
            id: product.id,
            productId: product.product_id,
            productName: product.product_name,
            productDescription: product.product_description,
            productBarcode: product.product_barcode,
            productSku: product.product_sku,
            categoryId: product.category_id,
            productCode: product.product_code,
            productPrice: product.product_price,
            productShortkeyColor: product.product_shortkey_color,
          })),
        },
        screenSpinner: SpinnerState.hidden,
      };
    })
    .addCase(fetchProductAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.screenSpinner = SpinnerState.show;
    });
};
