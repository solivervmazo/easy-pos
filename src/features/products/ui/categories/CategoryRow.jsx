import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, IconButton } from "../../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../../themes";
import { FlatList } from "react-native-gesture-handler";

const CategoryRow = ({ item }) => {
  const {
    categoryName,
    categoryId,
    categoryDescription,
    categoryCode,
    categories,
    categoryShortkeyColor,
  } = item;
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
        {categories ? (
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
        ) : (
          <Text
            style={[
              styles.itemLabels,
              !categoryDescription ? styles.itemLabelsNoTest : {},
            ]}
          >
            {categoryDescription || `No description`}
          </Text>
        )}
      </View>
      <View style={styles.priceAndItemNumberContainer}>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
          {!categoryCode && !categoryShortkeyColor ? (
            <Text style={[styles.itemLabels, styles.itemLabelsNoTest]}>
              {`No shortkey`}
            </Text>
          ) : categoryCode ? (
            <Text style={[styles.itemCode]}>$ {categoryCode}</Text>
          ) : (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: appColors.lightBgSecondary,
                backgroundColor:
                  categoryShortkeyColor || appColors.lightBgTertiary,
              }}
            >
              {!categoryShortkeyColor && (
                <Icon.Slash
                  color={appColors.darkTextTertiary}
                  size={appSizes.Icon.medium}
                />
              )}
            </View>
          )}
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
  priceAndItemNumberContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10,
  },
  itemCode: {
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
});

export default CategoryRow;
