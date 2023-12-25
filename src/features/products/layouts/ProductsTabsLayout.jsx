import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { TabBarItem } from "react-native-tab-view/src/TabBarItem";
import { TabBarIndicator } from "react-native-tab-view/src/TabBarIndicator";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { PRODUCT_FEATURE_ALIAS, TABS_HEIGHT } from "../constants";
import { HeaderMode } from "../../../enums";
import { appStore } from "../../../my-app";
import { Icon } from "../../../ui";
import { appColors, appFonts, appSizes } from "../../../themes";
import VariationScreen from "../screens/VariationScreen";
import ProductsScreen from "../screens/ProductsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";
import MyAppTabsBar from "../../../my-app/ui/MyAppTabsBar";

const Tabs = createMaterialTopTabNavigator();

const AppTabsBar = (props) => {
  const tabsHeaderMode = useSelector((state) =>
    appStore.header.selectors.products.tabsHeaderModeSelector(state, {
      feature: PRODUCT_FEATURE_ALIAS,
    })
  );
  return (
    <MyAppTabsBar
      tabsHeaderMode={tabsHeaderMode}
      index={"products"}
      props={props}
    />
  );
};

const ProductsTabsLayout = () => {
  return (
    <Tabs.Navigator
      tabBar={(props) => <AppTabsBar {...props} />}
      screenOptions={{
        lazy: true,
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
      <Tabs.Screen name="variations" component={VariationScreen} />
      <Tabs.Screen name="categories" component={CategoriesScreen} />
    </Tabs.Navigator>
  );
};

export default ProductsTabsLayout;
