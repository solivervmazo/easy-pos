import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppTable, Spacer } from "../../ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  appColors,
  appConstants,
  appFonts,
  appSizes,
  appSpacing,
} from "../../themes";

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
  return (
    <TouchableOpacity
      activeOpacity={appConstants.ACTIVE_OPACITY}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      containerStyle={{
        flexGrow: 1,
        paddingHorizontal: appSpacing.screenPaddingLeft,
        paddingVertical: 8,
        backgroundColor: appColors.lightBgSecondary,
      }}
    >
      <Text
        style={{ fontSize: appSizes.Text.regular, fontFamily: appFonts.medium }}
      >
        {item.itemName}
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontSize: appSizes.Text.regular,
          fontFamily: appFonts.medium,
        }}
      >
        {`$ ${item.price}`}
      </Text>
    </TouchableOpacity>
  );
};

const PosSearchResult = () => {
  return (
    <AppTable
      itemsLength={200}
      data={ITEMS}
      renderItem={({ item }) => <ItemRow item={item} />}
      itemSeparatorComponent={() => <Spacer size={1} horizontal={false} />}
      keyExtractor={(item) => item.id}
      tableContainerStyle={{
        paddingVertical: 5,
      }}
      hasHeader={false}
    />
  );
};

const styles = StyleSheet.create({});

export default PosSearchResult;
