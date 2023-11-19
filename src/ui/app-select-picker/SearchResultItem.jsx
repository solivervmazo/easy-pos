import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  appColors,
  appConstants,
  appFonts,
  appSizes,
  appSpacing,
} from "../../themes";
import IconButton from "../IconButton";
import Checkbox from "expo-checkbox";

const SearchResultItem = ({
  item,
  itemKeyIndex = 0,
  itemLabel,
  selected = false,
  onTogglePress = ({ selected, itemKeyIndex }) => {},
  multiple = false,
}) => {
  const [_selected, setSelected] = useState(selected);
  const _onTogglePressHandle = useCallback(
    (value) => {
      onTogglePress({ selected: value, itemKeyIndex });
      setSelected(value);
    },
    [_selected]
  );
  return (
    <TouchableOpacity
      activeOpacity={appConstants.ACTIVE_OPACITY}
      onPress={() => _onTogglePressHandle(!selected)}
      style={[styles.container]}
      disabled={multiple}
    >
      {multiple && (
        <Checkbox
          value={_selected}
          onValueChange={_onTogglePressHandle}
          style={styles.checkbox}
        />
      )}
      <Text style={[styles.label, ...(selected ? [styles.selected] : [])]}>
        {item?.[itemLabel] || item?.["label"] || item}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: appSpacing.screenPaddingLeft,
  },
  label: {
    fontSize: appSizes.Text.regular,
    flex: 1,
  },
  selected: {
    fontFamily: appFonts.medium,
  },
});

export default SearchResultItem;
