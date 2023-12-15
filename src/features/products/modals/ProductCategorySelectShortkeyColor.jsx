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

const ProductCategorySelectShortkeyColor = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const categoryForm = useSelector(
    productStore.categories.selectors.formSelector
  );
  const [_colorValue, setColorValue] = useState(
    categoryForm?.body.categoryShortkeyColor
  );

  const onChangeColorHandle = ({ colorValue }) => {
    setColorValue(colorValue);
  };

  const onSubmitColorHandle = () => {
    const updatedCategoryForm = {
      ...categoryForm?.body,
      categoryShortkeyColor: _colorValue || "",
    };
    dispatch(
      productStore.categories.actions.updateForm({
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
          onConfirm={onSubmitColorHandle}
          renderContent={() => (
            <AppColorPicker
              colorValue={categoryForm?.body.categoryShortkeyColor || undefined}
              onSelect={onChangeColorHandle}
            />
          )}
        />
      </View>
    </>
  );
};

export default ProductCategorySelectShortkeyColor;

const styles = StyleSheet.create({});
