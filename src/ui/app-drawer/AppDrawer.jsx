import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";
import { appColors, appSpacing } from "../../themes/";
import DrawerHeader from "./DrawerHeader";
import DrawerAuxSpace from "./DrawerAuxSpace";
import ItemListHeader from "./ItemListHeader";
import ItemListItem from "./ItemListItem";
import Constants from "expo-constants";
import Spacer from "../core/Spacer";

const AppDrawer = ({
  state,
  descriptors,
  navigation,
  renderToggler = () => null,
}) => {
  const props = { state, descriptors, navigation };
  const onPress = (path, options) => {
    navigation.navigate(path, options);
  };

  return (
    <View style={[styles.container]}>
      <Spacer horizontal={false} size={10} />
      <DrawerHeader
        title={"Easy POS"}
        logo={require("../../../assets/logo-light.png")}
        renderToggler={renderToggler}
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
            ) : options.routeOptions?.canNavigate ? (
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
            ) : null;
          })}
        </DrawerContentScrollView>
      </View>
      <DrawerAuxSpace />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.lightBackground,
  },
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
