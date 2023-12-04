import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { AppDrawer, AppSearchBar, IconButton } from "../../ui";
import { useDrawerRoutes } from "../../routes";
import { appColors, appSizes } from "../../themes";
import { StatusBar } from "expo-status-bar";
import DrawerHeader from "../../ui/app-drawer/DrawerHeader";

const SearchBar = ({ page = "", icon = "Search" }) => {
  return (
    <AppSearchBar
      placeholder={`Search in ${page}`}
      itemRight={() => (
        <IconButton
          icon={icon}
          size={appSizes.Icon.medium}
          color={appColors.themeColorSecondary}
          containerStyle={{
            backgroundColor: appColors.lightBgTertiary,
            padding: 6,
          }}
        />
      )}
    />
  );
};

const AppDrawerLayout = ({ onLayout }) => {
  const routes = useDrawerRoutes();
  return (
    <>
      <StatusBar style="light" />

      <Drawer
        defaultStatus={"closed"}
        onLayout={onLayout}
        drawerContent={(props) => <AppDrawer {...props} />}
        screenOptions={{
          headerTintColor: appColors.lightText,
          headerStyle: {
            backgroundColor: appColors.themeColor,
            elevation: 0,
            height: 80,
          },
          headerTitleContainerStyle: {
            marginHorizontal: 0,
          },
          // headerTitle: () => null,
          headerTitle: ({ children }) => {
            return (
              <DrawerHeader
                title={children}
                logo={require("../../../assets/logo-light.png")}
                headerTitleStyle={styles.headerTitle}
                headerContainerStyle={styles.headerContainer}
              />
            );
          },
          headerRight: ({ tintColor }) => {
            <Text></Text>;
          },
        }}
      >
        {Object.keys(routes).map((key) => {
          const route = routes[key];
          return (
            <Drawer.Screen
              name={route.path}
              options={{
                ...route.options,
                // headerTitle: route.options.title,
                // ...(route.key === "store-items"
                //   ? { headerTitle: () => <ItemItemsScreenHeader /> }
                //   : {}),
              }}
              key={key}
            />
          );
        })}
      </Drawer>
    </>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    color: appColors.lightText,
  },
  headerContainer: {
    paddingTop: 3,
    paddingHorizontal: 0,
  },
});
export default AppDrawerLayout;
