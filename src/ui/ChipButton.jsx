import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appColors, appConstants } from "../themes";
import Icon from "./core/Icon";
const ChipButton = ({
  label,
  onPress,
  buttonLeft = ({ Icon = () => Icon.Icons }) => {},
  buttonRight = ({ Icon = () => Icon.Icons }) => {},
  containerStyle = {},
  innerContainerStyle = {},
  labelStyle = {},
  flat = false,
  plain = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      activeOpacity={appConstants.ACTIVE_OPACITY}
      containerStyle={innerContainerStyle}
      style={[
        {
          borderRadius: appSizes.Icon.medium,
          paddingVertical: 7,
          paddingHorizontal: 12,
          backgroundColor: !flat ? appColors.lightSuccess : null,
          overflow: "hidden",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        },
        containerStyle,
        disabled ? { backgroundColor: appColors.lightTextSecondary } : {},
      ]}
    >
      {buttonLeft({ Icon: Icon.Icons })}
      <Text
        style={[
          {
            fontSize: appSizes.Text.semiRegular,
            fontFamily: appFonts.medium,
            color: appColors.lightText,
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>
      {buttonRight({ Icon: Icon.Icons })}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ChipButton;
