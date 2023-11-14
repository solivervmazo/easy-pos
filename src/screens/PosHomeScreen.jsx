import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors } from "../themes";
import { Slot } from "expo-router";

const PosHomeScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColors.lightBgSecondary,
      }}
    >
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PosHomeScreen;
