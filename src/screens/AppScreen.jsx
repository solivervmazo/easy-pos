import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
import { AppDrawer } from "../ui/";
import { useDrawerRoutes } from "../routes/";
import { appColors } from "../themes";

const AppScreen = ({ onLayout }) => {
  const routes = useDrawerRoutes();
  return (
    <Drawer
      defaultStatus={"closed"}
      onLayout={onLayout}
      drawerContent={(props) => <AppDrawer {...props} />}
      screenOptions={{
        headerTintColor: appColors.lightText,
        headerStyle: {
          backgroundColor: appColors.themeColor,
        },
      }}
    >
      {routes.map((route) => (
        <Drawer.Screen
          name={route.path}
          options={{
            ...route.options,
          }}
          key={route.name}
        />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({});
export default AppScreen;
