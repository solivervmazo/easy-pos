import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectCategoriesQuery } from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import { RequestState, SpinnerState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchCategoryAction = createAsyncThunk(
  "products/fetchCategoryAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "id", desc = true } = payload;
    const { query, args } = selectCategoriesQuery({ orderBy, desc });
    let rows = [];
    await db.transactionAsync(async (tx) => {
      rows = await tx.executeSqlAsync(query, args);
    });
    return rows?.rows || [];
  }
);

export const fetchCategoryActionBuilder = (builder) => {
  return builder
    .addCase(fetchCategoryAction.pending, (state) => {
      state.screenCategorySpinner = SpinnerState.show;
    })
    .addCase(fetchCategoryAction.fulfilled, (state, action) => {
      return {
        ...state,
        categoryTable: {
          state: RequestState.fulfilled, //No use
          data: action.payload?.map((category) => ({
            id: category.id,
            categoryId: category.category_id,
            categoryName: category.category_name,
            categoryDescription: category.category_description,
            categoryCode: category.category_code,
            categoryParentId: category.category_parent_id,
            categoryShortkeyColor: category.category_shortkey_color,
          })),
        },
        screenCategorySpinner: SpinnerState.hidden,
      };
    })
    .addCase(fetchCategoryAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.screenCategorySpinner = SpinnerState.hidden;
    });
};
