import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  requestCategoryDetail,
  requestGenerateCategoryId,
  categoryTransform,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import { FormState, RequestState } from "../../../../enums";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchCategoryDetailAction = createAsyncThunk(
  "products/fetchCategoryDetail",
  async (payload) => {
    const db = SQLlite.openDatabase(db_name);
    if (!payload.id) {
      const request = await requestGenerateCategoryId(db);
      if (request.state === RequestState.fulfilled) {
        return {
          state: FormState.idle,
          body: {
            categoryId: request.body,
          },
        };
      } else {
        throw Error(request.message);
      }
    } else {
      const request = await requestCategoryDetail(false, { id: payload.id });
      if (request.state === RequestState.fulfilled) {
        const categoryDetail = {
          ...request.body,
        };
        const parentId = categoryDetail.category_parent_id;
        if (parentId) {
          const requestParent = await requestCategoryDetail(false, {
            id: parentId,
          });
          if (requestParent.state == RequestState.fulfilled) {
            categoryDetail["categoryParent"] = requestParent.body;
          }
        }
        return { state: FormState.idle, body: categoryDetail };
      } else {
        throw Error(request.message);
      }
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
            categoryParent: {},
          },
        };
      } else {
        state.categoryForm = {
          ...payload,
          body: {
            ...categoryTransform(payload?.body),
            categoryParent: categoryTransform(payload?.body?.categoryParent),
          },
        };
      }
    })
    .addCase(fetchCategoryDetailAction.rejected, (state, action) => {
      console.log(action.error.message);
    });
};
