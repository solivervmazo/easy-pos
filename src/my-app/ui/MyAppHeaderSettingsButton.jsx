import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { appFonts, appSizes } from "../../themes";
import { t } from "../../locale/localization";

const MyAppHeaderSettingsButton = ({ color, onPress }) => {
  return (
    <Text onPress={onPress} style={[styles.text, { color }]}>
      {t(`settings`, "phrase")}
    </Text>
  );
};

export default MyAppHeaderSettingsButton;

const styles = StyleSheet.create({
  text: {
    fontSize: appSizes.Text.semiRegular,
    fontFamily: appFonts.medium,
  },
});
