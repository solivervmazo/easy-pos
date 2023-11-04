import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenHeader = () => {
  return (
    <Stack.Screen
      options={{
        headerTitle: "Transactions",
      }}
    />
  );
};

const TransactionsScreen = () => {
  return (
    <SafeAreaView>
      <ScreenHeader />
      <Slot />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default TransactionsScreen;
