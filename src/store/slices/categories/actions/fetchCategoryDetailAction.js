import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectcategoriesQuery,
  insertCategoryQuery,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import { generateCategoryId } from "../../../helpers/generateCategoryId";
import { FormState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchCategoryDetailAction = createAsyncThunk(
  "categories/fetchCategoryDetail",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) {
      const CategoryId = await generateCategoryId(db);
      return {
        state: FormState.idle,
        body: {
          CategoryId: CategoryId,
        },
      };
    } else {
      const { query, args } = selectcategoriesQuery({
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
        state.CategoryForm = {
          ...payload,
          body: {
            ...payload.body,
            CategoryName: "",
            CategoryDescription: "",
            CategoryBarcode: "",
            categoriesku: "",
            CategoryPrice: 0,
            categorieshortkeyColor: "",
            CategoryCode: "",
          },
        };
      } else {
        state.CategoryForm = {
          ...payload,
          body: {
            id: payload?.body?.id,
            CategoryId: payload?.body?.Category_id,
            CategoryName: payload?.body?.Category_name,
            CategoryDescription: payload?.body?.Category_description,
            CategoryBarcode: payload?.body?.Category_barcode,
            categoriesku: payload?.body?.Category_sku,
            categoryId: payload?.body?.category_id,
            CategoryCode: payload?.body?.Category_code,
            CategoryPrice: payload?.body?.Category_price,
            categorieshortkeyColor: payload?.body?.Category_shortkey_color,
          },
        };
      }
    })
    .addCase(fetchCategoryDetailAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
};
