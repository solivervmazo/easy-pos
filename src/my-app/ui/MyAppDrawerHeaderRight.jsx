import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors, appSizes } from "../../themes";
import { IconButton } from "../../ui";
import { TextInput } from "react-native-gesture-handler";

const MyAppDrawerHeaderRight = ({
  onPress = () => {},
  showInput = false,
  tintColor,
}) => {
  const _onPressHandle = () => {
    onPress();
  };
  return (
    <View style={styles.container}>
      {showInput ? (
        <TextInput
          autoFocus={true}
          style={styles.input}
          placeholder="Search in product categories"
          placeholderTextColor={appColors.themeColorSecondary}
        />
      ) : null}
      <IconButton
        onPress={_onPressHandle}
        icon={"Search"}
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
  input: {
    backgroundColor: appColors.themeColor,
    flexGrow: 1,
    fontSize: appSizes.Text.regular,
    color: appColors.lightText,
  },
});
