import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { appColors, appFonts, appSizes } from "../../themes/";
const ItemListHeader = ({ options }) => {
  const { drawerLabel } = options;
  return (
    <View style={styles.itemWrapper}>
      <Text style={styles.itemListHeader}>{drawerLabel}</Text>
    </View>
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
  itemListHeader: {
    color: appColors.darkTextTertiary,
    fontFamily: appFonts.bold,
    fontSize: appSizes.Text.semiRegular,
  },
});

export default ItemListHeader;
