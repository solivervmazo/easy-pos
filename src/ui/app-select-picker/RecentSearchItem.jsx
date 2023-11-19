import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appColors, appConstants, appSizes } from "../../themes";
import IconButton from "../IconButton";

const RecentSearchItem = ({ item, onRecentPressHandle }) => {
  return (
    <TouchableOpacity
      activeOpacity={appConstants.ACTIVE_OPACITY}
      onPress={() => onRecentPressHandle({ value: item })}
      style={[styles.container]}
    >
      <IconButton
        icon={"Refresh"}
        color={appColors.darkTextTertiary}
        disabled={true}
        plain={true}
      />
      <Text style={[styles.label]}>{item}</Text>
      <IconButton
        icon={"Close"}
        color={appColors.darkTextTertiary}
        plain={true}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {
    fontSize: appSizes.Text.regular,
    flex: 1,
  },
});

export default RecentSearchItem;
