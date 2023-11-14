import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ChipButton, SectionHeader, AppCard } from "../../../ui";
import { appSizes } from "../../../themes";

const PosEarnings = ({ containerStyle = {} }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <SectionHeader
        title={"Earnings"}
        containerStyle={{ paddingBottom: 12 }}
      />
      <AppCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});

export default PosEarnings;
