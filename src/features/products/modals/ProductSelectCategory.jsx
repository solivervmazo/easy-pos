import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { AppModal, AppSelectPicker } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryListSelector,
  fetchCategoryAction,
  productFormSelector,
  updateProductFormAction,
} from "../../../store/slices/products/productSlice";
import { requestProductCategoryList } from "../../../context/products/categories";
import { categoryTransform } from "../../../db/categories";

const ScreenHeader = () => (
  <Stack.Screen
    options={{
      title: "Category",
      headerShown: true,
      presentation: "modal",
      animation: "slide_from_bottom",
      animationDuration: 250,
    }}
  />
);

const ProductSelectCategory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const productForm = useSelector(productFormSelector);
  const [categoryList, setCategoryList] = useState(undefined);
  // const categoryList = useSelector((state) =>
  //   categoryListSelector(state, {
  //     rootLookup: 0,
  //     categoryLookup: 0,
  //   })
  // );

  const [_selectedValue, setSelectedValue] = useState(
    productForm?.body.productCategory
  );

  const _changeHandle = (value) => {
    setSelectedValue(value);
  };

  const _onClearSelectionHandle = () => {
    setSelectedValue({});
  };
  const _submitHandle = () => {
    const updatedProductForm = {
      ...productForm?.body,
      productCategory: _selectedValue,
    };
    dispatch(
      updateProductFormAction({
        body: { ...productForm.body, ...updatedProductForm },
      })
    );
    router.canGoBack() && router.back();
  };

  useEffect(() => {
    const fetchList = async () => {
      const list = await requestProductCategoryList(false);
      setCategoryList((list?.body ?? []).map((row) => categoryTransform(row)));
    };
    categoryList === undefined && fetchList();
  }, [categoryList]);
  return (
    <>
      <ScreenHeader />
      <View style={{ flex: 1 }}>
        <AppModal
          onConfirm={_submitHandle}
          renderContent={() => (
            <AppSelectPicker
              items={categoryList ?? []}
              value={_selectedValue}
              itemKey={"id"}
              itemLabel={"categoryName"}
              multiple={false}
              canSearch={true}
              showRecents={true}
              appendType="chip"
              onSelect={(value) => _changeHandle(value)}
              onClearSelection={_onClearSelectionHandle}
            />
          )}
        />
      </View>
    </>
  );
};

export default ProductSelectCategory;

const styles = StyleSheet.create({});
