import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PosQuickMode from "./shared/PosQuickMode";
import PosEarnings from "./shared/PosEarnings";
const PosDashboard = () => {
  return (
    <View style={styles.container}>
      <PosQuickMode />
      <PosEarnings />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: appSpacing.screenPaddingLeft },
});

export default PosDashboard;
