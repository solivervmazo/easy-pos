import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { AppModal, AppSelectPicker } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFormSelector,
  updateCategoryFormAction,
  categoryListSelector,
} from "../../../store/slices/products/productSlice";

const ScreenHeader = () => (
  <Stack.Screen
    options={{
      title: "Parent Category",
      headerShown: true,
      presentation: "modal",
      animation: "slide_from_bottom",
      animationDuration: 250,
    }}
  />
);

const ProductCategorySelectParentCategory = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryForm = useSelector(categoryFormSelector);
  const categoryList = useSelector((state) =>
    categoryListSelector(state, {
      rootLookup: categoryForm?.body?.categoryRootId,
      categoryLookup: categoryForm?.body?.id,
    })
  );

  const [_selectedValue, setSelectedValue] = useState(
    categoryForm?.body.categoryParent
  );

  const _changeHandle = (value) => {
    setSelectedValue(value);
  };

  const _onClearSelectionHandle = () => {
    setSelectedValue({});
  };
  const _submitHandle = () => {
    const updatedCategoryForm = {
      ...categoryForm?.body,
      categoryParent: _selectedValue,
    };
    dispatch(
      updateCategoryFormAction({
        body: { ...categoryForm.body, ...updatedCategoryForm },
      })
    );
    router.canGoBack() && router.back();
  };

  return (
    <>
      <ScreenHeader />
      <View style={{ flex: 1 }}>
        <AppModal
          onConfirm={_submitHandle}
          renderContent={() => (
            <AppSelectPicker
              items={categoryList}
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

export default ProductCategorySelectParentCategory;
