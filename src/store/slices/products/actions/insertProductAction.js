import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectProductsQuery,
  insertProductQuery,
  productTransform,
} from "../../../../db/products";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";
import { categoryTransform } from "../../../../db/categories";

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
      const productList = Object.assign([], state.productTable?.data || []);
      productList.unshift({
        ...productTransform(action.payload),
        productCategoryDetail: categoryTransform(
          action.payload.product_category_detail
        ),
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
