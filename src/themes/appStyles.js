import { StyleSheet } from "react-native";
import appColors from "./appColors";
import appSpacing from "./appSpacing";

export default appStyles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    backgroundColor: appColors.darkBackground,
  },
  textLightShadow: {
    textShadowColor: "rgba(255, 255, 255, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  textDarkShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  contentMainContainer: {
    paddingHorizontal: appSpacing.screenPaddingLeft,
    height: "100%",
  },
});
