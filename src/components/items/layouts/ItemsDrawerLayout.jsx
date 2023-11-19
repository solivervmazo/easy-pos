import React from "react";
import { Slot } from "expo-router";
import DrawerHeader from "../ui/DrawerHeader";
const ItemsDrawerLayout = () => {
  return (
    <>
      <DrawerHeader />
      <Slot />
    </>
  );
};

export default ItemsDrawerLayout;
