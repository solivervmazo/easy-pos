import React from "react";
import { Stack } from "expo-router";
import { appColors } from "../../../themes";

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
