import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "../../ui";
import { appColors, appSizes } from "../../themes";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useState } from "react";
import MyAppDrawerTogglerButton from "./MyAppDrawerTogglerButton";

const DrawerIcon = React.forwardRef((props, ref) => {
  React.createRef(ref);
  return (
    <View {...props}>
      <MyAppDrawerTogglerButton {...props} />
    </View>
  );
});

const AnimatedDrawerIcon = Animated.createAnimatedComponent(DrawerIcon);

const DRAWER_TOGGLE_ICON = "Drawer";
const DRAWER_BACK_ICON = "Forward";

const MyAppDrawerHeaderLeft = ({ toggle = false, onBack }) => {
  const sharedDrawerLeftIcon = useSharedValue(DRAWER_TOGGLE_ICON);
  const sharedDrawerAnimatingSearchMode = useSharedValue(toggle);
  const sharedDrawerDegree = useSharedValue("0deg");
  const [_headerLeftIcon, setHeaderLeftIcon] = useState(
    sharedDrawerLeftIcon.value
  );

  const animatedDrawerIconStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: sharedDrawerDegree.value }],
  }));

  const _animateHeaderForSearching = () => {
    sharedDrawerDegree.value = withSequence(
      withTiming(
        !sharedDrawerAnimatingSearchMode.value ? "0deg" : "-180deg",
        {
          duration: 400,
        },
        () =>
          (sharedDrawerAnimatingSearchMode.value =
            !sharedDrawerAnimatingSearchMode.value)
      )
    );
  };

  useAnimatedReaction(
    () => {
      return sharedDrawerDegree.value;
    },
    (currentValue, _) => {
      const currentDegree = Number(currentValue.replace("deg", ""));
      if (
        currentDegree < -150 &&
        sharedDrawerLeftIcon.value == DRAWER_TOGGLE_ICON
      ) {
        sharedDrawerLeftIcon.value = DRAWER_BACK_ICON;
        runOnJS(setHeaderLeftIcon)(DRAWER_BACK_ICON);
      } else if (
        currentDegree > -50 &&
        sharedDrawerLeftIcon.value == DRAWER_BACK_ICON
      ) {
        sharedDrawerLeftIcon.value = DRAWER_TOGGLE_ICON;
        runOnJS(setHeaderLeftIcon)(DRAWER_TOGGLE_ICON);
      }
    }
  );

  useEffect(() => {
    _animateHeaderForSearching();
  }, [toggle]);

  return (
    <AnimatedDrawerIcon
      icon={_headerLeftIcon}
      style={[animatedDrawerIconStyles]}
      onPress={onBack}
    />
  );
};

export default MyAppDrawerHeaderLeft;

const styles = StyleSheet.create({});
