import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  insertCategoryQuery,
  requestCategoryDetail,
  categoryTransform,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";
import { RequestState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const insertCategoryAction = createAsyncThunk(
  "products/insertCategory",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    const { query, args } = insertCategoryQuery(payload);
    let response = null;
    await db.transactionAsync(async (tx) => {
      const result = await tx.executeSqlAsync(query, args);
      const makeRequestCategoryDetail = await requestCategoryDetail(db, {
        id: result.insertId,
      });
      if (makeRequestCategoryDetail.state === RequestState.fulfilled) {
        const insertedCategory = makeRequestCategoryDetail.body;
        if (insertedCategory.category_parent_id) {
          const makeRequestCategoryParentDetail = await requestCategoryDetail(
            db,
            {
              id: insertedCategory.category_parent_id,
            }
          );
          if (makeRequestCategoryParentDetail.state == RequestState.fulfilled) {
            insertedCategory["category_parent"] =
              makeRequestCategoryParentDetail.body;
          }
        }
        response = insertedCategory;
      }
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
        ...categoryTransform(action.payload),
        categoryParent: categoryTransform(action.payload.category_parent),
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
