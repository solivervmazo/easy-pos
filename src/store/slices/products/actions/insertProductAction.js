import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectProductsQuery,
  insertProductQuery,
} from "../../../../db/products";
import * as SQLlite from "expo-sqlite";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const insertProductAction = createAsyncThunk(
  "product/insertProduct",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    const { query, args } = insertProductQuery(payload);
    let response = null;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(query, args);
      const { query: selectQuery, args: selectArgs } = selectProductsQuery({
        args: {
          product_id: result.insertId,
        },
      });
      const inserted = await tx.executeSqlAsync(selectQuery, selectArgs);
      response = inserted?.rows[0];
    });
    return response;
  }
);

export const insertProductBuilder = (builder) => {
  return builder
    .addCase(insertProductAction.pending, (state) => {
      state.formLoading = true;
    })
    .addCase(insertProductAction.fulfilled, (state, action) => {
      state.form = {
        productId: action.payload.product_id,
        productName: action.payload.product_name,
        productDescription: action.payload.product_description,
        productBarcode: action.payload.product_barcode,
        productSku: action.payload.product_sku,
      };
      state.productList.unshift(action.payload);
      state.formLoading = false;
      state.formSubmitted = 3;
    })
    .addCase(insertProductAction.rejected, (state, action) => {
      state.formLoading = false;
      state.error = action.error.message;
      console.log(action.error.message);
    });
};
