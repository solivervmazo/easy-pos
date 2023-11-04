import React from "react";
import { AuthLogin } from "../../src/components/auth";
import { Text, View } from "react-native";

const home = () => {
  return (
    <Drawer.Screen
      name="(auth)/login3"
      options={{
        drawerLabel: "login",
        title: "login",
      }}
    />
  );
};

export default home;
