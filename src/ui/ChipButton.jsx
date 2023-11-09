import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { appConstants } from "../themes";

const ChipButton = ({ label, onPress, buttonLeft = () => {}, buttonRight }) => {
  return (
    <TouchableOpacity
      activeOpacity={appConstants.ACTIVE_OPACITY}
      style={{
        borderRadius: appSizes.Icon.medium,
        paddingVertical: 7,
        paddingHorizontal: 12,
        backgroundColor: appColors.lightSuccess,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
      }}
    >
      {buttonLeft()}
      <Text
        style={{
          fontSize: appSizes.Text.semiRegular,
          fontFamily: appFonts.medium,
          color: appColors.lightText,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default ChipButton;
