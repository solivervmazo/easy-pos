import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Stack, useRouter } from "expo-router";
import { AppModal, AppSelectPicker } from "../../../ui";
import { useDispatch, useSelector } from "react-redux";
import { productStore } from "../store";
import { requestProductCategoryList } from "../context";
import { dbProductCategories } from "../context/db";

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
  // const categoryList = useSelector((state) =>
  //   productStore.categories.selectors.listSelector(state, {
  //     rootLookup: categoryForm?.body?.categoryRootId,
  //     categoryLookup: categoryForm?.body?.id,
  //   })
  // );

  const [categoryList, setCategoryList] = useState(undefined);

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
      productStore.categories.actions.updateForm({
        body: { ...categoryForm.body, ...updatedCategoryForm },
      })
    );
    router.canGoBack() && router.back();
  };

  useEffect(() => {
    const fetchList = async () => {
      const {
        body: { id, categoryRoodId },
      } = categoryForm;
      const list = await requestProductCategoryList(false, {
        categoryRootIdLookup: categoryRoodId,
        idLookup: id,
      });
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
          onConfirm={_submitHandle}
          renderContent={() => (
            <AppSelectPicker
              items={categoryList || []}
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
