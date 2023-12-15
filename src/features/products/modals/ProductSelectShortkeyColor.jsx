import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppColorPicker, AppModal } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";
import { productStore } from "../store";

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

const ProductSelectShortkeyColor = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const productForm = useSelector(productStore.products.selectors.formSelector);
  const [_colorValue, setColorValue] = useState(
    productForm?.body.productShortkeyColor
  );

  const _changeColorHandle = ({ colorValue }) => {
    setColorValue(colorValue);
  };

  const onSubmitColorHandle = () => {
    const updatedProductForm = {
      ...productForm?.body,
      productShortkeyColor: _colorValue || "",
    };
    dispatch(
      productStore.products.actions.updateForm({
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
          onConfirm={onSubmitColorHandle}
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

export default ProductSelectShortkeyColor;

const styles = StyleSheet.create({});
