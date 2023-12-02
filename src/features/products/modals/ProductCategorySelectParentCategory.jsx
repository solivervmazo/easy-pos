import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { AppModal, AppSelectPicker } from "../../../ui";

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
      title: "Prent Category",
      headerShown: true,
      presentation: "modal",
      animation: "slide_from_bottom",
      animationDuration: 250,
    }}
  />
);

const ProductCategorySelectParentCategory = () => {
  const [_selected, setSelected] = useState();
  return (
    <>
      <ScreenHeader />
      <View style={{ flex: 1 }}>
        <AppModal
          renderContent={() => (
            <AppSelectPicker
              items={CATS}
              value={[2]}
              itemKey={"id"}
              itemLabel={"label"}
              multiple={true}
              canSearch={true}
              showRecents={true}
              appendType="chip"
              onSelect={(value) => console.log(value)}
            />
          )}
        />
      </View>
    </>
  );
};

export default ProductCategorySelectParentCategory;

const styles = StyleSheet.create({});
