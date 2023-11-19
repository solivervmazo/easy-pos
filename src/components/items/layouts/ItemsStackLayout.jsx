import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { appColors } from "../../../themes";

const ScreenHeader = () => <Stack.Screen options={{}} />;

const ItemsStackLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          title: "Items",
          headerShown: false,
          headerStyle: {
            backgroundColor: appColors.themeColor,
          },
          headerTintColor: appColors.lightText,
        }}
      />
    </>
  );
};

export default ItemsStackLayout;
