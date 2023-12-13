import React, { useCallback } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";
import CategoryListTable from "../ui/categories/CategoryListTable";
import { useFocusEffect } from "expo-router";
import { headerChangeCurrentFeatureAction } from "../../../store/slices/header/headerSlice";
import {
  PRODUCT_FEATURE_ALIAS,
  PRODUCT_CATEGORY_SUB_ALIAS,
} from "../constants";
import { t } from "../../../locale/localization";

const CategoriesScreen = () => {
  const dispatch = useDispatch();
  const screenCategorySpinner = useSelector(
    (state) => state.products.screenCategorySpinner
  );

  useFocusEffect(
    useCallback(() => {
      dispatch(
        headerChangeCurrentFeatureAction({
          feature: PRODUCT_FEATURE_ALIAS,
          subFeature: PRODUCT_CATEGORY_SUB_ALIAS,
          placeholder: t("search in product category", "phrase", 2),
        })
      );
      return () => {};
    }, [])
  );

  return (
    <>
      {screenCategorySpinner === SpinnerState.show && <AppSpinner />}
      <CategoryListTable />
    </>
  );
};

const styles = StyleSheet.create({});

export default CategoriesScreen;
