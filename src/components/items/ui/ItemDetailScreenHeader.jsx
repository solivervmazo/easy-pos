import React from "react";
import { Stack } from "expo-router";

const ItemDetailScreenHeader = ({ item }) => {
  const _title = `${item ? "" : "New "}Product${
    item?.productId ? `(${item.productId})` : ""
  }`;
  return (
    <Stack.Screen
      options={{
        title: _title,
        headerShown: true,
      }}
    />
  );
};

export default ItemDetailScreenHeader;
