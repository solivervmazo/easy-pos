import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateCategoryQuery,
  requestUpdateCategoryTree,
  requestCategoryDetail,
  categoryTransform,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import FormState from "../../../../enums/FormState";
import { RequestState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const updateCategoryAction = createAsyncThunk(
  "products/updateCategoryAction",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) return null;
    const { query, args } = updateCategoryQuery(payload);
    let response = null;
    await db.transactionAsync(async (ctx) => {
      const makeRequestOldCategoryDetail = await requestCategoryDetail(db, {
        id: payload.id,
      });
      if (makeRequestOldCategoryDetail.state === RequestState.fulfilled) {
        // category exists
        const oldCategoryDetail = makeRequestOldCategoryDetail.body;
        await ctx.executeSqlAsync(query, args);
        const makeRequestCategoryDetail = await requestCategoryDetail(db, {
          id: payload.id,
        });
        if (makeRequestCategoryDetail?.state === RequestState.fulfilled) {
          const updatedCategory = makeRequestCategoryDetail.body;

          if (
            oldCategoryDetail?.category_parent_id !=
            updatedCategory?.category_parent_id
          ) {
            //Update all sub category's level to  category_level - (this's old categoryLevel - new categoryLevel)
            //new category_parent_id == 0 ? Update all sub category's category_root_id to this's id
            //new category_parent_id != 0 ? Update all sub category's category_root_id to this's category_root_id

            const updateCategoryTree = await requestUpdateCategoryTree(db, {
              categoryRootIdLookup:
                oldCategoryDetail.category_root_id || updatedCategory.id,
              categoryRootIdValue:
                updatedCategory?.category_root_id == 0
                  ? updatedCategory.id
                  : updatedCategory.category_root_id,
              categoryLevelReduce:
                oldCategoryDetail.category_level -
                updatedCategory.category_level,
              selfLookup: updatedCategory.id,
            });
          }

          if (updatedCategory.category_parent_id) {
            const makeRequestCategoryParentDetail = await requestCategoryDetail(
              db,
              {
                id: updatedCategory.category_parent_id,
              }
            );
            if (
              makeRequestCategoryParentDetail.state == RequestState.fulfilled
            ) {
              updatedCategory["category_parent"] =
                makeRequestCategoryParentDetail.body;
            }
          }
          response = updatedCategory;
        }
      }
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
