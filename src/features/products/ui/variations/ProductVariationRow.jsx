import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, IconButton } from "../../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../../themes";
import { FlatList } from "react-native-gesture-handler";

const ProductVariationRow = ({ item }) => {
  const {
    productVariationName,
    productVariationId,
    productVariationDescription,
    productVariationCode,
    productVariationParent,
    productVariationShortkeyColor,
    productVariationChildren,
  } = item;
  const _renderCodeOrColor = () => {
    const _shortKeyText = (
      <Text style={[styles.itemLabels, styles.itemLabelsNoTest]}>
        {`Shortkey Color`}
      </Text>
    );
    const _renderNone = (
      <Text style={[styles.itemLabels, styles.itemLabelsNoTest]}>
        {`No shortkey`}
      </Text>
    );
    const _renderCode = () => (
      <Text style={[styles.shortkeyCode]}>{productVariationCode}</Text>
    );
    const _renderColor = () => (
      <View
        style={{
          borderWidth: 0.5,
          width: appSizes.Icon.medium,
          aspectRatio: "1/1",
          borderColor: appColors.lightBgSecondary,
          backgroundColor:
            productVariationShortkeyColor || appColors.lightBgTertiary,
        }}
      ></View>
    );
    if (!productVariationCode && !productVariationShortkeyColor)
      return _renderNone;
    if (productVariationCode && productVariationShortkeyColor)
      return (
        <>
          {_renderCode()}
          {_renderColor()}
        </>
      );
    if (productVariationCode) return _renderCode();
    if (productVariationShortkeyColor)
      return (
        <>
          {_shortKeyText}
          {_renderColor()}
        </>
      );
  };

  return (
    <>
      <View style={[styles.itemNameContainer]}>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={[styles.itemName]}
        >
          {productVariationName}
        </Text>
        {productVariationParent || productVariationChildren ? (
          <View style={[styles.tagsContainer]}>
            {productVariationParent ? (
              <>
                <IconButton icon={"Tag"} disabled={true} />
                <Text style={styles.tag}>
                  {productVariationParent.productVariationName}
                </Text>
              </>
            ) : null}
            {productVariationChildren ? (
              <>
                <IconButton icon={"Tags"} disabled={true} />
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={item.variations}
                  horizontal
                  renderItem={({ item: productVariation }) => (
                    <Text style={styles.tag}>{productVariation}</Text>
                  )}
                  keyExtractor={(item) => item}
                  ItemSeparatorComponent={() => <Text>{` | `}</Text>}
                  ListFooterComponentStyle
                />
              </>
            ) : null}
          </View>
        ) : (
          <Text
            style={[
              styles.itemLabels,
              !productVariationDescription ? styles.itemLabelsNoTest : {},
            ]}
          >
            {productVariationDescription || `No additional information`}
          </Text>
        )}
      </View>
      <View style={styles.shortkeyAndIdContainer}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {_renderCodeOrColor()}
        </View>
        <Text style={[styles.itemLabels]}>#{productVariationId}</Text>
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
  shortkeyAndIdContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
  },
  shortkeyCode: {
    fontSize: appSizes.Text.regular,
    fontFamily: appFonts.regular,
    textTransform: "uppercase",
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
});

export default ProductVariationRow;
