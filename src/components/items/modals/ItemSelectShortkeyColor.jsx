import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appSpacing } from "../../../themes";
import { AppColorPicker } from "../../../ui";

const ScreenHeader = () => (
  <Stack.Screen
    options={{
      title: "Shortkey Color",
      headerShown: true,
      presentation: "modal",
      animation: "slide_from_bottom",
      animationDuration: 250,
    }}
  />
);

const ItemSelectShortkeyColor = () => {
  return (
    <>
      <ScreenHeader />
      <View style={{ flex: 1 }}>
        <AppColorPicker />
      </View>
    </>
  );
};

export default ItemSelectShortkeyColor;

const styles = StyleSheet.create({});
