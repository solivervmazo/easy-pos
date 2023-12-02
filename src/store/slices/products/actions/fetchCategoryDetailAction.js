import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectCategoriesQuery,
  insertCategoryQuery,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import { generateCategoryId } from "../../../helpers/generateCategoryId";
import { FormState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchCategoryDetailAction = createAsyncThunk(
  "products/fetchCategoryDetail",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) {
      const categoryId = await generateCategoryId(db);
      return {
        state: FormState.idle,
        body: {
          categoryId: categoryId,
        },
      };
    } else {
      const { query, args } = selectCategoriesQuery({
        args: { id: payload.id },
        limit: 1,
      });
      let rows = [];
      await db.transactionAsync(async (tx) => {
        rows = await tx.executeSqlAsync(query, args);
      });
      return { state: FormState.idle, body: rows?.rows[0] };
    }
  }
);

export const fetchCategoryDetailBuilder = (builder) => {
  builder
    .addCase(fetchCategoryDetailAction.pending, (state) => {})
    .addCase(fetchCategoryDetailAction.fulfilled, (state, { payload }) => {
      if (!payload.body?.id) {
        state.categoryForm = {
          ...payload,
          body: {
            ...payload.body,
            categoryName: "",
            categoryDescription: "",
            categoryCode: "",
            categorieshortkeyColor: "",
          },
        };
      } else {
        state.categoryForm = {
          ...payload,
          body: {
            id: payload?.body?.id,
            categoryId: payload?.body?.category_id,
            categoryName: payload?.body?.category_name,
            categoryDescription: payload?.body?.category_description,
            categoryCode: payload?.body?.category_code,
            categoryShortkeyColor: payload?.body?.category_shortkey_color,
          },
        };
      }
    })
    .addCase(fetchCategoryDetailAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
};
