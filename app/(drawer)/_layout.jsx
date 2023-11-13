import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet } from "react-native";
import { AppScreen } from "../../src/screens";

/** DO NOT put components inside (drawer), use imports only.
 *  STRICTLY for drawer structure only
 *  ALWAYS put the components inside src/components folder, for modular approach.
 */

SplashScreen.preventAutoHideAsync();

const _layout = () => {
  return <AppScreen />;
};

const styles = StyleSheet.create({});

export default _layout;
