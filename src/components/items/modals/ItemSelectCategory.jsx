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

const ItemSelectCategory = () => {
  return (
    <>
      <ScreenHeader />
      <View style={{ flex: 1 }}>
        <AppSelectPicker
          items={CATS}
          value={[2]}
          multiple={false}
          itemKey={"id"}
          itemLabel={"label"}
        />
      </View>
    </>
  );
};

export default ItemSelectCategory;

const styles = StyleSheet.create({});
