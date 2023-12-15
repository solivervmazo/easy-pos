import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { appColors, appFonts, appSizes, appSpacing } from "../../themes/";
import Constants from "expo-constants";
const DrawerHeader = ({
  title,
  logo,
  headerTitleStyle = {},
  headerContainerStyle = {},
  renderToggler = () => null,
}) => {
  const statusBarHeight = Constants.statusBarHeight;

  const _renderToggler = () => {
    const _rendered = renderToggler();
    return _rendered;
  };
  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: statusBarHeight + 2,
        },
        headerContainerStyle,
      ]}
    >
      {_renderToggler()}
      <Image
        source={logo}
        style={{
          width: 28,
          height: 28,
          aspectRatio: "1/1",
        }}
        resizeMode="contain"
      />

      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={[styles.headerTitle, headerTitleStyle]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  headerTitle: {
    marginStart: 10,
    color: appColors.themeColor,
    fontSize: appSizes.Text.medium,
    fontFamily: appFonts.medium,
  },
});

export default DrawerHeader;
