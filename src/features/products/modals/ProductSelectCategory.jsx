import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { AppSelectPicker } from "../../../ui";

const CATS = [
  {
    id: 1,
    label: "Food",
  },
  {
    id: 2,
    label: "Drinks",
  },
  {
    id: 3,
    label: "Pizza",
  },
  {
    id: 4,
    label: "Extras",
  },
];

const ScreenHeader = () => (
  <Stack.Screen
    options={{
      title: "Category",
      headerShown: true,
      presentation: "modal",
      animation: "slide_from_bottom",
      animationDuration: 250,
    }}
  />
);

const ProductSelectCategory = () => {
  return (
    <>
      <ScreenHeader />
      <View style={{ flex: 1 }}>
        <AppSelectPicker
          items={CATS}
          value={[2]}
          multiple={true}
          itemKey={"id"}
          itemLabel={"label"}
          canSearch={true}
          showRecents={true}
          appendType="chip"
        />
      </View>
    </>
  );
};

export default ProductSelectCategory;

const styles = StyleSheet.create({});
