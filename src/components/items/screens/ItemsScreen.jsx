import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ProductListTable from "../ui/ProductListTable";
import { useFocusEffect } from "expo-router";
import { useSelector } from "react-redux";
import { AppSpinner } from "../../../ui";
import { SpinnerState } from "../../../enums";

const ItemsScreen = () => {
  const screenSpinner = useSelector((state) => state.products.screenSpinner);
  // const [state, setState] = useState(true);
  useEffect(
    useCallback(() => {
      // setState(false);
      return () => {};
    })
  );
  return (
    <>
      {screenSpinner === SpinnerState.show && <AppSpinner />}
      <ProductListTable />
    </>
  );
};

const styles = StyleSheet.create({});

export default ItemsScreen;
