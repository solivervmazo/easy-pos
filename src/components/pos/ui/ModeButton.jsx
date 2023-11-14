import React from "react";
import { StyleSheet } from "react-native";
import { appStyles } from "../../../themes";
import { ChipButton } from "../../../ui";

const ModeButton = ({ icon, label, onPress }) => {
  return (
    <ChipButton
      onPress={onPress}
      containerStyle={styles.container}
      innerContainerStyle={styles.innerContainer}
      buttonLeft={({ Icon }) =>
        Icon(icon, {
          size: appSizes.Icon.large,
          color: appColors.themeColor,
          style: styles.icon,
        })
      }
      label={label}
      labelStyle={styles.label}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.themeColorTertiary,
    flexDirection: "column",
    paddingVertical: 20,
    borderRadius: 20,
  },
  innerContainer: {
    width: "30%",
  },
  icon: {
    fontWeight: "bold",
  },
  label: {
    color: appColors.themeColor,
    fontFamily: appFonts.bold,
    fontSize: appSizes.Text.regular,
    ...appStyles.textLightShadow,
  },
});

export default ModeButton;
