import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import { AppDrawer } from "../ui/";
import { useDrawerRoutes } from "../routes/";

const AppScreen = ({ onLayout }) => {
  const routes = useDrawerRoutes();
  return (
    <Drawer
      onLayout={onLayout}
      drawerContent={(props) => <AppDrawer {...props} />}
      screenOptions={{}}
    >
      {routes.map((route) => (
        <Drawer.Screen name={route.path} options={route.options} />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({});
export default AppScreen;
