import { StyleSheet, Text, View } from "react-native";
import ChipButton from "../ChipButton";
import IconButton from "../IconButton";
import { appColors, appSizes } from "../../themes";

const DateInput = ({
  iconPosition = "buttonLeft",
  label = undefined,
  placeholder = "Select Date",
  value = undefined,
  onPress = () => {},
  icon = "Calendar",
  iconSize = appSizes.Icon.medium,
  containerStyle = {},
  labelStyle = {},
  iconContainerStyle = {},
}) => {
  const buttonPosition = {
    [iconPosition]: () => (
      <IconButton
        icon={icon}
        size={iconSize}
        containerStyle={[styles.iconContainer, iconContainerStyle]}
      />
    ),
  };

  return (
    <View style={{ gap: 5 }}>
      {label ? (
        <Text style={{ fontSize: appSizes.Text.semiRegular }}>{label}</Text>
      ) : null}
      <ChipButton
        onPress={onPress}
        {...{}}
        {...buttonPosition}
        label={value || placeholder}
        containerStyle={[styles.container, containerStyle]}
        labelStyle={[styles.label, labelStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: appSizes.Icon.large,
    backgroundColor: appColors.lightBgTertiary,
    paddingHorizontal: 15,
  },
  iconContainer: { backgroundColor: appColors.lightBackground },
  label: {
    fontSize: appSizes.Text.regular,
    color: appColors.darkTextTertiary,
  },
});

export default DateInput;
