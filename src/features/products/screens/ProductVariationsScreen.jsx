import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";
import ProductVariationListTable from "../ui/variations/ProductVariationListTable";
import { useFocusEffect } from "expo-router";
import { headerChangeCurrentFeatureAction } from "../../../store/slices/header/headerSlice";
import {
  PRODUCT_FEATURE_ALIAS,
  PRODUCT_VARIATION_SUB_ALIAS,
} from "../constants";

const ProductVariationsScreen = () => {
  const dispatch = useDispatch();
  const screenProductVariationSpinner = useSelector(
    (state) => state.products.screenProductVariationSpinner
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        headerChangeCurrentFeatureAction({
          feature: PRODUCT_FEATURE_ALIAS,
          subFeature: PRODUCT_VARIATION_SUB_ALIAS,
          placeholder: "Search in product variaitons",
        })
      );
      return () => {};
    })
  );

  return (
    <>
      {screenProductVariationSpinner === SpinnerState.show && <AppSpinner />}
      <ProductVariationListTable />
    </>
  );
};

const styles = StyleSheet.create({});

export default ProductVariationsScreen;
