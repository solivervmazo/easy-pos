import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";
import CategoryListTable from "../ui/categories/CategoryListTable";
import { useFocusEffect } from "expo-router";
import { headerChangeCurrentFeatureAction } from "../../../store/slices/header/headerSlice";

const FEATURE_ALIAS = "PRODUCT_CATEGORY";

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const screenCategorySpinner = useSelector(
    (state) => state.products.screenCategorySpinner
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(headerChangeCurrentFeatureAction({ feature: FEATURE_ALIAS }));
      return () => {};
    })
  );

  return (
    <>
      {screenCategorySpinner === SpinnerState.show && <AppSpinner />}
      <CategoryListTable featureName={FEATURE_ALIAS} />
    </>
  );
};

const styles = StyleSheet.create({});

export default CategoriesScreen;
