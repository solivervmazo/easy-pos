import React from "react";
import { StyleSheet } from "react-native";
import { appColors, appFonts, appSizes, appStyles } from "../../../themes";
import { ChipButton, IconButton } from "../../../ui";

const SessionButton = ({
  icon,
  label,
  onPress,
  size = appSizes.Icon.regular,
  chipColor = appColors.themeColorTertiary,
  iconColor = appColors.themeColor,
  labelStyle = {},
}) => {
  return (
    <ChipButton
      onPress={onPress}
      containerStyle={[styles.container, { backgroundColor: chipColor }]}
      buttonLeft={({ Icon }) =>
        icon
          ? Icon(icon, {
              size,
              color: iconColor,
              style: styles.icon,
            })
          : null
      }
      label={label}
      labelStyle={[styles.label, labelStyle]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    paddingHorizontal: 18,
  },
  icon: {
    fontWeight: "bold",
  },
  label: {
    color: appColors.themeColor,
    fontFamily: appFonts.bold,
    fontSize: appSizes.Text.semiRegular,
  },
});

export default SessionButton;
