import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { TabBarItem } from "react-native-tab-view/src/TabBarItem";
import { TabBarIndicator } from "react-native-tab-view/src/TabBarIndicator";
import ProductsScreen from "../screens/ProductsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import { Icon } from "../../../ui";
import { appColors, appFonts, appSizes } from "../../../themes";
import Animated from "react-native-reanimated";

const Tabs = createMaterialTopTabNavigator();

const AppTabsBar = (props) => {
  const remainingTabsWidth =
    (props.layout.width - 60) / (props.state.routes.length - 1);
  return (
    <Animated.View>
      <MaterialTopTabBar
        {...props}
        renderTabBarItem={(props) => {
          return (
            <TabBarItem
              {...props}
              defaultTabWidth={
                props.route.name === "products" ? 60 : remainingTabsWidth
              }
              style={{
                height: 50,
              }}
            />
          );
        }}
      />
    </Animated.View>
  );
};

const ProductsTabsLayout = () => {
  return (
    <Tabs.Navigator
      tabBar={(props) => <AppTabsBar {...props} />}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: appColors.themeColor,
          height: 48,
        },
        tabBarLabelStyle: {
          textTransform: "capitalize",
          fontFamily: appFonts.medium,
          color: appColors.lightText,
          fontSize: appSizes.Text.semiRegular,
        },

        tabBarIndicator: (props) => {
          const rest = Object.assign({}, props);
          delete rest["state"];
          const screenWidth = props.layout.width;
          const remainingTabsWidth =
            (screenWidth - 60) / (props.state.routes.length - 1);
          const allTabsWidthDiff =
            remainingTabsWidth - screenWidth / props.state.routes.length;
          return (
            <TabBarIndicator
              navigationState={props.state}
              {...rest}
              gap={0}
              width={props?.state?.index === 0 ? 60 : remainingTabsWidth}
              style={{
                marginStart:
                  props?.state?.index === 0
                    ? 0
                    : -(
                        allTabsWidthDiff *
                        (props.state.routes.length - props?.state?.index)
                      ),
                backgroundColor: appColors.themeColorTertiary,
                marginBottom: 1,
              }}
            />
          );
        },
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: () => (
            <Icon.Items
              size={appSizes.Icon.large}
              color={appColors.lightText}
            />
          ),
        }}
        component={ProductsScreen}
      />
      <Tabs.Screen name="categories" component={CategoriesScreen} />
    </Tabs.Navigator>
  );
};

export default ProductsTabsLayout;
