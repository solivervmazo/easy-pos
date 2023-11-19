import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { appColors, appConstants, appSizes, appSpacing } from "../../themes";
import IconButton from "../IconButton";
import RecentSearchItem from "./RecentSearchItem";
import SelectedItem from "./SelectedItem";
const SEARCH_HIST = [
  "salt",
  "pepper",
  "anchovie",
  "cake",
  "sugar",
  "peppermint",
  "mint",
];

const _recentSearchStrategy = (searchValue = "", limit = 0) => {
  return SEARCH_HIST.filter((item) => item.includes(searchValue)).filter(
    (_, index) => index < limit
  );
};

const AppSelectPicker = ({
  searchValue = "",
  value = null,
  items = [],
  returnValue,
  itemLabel,
  itemKey = false,
  searchKey = false,
  loading = false,
  multiple = false,
  placeholder = "Start typing",
  containerStyle = {},
  inputContainerStyle = {},
  inputStyle = {},
  appendType = "text", //chip, text
  onClear = ({ searchValue }) => {},
  recentSearchCount = 3, // set 0 to disable
  renderClearButton = ({ onClear = ({ searchValue }) => {} }) => {
    /** set null to disable */
  },
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
      _recentSearchStrategy(_searchValue, recentSearchCount)
    );
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

  const _onClearSelection = () => {
    setSelection(null);
  };

  const _onRemoveSelectedHandle = ({ index }) => {
    if (!_selection) return;
    const _alteredSelection = _selection;
    delete _alteredSelection[index];
    setSelection(_alteredSelection.filter((_selected) => _selected));
  };

  const _searchStrategy = ({ haystack = [] }) => {
    let _results = null;
    if (searchStrategy === null) {
      _results = haystack.filter((needle) =>
        (searchKey ? needle[searchKey] : needle).includes(searchValue)
      );
    }
    _results = returnValue
      ? _results.map((_result) => _result[returnValue])
      : _results;

    // setSelection(_results)
  };

  useEffect(() => {
    const compareByKey = (val, key, items) => {
      const _found = items.find((obj) => (obj?.[key] || obj) == val[key]);

      return _found === undefined || _found === null || _found < 0
        ? false
        : true;
    };
    const compareByValue = (val, items) => {
      return items.find((obj) => obj == val) || false;
    };
    // TODO: Clean logic for multiple and single selection
    const _values = (Array.isArray(value) ? value : [value]) || [];
    const _selected = multiple
      ? items.map((item) => ({
          ...item,
          _$selected: itemKey
            ? compareByKey(item, itemKey, _values)
            : compareByValue(item, _values),
        }))
      : items.map((item) => ({
          ...item,
          _$selected: itemKey
            ? compareByKey(item, itemKey, _values)
            : compareByValue(item, _values),
        })) || [];
    setSelection(_selected.filter((_selected) => _selected._$selected));
  }, [value]);

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
      <View style={{}}>
        {_recentSearchValue.map((item, index) => (
          <_renderedItem key={`search-reacent-words-${index}`} item={item} />
        ))}
        {loading && (
          <Text style={{ textAlign: "center", padding: 5 }}>Loading</Text>
        )}
      </View>
    );
  };

  const _renderSearhItem = ({ item }) => {};

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
        }}
      >
        <IconButton
          onPress={_onClearSelection}
          containerStyle={{
            backgroundColor: appColors.lightBgSecondary,
          }}
          icon={"Close"}
        />
        <SelectedItem
          items={_selection.map((_item) =>
            itemLabel ? _item[itemLabel] : _item
          )}
          renderType="chip"
          chipClose={({ index }) => _onRemoveSelectedHandle({ index })}
        />
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.inputContainer, inputContainerStyle]}>
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
      <View
        style={{
          position: "relative",
          backgroundColor: appColors.lightBackground,
        }}
      >
        {_selection && _selection.length > 0 && _renderSelectedItem()}
        {_searchValue && _focused && _renderRecentSearchValue()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
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
