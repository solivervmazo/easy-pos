import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";
import CategoryListTable from "../ui/categories/CategoryListTable";

const CategoriesScreen = () => {
  const screenSpinner = useSelector((state) => state.categories.screenSpinner);
  return (
    <>
      {screenSpinner === SpinnerState.show && <AppSpinner />}
      <CategoryListTable />
    </>
  );
};

const styles = StyleSheet.create({});

export default CategoriesScreen;
