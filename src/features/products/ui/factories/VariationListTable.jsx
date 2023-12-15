import React, { useCallback, useEffect } from "react";
import { IconButton, Spacer, AppTable, ChipButton } from "../../../../ui";
import { appColors, appSizes } from "../../../../themes";
import VariationRow from "./VariationRow";
import { replaceSlugs, useStackRoutes } from "../../../../routes";
import { useRouter } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { RequestState } from "../../../../enums";
import { PRODUCT_CATEGORY_SUB_ALIAS } from "../../constants/index";
import { appStore } from "../../../../my-app";

const VariationListTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const routes = useStackRoutes();

  const categoryTable = useSelector([]);

  const searchValue = useSelector((state) =>
    appStore.header.selectors.products.categorySearchValueSelector(state, {
      feature: PRODUCT_CATEGORY_SUB_ALIAS,
    })
  );

  const categoryDetailRoute = routes["categories-detail"];

  const _navigateDetailHandle = useCallback((id, params = {}) => {
    // dispatch(restartCategoryFormAction());
    if (categoryDetailRoute) {
      const _routePath = replaceSlugs(categoryDetailRoute, [id]);
      router.push(_routePath);
    }
  });

  const _refreshTableHandle = () => {
    // dispatch(fetchCategoryAction());
  };

  useEffect(
    useCallback(() => {
      if (categoryTable?.state === RequestState.idle) {
        // dispatch(fetchCategoryAction());
      }
    }),
    [categoryTable, dispatch]
  );

  return (
    <AppTable
      renderNoData={"Coming Soon"}
      searchValue={""}
      itemsLength={[].length}
      itemKey={"id"}
      data={[]}
      renderItem={({ item, toggled }) => (
        <VariationRow
          item={item}
          key={`category-screen-category-lists-${item.id}`}
        />
      )}
      actionsCount={1}
      renderActions={({ actionSize, item }) => {
        return (
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
          </>
        );
      }}
      itemSeparatorComponent={() => <Spacer size={1} horizontal={false} />}
      keyExtractor={(item) => item.id}
      tableContainerStyle={{
        paddingVertical: 5,
      }}
      headerOptions={{
        calendarIcon: "",
        disableRefresh: true,
        disableFilter: true,
        renderHeaderActions: () => (
          <ChipButton
            disabled={true}
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
  );
};

export default VariationListTable;
