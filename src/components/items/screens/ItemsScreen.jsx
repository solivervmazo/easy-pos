import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  IconButton,
  Spacer,
  AppTable,
  ChipButton,
  AppSpinner,
} from "../../../ui";
import { appColors, appFonts, appSizes, appStyles } from "../../../themes";
import ItemRow from "../ui/ItemRow";
import { useStackRoutes, replaceSlugs } from "../../../routes";
import { useRouter } from "expo-router";

import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../../store/slices/itemSlice";

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const { loading, itemList } = useSelector((state) => state.items);

  const router = useRouter();
  const routes = useStackRoutes();

  const navigateDetailHandle = (id, params = {}) => {
    const _routePath = replaceSlugs(routes["items-detail"], [id]);
    router.push(_routePath);
  };

  const refreshTableHandle = () => {
    dispatch(fetchItems());
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <>
      {loading && <AppSpinner />}
      <AppTable
        itemsLength={itemList.length}
        data={itemList}
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
                  containerStyle={{
                    backgroundColor: appColors.lightBackground,
                  }}
                />
              )}
              label={"Add"}
              containerStyle={{
                borderRadius: appSizes.Icon.large,
              }}
            />
          ),
          onRefreshPress: refreshTableHandle,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ItemsScreen;
