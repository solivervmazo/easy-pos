import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  insertProductVariationQuery,
  requestProductVariationDetail,
  productVariationTransform,
} from "../../../../db/productVariations";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";
import { RequestState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const insertProductVariationAction = createAsyncThunk(
  "products/insertProductVariation",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    const { query, args } = insertProductVariationQuery(payload);
    let response = null;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(query, args);
      const makeRequestProductVariationDetail =
        await requestProductVariationDetail(db, {
          id: result.insertId,
        });
      if (makeRequestProductVariationDetail.state === RequestState.fulfilled) {
        const insertedProductVariation = makeRequestProductVariationDetail.body;
        response = insertedProductVariation;
      }
    });
    return response;
  }
);

export const insertProductVariationBuilder = (builder) => {
  return builder
    .addCase(insertProductVariationAction.pending, (state) => {
      state.productVariationForm.state = FormState.pending;
    })
    .addCase(insertProductVariationAction.fulfilled, (state, action) => {
      const productVariationList = Object.assign(
        [],
        state.productVariationTable?.data || []
      );
      productVariationList.unshift({
        ...productVariationTransform(action.payload),
      });
      return {
        ...state,
        productVariationForm: {
          state: FormState.sumbmitted,
          body: undefined,
        },
        productVariationTable: {
          ...state.productVariationTable,
          data: productVariationList,
        },
      };
    })
    .addCase(insertProductVariationAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.productVariationForm.state = FormState.editing;
    });
};
