import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Spacer, AppTable } from "../../ui";
import {
  appColors,
  appConstants,
  appFonts,
  appSizes,
  appStyles,
} from "../../themes";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native-gesture-handler";

const ITEMS = new Array(10).fill({}).map((item, index) => {
  return {
    id: index + 1,
    itemName: `Item ${index} with ${["sugar", "salt", "onion"].splice(
      Math.floor(Math.random() * 3),
      1
    )}`,
    itemNumber: "1000" + (index + 1),
    price: (Math.random() * 1000 + 200).toFixed(2),
    categories: [
      "food",
      "add-ons",
      "freebie",
      "dessert",
      "veberage",
      "condiments",
    ].splice(Math.floor(Math.random() * 6), Math.random() * 6 + 5),
  };
});

const ItemRow = ({ item }) => {
  const { itemName, itemNumber, price, categories } = item;
  return (
    <>
      <View style={{ flex: 1, padding: 10 }}>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={{
            color: appColors.themeColor,
            fontSize: appSizes.Text.regular,
            fontFamily: appFonts.medium,
            textTransform: "capitalize",
            ...appStyles.textLightShadow,
          }}
        >
          {itemName}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton icon={"Tags"} disabled={true} />
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={categories}
            horizontal
            renderItem={({ item: category }) => (
              <Text
                style={{
                  color: appColors.lightTextTertiary,
                  fontSize: appSizes.Text.small,
                  fontFamily: appFonts.regular,
                  textTransform: "capitalize",
                  ...appStyles.textLightShadow,
                }}
              >
                {category}
              </Text>
            )}
            keyExtractor={(item) => item}
            ItemSeparatorComponent={() => <Text>{` | `}</Text>}
            ListFooterComponentStyle
          />
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: appColors.lightSuccess,
            fontSize: appSizes.Text.regular,
            fontFamily: appFonts.bold,
            textTransform: "capitalize",
            ...appStyles.textLightShadow,
          }}
        >
          $ {price}
        </Text>
        <Text
          style={{
            color: appColors.lightTextTertiary,
            fontSize: appSizes.Text.small,
            fontFamily: appFonts.regular,
            textTransform: "capitalize",
            ...appStyles.textLightShadow,
          }}
        >
          #{itemNumber}
        </Text>
      </View>
    </>
  );
};

const Items = () => {
  return (
    <AppTable
      itemsLength={200}
      data={ITEMS}
      renderItem={({ item, toggled }) => <ItemRow item={item} />}
      actionsCount={2}
      renderActions={({ actionSize }) => (
        <>
          <IconButton
            icon={"Pencil"}
            containerStyle={{
              aspectRatio: "1/1",
              borderRadius: actionSize,
              backgroundColor: appColors.lightBgTertiary,
              padding: 6,
              alignItems: "center",
            }}
          />
          <IconButton
            icon={"Info"}
            containerStyle={{
              aspectRatio: "1/1",
              borderRadius: actionSize,
              backgroundColor: appColors.lightBgTertiary,
              padding: 6,
              alignItems: "center",
            }}
          />
        </>
      )}
      itemSeparatorComponent={() => <Spacer size={1} horizontal={false} />}
      keyExtractor={(item) => item.id}
      tableContainerStyle={{
        paddingVertical: 5,
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default Items;
