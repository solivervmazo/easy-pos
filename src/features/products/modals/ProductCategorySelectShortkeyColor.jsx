import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppColorPicker, AppModal } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryFormSelector,
  updateCategoryFormAction,
} from "../../../store/slices/products/productSlice";

const ScreenHeader = () => (
  <Stack.Screen
    options={{
      title: "Shortkey Color",
      headerShown: true,
      presentation: "modal",
      animation: "slide_from_bottom",
      animationDuration: 250,
    }}
  />
);

const ProductCategorySelectShortkeyColor = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryForm = useSelector(categoryFormSelector);
  const [_colorValue, setColorValue] = useState(
    categoryForm?.body.categoryShortkeyColor
  );

  const _changeColorHandle = ({ colorValue }) => {
    setColorValue(colorValue);
  };

  const _submitColorHandle = () => {
    const updatedCategoryForm = {
      ...categoryForm?.body,
      categoryShortkeyColor: _colorValue || "",
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
          onConfirm={_submitColorHandle}
          renderContent={() => (
            <AppColorPicker
              colorValue={categoryForm?.body.categoryShortkeyColor || undefined}
              onSelect={_changeColorHandle}
            />
          )}
        />
      </View>
    </>
  );
};

export default ProductCategorySelectShortkeyColor;

const styles = StyleSheet.create({});
