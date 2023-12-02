import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";
import CategoryListTable from "../ui/categories/CategoryListTable";

const CategoriesScreen = () => {
  const screenCategorySpinner = useSelector(
    (state) => state.products.screenCategorySpinner
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
