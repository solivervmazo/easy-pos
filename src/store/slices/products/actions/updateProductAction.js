import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectProductsQuery,
  insertProductQuery,
  updateProductQuery,
} from "../../../../db/products";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";
import { LoadState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const updateProductAction = createAsyncThunk(
  "products/updateProductAction",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) return null;
    const { query, args } = updateProductQuery(payload);
    let response = null;
    await db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync(query, args);

      const { query: selectQuery, args: selectArgs } = selectProductsQuery({
        args: {
          id: payload.id,
        },
      });
      const inserted = await tx.executeSqlAsync(selectQuery, selectArgs);
      response = inserted?.rows[0];
    });
    return response;
  }
);

export const updateProductBuilder = (builder) => {
  return builder
    .addCase(updateProductAction.pending, (state) => {
      state.productForm.state = FormState.pending;
    })
    .addCase(updateProductAction.fulfilled, (state, action) => {
      return {
        ...state,
        productForm: {
          state: FormState.sumbmitted,
          body: undefined,
        },
        productTable: {
          ...state.productTable,
          data: Object.assign([], state.productTable.data).map((product) => {
            if (product.id === action.payload.id) {
              return {
                id: action.payload.id,
                productId: action.payload.product_id,
                productName: action.payload.product_name,
                productDescription: action.payload.product_description,
                productBarcode: action.payload.product_barcode,
                productSku: action.payload.product_sku,
                productCategory: action.payload.category_id,
                productCode: action.payload.product_code,
                productPrice: action.payload.product_price,
                productShortkeyColor: action.payload.product_shortkey_color,
              };
            } else {
              return product;
            }
          }),
        },
      };
    })
    .addCase(updateProductAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.productForm.state = FormState.editing;
    });
};
