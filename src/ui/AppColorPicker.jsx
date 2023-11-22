import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorPicker, { Panel5 } from "reanimated-color-picker";
import { appColors, appSizes, appSpacing } from "../themes";
import AppCard from "./AppCard";
import Spacer from "./core/Spacer";

const AppColorPicker = ({
  colorValue,
  onSelect = ({ colorValue }) => undefined,
}) => {
  const [_colorValue, setColorValue] = useState(colorValue);
  const _onSelectHandle = ({ hex }) => {
    setColorValue(hex);
    onSelect({ colorValue: hex });
  };
  return (
    <View style={{ padding: appSpacing.screenPaddingLeft }}>
      <ColorPicker value={_colorValue} onComplete={_onSelectHandle}>
        <Panel5 />
      </ColorPicker>
      <Spacer size={20} horizontal={false} />
      <AppCard
        title={_colorValue || "Select color"}
        containerStyle={{
          flex: 0,
        }}
        renderTitle={({ title, titleStyle }) => (
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <View
              style={{
                height: appSizes.Icon.xLarge,
                width: appSizes.Icon.xLarge,
                backgroundColor: _colorValue,
                borderWidth: 2,
                borderBlockColor: appColors.themeColor,
                borderRadius: appSizes.Icon.xLarge / 4,
                overflow: "hidden",
              }}
            />
            <Text style={[titleStyle]}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AppColorPicker;
