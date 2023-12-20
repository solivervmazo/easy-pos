import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Spacer } from "../../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../../themes";
import { t } from "../../../../locale/localization";

const ProductRow = ({ item }) => {
  const {
    productName,
    productId,
    productPrice = 0,
    productCategory = undefined,
    productCode = "",
    productShortkeyColor = undefined,
    productDescription = "",
  } = item;

  const renderDescription = () => {
    return (
      <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.itemLabels]}>
        {productDescription}
      </Text>
    );
  };

  const renderCategoryTag = () => {
    return productCategory?.categoryName ? (
      <>
        <IconButton
          icon={"Tag"}
          containerStyle={styles.tagIcon}
          disabled={true}
        />
        <Text style={styles.tag}>{productCategory?.categoryName}</Text>
        <Spacer size={8} />
      </>
    ) : null;
  };

  const renderShortkey = () => {
    const shortKeyText = () => (
      <Text style={[styles.itemLabels, styles.itemLabelsNoTest]}>
        {t(`shortkey color`, "phrase")}
      </Text>
    );
    const renderCode = () =>
      productCode ? (
        <Text style={[styles.itemLabels, styles.shortkeyCode]}>
          {productCode}
        </Text>
      ) : (
        shortKeyText()
      );
    const renderColor = () =>
      productShortkeyColor ? (
        <View
          style={{
            borderWidth: 0.5,
            width: appSizes.Icon.medium,
            aspectRatio: "1/1",
            borderColor: appColors.lightBgSecondary,
            backgroundColor: productShortkeyColor || appColors.lightBgTertiary,
            marginEnd: 3,
          }}
        ></View>
      ) : (
        <IconButton
          containerStyle={styles.tagIcon}
          icon={"Shortkeys"}
          disabled={true}
        />
      );
    if (!productCode && !productShortkeyColor) return null;
    return (
      <>
        {renderColor()}
        {renderCode()}
      </>
    );
  };

  const renderTags =
    productCategory || productCode || productShortkeyColor ? (
      <>
        {renderCategoryTag()}
        {renderShortkey()}
      </>
    ) : null;

  return (
    <View style={styles.container}>
      <View style={[styles.itemNameContainer]}>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={[styles.itemName]}
        >
          {productName}
        </Text>
        <View style={[styles.subTagContainer]}>
          {renderTags && (
            <View style={[styles.tagsContainer]}>{renderDescription()}</View>
          )}
          {renderTags ? (
            <View style={[styles.tagsContainer]}>{renderTags}</View>
          ) : (
            renderDescription()
          )}
        </View>
      </View>
      <View style={styles.priceAndItemNumberContainer}>
        <Text style={styles.price}>{productPrice}</Text>
        <Text style={[styles.itemLabels]}>#{productId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  subTagContainer: {
    // flexDirection: "row",
  },
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
    justifyContent: "flex-start",
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
  itemLabels: {
    color: appColors.lightTextTertiary,
    fontSize: appSizes.Text.small,
    fontFamily: appFonts.regular,
    textTransform: "capitalize",
    ...appStyles.textLightShadow,
  },
  itemLabelsNoTest: {
    color: appColors.lightTextSecondary,
  },
  shortkeyCode: {
    textTransform: "uppercase",
  },
  tagIcon: { padding: 0, marginEnd: 3 },
});

export default ProductRow;
