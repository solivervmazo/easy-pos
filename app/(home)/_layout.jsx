import React from "react";
import { HomeContextProvider } from "../../src/components/home";
import { HomeScreen } from "../../src/screens/";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <HomeContextProvider.Provider value={{}}>
      <Stack.Screen />
      <HomeScreen />
    </HomeContextProvider.Provider>
  );
};

export default _layout;
