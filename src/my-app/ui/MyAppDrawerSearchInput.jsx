import React from "react";
import { StyleSheet } from "react-native";
import { appColors } from "../../themes";
import { useDispatch, useSelector } from "react-redux";
import {
  headerChangeSearchValueAction,
  searchValueSelector,
} from "../../store/slices/header/headerSlice";
import { TextInput } from "react-native-gesture-handler";

const MyAppDrawerSearchInput = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(searchValueSelector);
  const _onSearchValueChange = (value) => {
    dispatch(headerChangeSearchValueAction({ searchValue: value }));
  };

  return (
    <TextInput
      value={searchValue}
      autoFocus={true}
      style={styles.input}
      placeholder="Search in product categories"
      placeholderTextColor={appColors.themeColorSecondary}
      onChange={(e) => _onSearchValueChange(e.nativeEvent.text)}
    />
  );
};

export default MyAppDrawerSearchInput;

const styles = StyleSheet.create({
  input: {
    backgroundColor: appColors.themeColor,
    flexGrow: 1,
    fontSize: appSizes.Text.regular,
    color: appColors.lightText,
  },
});
