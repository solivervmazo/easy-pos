import { createSlice } from "@reduxjs/toolkit";
import { headerCreators } from "./actions/header";
import { toastCreators } from "./actions/toast";

const HEADER_MODE_SUFFIX = "HeaderMode";
const SEARCH_VALUE_SUFFIX = "SearchValue";

const initialState = {
  ...headerCreators.state,
  ...toastCreators.state,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    headerChangeHeaderMode: headerCreators.actions.headerChangeHeaderMode,
    headerChangeCurrentFeatureAction:
      headerCreators.actions.headerChangeCurrentFeatureAction,
    headerChangeSearchValueAction:
      headerCreators.actions.headerChangeSearchValueAction,
    addQueueAction: toastCreators.actions.addQueueAction,
    getQueueAction: toastCreators.actions.getQueueAction,
  },
});

export default appSlice = slice.reducer;

export const appStore = {
  header: {
    actions: {
      changeHeaderMode: slice.actions.headerChangeHeaderMode,
      changeCurrentFeature: slice.actions.headerChangeCurrentFeatureAction,
      changeSearchValue: slice.actions.headerChangeSearchValueAction,
      ...headerCreators.creators,
    },
    selectors: {
      searchValueSelector: (state) => state.app.searchValue,
      searchInputPlaceholderSelector: (state) =>
        state.app.searchInputPlaceholder,
      products: {
        tabsHeaderModeSelector: (state, { feature }) => {
          const headerModeToSelect = feature + HEADER_MODE_SUFFIX;
          return state.app[headerModeToSelect];
        },
        productTabHeaderModeSelector: (state, { feature }) => {
          const headerModeToSelect = feature + HEADER_MODE_SUFFIX;
          return state.app[headerModeToSelect];
        },
        categoryTabHeaderModeSelector: (state, { feature }) => {
          const headerModeToSelect = feature + HEADER_MODE_SUFFIX;
          return state.app[headerModeToSelect];
        },
        productSearchValueSelector: (state, { feature }) => {
          const searchValueToSelect = feature + SEARCH_VALUE_SUFFIX;
          return state.app[searchValueToSelect];
        },
        categorySearchValueSelector: (state, { feature }) => {
          const searchValueToSelect = feature + SEARCH_VALUE_SUFFIX;
          return state.app[searchValueToSelect];
        },
        variationSearchValueSelector: (state, { feature }) => {
          const searchValueToSelect = feature + SEARCH_VALUE_SUFFIX;
          return state.app[searchValueToSelect];
        },
      },
    },
  },
  toast: {
    actions: {
      addQueueAction: slice.actions.addQueueAction,
      getQueueAction: slice.actions.getQueueAction,
    },
    selectors: {
      toastQueue: (state) => state.app.toastQueue,
      onQueue: (state) => state.app.onQueue,
    },
  },
};
