import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import ProductListTable from "../ui/ProductListTable";
import { useDispatch, useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";
import { useFocusEffect } from "expo-router/src/useFocusEffect";
import { PRODUCT_FEATURE_ALIAS, PRODUCT_PRODUCT_SUB_ALIAS } from "../constants";
import { headerChangeCurrentFeatureAction } from "../../../store/slices/header/headerSlice";

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const screenProductSpinner = useSelector(
    (state) => state.products.screenProductSpinner
  );
  useFocusEffect(
    useCallback(() => {
      dispatch(
        headerChangeCurrentFeatureAction({
          feature: PRODUCT_FEATURE_ALIAS,
          subFeature: PRODUCT_PRODUCT_SUB_ALIAS,
          placeholder: "Search in products",
        })
      );
      return () => {};
    }, [])
  );
  return (
    <>
      {screenProductSpinner === SpinnerState.show && <AppSpinner />}
      <ProductListTable />
    </>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
