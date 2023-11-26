import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  IconButton,
  Spacer,
  AppTable,
  ChipButton,
  AppSpinner,
} from "../../../ui";
import { appColors, appSizes } from "../../../themes";
import ItemRow from "../ui/ItemRow";
import { useStackRoutes, replaceSlugs } from "../../../routes";
import { useRouter } from "expo-router";

import { useSelector, useDispatch } from "react-redux";
import { fetchProductAction } from "../../../store/slices/products/productSlice";

const ItemsScreen = () => {
  const dispatch = useDispatch();
  const { loading, productList } = useSelector((state) => state.items);

  const router = useRouter();
  const routes = useStackRoutes();

  const _navigateDetailHandle = (id, params = {}) => {
    const _routePath = replaceSlugs(routes["items-detail"], [id]);
    router.push(_routePath);
  };

  const _refreshTableHandle = () => {
    dispatch(fetchProductAction());
  };

  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch]);

  return (
    <>
      {loading && <AppSpinner />}
      <AppTable
        itemsLength={productList.length}
        itemKey={"id"}
        data={productList}
        renderItem={({ item, toggled }) => <ItemRow item={item} />}
        actionsCount={2}
        renderActions={({ actionSize, item }) => (
          <>
            <IconButton
              onPress={() => _navigateDetailHandle(item.id)}
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
              onPress={_navigateDetailHandle}
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
          onRefreshPress: _refreshTableHandle,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ItemsScreen;
