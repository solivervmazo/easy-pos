import { createSlice } from "@reduxjs/toolkit";
import { HeaderMode } from "../../../enums";

const HEADER_MODE_SUFFIX = "HeaderMode";
const SEARCH_VALUE_SUFFIX = "SearchValue";

const initialState = {
  headerMode: HeaderMode.drawer,
  headerCurrentFeature: "app",
  headerCurrentSubFeature: "app",
  searchValue: "",
  searchInputPlaceholder: "Start typing...",
  // PRODUCT_CATEGORY_SEARCH_VALUE: "",
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    headerChangeHeaderMode: (state, { payload: { headerMode } }) => {
      const headerModeToChange =
        state.headerCurrentFeature + HEADER_MODE_SUFFIX;
      return {
        ...state,
        headerMode: headerMode,
        [headerModeToChange]: headerMode,
      };
    },
    headerChangeSearchValueAction: (state, { payload }) => {
      const searchValue = payload?.searchValue || "";
      const searchValueToChange =
        state.headerCurrentSubFeature + SEARCH_VALUE_SUFFIX;
      return {
        ...state,
        searchValue: searchValue,
        [searchValueToChange]: searchValue,
      };
    },
    headerChangeCurrentFeatureAction: (state, { payload }) => {
      const currentHeaderFeature = payload.feature;
      const currentSubFeatrue = payload.subFeature;
      const searchInputPlaceholder = payload.placeholder;
      const setSearchValueToChange = currentSubFeatrue + SEARCH_VALUE_SUFFIX;
      const setHeaderModeToChange = currentHeaderFeature + HEADER_MODE_SUFFIX;
      return {
        ...state,
        headerCurrentFeature: currentHeaderFeature,
        headerCurrentSubFeature: currentSubFeatrue,
        headerMode: HeaderMode.drawer,
        [setSearchValueToChange]: "",
        [setHeaderModeToChange]: HeaderMode.drawer,
        searchValue: "",
        ...(payload.placeholder
          ? { searchInputPlaceholder: searchInputPlaceholder }
          : {}),
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
export const searchInputPlaceholderSelector = (state) =>
  state.header.searchInputPlaceholder;
export const productCategorySearchValueSelector = (state, { feature }) => {
  const searchValueToSelect = feature + SEARCH_VALUE_SUFFIX;
  return state.header[searchValueToSelect];
};
export const productTabsHeaderModeSelector = (state, { feature }) => {
  const headerModeToSelect = feature + HEADER_MODE_SUFFIX;
  return state.header[headerModeToSelect];
};

export default headerSlice.reducer;
