import React from "react";
import { StyleSheet, View } from "react-native";
import { appSizes } from "../../themes";
import { IconButton } from "../../ui";
import MyAppDrawerSearchInput from "./MyAppDrawerSearchInput";
import { useDispatch, useSelector } from "react-redux";
import {
  headerChangeSearchValueAction,
  searchInputPlaceholderSelector,
  searchValueSelector,
} from "../../store/slices/header/headerSlice";
const MyAppDrawerHeaderRight = ({
  onShowInput,
  onClearInput,
  showInput = false,
  tintColor,
}) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(searchValueSelector);
  const searchInputPlaceholder = useSelector(searchInputPlaceholderSelector);

  const _onSearchValueChange = (value) => {
    dispatch(headerChangeSearchValueAction({ searchValue: value }));
  };

  const _onClearInputHandle = () => {
    onClearInput ? onClearInput() : () => {};
    _onSearchValueChange("");
  };

  const _onShowInputHandle = () => {
    onShowInput ? onShowInput() : () => {};
  };

  const _onPressHandle = () => {
    showInput ? _onClearInputHandle() : _onShowInputHandle();
  };
  return (
    <View style={styles.container}>
      {showInput ? (
        <MyAppDrawerSearchInput
          placeholder={searchInputPlaceholder}
          searchValue={searchValue}
          onChange={({ searchValue }) => _onSearchValueChange(searchValue)}
        />
      ) : null}
      <IconButton
        onPress={_onPressHandle}
        icon={showInput ? "Close" : "Search"}
        color={tintColor}
        size={appSizes.Icon.large}
      />
    </View>
  );
};

export default MyAppDrawerHeaderRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
