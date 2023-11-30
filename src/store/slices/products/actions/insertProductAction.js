import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectProductsQuery,
  insertProductQuery,
} from "../../../../db/products";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const insertProductAction = createAsyncThunk(
  "products/insertProduct",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    const { query, args } = insertProductQuery(payload);
    let response = null;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(query, args);

      const { query: selectQuery, args: selectArgs } = selectProductsQuery({
        args: {
          id: result.insertId,
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
      state.productForm.state = FormState.pending;
    })
    .addCase(insertProductAction.fulfilled, (state, action) => {
      const productList = Object.assign([], state.productList);
      productList.unshift({
        id: action.payload.id,
        productId: action.payload.product_id,
        productName: action.payload.product_name,
        productDescription: action.payload.product_description,
        productBarcode: action.payload.product_barcode,
        productSku: action.payload.product_sku,
        categoryId: action.payload.category_id,
        productCode: action.payload.product_code,
        productPrice: action.payload.product_price,
        productShortkeyColor: action.payload.product_shortkey_color,
      });
      return {
        ...state,
        productForm: {
          state: FormState.sumbmitted,
          body: undefined,
        },
        productTable: {
          ...state.productTable,
          data: productList,
        },
      };
    })
    .addCase(insertProductAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.productForm.state = FormState.editing;
    });
};
