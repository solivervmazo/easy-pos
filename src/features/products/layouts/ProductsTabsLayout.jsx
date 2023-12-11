import React, { useEffect } from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
} from "@react-navigation/material-top-tabs";
import { TabBarItem } from "react-native-tab-view/src/TabBarItem";
import { TabBarIndicator } from "react-native-tab-view/src/TabBarIndicator";
import { Icon } from "../../../ui";
import { appColors, appFonts, appSizes } from "../../../themes";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { productTabsHeaderModeSelector } from "../../../store/slices/header/headerSlice";
import { PRODUCT_FEATURE_ALIAS, TABS_HEIGHT } from "../constants";
import { HeaderMode } from "../../../enums";
import VariationScreen from "../screens/VariationScreen";

import ProductsScreen from "../screens/ProductsScreen";
import CategoriesScreen from "../screens/CategoriesScreen";

const Tabs = createMaterialTopTabNavigator();

const AppTabsBar = (props) => {
  const tabsHeaderMode = useSelector((state) =>
    productTabsHeaderModeSelector(state, { feature: PRODUCT_FEATURE_ALIAS })
  );
  const _tabsHeightShared = useSharedValue(TABS_HEIGHT);
  const _remainingTabsWidth =
    (props.layout.width - 60) / (props.state.routes.length - 1);

  const _tabsHidden = () => tabsHeaderMode == HeaderMode.search;

  const _animateHeight = () => {
    _tabsHeightShared.value = withSequence(
      withTiming(_tabsHidden() ? 0 : TABS_HEIGHT, {
        duration: 200,
      })
    );
  };

  const _animatedTabsStyle = useAnimatedStyle(() => ({
    height: _tabsHeightShared.value,
  }));

  useEffect(() => {
    _animateHeight();
  }, [tabsHeaderMode]);

  return (
    <Animated.View style={[_animatedTabsStyle]}>
      <MaterialTopTabBar
        {...props}
        renderTabBarItem={(props) => {
          return (
            <TabBarItem
              {...props}
              defaultTabWidth={
                props.route.name === "products" ? 60 : _remainingTabsWidth
              }
              {...(_tabsHidden() ? { onPress: () => {} } : {})}
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
