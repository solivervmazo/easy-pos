import React from "react";
import { StyleSheet } from "react-native";
import { Redirect } from "expo-router";
const index = () => {
  // return <Redirect href={"/items/[id]"} />;
  return <Redirect href={"/(drawer)/(units)/products"} />;
  // return null;
  // return <Stack.Screen></Stack.Screen>;
};

const styles = StyleSheet.create({});

export default index;
