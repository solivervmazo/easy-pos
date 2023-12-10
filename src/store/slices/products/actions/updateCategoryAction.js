import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoryTransform } from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";
import { RequestState } from "../../../../enums";
import { requestUpdateProductCategory } from "../../../../context/products/categories";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const updateCategoryAction = createAsyncThunk(
  "products/updateCategoryAction",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    let response = null;
    await db.transactionAsync(async (ctx) => {
      const requestUpdateProductCategory = await requestUpdateProductCategory(
        ctx,
        {
          payload,
        }
      );
      response = requestUpdateProductCategory.body;
      if (response.state === RequestState.error) throw Error(response.error);
    });
    return response;
  }
);

export const updateCategoryBuilder = (builder) => {
  return builder
    .addCase(updateCategoryAction.pending, (state) => {
      state.categoryForm.state = FormState.pending;
    })
    .addCase(updateCategoryAction.fulfilled, (state, action) => {
      return {
        ...state,
        categoryForm: {
          state: FormState.sumbmitted,
          body: undefined,
        },
        categoryTable: {
          ...state.categoryTable,
          data: Object.assign([], state.categoryTable.data).map((category) => {
            if (category.id === action.payload.id) {
              return {
                ...categoryTransform(action.payload),
                categoryParent: categoryTransform(
                  action.payload.category_parent
                ),
              };
            } else {
              return category;
            }
          }),
        },
      };
    })
    .addCase(updateCategoryAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.categoryForm.state = FormState.editing;
    });
};
