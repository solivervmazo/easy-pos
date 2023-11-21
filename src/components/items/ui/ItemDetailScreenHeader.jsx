import React from "react";
import { Stack } from "expo-router";

const ItemDetailScreenHeader = () => {
  return (
    <Stack.Screen
      options={{
        title: "New Product",
        headerShown: true,
      }}
    />
  );
};

export default ItemDetailScreenHeader;
