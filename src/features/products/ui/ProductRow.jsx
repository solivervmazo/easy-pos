import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../themes";
import { FlatList } from "react-native-gesture-handler";

const ProductRow = ({ item }) => {
  const {
    productName,
    productId,
    productPrice = 0,
    productCategory = {},
  } = item;
  return (
    <>
      <View style={[styles.itemNameContainer]}>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={[styles.itemName]}
        >
          {productName}
        </Text>
        <View style={[styles.tagsContainer]}>
          <IconButton icon={"Tag"} disabled={true} />
          <Text style={styles.tag}>{productCategory?.categoryName}</Text>
        </View>
      </View>
      <View style={styles.priceAndItemNumberContainer}>
        <Text style={styles.price}>{productPrice}</Text>
        <Text style={[styles.itemNumber]}>#{productId}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemNameContainer: { flex: 1, padding: 10 },
  itemName: {
    color: appColors.themeColor,
    fontSize: appSizes.Text.regular,
    fontFamily: appFonts.medium,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
    color: appColors.lightTextTertiary,
    fontSize: appSizes.Text.small,
    fontFamily: appFonts.regular,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
  priceAndItemNumberContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
  },
  price: {
    color: appColors.lightSuccess,
    fontSize: appSizes.Text.regular,
    fontFamily: appFonts.bold,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
  itemNumber: {
    color: appColors.lightTextTertiary,
    fontSize: appSizes.Text.small,
    fontFamily: appFonts.regular,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
});

export default ProductRow;
