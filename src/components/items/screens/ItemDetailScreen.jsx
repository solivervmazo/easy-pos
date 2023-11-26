import React, { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { AppSpinner, ChipButton, Spacer } from "../../../ui/";
import { appColors, appSizes, appSpacing } from "../../../themes";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import ItemDetailScreenHeader from "../ui/ItemDetailScreenHeader";
import ItemDetailGeneralInfoSection from "../ui/ItemDetailGeneralInfoSection";
import ItemDetailCategoryAndVariationSection from "../ui/ItemDetailCategoryAndVariationSection";
import ItemDetailPricingAndDiscountSection from "../ui/ItemDetailPricingAndDiscountSection";
import ItemDetailShortkeySection from "../ui/ItemDetailShortkeySection";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  insertProductAction,
  restartFormAction,
  fetchProductDetailAction,
  updateFormAction,
  productFormSchema,
} from "../../../store/slices/products/productSlice";
import { useDrawerRoutes } from "../../../routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

const ItemDetailScreen = () => {
  const { id } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      id && dispatch(fetchProductDetailAction({ args: { product_id: id } }));
      return () => {
        dispatch(restartFormAction());
      };
    }, [])
  );
  const [_confirm, setConfirm] = useState(false);

  const router = useRouter();
  const drawerRoutes = useDrawerRoutes();
  const dispatch = useDispatch();

  const {
    formLoading,
    formSubmitted,
    // formState,
    productDetail,
    productDetail: {
      productId,
      productName,
      productDescription,
      productBarcode,
      productSku,
    },
  } = useSelector((state) => state.items);
  const [_productForm, setProductFrom] = useState(productDetail);

  const {
    control: formControl,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(productFormSchema),
    defaultValues: _productForm,
  });

  const _saveFormHandle = () => {
    if (!_confirm) {
      // setConfirm(true);
      return;
    }
    dispatch(
      insertProductAction({
        product_name: _productForm.productName,
        product_description: _productForm.productDescription,
        product_barcode: _productForm.productBarcode,
        product_sku: _productForm.productSku,
      })
    );
  };

  console.log("ERRORS", formErrors);
  const _navigateDoneEditingHandle = () => {
    router.replace(drawerRoutes["store-items"].path);
  };

  const _onFormChangeHandle = ({ ...args }) => {
    const updatedProductForm = {
      ..._productForm,
      ...args,
    };
    setProductFrom(updatedProductForm);
    dispatch(updateFormAction(updatedProductForm));
  };

  useEffect(() => {
    if (formSubmitted === 3) {
      _navigateDoneEditingHandle();
    }
  }, [formSubmitted]);

  return (
    <>
      {formLoading && <AppSpinner />}
      <ItemDetailScreenHeader />
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {/* General information */}
          <ItemDetailGeneralInfoSection
            {...productDetail}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
          />
          {/* Category and variations */}
          <Spacer size={25} horizontal={false} />
          {/* <ItemDetailCategoryAndVariationSection /> */}
          {/* Pricing and discounts */}
          <Spacer size={25} horizontal={false} />
          {/* <ItemDetailPricingAndDiscountSection /> */}
          {/* Shortkeys */}
          <Spacer size={25} horizontal={false} />
          {/* <ItemDetailShortkeySection /> */}
        </ScrollView>
        <View style={[styles.formFooterContainer]}>
          <ChipButton
            onPress={handleSubmit(_saveFormHandle)}
            containerStyle={styles.saveButtonContainer}
            labelStyle={styles.saveButtonLabel}
            label={_confirm ? "Tap again to confirm" : "Save"}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingVertical: 10,
  },
  formFooterContainer: {},
  saveButtonContainer: {
    flex: 0,
    backgroundColor: appColors.lightSuccess,
    paddingVertical: 15,
  },
  saveButtonLabel: {
    fontSize: appSizes.Text.regular,
  },
});

export default ItemDetailScreen;
