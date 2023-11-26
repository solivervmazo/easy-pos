import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectProductsQuery,
  insertProductQuery,
} from "../../../../db/products";
import * as SQLlite from "expo-sqlite";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchProductDetailAction = createAsyncThunk(
  "product/fetchProductDetail",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    const { query, args } = selectProductsQuery(payload);
    let rows = [];
    await db.transactionAsync(async (tx) => {
      rows = await tx.executeSqlAsync(query, args);
    });
    return rows?.rows[0] || null;
  }
);

export const fetchProductDetailBuilder = (builder) => {
  builder
    .addCase(fetchProductDetailAction.pending, (state) => {
      state.formLoading = true;
    })
    .addCase(fetchProductDetailAction.fulfilled, (state, action) => {
      state.productDetail = {
        id: action.payload?.id,
        productId: action.payload?.product_id,
        productName: action.payload?.product_name,
        productDescription: action.payload?.product_description,
        productBarcode: action.payload?.product_barcode,
        productSku: action.payload?.product_sku,
        productPrice: action.payload?.product_price,
        productCode: action.payload?.product_code,
        productShortkeyColor: action.payload?.product_shortkey_color,
      };
      state.formLoading = false;
    })
    .addCase(fetchProductDetailAction.rejected, (state, action) => {
      state.formLoading = false;
      state.error = action.error.message;
      console.log(action.error.message);
    });
};
