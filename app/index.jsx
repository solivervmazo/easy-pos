import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppIndex } from "../src/components/app";
import { Redirect, Stack } from "expo-router";
const index = () => {
  // return <Redirect href={"/items/[id]"} />;
  return <Redirect href={"/(drawer)/(store)/items"} />;
  // return <Stack.Screen></Stack.Screen>;
};

const styles = StyleSheet.create({});

export default index;
