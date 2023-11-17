import { Slot, Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ScreenHeader = () => {
  return (
    <Stack.Screen
      options={{
        headerTitle: "",
        headerShown: true,
      }}
    />
  );
};

const ItemsStackLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScreenHeader />
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ItemsStackLayout;
