import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  selectCategoriesQuery,
  categoryTransform,
} from "../../../../db/categories";
import * as SQLlite from "expo-sqlite";
import { RequestState, SpinnerState } from "../../../../enums";
import {
  requestProductCategoryList,
  requestProductCategoryDetail,
} from "../../../../context/products/categories";

const db_name = process.env.EXPO_PUBLIC_SQLITE_DB;

export const fetchCategoryAction = createAsyncThunk(
  "products/fetchCategoryAction",
  async (payload = {}) => {
    const db = SQLlite.openDatabase(db_name);
    const { orderBy = "id", desc = true } = payload;
    const productCategoryList = await requestProductCategoryList(db, {
      db,
      orderBy,
      desc,
    });
    const tableRows = productCategoryList?.body || [];
    await Promise.all(
      tableRows.map(async (row, index) => {
        if (row.category_parent_id) {
          const requestCategoryParent = await requestProductCategoryDetail(db, {
            id: row.category_parent_id,
          });
          if (requestCategoryParent.state === RequestState.fulfilled) {
            tableRows[index]["category_parent"] = requestCategoryParent.body;
          }
        }
      })
    );
    return tableRows;
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
            ...categoryTransform(category),
            categoryParent: categoryTransform(category.category_parent),
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
