import React, { useCallback, useEffect } from "react";
import { IconButton, Spacer, AppTable, ChipButton } from "../../../../ui";
import { appColors, appSizes } from "../../../../themes";
import CategoryRow from "./CategoryRow";
import { replaceSlugs, useStackRoutes } from "../../../../routes";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { HeaderMode, RequestState } from "../../../../enums";
import { appStore } from "../../../../my-app";
import { productStore } from "../../store";

import { PRODUCT_CATEGORY_SUB_ALIAS } from "../../constants/index";
const CategoryListTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const routes = useStackRoutes();

  const categoryTable = useSelector(
    productStore.categories.selectors.tableSelector
  );

  const searchValue = useSelector((state) =>
    appStore.header.selectors.products.categorySearchValueSelector(state, {
      feature: PRODUCT_CATEGORY_SUB_ALIAS,
    })
  );

  const currentTabHeaderMode = useSelector((state) =>
    appStore.header.selectors.products.categoryTabHeaderModeSelector(state, {
      feature: PRODUCT_CATEGORY_SUB_ALIAS,
    })
  );

  const categoryDetailRoute = routes["categories-detail"];

  const onNavigateDetailHandle = useCallback((id, params = {}) => {
    dispatch(productStore.categories.actions.restartForm());
    if (categoryDetailRoute) {
      const _routePath = replaceSlugs(categoryDetailRoute, [id]);
      router.push(_routePath);
    }
  });

  const onRefreshTableHandle = () => {
    dispatch(productStore.categories.actions.fetchTable());
  };

  useEffect(
    useCallback(() => {
      if (categoryTable?.state === RequestState.idle) {
        dispatch(productStore.categories.actions.fetchTable());
      }
    }),
    [categoryTable, dispatch]
  );

  return (
    <AppTable
      searchValue={searchValue}
      itemsLength={categoryTable?.data?.length}
      itemKey={"id"}
      data={categoryTable?.data}
      renderItem={({ item }) => (
        <CategoryRow
          item={item}
          key={`category-screen-category-lists-${item.id}`}
        />
      )}
      actionsCount={1}
      renderActions={({ actionSize, item }) => {
        return (
          <>
            <IconButton
              onPress={() => onNavigateDetailHandle(item.id)}
              icon={"Pencil"}
              containerStyle={{
                aspectRatio: "1/1",
                borderRadius: actionSize,
                backgroundColor: appColors.lightBgTertiary,
                padding: 6,
                alignItems: "center",
              }}
            />
          </>
        );
      }}
      itemSeparatorComponent={() => <Spacer size={1} horizontal={false} />}
      keyExtractor={(item) => item.id}
      tableContainerStyle={{
        paddingVertical: 5,
      }}
      headerOptions={{
        searchMode: currentTabHeaderMode == HeaderMode.search,
        calendarIcon: "",
        renderHeaderActions: () => (
          <ChipButton
            onPress={onNavigateDetailHandle}
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
        onRefreshPress: onRefreshTableHandle,
      }}
    />
  );
};

export default CategoryListTable;
