import React from "react";
import { StyleSheet } from "react-native";
import ProductListTable from "../ui/ProductListTable";
import { useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";

const ProductsScreen = () => {
  const screenProductSpinner = useSelector(
    (state) => state.products.screenProductSpinner
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
