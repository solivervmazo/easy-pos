import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { appColors, appConstants, appSizes, appSpacing } from "../../themes";
import IconButton from "../IconButton";
import RecentSearchItem from "./RecentSearchItem";
import SelectedItem from "./SelectedItem";
import SearchResultItem from "./SearchResultItem";
import SectionHeader from "../SectionHeader";
import * as _$picker from "./utils/utils";
const SEARCH_HIST = [
  "salt",
  "pepper",
  "anchovie",
  "cake",
  "sugar",
  "peppermint",
  "mint",
];

const AppSelectPicker = ({
  searchValue = "",
  value = null,
  items = [],
  returnValue,
  itemLabel,
  itemKey = false,
  loading = false,
  multiple = false,
  placeholder = "Start typing",
  containerStyle = {},
  searchInputContainerStyle = {},
  inputStyle = {},
  appendType = "text", //chip, text
  showRecents = true,
  canSearch = true,
  onClear = ({ searchValue }) => {},
  onSelect = (value) => value,
  onClearSelection = () => {},
  recentSearchCount = 3, // set 0 to disable
  renderClearButton = ({ onClear = ({ searchValue }) => {} }) => {
    /** set null to disable */
  },
  renderSearchItem = ({ item }) => undefined,
  renderRecentItem = ({ item }) => undefined,
  searchStrategy = null,
}) => {
  const [_searchValue, setSearchValue] = useState(searchValue);
  const [_recentSearchValue, setRecentSearchValue] = useState(SEARCH_HIST);
  const [_focused, setFocused] = useState(false);
  const [_selection, setSelection] = useState(null);
  const [searchResults, setSearchResults] = useState(items);

  const _onChangeHandle = ({ value }) => {
    setFocused(true);
    setSearchValue(value);
    setRecentSearchValue(
      _$picker._$recentFilterStrategy(
        SEARCH_HIST,
        _searchValue,
        recentSearchCount
      )
    );
    const filtered = _$picker._$searchStrategy(searchResults, value);
    setSearchResults(filtered);
  };

  const _onClearHandle = () => {
    onClear({ searchValue: _searchValue });
    setSearchValue("");
  };

  const _onFocusHandle = () => {
    setFocused(true);
  };

  const _onBlurHandle = () => {
    setFocused(false);
  };

  const _onRecentPressHandle = ({ value }) => {
    setSearchValue(value);
    setFocused(false);
  };

  const _onItemToggleHandle = ({ itemKeyIndex }) => {
    _$select({ itemKeyIndex });
  };

  const _onClearSelectionHandle = () => {
    _$reset([]);
    onClearSelection();
  };

  const _onRemoveSelectionHandle = ({ itemKeyIndex }) => {
    _$select({ itemKeyIndex });
  };

  const _$select = ({ itemKeyIndex }) => {
    const searchResult = _$picker._$selection(
      searchResults,
      itemKeyIndex,
      multiple
    );
    setSearchResults(searchResult);
    const selected = _$picker._$filter(searchResult);
    setSelection(selected);
    onSelect(
      _$picker._$deleteReservedKeys(
        multiple ? selected : selected[0] || undefined
      )
    );
  };

  const _$reset = (selectedValue = []) => {
    const preselected = _$picker._$init(selectedValue, items, itemKey);
    setSearchResults(preselected);
    setSelection(_$picker._$filter(preselected));
  };

  useEffect(() => {
    _$reset(value);
  }, []);

  const _renderClearButton = () => {
    const _rendered = renderClearButton({ onClear: _onClearHandle });
    if (_rendered === null) return null;
    return (
      <IconButton
        onPress={_onClearHandle}
        containerStyle={{
          backgroundColor: appColors.lightBgSecondary,
        }}
        icon={"Close"}
      />
    );
  };

  const _renderRecentSearchValue = () => {
    const _renderedItem = ({ item }) => {
      const _renderedRecentItem = renderRecentItem({ item });
      if (_renderedRecentItem === undefined)
        return (
          <RecentSearchItem
            item={item}
            onRecentPressHandle={_onRecentPressHandle}
          />
        );
      return _renderedRecentItem;
    };
    return (
      <>
        <SectionHeader
          title={"Recent search"}
          containerStyle={{
            paddingHorizontal: appSpacing.screenPaddingLeft - 5,
            paddingVertical: 10,
          }}
          titleColor={appColors.darkTextTertiary}
          size={appSizes.Text.semiRegular}
        />
        <View style={{}}>
          {_recentSearchValue.map((item, index) => (
            <_renderedItem key={`search-reacent-words-${index}`} item={item} />
          ))}
          {loading && (
            <Text style={{ textAlign: "center", padding: 5 }}>Loading</Text>
          )}
        </View>
      </>
    );
  };

  const _renderSearhResults = () => {
    const _renderedItem = ({ item, selected }) => {
      const _renderedSearchItem = renderSearchItem({ item });
      if (_renderedSearchItem === undefined)
        return (
          <SearchResultItem
            itemKeyIndex={item._$key}
            item={item}
            itemKey={itemKey}
            itemLabel={itemLabel}
            selected={item?._$selected}
            onTogglePress={_onItemToggleHandle}
            multiple={multiple}
          />
        );
      return _renderedSearchItem;
    };
    return (
      <View style={{}}>
        {searchResults
          .filter((item) => item._$visible)
          .map((item, index) => (
            <_renderedItem key={`search-results-item-${index}`} item={item} />
          ))}
        {loading && (
          <Text style={{ textAlign: "center", padding: 5 }}>Loading</Text>
        )}
      </View>
    );
  };

  const _renderSelectedItem = () => {
    return (
      <View
        style={{
          paddingLeft: appSpacing.screenPaddingLeft,
          paddingVertical: 10,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap",
          borderBottomWidth: 1,
          borderColor: appColors.themeColor,
        }}
      >
        <IconButton
          onPress={_onClearSelectionHandle}
          containerStyle={{
            backgroundColor: appColors.lightBgSecondary,
          }}
          icon={"Close"}
        />
        <SelectedItem
          items={_selection.map((_item) => ({
            _$key: _item._$key,
            _$label: itemLabel ? _item[itemLabel] : _item,
          }))}
          renderType={appendType}
          chipClose={({ itemKeyIndex }) =>
            _onRemoveSelectionHandle({ itemKeyIndex })
          }
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {canSearch && (
        <View style={[styles.searchInputContainer, searchInputContainerStyle]}>
          <TextInput
            value={_searchValue}
            placeholder={placeholder}
            cursorColor={appColors.themeColor}
            style={[styles.input, inputStyle]}
            onChange={(e) => _onChangeHandle({ value: e.nativeEvent.text })}
            onFocus={_onFocusHandle}
            onBlur={_onBlurHandle}
          />
          {_searchValue && _renderClearButton()}
        </View>
      )}
      <View
        style={{
          position: "relative",
          backgroundColor: appColors.lightBackground,
        }}
      >
        {_selection && _selection.length > 0 && _renderSelectedItem()}
        {showRecents && _searchValue && _focused && _renderRecentSearchValue()}
        {_searchValue && _focused && (
          <SectionHeader
            title={"Search results"}
            containerStyle={{
              paddingHorizontal: appSpacing.screenPaddingLeft - 5,
              paddingVertical: 10,
            }}
            titleColor={appColors.darkTextTertiary}
            size={appSizes.Text.semiRegular}
          />
        )}
        {_renderSearhResults()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  searchInputContainer: {
    backgroundColor: appColors.lightBgTertiary,
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: appSizes.Text.regular,
  },
});

export default AppSelectPicker;
