import React from "react";
import { Stack } from "expo-router";
import DrawerHeader from "../ui/DrawerHeader";
import { routes } from "../../../routes";
import ItemDetailScreen from "../screens/ItemDetailScreen";
const ItemsDrawerLayout = () => {
  const { stack } = routes;
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
        {/* [id].jsx */}
      </Stack>
    </>
  );
};

export default ItemsDrawerLayout;
