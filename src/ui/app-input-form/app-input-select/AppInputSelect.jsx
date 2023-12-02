import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../../IconButton";
import SelectedItem from "../../app-select-picker/SelectedItem";
import { appColors } from "../../../themes";

class AppendType {
  static text = "text";
  static chip = "chip";
}
/**TODO: Calculate Width of chips */
const AppInputSelect = ({
  canClear = false,
  chipCanClose = false,
  appendType = AppendType.chip,
  itemLabel,
  isForm = false,
  containerStyle = {},
}) => {
  const [_selection, setSelection] = useState([
    "HAHAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "HAHAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "HAHAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  ]);
  return (
    <View style={[styles.container, containerStyle]}>
      {canClear && (
        <IconButton
          // onPress={_onClearSelectionHandle}
          containerStyle={{
            backgroundColor: appColors.lightBgSecondary,
          }}
          icon={"Close"}
        />
      )}
      <SelectedItem
        items={_selection.map((_item) => ({
          _$key: _item._$key,
          _$label: itemLabel ? _item[itemLabel] : _item,
        }))}
        renderType={appendType}
        canClose={!isForm}
        // chipClose={({ itemKeyIndex }) =>
        //   _onRemoveSelectionHandle({ itemKeyIndex })
        // }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerAbsolute: {},
  container: {
    flex: 1,
    paddingVertical: 2,
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    flexWrap: "wrap",
    alignContent: "center",
    borderBottomWidth: 1,
    borderColor: appColors.themeColor,
  },
});
export default AppInputSelect;
