import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "./core/Icon";
import { appColors, appConstants, appSizes } from "../themes";
import { TouchableOpacity } from "react-native-gesture-handler";

const IconButton = ({
  icon,
  size = appSizes.Icon.regular,
  color = appColors.themeColor,
  iconStyle = {},
  containerStyle = {},

  innerContainerStyle = {},
  onPress,
  plain = false,
  disabled = false,
  renderLabel = ({ size, color }) => undefined,
}) => {
  const _renderLabel = () => {
    const _rendered = renderLabel({ size, color });
    return _rendered || null;
  };

  return (
    <TouchableOpacity
      activeOpacity={plain ? 1 : appConstants.ACTIVE_OPACITY}
      disabled={disabled}
      containerStyle={[innerContainerStyle]}
      style={[
        {
          borderRadius: size,
        },
        styles.container,
        containerStyle,
      ]}
      onPress={onPress}
    >
      {Icon.Icons(icon, {
        size,
        color,
        iconStyle,
      })}
      {_renderLabel()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    aspectRatio: "1/1",
  },
});

export default IconButton;
