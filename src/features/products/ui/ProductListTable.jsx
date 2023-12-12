import React, { useCallback, useEffect } from "react";
import { IconButton, Spacer, AppTable, ChipButton } from "../../../ui";
import { appColors, appSizes } from "../../../themes";
import ProductRow from "./ProductRow";
import { useStackRoutes, replaceSlugs } from "../../../routes";
import { useRouter } from "expo-router";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductAction,
  productTableSelector,
  restartProductFormAction,
} from "../../../store/slices/products/productSlice";
import { HeaderMode, RequestState } from "../../../enums";
import {
  productProductSearchValueSelector,
  productProductTabHeaderModeSelector,
} from "../../../store/slices/header/headerSlice";
import { PRODUCT_PRODUCT_SUB_ALIAS } from "../constants";

const ProductListTable = () => {
  const dispatch = useDispatch();
  const productTable = useSelector(productTableSelector);
  const searchValue = useSelector((state) =>
    productProductSearchValueSelector(state, {
      feature: PRODUCT_PRODUCT_SUB_ALIAS,
    })
  );

  const currentTabHeaderMode = useSelector((state) =>
    productProductTabHeaderModeSelector(state, {
      feature: PRODUCT_PRODUCT_SUB_ALIAS,
    })
  );

  const router = useRouter();
  const routes = useStackRoutes();

  const _navigateDetailHandle = useCallback((id, params = {}) => {
    dispatch(restartProductFormAction());
    const _routePath = replaceSlugs(routes["products-detail"], [id]);
    router.push(_routePath);
  });

  const _refreshTableHandle = () => {
    dispatch(fetchProductAction());
  };

  useEffect(
    useCallback(() => {
      if (productTable?.state === RequestState.idle) {
        dispatch(fetchProductAction());
      }
    }),
    [productTable, dispatch]
  );
  return (
    <AppTable
      searchValue={searchValue}
      itemsLength={productTable?.data?.length}
      itemKey={"id"}
      data={productTable?.data}
      renderItem={({ item, toggled }) => (
        <ProductRow
          item={item}
          key={`product-screen-product-lists-${item.id}`}
        />
      )}
      actionsCount={2}
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

export default ProductListTable;
