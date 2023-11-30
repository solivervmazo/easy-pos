import { createSlice } from "@reduxjs/toolkit";
import * as yup from "yup";
import { FormState, RequestState, SpinnerState } from "../../../enums";

import {
  fetchCategoryAction,
  fetchCategoryActionBuilder,
  fetchCategoryDetailAction,
  fetchCategoryDetailBuilder,
  insertCategoryAction,
  insertCategoryBuilder,
  updateCategoryAction,
  updateCategoryBuilder,
} from "./actions";

export const categoryFormSchema = yup.object().shape({
  categoryId: yup.string(),
  categoryName: yup
    .string()
    .required("category name is required")
    .min(3, "category name must contain at least 3 characters"),
  categoryDescription: yup.string(),
  categoryParentId: yup.string(),
  categoryCode: yup.string(),
  categoryShortkeyColor: yup.string(),
});

const initialState = {
  screenSpinner: SpinnerState.show,
  categoryForm: undefined,
  categoryTable: {
    state: RequestState.idle,
    data: undefined,
  },
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    restartFormAction: (state) => {
      return {
        ...state,
        categoryForm: undefined,
      };
    },
    updateCategoryFormAction: (state, { payload }) => {
      state.categoryForm.state = payload.state || FormState.editing;
      if (payload.body) state.categoryForm.body = payload.body;
    },
    refreshCategoryListAction: (state, payload) => {
      return {
        ...state,
        refreshcategoryList: payload.payload,
      };
    },
  },
  extraReducers: (builder) => {
    fetchCategoryActionBuilder(builder);
    fetchCategoryDetailBuilder(builder);
    insertCategoryBuilder(builder);
    updateCategoryBuilder(builder);
  },
});

// Action creators are generated for each case reducer function
export const {
  restartFormAction,
  updateCategoryFormAction,
  refreshCategoryListAction,
} = categoriesSlice.actions;
export {
  fetchCategoryAction,
  insertCategoryAction,
  fetchCategoryDetailAction,
  updateCategoryAction,
};
export const categoryTableSelector = (state) => state.categorys.categoryTable;
export const categoryFormSelector = (state) => state.categorys.categoryForm;

export default categoriesSlice.reducer;
