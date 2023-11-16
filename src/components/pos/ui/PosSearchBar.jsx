import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import { IconButton, AppSearchInput } from "../../../ui";
import { appColors, appSizes, appSpacing } from "../../../themes";

const PosSearchBar = ({ onChange = ({ inputValue }) => {} }) => {
  const [value, setValue] = useState("");

  return (
    <View style={styles.container}>
      <AppSearchInput value={value} placeholder={"Search or scan item"} />
      <IconButton
        icon={"PosScanMode"}
        size={appSizes.Icon.large}
        containerStyle={styles.searchBarButton}
      />
      <IconButton
        icon={"PosShortkeysMode"}
        size={appSizes.Icon.large}
        containerStyle={styles.searchBarButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: appColors.lightBgTertiary,
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingVertical: 10,
  },
  searchBarButton: {
    backgroundColor: appColors.lightBackground,
    padding: 10,
    flexShrink: 1,
  },
});

export default PosSearchBar;
