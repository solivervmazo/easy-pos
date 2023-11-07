import React, { useCallback, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { StyleSheet, View, Animated, Text } from "react-native";
import { appColors, appSizes } from "../themes";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const AnimatedIcon = Animated.createAnimatedComponent(Octicons);
const ACTION_TOGGLER_WIDTH = 42;
const ACTION_BUTTON_WIDTH = 42;
const ACTION_ICON_SIZE = appSizes.Icon.medium;

const RowCard = ({
  content = () => {},
  actions = ({ actionSize }) => {},
  actionsCount = 0,
  toggled = false,
  containerStyle = {},
  contentStyle = {},
  actionContainerStyle = {},
  actionContentStyle = {},
  onToggle = () => {},
}) => {
  const rowActionContainerWidth = useRef(
    new Animated.Value(ACTION_TOGGLER_WIDTH)
  ).current;
  const rowActionIconDeg = useRef(new Animated.Value(0)).current;

  const animateRowActionIconDeg = rowActionIconDeg.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const toggleRowAction = useCallback(() => {
    Animated.parallel([
      Animated.timing(rowActionContainerWidth, {
        toValue: toggled
          ? ACTION_TOGGLER_WIDTH
          : ACTION_BUTTON_WIDTH * actionsCount + ACTION_TOGGLER_WIDTH,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(rowActionIconDeg, {
        toValue: toggled ? 0 : 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(onToggle);
  });

  return (
    <View style={[styles.itemContainer, containerStyle]}>
      <View style={[styles.itemContent, contentStyle]}>{content()}</View>
      <Animated.View
        style={[
          styles.itemActionContainer,
          {
            width: rowActionContainerWidth,
          },
          actionContainerStyle,
        ]}
      >
        <TouchableOpacity
          style={styles.itemActionToggleButton}
          onPress={toggleRowAction}
        >
          <AnimatedIcon
            name={"chevron-right"}
            size={appSizes.Icon.medium}
            color={appColors.lightText}
            style={{
              transform: [{ rotate: animateRowActionIconDeg }],
            }}
          />
        </TouchableOpacity>
        <View style={[styles.itemActionContent, actionContentStyle]}>
          {actions({ actionSize: ACTION_ICON_SIZE })}
        </View>
      </Animated.View>
    </View>
  );
};

const AppTable = ({
  data,
  renderItem = (item) => {},
  renderActions = ({ actionSize }) => {},
  itemSeparatorComponent = () => {},
  actionsCount = 0,
  keyExtractor = (item) => {},
  tableContainerStyle = {},
}) => {
  const [rowToggled, setRowToggled] = useState(false);
  const onRowToggle = useCallback(() => {
    setRowToggled(!rowToggled);
  }, [rowToggled]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ ...tableContainerStyle }}
        data={data}
        renderItem={({ item }) => (
          <RowCard
            toggled={rowToggled}
            onToggle={onRowToggle}
            actionsCount={actionsCount}
            contentStyle={{ flexDirection: "row" }}
            actions={({ actionSize }) => renderActions({ actionSize })}
            content={() => renderItem(item)}
          />
        )}
        keyExtractor={(item) => keyExtractor(item)}
        ItemSeparatorComponent={() => itemSeparatorComponent()}
      />
    </View>
  );
};
//renderItem(item)

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

export default AppTable;
