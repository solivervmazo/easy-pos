import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectProductsQuery,
  insertProductQuery,
  updateProductQuery,
} from "../../../../db/products";
import * as SQLlite from "expo-sqlite";
import FormSate from "../../../../enums/FormState";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const updateProductAction = createAsyncThunk(
  "product/updateProductAction",
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
      state.formLoading = true;
    })
    .addCase(updateProductAction.fulfilled, (state, action) => {
      const udpatedProduct = {
        id: action.payload.id,
        productId: action.payload.product_id,
        productName: action.payload.product_name,
        productDescription: action.payload.product_description,
        productBarcode: action.payload.product_barcode,
        productSku: action.payload.product_sku,
      };
      state.productDetail = udpatedProduct;
      //   const productIndex = state.productList.find(
      //     (product) => (product.id = action.payload?.id)
      //   );
      //   state.productList[productIndex] = udpatedProduct;
      state.formLoading = false;
      state.formActionState = FormSate.sumbmitted;
    })
    .addCase(updateProductAction.rejected, (state, action) => {
      state.formLoading = false;
      state.error = action.error.message;
      console.log(action.error.message);
    });
};
