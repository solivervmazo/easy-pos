import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstants } from "../themes";

const ChipButton = ({
  label,
  onPress,
  buttonLeft = () => {},
  buttonRight = () => {},
  containerStyle = {},
  labelStyle = {},
  flat = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={appConstants.ACTIVE_OPACITY}
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
      ]}
    >
      {buttonLeft()}
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
      {buttonRight()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ChipButton;
