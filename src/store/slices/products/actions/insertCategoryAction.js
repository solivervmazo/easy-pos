import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectCategoriesQuery,
  insertCategoryQuery,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const insertCategoryAction = createAsyncThunk(
  "products/insertCategory",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    const { query, args } = insertCategoryQuery(payload);
    let response = null;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(query, args);

      const { query: selectQuery, args: selectArgs } = selectCategoriesQuery({
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

export const insertCategoryBuilder = (builder) => {
  return builder
    .addCase(insertCategoryAction.pending, (state) => {
      state.categoryForm.state = FormState.pending;
    })
    .addCase(insertCategoryAction.fulfilled, (state, action) => {
      const categoryList = Object.assign([], state.categoryTable?.data || []);
      categoryList.unshift({
        id: action.payload.id,
        categoryId: action.payload.category_id,
        categoryName: action.payload.category_name,
        categoryDescription: action.payload.category_description,
        categoryCode: action.payload.category_code,
        categoryParentId: action.payload.category_parent_id,
        categoryShortkeyColor: action.payload.category_shortkey_color,
      });
      return {
        ...state,
        categoryForm: {
          state: FormState.sumbmitted,
          body: undefined,
        },
        categoryTable: {
          ...state.categoryTable,
          data: categoryList,
        },
      };
    })
    .addCase(insertCategoryAction.rejected, (state, action) => {
      console.log(action.error.message);
      state.categoryForm.state = FormState.editing;
    });
};
