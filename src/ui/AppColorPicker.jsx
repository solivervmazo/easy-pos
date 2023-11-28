import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorPicker, {
  Panel5,
  Panel1,
  Panel2,
  Panel3,
  Panel4,
} from "reanimated-color-picker";
import { appColors, appSizes, appSpacing } from "../themes";
import AppCard from "./AppCard";
import Spacer from "./core/Spacer";
import Icon from "./core/Icon";
import ChipButton from "./ChipButton";

const AppColorPicker = ({
  colorValue = undefined,
  onSelect = ({ colorValue }) => undefined,
}) => {
  const [_colorValue, setColorValue] = useState(undefined);
  const colorPickerRef = useRef(null);
  const colorTextRef = useRef(null);

  const _onSelectHandle = ({ hex }) => {
    setColorValue(hex);
    onSelect({ colorValue: hex });
  };

  const _onClearHandle = () => {
    setColorValue(undefined);
  };

  return (
    <View style={{ padding: appSpacing.screenPaddingLeft }}>
      <ColorPicker
        value={_colorValue}
        onComplete={_onSelectHandle}
        // onChange={_onSelectHandle}
      >
        <Panel3 />
      </ColorPicker>
      <Spacer size={20} horizontal={false} />
      <AppCard
        title={_colorValue || "Select color"}
        containerStyle={{
          flex: 0,
        }}
        renderTitle={({ title, titleStyle }) => (
          <View style={[styles.contentContainer]}>
            <View
              style={[styles.colorContainer, { backgroundColor: _colorValue }]}
            >
              {!_colorValue && (
                <Icon.Slash
                  color={appColors.darkTextTertiary}
                  size={appSizes.Icon.large}
                />
              )}
            </View>
            <View style={[styles.textConent]}>
              <Text style={[styles.titleText, titleStyle]}>{title}</Text>
              {_colorValue && (
                <ChipButton
                  onPress={_onClearHandle}
                  label={"Clear"}
                  labelStyle={styles.clearText}
                  containerStyle={styles.clearContainer}
                />
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  colorContainer: {
    height: appSizes.Icon.xLarge,
    width: appSizes.Icon.xLarge,
    borderWidth: 2,
    borderBlockColor: appColors.themeColor,
    borderRadius: appSizes.Icon.xLarge / 4,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  textConent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  titleText: {},
  clearText: {
    fontSize: appSizes.Text.semiRegular,
    color: appColors.lightText,
  },
  clearContainer: {
    backgroundColor: appColors.lightPrimary,
    paddingVertical: 3,
  },
});

export default AppColorPicker;
