import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { appColors, appSizes } from "../../themes";
import { Octicons } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
const AnimatedIcon = Animated.createAnimatedComponent(Octicons);
const ACTION_TOGGLER_WIDTH = 42;
const ACTION_BUTTON_WIDTH = 42;
const ACTION_ICON_SIZE = appSizes.Icon.medium;

const TableRow = React.memo(
  (props: {
    content(): React.ReactNode;
    actions(args: { actionSize: number }): React.ReactNode;
    toggleKey: string;
    actionsCount: number;
    toggled: boolean;
    containerStyle?: {} & StyleProp<ViewStyle>;
    contentStyle?: {} & StyleProp<ViewStyle>;
    actionContainerStyle?: {} & StyleProp<ViewStyle>;
    actionContentStyle?: {} & StyleProp<ViewStyle>;
    onToggle(args: { toggled: boolean; toggledKey: string }): void;
  }) => {
    const {
      content = undefined,
      actions = undefined,
      toggleKey,
      actionsCount = 0,
      toggled = false,
      containerStyle = {},
      contentStyle = {},
      actionContainerStyle = {},
      actionContentStyle = {},
      onToggle = ({ toggled, toggledKey }) => {},
    } = props;
    const sharedTogglerMode = useSharedValue(false);
    const sharedTogglerIconDegree = useSharedValue("0deg");
    const sharedTogglerContentWidth = useSharedValue(ACTION_TOGGLER_WIDTH);

    const animatedTogglerIconStyles = useAnimatedStyle(() => ({
      transform: [{ rotate: sharedTogglerIconDegree.value }],
    }));

    const animatedTogglerContainerSyle = useAnimatedStyle(() => ({
      width: sharedTogglerContentWidth.value,
    }));

    const _animateRowToggling = (toggled: boolean) => {
      sharedTogglerIconDegree.value = withSequence(
        withTiming(!toggled ? "0deg" : "-180deg", {
          duration: 400,
        })
      );
      sharedTogglerContentWidth.value = withSequence(
        withTiming(
          !toggled
            ? ACTION_TOGGLER_WIDTH
            : ACTION_BUTTON_WIDTH * actionsCount + ACTION_TOGGLER_WIDTH,
          {
            duration: 400,
          },
          () => (sharedTogglerMode.value = toggled)
        )
      );
    };

    const toggleRowAction = (_toggled: boolean) => {
      onToggle({ toggled: _toggled, toggledKey: toggleKey });
    };

    useEffect(() => {
      if (toggled != sharedTogglerMode.value) {
        _animateRowToggling(toggled);
      }
    }, [toggled]);

    return (
      <View style={[styles.itemContainer, containerStyle]}>
        <View style={[styles.itemContent, contentStyle]}>
          {content && content()}
        </View>
        {actionsCount > 0 && (
          <Animated.View
            style={[
              styles.itemActionContainer,
              animatedTogglerContainerSyle,
              actionContainerStyle,
            ]}
          >
            <TouchableOpacity
              style={styles.itemActionToggleButton}
              onPress={() => toggleRowAction(!toggled)}
            >
              <AnimatedIcon
                name={"chevron-right"}
                size={appSizes.Icon.medium}
                color={appColors.lightText}
                style={[animatedTogglerIconStyles]}
              />
            </TouchableOpacity>
            <View style={[styles.itemActionContent, actionContentStyle]}>
              {actions && actions({ actionSize: ACTION_ICON_SIZE })}
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  itemContainer: {
    flexGrow: 1,
    backgroundColor: appColors.lightBgTertiary,
    flexDirection: "row",
    overflow: "hidden",
  },
  itemContent: { flex: 1 },
  itemActionContainer: {
    backgroundColor: appColors.lightPrimarySecondary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  itemActionToggleButton: {
    width: ACTION_TOGGLER_WIDTH,
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  itemActionContent: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
  },
});

export default TableRow;
