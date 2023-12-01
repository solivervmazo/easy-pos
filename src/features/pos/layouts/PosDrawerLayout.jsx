import React from "react";
import { StyleSheet, View } from "react-native";
import { appColors } from "../../../themes";
import { Slot } from "expo-router";

const PosDrawerLayout = () => {
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

export default PosDrawerLayout;
