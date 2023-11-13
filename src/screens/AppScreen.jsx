import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Drawer } from "expo-router/drawer";
import { AppDrawer, Icon, AppSearchBar, IconButton } from "../ui/";
import { useDrawerRoutes } from "../routes/";
import { appColors, appConstants, appSizes } from "../themes";
import { TouchableOpacity } from "react-native-gesture-handler";

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

const ItemItemsScreenHeader = () => {
  return <SearchBar page={"Items"} icon="PosScanMode" />;
};

const ItemCategoriesScreenHeader = () => {
  return <SearchBar page={"Categories"} />;
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
      {Object.keys(routes).map((key) => {
        const route = routes[key];
        return (
          <Drawer.Screen
            name={route.path}
            options={{
              ...route.options,
              ...(route.key === "store-items"
                ? { headerTitle: () => <ItemItemsScreenHeader /> }
                : {}),
            }}
            key={key}
          />
        );
      })}
    </Drawer>
  );
};
/* <Drawer.Screen
          name={route.path}
          options={{
            navigatorTypes: route.types,
            navigatorPath: route.path,
            ...route.options,
            ...(route.name === "itemsItems"
              ? { headerTitle: () => <ItemItemsScreenHeader /> }
              : route.name === "itemsCategories"
              ? { headerTitle: () => <ItemCategoriesScreenHeader /> }
              : {}),
          }}
          key={route.name}
        /> */
const styles = StyleSheet.create({});
export default AppScreen;
