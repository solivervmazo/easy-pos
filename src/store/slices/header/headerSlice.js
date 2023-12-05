import { createSlice } from "@reduxjs/toolkit";
import { HeaderMode } from "../../../enums";

const initialState = {
  headerMode: HeaderMode.drawer,
  headerCurrentFeature: "app",
  searchValue: "",
  // PRODUCT_CATEGORY_SEARCH_VALUE: "",
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    headerChangeHeaderMode: (state, { payload }) => {
      return {
        ...state,
        headerMode: payload,
      };
    },
    headerChangeSearchValueAction: (state, { payload }) => {
      const searchValue = payload?.searchValue || "";
      const searchValueToChange = state.headerCurrentFeature + "_SEARCH_VALUE";
      return {
        ...state,
        searchValue: searchValue,
        [searchValueToChange]: searchValue,
      };
    },
    headerChangeCurrentFeatureAction: (state, { payload }) => {
      const currentFeatrue = payload.feature;
      const setSearchValueToChange = currentFeatrue + "_SEARCH_VALUE";
      return {
        ...state,
        headerCurrentFeature: currentFeatrue,
        [setSearchValueToChange]: "",
        searchValue: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  headerChangeSearchValueAction,
  headerChangeCurrentFeatureAction,
  headerChangeHeaderMode,
} = headerSlice.actions;

export const searchValueSelector = (state) => state.header.searchValue;
export const productCategorySearchValueSelector = (state, { feature }) =>
  state.header[feature];

export default headerSlice.reducer;
