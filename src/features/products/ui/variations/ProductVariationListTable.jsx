import React, { useCallback, useEffect } from "react";
import { IconButton, Spacer, AppTable, ChipButton } from "../../../../ui";
import { appColors, appSizes } from "../../../../themes";
import ProductVariationRow from "./ProductVariationRow";
import { replaceSlugs, useStackRoutes } from "../../../../routes";
import { useRouter } from "expo-router";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductVariationAction,
  productVariationTableSelector,
  restartProductVariationFormAction,
} from "../../../../store/slices/products/productSlice";
import { RequestState } from "../../../../enums";
import { productProductVariationSearchValueSelector } from "../../../../store/slices/header/headerSlice";
import { PRODUCT_VARIATION_SUB_ALIAS } from "../../constants/index";

const ProductVariationListTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const routes = useStackRoutes();

  const productVariationTable = useSelector(productVariationTableSelector);
  const searchValue = useSelector((state) =>
    productProductVariationSearchValueSelector(state, {
      feature: PRODUCT_VARIATION_SUB_ALIAS,
    })
  );

  const productVariationDetailRoute = routes["product-variations-detail"];

  const _navigateDetailHandle = useCallback((id, params = {}) => {
    dispatch(restartProductVariationFormAction());
    if (productVariationDetailRoute) {
      const _routePath = replaceSlugs(productVariationDetailRoute, [id]);
      router.push(_routePath);
    }
  });

  const _refreshTableHandle = () => {
    dispatch(fetchProductVariationAction());
  };

  useEffect(
    useCallback(() => {
      if (productVariationTable?.state === RequestState.idle) {
        dispatch(fetchProductVariationAction());
      }
    }),
    [productVariationTable, dispatch]
  );

  return (
    <AppTable
      searchValue={searchValue}
      itemsLength={productVariationTable?.data?.length}
      itemKey={"id"}
      data={productVariationTable?.data}
      renderItem={({ item, toggled }) => (
        <ProductVariationRow
          item={item}
          key={`productVariation-screen-productVariation-lists-${item.id}`}
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
  );
};

export default ProductVariationListTable;
