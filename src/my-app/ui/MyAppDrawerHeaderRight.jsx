import React from "react";
import { StyleSheet, View } from "react-native";
import { appSizes } from "../../themes";
import { IconButton } from "../../ui";
import MyAppDrawerSearchInput from "./MyAppDrawerSearchInput";
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
      {showInput ? <MyAppDrawerSearchInput /> : null}
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
});
