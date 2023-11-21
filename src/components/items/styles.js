import { StyleSheet } from "react-native";
import { appColors } from "../../themes";

export const commonStyles = StyleSheet.create({
  container: { flex: 1 },
  sectionHeaderContainer: {
    marginBottom: 15,
  },
  sectionContent: { flex: 1, justifyContent: "flex-start", gap: 20 },
  inputLabelContainer: {
    marginStart: 10,
  },
  inputActionButtonContainer: {
    backgroundColor: appColors.lightPrimary,
  },
});
