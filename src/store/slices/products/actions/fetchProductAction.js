import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectProductsQuery } from "../../../../db/products";
import * as SQLlite from "expo-sqlite";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchProductAction = createAsyncThunk(
  "product/fetchProductAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "product_id", desc = true } = payload;
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
      state.loading = true;
    })
    .addCase(fetchProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.productList = action.payload;
    })
    .addCase(fetchProductAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action.error.message);
    });
};
