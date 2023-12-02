import { StyleSheet } from "react-native";
import { appColors, appFonts, appSizes } from "../../themes";

export const commonStyles = StyleSheet.create({
  container: { flex: 1 },
  sectionHeaderContainer: {
    marginBottom: 10,
  },
  sectionContent: { flex: 1, justifyContent: "flex-start", gap: 20 },
  inputLabelContainer: {
    marginStart: 10,
  },
  inputLabel: {
    fontSize: appSizes.Text.slightlyRegular,
    fontFamily: appFonts.medium,
  },
  inputActionButtonContainer: {
    backgroundColor: appColors.lightPrimary,
  },
});
