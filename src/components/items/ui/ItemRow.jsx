import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../themes";
import { FlatList } from "react-native-gesture-handler";

const ItemRow = ({ item }) => {
  const { productName, productId, productPrice = 0, categories } = item;
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
          <IconButton icon={"Tags"} disabled={true} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={item.categories}
            horizontal
            renderItem={({ item: category }) => (
              <Text style={styles.tag}>{category}</Text>
            )}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <Text>{` | `}</Text>}
            ListFooterComponentStyle
          />
        </View>
      </View>
      <View style={styles.priceAndItemNumberContainer}>
        <Text style={styles.price}>$ {productPrice}</Text>
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

export default ItemRow;
