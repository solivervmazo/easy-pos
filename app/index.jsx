import React from "react";
import { StyleSheet } from "react-native";
import { Redirect } from "expo-router";
const index = () => {
  // return <Redirect href={"/products/categories/[id]"} />;
  // return <Redirect href={"/(drawer)/(units)/products"} />;
  return <Redirect href={"/(drawer)/(store)/pos"} />;
  // return null;
  // return <Stack.Screen></Stack.Screen>;
};

const styles = StyleSheet.create({});

export default index;
