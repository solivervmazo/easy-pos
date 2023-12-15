import React from "react";
import { StyleSheet, View } from "react-native";
import { appSizes } from "../../themes";
import { IconButton } from "../../ui";
import MyAppDrawerSearchInput from "./MyAppDrawerSearchInput";
import { useDispatch, useSelector } from "react-redux";
import { appStore } from "../store";
const MyAppDrawerHeaderRight = ({
  onShowInput,
  onClearInput,
  showInput = false,
  tintColor,
}) => {
  const dispatch = useDispatch();
  const searchValue = useSelector(
    appStore.header.selectors.searchValueSelector
  );
  const searchInputPlaceholder = useSelector(
    appStore.header.selectors.searchInputPlaceholderSelector
  );

  const onSearchValueChangeHandle = (value) => {
    dispatch(appStore.header.actions.changeSearchValue({ searchValue: value }));
  };

  const onClearInputHandle = () => {
    onClearInput ? onClearInput() : () => {};
    onSearchValueChangeHandle("");
  };

  const onShowInputHandle = () => {
    onShowInput ? onShowInput() : () => {};
  };

  const onPressHandle = () => {
    showInput ? onClearInputHandle() : onShowInputHandle();
  };
  return (
    <View style={styles.container}>
      {showInput ? (
        <MyAppDrawerSearchInput
          placeholder={searchInputPlaceholder}
          searchValue={searchValue}
          onChange={({ searchValue }) => onSearchValueChangeHandle(searchValue)}
        />
      ) : null}
      <IconButton
        onPress={onPressHandle}
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
