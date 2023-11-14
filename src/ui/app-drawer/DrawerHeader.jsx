import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { appColors, appFonts, appSizes, appSpacing } from "../../themes/";
import Constants from "expo-constants";
const DrawerHeader = ({ title, logo }) => {
  const statusBarHeight = Constants.statusBarHeight;
  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: statusBarHeight + 2,
        },
      ]}
    >
      <Image
        source={logo}
        style={{
          width: 28,
          height: 28,
          aspectRatio: "1/1",
        }}
        resizeMode="contain"
      />
      <Text style={[styles.headerTitle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    marginStart: 10,
    color: appColors.themeColor,
    fontSize: appSizes.Text.medium,
    fontFamily: appFonts.medium,
  },
});

export default DrawerHeader;
