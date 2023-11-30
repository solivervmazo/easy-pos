import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectCategoriesQuery,
  updateCategoryQuery,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const updateCategoryAction = createAsyncThunk(
  "categories/updateCategoryAction",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) return null;
    const { query, args } = updateCategoryQuery(payload);
    let response = null;
    await db.transactionAsync(async (tx) => {
      await tx.executeSqlAsync(query, args);

      const { query: selectQuery, args: selectArgs } = selectCategoriesQuery({
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
                id: action.payload.id,
                categoryId: action.payload.category_id,
                categoryName: action.payload.category_name,
                categoryDescription: action.payload.category_description,
                categoryCode: action.payload.category_code,
                categoryParentId: action.payload.category_parent_id,
                categoryShortkeyColor: action.payload.category_shortkey_color,
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
