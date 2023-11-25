import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { appColors } from "../themes";

const AppSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={appColors.themeColor} size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: appColors.transparent2,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
});

export default AppSpinner;
