import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  StateCreatorsBuilder,
  IStateCreators,
  HeaderCreatorState,
} from "../../interfaces/StateCreators.type";
import { HeaderMode } from "../../../enums";
import { HEADER_MODE_SUFFIX, SEARCH_VALUE_SUFFIX } from "../../constants";

class HeaderCreators
  extends StateCreatorsBuilder<HeaderCreatorState>
  implements IStateCreators<HeaderCreatorState>
{
  constructor() {
    super();
  }
  state: HeaderCreatorState = {
    headerMode: HeaderMode.drawer,
    headerCurrentFeature: "app",
    headerCurrentSubFeature: "app",
    searchValue: "",
    searchInputPlaceholder: "Start typing...",
  };
  actions = {
    headerChangeHeaderMode: (
      state: HeaderCreatorState,
      { payload: { headerMode } }
    ) => {
      const headerModeToChange =
        state.headerCurrentFeature + HEADER_MODE_SUFFIX;
      const subHeaderModeToChange =
        state.headerCurrentSubFeature + HEADER_MODE_SUFFIX;
      return {
        ...state,
        headerMode: headerMode,
        [headerModeToChange]: headerMode,
        [subHeaderModeToChange]: headerMode,
      };
    },
    headerChangeSearchValueAction: (state: HeaderCreatorState, { payload }) => {
      const searchValue = payload?.searchValue || "";
      const searchValueToChange =
        state.headerCurrentSubFeature + SEARCH_VALUE_SUFFIX;
      return {
        ...state,
        searchValue: searchValue,
        [searchValueToChange]: searchValue,
      };
    },
    headerChangeCurrentFeatureAction: (
      state: HeaderCreatorState,
      { payload }
    ) => {
      const currentHeaderFeature = payload.feature;
      const currentSubFeatrue = payload.subFeature;
      const searchInputPlaceholder = payload.placeholder;
      const setSearchValueToChange = currentSubFeatrue + SEARCH_VALUE_SUFFIX;
      const setHeaderModeToChange = currentHeaderFeature + HEADER_MODE_SUFFIX;
      const setSubHeaderModeToChange = currentSubFeatrue + HEADER_MODE_SUFFIX;
      return {
        ...state,
        headerCurrentFeature: currentHeaderFeature,
        headerCurrentSubFeature: currentSubFeatrue,
        headerMode: HeaderMode.drawer,
        [setSearchValueToChange]: "",
        [setHeaderModeToChange]: HeaderMode.drawer,
        [setSubHeaderModeToChange]: HeaderMode.drawer,
        searchValue: "",
        ...(payload.placeholder
          ? { searchInputPlaceholder: searchInputPlaceholder }
          : {}),
      };
    },
  };
  creators = {};
  builder: (builder: ActionReducerMapBuilder<HeaderCreatorState>) => {};
}

export const headerCreators = new HeaderCreators();
