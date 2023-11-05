import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { appColors, appSizes, appFonts, appConstants } from "../themes";

const SectionHeader = ({
  title,
  color = appColors.darkText,
  titleColor,
  size = appSizes.Text.regular,
  titleSize,
  btnText,
  btnTextColor = appColors.themeColor,
  onLink = () => {},
  containerStyle = {},
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          ...containerStyle,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            fontSize: titleSize || size,
            color: titleColor || color,
          },
        ]}
      >
        {title}
      </Text>
      <TouchableOpacity
        onPress={onLink}
        activeOpacity={appConstants.ACTIVE_OPACITY}
      >
        <Text
          style={[
            styles.btnText,
            {
              color: btnTextColor,
            },
          ]}
        >
          {btnText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: appFonts.bold,
  },
  btnText: {
    fontSize: appSizes.Text.small,
    fontFamily: appFonts.medium,
  },
});
export default SectionHeader;
