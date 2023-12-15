import React from "react";
import { IconButton } from "../../ui";
import { appSizes } from "../../themes";

const MyAppDrawerTogglerButton = ({
  onPress = () => {},
  tintColor = appColors.lightText,
  icon = "Drawer",
  style = {},
}) => {
  const _onPressHandle = () => {
    onPress();
  };
  return (
    <IconButton
      onPress={_onPressHandle}
      icon={icon}
      color={tintColor}
      size={appSizes.Icon.large}
      containerStyle={style}
    />
  );
};

export default MyAppDrawerTogglerButton;
