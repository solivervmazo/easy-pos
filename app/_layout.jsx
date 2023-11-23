import React, { useCallback } from "react";
import { Provider } from "react-redux";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { store } from "../src/store/store";

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Thin": require("../assets/fonts/Roboto-Thin.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, []);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack
        onLayout={onLayoutRootView}
        screenOptions={{ headerShown: false }}
      />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default _layout;
