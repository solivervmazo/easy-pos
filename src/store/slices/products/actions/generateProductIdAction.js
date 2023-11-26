import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectProductsQuery } from "../../../../db/products";
import * as SQLlite from "expo-sqlite";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const generateProjectIdAction = createAsyncThunk(
  "product/generateProjectIdAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const {
      orderBy = "product_id",
      desc = true,
      limit = 0,
      random = false,
    } = payload;
    const { query, args } = selectProductsQuery({ orderBy, desc, limit });
    let rows = [];
    await db.transactionAsync(async (tx) => {
      rows = await tx.executeSqlAsync(query, args);
    });
    const latestProjectId = rows?.rows?.[0]?.id || 0;
    return `${
      (random ? Math.floor(Math.random() * 999999) + 1000000 : 1000000) +
      latestProjectId
    }`;
  }
);

export const generateProjectIdBuilder = (builder) => {
  return builder
    .addCase(generateProjectIdAction.pending, (state) => {
      state.formLoading = true;
    })
    .addCase(generateProjectIdAction.fulfilled, (state, action) => {
      state.formLoading = false;
      state.productDetail.productId = action.payload;
    })
    .addCase(generateProjectIdAction.rejected, (state, action) => {
      state.formLoading = false;
      state.error = action.error.message;
      console.log(action.error.message);
    });
};
