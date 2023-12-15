import React, { useState } from "react";
import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { AppModal, AppSelectPicker } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";
import { productStore } from "../store";

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
  const categoryForm = useSelector(
    productStore.categories.selectors.formSelector
  );
  const categoryList = useSelector((state) =>
    productStore.categories.selectors.listSelector(state, {
      rootLookup: categoryForm?.body?.categoryRootId,
      categoryLookup: categoryForm?.body?.id,
    })
  );

  const [selectedValueState, setSelectedValue] = useState(
    categoryForm?.body.categoryParent
  );

  const onChangeHandle = (value) => {
    setSelectedValue(value);
  };

  const onClearSelectionHandle = () => {
    setSelectedValue({});
  };
  const onSubmitHandle = () => {
    const updatedCategoryForm = {
      ...categoryForm?.body,
      categoryParent: selectedValueState,
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
          onConfirm={onSubmitHandle}
          renderContent={() => (
            <AppSelectPicker
              items={categoryList}
              value={selectedValueState}
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

export default ProductCategorySelectParentCategory;
