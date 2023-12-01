import React from "react";
import { StyleSheet } from "react-native";
import ProductListTable from "../ui/ProductListTable";
import { useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";

const ProductsScreen = () => {
  const screenSpinner = useSelector((state) => state.products.screenSpinner);
  return (
    <>
      {screenSpinner === SpinnerState.show && <AppSpinner />}
      <ProductListTable />
    </>
  );
};

const styles = StyleSheet.create({});

export default ProductsScreen;
