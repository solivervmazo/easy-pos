import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateProductVariationQuery,
  requestUpdateProductVariationTree,
  requestProductVariationDetail,
  productVariationTransform,
} from "../../../../db/productVariations";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";
import { RequestState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const updateProductVariationAction = createAsyncThunk(
  "products/updateProductVariationAction",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) return null;
    const { query, args } = updateProductVariationQuery(payload);
    let response = null;
    await db.transactionAsync(async (ctx) => {
      await ctx.executeSqlAsync(query, args);
      const makeRequestProductVariationDetail =
        await requestProductVariationDetail(db, {
          id: payload.id,
        });
      if (makeRequestProductVariationDetail?.state === RequestState.fulfilled) {
        response = makeRequestProductVariationDetail.body;
      }
    });
    return response;
  }
);

export const updateProductVariationBuilder = (builder) => {
  return builder
    .addCase(updateProductVariationAction.pending, (state) => {
      state.productVariationForm.state = FormState.pending;
    })
    .addCase(updateProductVariationAction.fulfilled, (state, action) => {
      return {
        ...state,
        productVariationForm: {
          state: FormState.sumbmitted,
          body: undefined,
        },
        productVariationTable: {
          ...state.productVariationTable,
          data: Object.assign([], state.productVariationTable.data).map(
            (productVariation) => {
              if (productVariation.id === action.payload.id) {
                return {
                  ...productVariationTransform(action.payload),
                };
              } else {
                return productVariation;
              }
            }
          ),
        },
      };
    })
    .addCase(updateProductVariationAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.productVariationForm.state = FormState.editing;
    });
};
