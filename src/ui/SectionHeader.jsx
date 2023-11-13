import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { appColors, appSizes, appFonts, appConstants } from "../themes";

const TitleText = ({ title, fontSize, color }) => {
  return (
    <Text
      style={[
        styles.title,
        {
          fontSize,
          color,
        },
      ]}
    >
      {title}
    </Text>
  );
};

const SectionHeader = ({
  title,
  renderTitle = ({ TitleTextComponent, fontSize, color }) => null,
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
      {renderTitle({ TitleTextComponent: TitleText }) ? (
        renderTitle({
          TitleTextComponent: TitleText,
          fontSize: titleSize || size,
          color: titleColor || color,
        })
      ) : (
        <TitleText
          title={title}
          fontSize={titleSize || size}
          color={titleColor || color}
        />
      )}
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
