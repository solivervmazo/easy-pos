import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppColorPicker, AppModal } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";
import {
  productFormSelector,
  updateProductFormAction,
} from "../../../store/slices/products/productSlice";
import FormState from "../../../enums/FormState";

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

const ItemSelectShortkeyColor = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const productForm = useSelector(productFormSelector);
  const [_colorValue, setColorValue] = useState(
    productForm?.body.productShortkeyColor
  );

  const _changeColorHandle = ({ colorValue }) => {
    setColorValue(colorValue);
  };

  const _submitColorHandle = () => {
    const updatedProductForm = {
      ...productForm?.body,
      productShortkeyColor: _colorValue || "",
    };
    dispatch(
      updateProductFormAction({
        body: { ...productForm.body, ...updatedProductForm },
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
              colorValue={productForm?.body.productShortkeyColor || undefined}
              onSelect={_changeColorHandle}
            />
          )}
        />
      </View>
    </>
  );
};

export default ItemSelectShortkeyColor;

const styles = StyleSheet.create({});
