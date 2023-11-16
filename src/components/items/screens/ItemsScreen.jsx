import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton, Spacer, AppTable, ChipButton } from "../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../themes";
import ItemRow from "../ui/ItemRow";
import { useStackRoutes, replaceSlugs } from "../../../routes";
import { useRouter } from "expo-router";
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

const ItemsScreen = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const navigateDetailHandle = (id, params = {}) => {
    const _routePath = replaceSlugs(routes["items-detail"], [id]);
    router.push(_routePath);
  };
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
      headerOptions={{
        calendarIcon: "",
        renderHeaderActions: () => (
          <ChipButton
            onPress={navigateDetailHandle}
            buttonLeft={() => (
              <IconButton
                disabled
                icon={"Add"}
                size={appSizes.Icon.medium}
                containerStyle={{ backgroundColor: appColors.lightBackground }}
              />
            )}
            label={"Add"}
            containerStyle={{
              borderRadius: appSizes.Icon.large,
            }}
          />
        ),
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default ItemsScreen;
