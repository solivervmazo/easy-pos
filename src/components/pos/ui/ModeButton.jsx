import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors, appFonts, appSizes, appStyles } from "../../../src/themes";
import { Icon } from "../../../src/ui";
import { FlatList, ScrollView } from "react-native-gesture-handler";

const ModeButton = ({ icon }) => {
  return (
    <View
      style={{
        backgroundColor: appColors.themeColorTertiary,
        borderRadius: 20,
        padding: 20,
        // flexDirection: "row",
        alignItems: "center",
        width: "30%",
      }}
    >
      <View
        style={{
          backgroundColor: appColors.lightBackgroud,
          padding: 8,
          borderRadius: appSizes.Icon.medium,
        }}
      >
        {Icon.Icons(icon, {
          size: appSizes.Icon.medium,
          color: appColors.themeColor,
          style: {
            fontWeight: "bold",
          },
        })}
      </View>
      <Text
        style={{
          color: appColors.themeColor,
          fontFamily: appFonts.bold,
          fontSize: appSizes.Text.regular,
          ...appStyles.textLightShadow,
        }}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ModeButton;
