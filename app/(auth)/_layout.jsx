import React from "react";
import { HomeContextProvider } from "../../src/components/home";
import { AuthScreen } from "../../src/screens";
import { Stack } from "expo-router";

const _layout = () => {
  return <AuthScreen />;
};

export default _layout;
