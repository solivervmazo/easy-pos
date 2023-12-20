import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, IconButton } from "../../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../../themes";
import { FlatList } from "react-native-gesture-handler";
import { t } from "../../../../locale/localization";

const CategoryRow = ({ item }) => {
  const {
    categoryName,
    categoryId,
    categoryDescription,
    categoryCode,
    categoryParent,
    categoryShortkeyColor,
    categoryChildren,
  } = item;
  const _renderCodeOrColor = () => {
    const _shortKeyText = (
      <Text style={[styles.itemLabels, styles.itemLabelsNoTest]}>
        {t(`shortkey color`, "phrase")}
      </Text>
    );
    const _renderNone = (
      <Text style={[styles.itemLabels, styles.itemLabelsNoTest]}>
        {t(`no shortkey`, "phrase")}
      </Text>
    );
    const _renderCode = () => (
      <Text style={[styles.shortkeyCode]}>{categoryCode}</Text>
    );
    const _renderColor = () => (
      <View
        style={{
          borderWidth: 0.5,
          width: appSizes.Icon.medium,
          aspectRatio: "1/1",
          borderColor: appColors.lightBgSecondary,
          backgroundColor: categoryShortkeyColor || appColors.lightBgTertiary,
        }}
      ></View>
    );
    if (!categoryCode && !categoryShortkeyColor) return _renderNone;
    if (categoryCode && categoryShortkeyColor)
      return (
        <>
          {_renderCode()}
          {_renderColor()}
        </>
      );
    if (categoryCode) return _renderCode();
    if (categoryShortkeyColor)
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
          {categoryName}
        </Text>
        {categoryParent || categoryChildren ? (
          <View style={[styles.tagsContainer]}>
            {categoryParent ? (
              <>
                <IconButton icon={"Tag"} disabled={true} />
                <Text style={styles.tag}>{categoryParent.categoryName}</Text>
              </>
            ) : null}
            {categoryChildren ? (
              <>
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
              </>
            ) : null}
          </View>
        ) : (
          <Text
            style={[
              styles.itemLabels,
              !categoryDescription ? styles.itemLabelsNoTest : {},
            ]}
          >
            {categoryDescription || t(`No additional information`, "phrase")}
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
        <Text style={[styles.itemLabels]}>#{categoryId}</Text>
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

export default CategoryRow;
