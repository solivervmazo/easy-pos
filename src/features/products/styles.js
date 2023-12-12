import { StyleSheet } from "react-native";
import { appColors, appFonts, appSizes } from "../../themes";

export const commonStyles = StyleSheet.create({
  inputActionButtonContainer: {
    backgroundColor: appColors.lightPrimary,
  },
  shortkeyBtn: {
    height: appSizes.Icon.large,
    width: appSizes.Icon.large,
    borderWidth: 0.5,
    borderColor: appColors.lightBgSecondary,
    overflow: "hidden",
  },
});
