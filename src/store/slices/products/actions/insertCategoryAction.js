import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  insertCategoryQuery,
  categoryTransform,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";
import { RequestState } from "../../../../enums";
import {
  requestInsertProductCategory,
  requestProductCategoryDetail,
} from "../../../../context/products/categories";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const insertCategoryAction = createAsyncThunk(
  "products/insertCategory",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    let response = null;
    await db.transactionAsync(async (ctx) => {
      const insertedProductCategory = await requestInsertProductCategory(ctx, {
        payload,
      });
      if (insertedProductCategory.state === RequestState.fulfilled) {
        const insertedCategory = insertedProductCategory.body;
        if (insertedCategory.category_parent_id) {
          const makeRequestCategoryParentDetail =
            await requestProductCategoryDetail(db, {
              id: insertedCategory.category_parent_id,
            });
          if (makeRequestCategoryParentDetail.state == RequestState.fulfilled) {
            insertedCategory["category_parent"] =
              makeRequestCategoryParentDetail.body;
          }
        }
        response = insertedCategory;
      } else {
        throw Error(insertedProductCategory.error);
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
