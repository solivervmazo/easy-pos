import { Stack, usePathname, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const _layout = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="filterDate"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default _layout;
