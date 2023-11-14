import React from "react";
import { Stack } from "expo-router";
import DrawerHeader from "../components/items/ui/DrawerHeader";
const ItemsScreen = () => {
  return (
    <>
      <DrawerHeader />
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="filterDate"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </>
  );
};

export default ItemsScreen;
