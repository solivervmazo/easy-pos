import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { appColors, appFonts, appSizes, appSpacing } from "../../themes/";

const DrawerAuxSpace = () => {
  return (
    <View
      style={{
        flexShrink: 1,
        padding: appSpacing.screenPaddingLeft,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/imgs/cloud-sync.png")}
        resizeMode={"center"}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 100,
          width: 100,
        }}
      ></Image>
      <Text
        style={{
          fontSize: appSizes.Text.semiRegular,
          fontFamily: appFonts.medium,
        }}
      >
        Sync Data
      </Text>
      <Text
        style={{
          fontSize: appSizes.Text.small,
          fontFamily: appFonts.regular,
          paddingHorizontal: 20,
          textAlign: "center",
          color: appColors.darkTextTertiary,
        }}
      >
        Login to sync your data from cloud and have more control over your app.
      </Text>
      <Text
        style={{
          fontSize: appSizes.Text.semiRegular,
          fontFamily: appFonts.bold,
          paddingHorizontal: 20,
          textAlign: "center",
          color: appColors.themeColorSecondary,
        }}
      >
        Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DrawerAuxSpace;
