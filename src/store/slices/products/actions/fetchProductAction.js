import { createAsyncThunk } from "@reduxjs/toolkit";
import { productTransform, selectProductsQuery } from "../../../../db/products";
import * as SQLlite from "expo-sqlite";
import { RequestState, SpinnerState } from "../../../../enums";
import { categoryTransform } from "../../../../db/categories";
import { requestProductCategoryDetail } from "../../../../context/products/categories";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchProductAction = createAsyncThunk(
  "products/fetchProductAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "id", desc = true } = payload;
    const { query, args } = selectProductsQuery({ orderBy, desc });
    let sqlRes = {};
    await db.transactionAsync(async (tx) => {
      sqlRes = await tx.executeSqlAsync(query, args);
    });
    const tableRows = sqlRes?.rows || [];
    await Promise.all(
      tableRows.map(async (row, index) => {
        if (row.category_id) {
          const requestProductCategoryDetail =
            await requestProductCategoryDetail(db, {
              id: row.category_id,
            });
          if (requestProductCategoryDetail.state === RequestState.fulfilled) {
            tableRows[index]["product_category_detail"] =
              requestProductCategoryDetail.body;
          }
        }
      })
    );
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
            productCategoryDetail: categoryTransform(
              product.product_category_detail
            ),
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
