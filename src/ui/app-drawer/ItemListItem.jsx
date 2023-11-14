import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors, appConstants, appFonts, appSizes } from "../../themes/";
import Icon from "../core/Icon";
import Spacer from "../core/Spacer";
import { TouchableOpacity } from "react-native-gesture-handler";

const ItemListItem = ({ options, isFocused, onPress }) => {
  const { drawerLabel, routeOptions: { icon } = {} } = options;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={appConstants.ACTIVE_OPACITY}
    >
      <View
        style={[
          styles.itemWrapper,
          {
            backgroundColor: isFocused
              ? appColors.themeColorSecondary
              : appColors.lightBackground,
          },
        ]}
      >
        {icon ? (
          <>
            {Icon.Icons(icon, {
              size: appSizes.Icon.medium,
              color: isFocused ? appColors.lightText : appColors.themeColor,
            })}
            <Spacer size={10} />
          </>
        ) : null}
        <Text
          style={[
            styles.itemListItem,
            {
              color: isFocused ? appColors.lightText : appColors.darkText,
              fontFamily: isFocused ? appFonts.medium : appFonts.regular,
            },
          ]}
        >
          {drawerLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 2,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  itemListItem: {
    color: appColors.darkText,
    fontFamily: appFonts.regular,
    fontSize: appSizes.Text.regular,
    fontWeight: "500",
  },
});

export default ItemListItem;
