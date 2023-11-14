import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";
import { appColors, appSpacing } from "../../themes/";
import DrawerHeader from "./DrawerHeader";
import DrawerAuxSpace from "./DrawerAuxSpace";
import ItemListHeader from "./ItemListHeader";
import ItemListItem from "./ItemListItem";

const AppDrawer = (props) => {
  const { state, descriptors, navigation } = props;
  const onPress = (path, options) => {
    navigation.navigate(path, options);
  };

  return (
    <View style={[styles.container]}>
      <DrawerHeader
        title={"Easy POS"}
        logo={require("../../../assets/logo-light.png")}
      />
      <View style={[styles.itemsContainer]}>
        <DrawerContentScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.drawerContentScrollView}
          {...props}
        >
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;
            const { options } = descriptors[route.key];

            return options.routeOptions?.head ? (
              <ItemListHeader
                options={options}
                key={options.routeOptions.key}
              />
            ) : (
              <ItemListItem
                key={route.key}
                isFocused={isFocused}
                options={options}
                onPress={() => {
                  options?.routeOptions?.initialScreen
                    ? onPress(route.name, {
                        screen: options.routeOptions.initialScreen || false,
                      })
                    : onPress(route.name);
                }}
              />
            );
          })}
        </DrawerContentScrollView>
      </View>
      <DrawerAuxSpace />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: appColors.lightBackground },
  itemsContainer: {
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: appSpacing.screenPaddingLeft,
  },
  drawerContentScrollView: {
    paddingTop: 5,
  },
});

export default AppDrawer;
