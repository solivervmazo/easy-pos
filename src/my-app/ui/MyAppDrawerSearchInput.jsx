import React from "react";
import { StyleSheet } from "react-native";
import { appColors } from "../../themes";
import { TextInput } from "react-native-gesture-handler";

const MyAppDrawerSearchInput = ({
  searchValue,
  onChange = ({ searchValue }) => searchValue,
}) => {
  _onChangeHandle = (searchValue) => {
    onChange({ searchValue });
  };

  return (
    <TextInput
      value={searchValue}
      autoFocus={true}
      style={styles.input}
      placeholder="Search in product categories"
      placeholderTextColor={appColors.themeColorSecondary}
      onChange={(e) => _onChangeHandle(e.nativeEvent.text)}
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
