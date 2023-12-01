import { StyleSheet } from "react-native";
import React from "react";
import { AppSearchBar, IconButton } from "../../../ui";
import { Drawer } from "expo-router/drawer";

const SearchBar = ({ page = "", icon = "Search" }) => {
  return (
    <AppSearchBar
      placeholder={`Search in ${page}`}
      itemRight={() => (
        <IconButton
          icon={icon}
          size={appSizes.Icon.medium}
          color={appColors.themeColorSecondary}
          containerStyle={styles.iconButton}
        />
      )}
    />
  );
};

const DrawerHeader = () => {
  return (
    <Drawer.Screen
      options={
        {
          // headerTitle: () => <SearchBar page={"Items"} icon="PosScanMode" />,
        }
      }
    />
  );
};

const styles = StyleSheet.create({
  iconButton: {
    backgroundColor: appColors.lightBgTertiary,
    padding: 6,
  },
});

export default DrawerHeader;
