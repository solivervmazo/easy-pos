import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import DrawerHeader from "../../ui/app-drawer/DrawerHeader";
import { appColors } from "../../themes";

const TITLE_WIDTH = 200;
const MyAppDrawerHeaderTitle = ({
  toggle: headerMode,
  titleText,
  onHidden = ({ hidden }) => hidden,
}) => {
  const [_hidden, setHidden] = useState(false);
  const titleWidth = useSharedValue(TITLE_WIDTH);
  const sharedDrawerAnimatingSearchMode = useSharedValue(headerMode);

  const _animateHeaderForSearching = () => {
    runOnJS(_onChangeHandle)(sharedDrawerAnimatingSearchMode.value);
    titleWidth.value = withSequence(
      withTiming(
        !sharedDrawerAnimatingSearchMode.value ? 200 : 0,
        {
          duration: 300,
        },
        () =>
          (sharedDrawerAnimatingSearchMode.value =
            !sharedDrawerAnimatingSearchMode.value)
      )
    );
  };

  const _onChangeHandle = (hidden) => {
    onHidden({ hidden });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: titleWidth.value,
  }));

  useEffect(() => {
    _animateHeaderForSearching();
  }, [headerMode]);

  return (
    <Animated.View style={[animatedStyle]}>
      <DrawerHeader
        title={titleText}
        logo={require("../../../assets/logo-light.png")}
        headerTitleStyle={styles.headerTitle}
        headerContainerStyle={{ ...styles.headerContainer }}
      />
    </Animated.View>
  );
};

export default MyAppDrawerHeaderTitle;
const styles = StyleSheet.create({
  headerTitle: {
    color: appColors.lightText,
  },
  headerContainer: {
    paddingTop: 3,
    paddingHorizontal: 0,
  },
});
