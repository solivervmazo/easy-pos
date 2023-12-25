import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { TABS_HEIGHT } from "../constants";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import { TabBarItem } from "react-native-tab-view/src/TabBarItem";
import { HeaderMode } from "../../enums";

const MyAppTabsBar = ({ props, tabsHeaderMode, index }) => {
  const tabsHeightShared = useSharedValue(TABS_HEIGHT);
  const remainingTabsWidth =
    (props.layout.width - 60) / (props.state.routes.length - 1);

  const tabsHidden = () => tabsHeaderMode == HeaderMode.search;

  const animateHeight = () => {
    tabsHeightShared.value = withSequence(
      withTiming(tabsHidden() ? 0 : TABS_HEIGHT, {
        duration: 200,
      })
    );
  };

  const animatedTabsStyle = useAnimatedStyle(() => ({
    height: tabsHeightShared.value,
  }));

  useEffect(() => {
    animateHeight();
  }, [tabsHeaderMode]);

  return (
    <Animated.View style={[animatedTabsStyle]}>
      <MaterialTopTabBar
        {...props}
        renderTabBarItem={(props) => {
          return (
            <TabBarItem
              {...props}
              defaultTabWidth={
                props.route.name === index ? 60 : remainingTabsWidth
              }
              {...(tabsHidden() ? { onPress: () => {} } : {})}
            />
          );
        }}
      />
    </Animated.View>
  );
};

export default MyAppTabsBar;
