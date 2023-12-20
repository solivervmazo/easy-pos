import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { AppModal, AppSelectPicker } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  requestProductCategoryList,
  requestProductCategoryTable,
} from "../context/categories";
import { dbProductCategories } from "../context/db/categories";
import { productStore } from "../store";

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
  const productForm = useSelector(productStore.products.selectors.formSelector);
  const [categoryList, setCategoryList] = useState(undefined);

  const [selectedValue, setSelectedValue] = useState(
    productForm?.body.productCategory
  );

  const onChangeHandle = (value) => {
    setSelectedValue(value);
  };

  const onClearSelectionHandle = () => {
    setSelectedValue({});
  };
  const onSubmitHandle = () => {
    const updatedProductForm = {
      ...productForm?.body,
      productCategory: selectedValue,
    };
    dispatch(
      productStore.products.actions.updateForm({
        body: { ...productForm.body, ...updatedProductForm },
      })
    );
    router.canGoBack() && router.back();
  };

  useEffect(() => {
    const fetchList = async () => {
      const list = await requestProductCategoryList(false);
      setCategoryList(
        (list?.body ?? []).map((row) => dbProductCategories.transform(row))
      );
    };
    categoryList === undefined && fetchList();
  }, [categoryList]);
  return (
    <>
      <ScreenHeader />
      <View style={{ flex: 1 }}>
        <AppModal
          onConfirm={onSubmitHandle}
          renderContent={() => (
            <AppSelectPicker
              items={categoryList ?? []}
              value={selectedValue}
              itemKey={"id"}
              itemLabel={"categoryName"}
              multiple={false}
              canSearch={true}
              showRecents={true}
              appendType="chip"
              onSelect={(value) => onChangeHandle(value)}
              onClearSelection={onClearSelectionHandle}
            />
          )}
        />
      </View>
    </>
  );
};

export default ProductSelectCategory;

const styles = StyleSheet.create({});
