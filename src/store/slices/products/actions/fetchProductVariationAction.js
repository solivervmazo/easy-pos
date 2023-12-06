import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestProductVariationDetail,
  selectProductVariationsQuery,
  productVariationTransform,
} from "../../../../db/productVariations";
import * as SQLlite from "expo-sqlite";
import { RequestState, SpinnerState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchProductVariationAction = createAsyncThunk(
  "products/fetchProductVariationAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "id", desc = true } = payload;
    const { query, args } = selectProductVariationsQuery({ orderBy, desc });
    let sqlRows = {};
    await db.transactionAsync(async (ctx) => {
      sqlRows = await ctx.executeSqlAsync(query, args);
    });
    const tableRows = sqlRows?.rows || [];
    return tableRows;
  }
);

export const fetchProductVariationActionBuilder = (builder) => {
  return builder
    .addCase(fetchProductVariationAction.pending, (state) => {
      state.screenProductVariationSpinner = SpinnerState.show;
    })
    .addCase(fetchProductVariationAction.fulfilled, (state, action) => {
      return {
        ...state,
        productVariationTable: {
          state: RequestState.fulfilled, //No use
          data: action.payload?.map((productVariation) => ({
            ...productVariationTransform(productVariation),
          })),
        },
        screenProductVariationSpinner: SpinnerState.hidden,
      };
    })
    .addCase(fetchProductVariationAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.screenProductVariationSpinner = SpinnerState.hidden;
    });
};
