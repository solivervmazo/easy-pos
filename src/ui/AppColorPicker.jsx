import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ColorPicker, { Panel5 } from "reanimated-color-picker";
import { appColors, appSpacing } from "../themes";
import AppCard from "./AppCard";

const AppColorPicker = ({
  colorValue,
  onSelect = ({ colorValue }) => undefined,
}) => {
  const [_colorValue, setColorValue] = useState(colorValue);
  const _onSelectHandle = ({ hex }) => {
    setColorValue(hex);
    onSelect({ colorValue: hex });
    console.log(hex);
  };
  return (
    <View style={{ padding: appSpacing.screenPaddingLeft }}>
      <ColorPicker value={_colorValue} onComplete={_onSelectHandle}>
        <Panel5 />
      </ColorPicker>
      <AppCard
        title={"hello"}
        containerStyle={{
          flex: 0,
        }}
        renderTitle={({ title, titleStyle }) => (
          <Text style={[titleStyle]}>Hello</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AppColorPicker;
