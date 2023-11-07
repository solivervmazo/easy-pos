import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { AppDrawer, Icon } from "../ui/";
import { useDrawerRoutes } from "../routes/";
import { appColors, appConstants, appSizes } from "../themes";
import { TouchableOpacity } from "react-native-gesture-handler";

const ItemScreenHeader = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        containerStyle={{
          flex: 1,
          flexGrow: 1,
          borderRadius: 22,
          backgroundColor: appColors.lightBackgroud,
          overflow: "hidden",
          justifyContent: "center",
        }}
        onPress={() => {
          console.log("Pressed 1");
        }}
        activeOpacity={appConstants.ACTIVE_OPACITY}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              color: appColors.themeColorSecondary,
              fontSize: appSizes.Text.regular,
            }}
          >
            Search in items
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: appSizes.Icon.medium,
              backgroundColor: appColors.lightBgTertiary,
              padding: 6,
            }}
            onPress={() => {
              console.log("Pressed 2");
            }}
            activeOpacity={appConstants.ACTIVE_OPACITY}
          >
            <Icon.PosScanMode
              size={appSizes.Icon.medium}
              color={appColors.themeColorSecondary}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const AppScreen = ({ onLayout }) => {
  const routes = useDrawerRoutes();
  return (
    <Drawer
      defaultStatus={"closed"}
      onLayout={onLayout}
      drawerContent={(props) => <AppDrawer {...props} />}
      screenOptions={{
        headerTintColor: appColors.lightText,
        headerRightContainerStyle: {
          display: "none",
        },
        headerTitleContainerStyle: {
          flexGrow: 1,
          paddingVertical: 15,
        },
        headerStyle: {
          height: 100,
          backgroundColor: appColors.themeColor,
        },
      }}
    >
      {routes.map((route) => (
        <Drawer.Screen
          name={route.path}
          options={{
            ...route.options,
            ...(route.name === "itemsItems"
              ? { headerTitle: () => <ItemScreenHeader /> }
              : {}),
          }}
          key={route.name}
        />
      ))}
    </Drawer>
  );
};

const styles = StyleSheet.create({});
export default AppScreen;
