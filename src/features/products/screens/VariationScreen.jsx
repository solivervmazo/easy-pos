import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";
import VariationListTable from "../ui/factories/VariationListTable";
import { useFocusEffect } from "expo-router";
import { headerChangeCurrentFeatureAction } from "../../../store/slices/header/headerSlice";
import { PRODUCT_FEATURE_ALIAS, PRODUCT_FACTORY_SUB_ALIAS } from "../constants";

const VariationScreen = () => {
  const dispatch = useDispatch();
  const screenCategorySpinner = useSelector(
    (state) => state.products.screenCategorySpinner
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        headerChangeCurrentFeatureAction({
          feature: PRODUCT_FEATURE_ALIAS,
          subFeature: PRODUCT_FACTORY_SUB_ALIAS,
          placeholder: "Search in product variations",
        })
      );
      return () => {};
    })
  );

  return (
    <>
      {screenCategorySpinner === SpinnerState.show && <AppSpinner />}
      <VariationListTable />
    </>
  );
};

const styles = StyleSheet.create({});

export default VariationScreen;
