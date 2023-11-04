import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { AppScreen } from "../../src/screens";

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  return <AppScreen />;
};

const styles = StyleSheet.create({});

export default _layout;
