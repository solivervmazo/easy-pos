import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../../IconButton";
import SelectedItem from "../../app-select-picker/SelectedItem";
import { appColors, appSizes } from "../../../themes";

class AppendType {
  static text = "text";
  static chip = "chip";
}
/**TODO: Calculate Width of chips */
const AppInputSelect = ({
  canClear = false,
  appendType = AppendType.chip,
  itemLabel,
  isForm = false,
  containerStyle = {},
  onToggle = () => {},
}) => {
  const [_selection, setSelection] = useState([]);

  const _onToggleHandle = () => {
    onToggle();
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.selectionsContainer]}></View>
      <View style={[styles.togglerContainer]}>
        <IconButton
          onPress={_onToggleHandle}
          icon={"Down"}
          color={appColors.darkText}
          size={appSizes.Icon.small}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingVertical: 2,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: appColors.themeColor,
  },
  selectionsContainer: {
    flexGrow: 1,
    alignItems: "center",
    flexWrap: "wrap",
    alignContent: "center",
    gap: 3,
    flexDirection: "row",
    backgroundColor: appColors.lightBgTertiary,
    minHeight: appSizes.Text.large + 13,
  },
  togglerContainer: {
    flex: 0,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 5,
  },
});
export default AppInputSelect;
