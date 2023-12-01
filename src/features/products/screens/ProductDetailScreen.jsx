import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppSpinner, ChipButton, Spacer } from "../../../ui";
import { appColors, appConstants, appSizes, appSpacing } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";
import ProductDetailScreenHeader from "../ui/ProductDetailScreenHeader";
import ProductDetailGeneralInfoSection from "../ui/ProductDetailGeneralInfoSection";
import ProductDetailCategoryAndVariationSection from "../ui/ProductDetailCategoryAndVariationSection";
import ProductDetailPricingAndDiscountSection from "../ui/ProductDetailPricingAndDiscountSection";
import ProductDetailShortkeySection from "../ui/ProductDetailShortkeySection";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  insertProductAction,
  fetchProductDetailAction,
  updateProductFormAction,
  productFormSchema,
  generateProjectIdAction,
  updateProductAction,
} from "../../../store/slices/products/productSlice";
import { useDrawerRoutes } from "../../../routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormState from "../../../enums/FormState";
import { addQueueAction } from "../../../store/slices/toast/toastSlice";

const ProductDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const productForm = useSelector((state) => state.products.productForm);
  const [_isNew, setIsNew] = useState(true);
  const [_tableLoading, setTableLoading] = useState(!productForm);

  const router = useRouter();
  const drawerRoutes = useDrawerRoutes();

  const {
    control: formControl,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(productFormSchema),
    defaultValues: productForm?.body,
  });

  const _generateIdHandle = () => {
    dispatch(generateProjectIdAction({ random: true }));
  };

  const _saveFormHandle = () => {
    if (productForm?.state === FormState.editing) {
      dispatch(
        updateProductFormAction({
          state: FormState.confirming,
        })
      );
    } else if (productForm?.state === FormState.confirming) {
      if (_isNew) {
        dispatch(insertProductAction(productForm.body));
      } else {
        dispatch(updateProductAction(productForm.body));
      }
    }
  };

  const _errorFormHandle = () => {
    dispatch(
      addQueueAction({
        message: "Fields are required",
        options: {
          type: "danger",
        },
        offset: appConstants.TOAST_ON_STACK_OFFSET,
      })
    );
  };

  const _navigateDoneEditingHandle = ({ redirect = true }) => {
    redirect && router.push(drawerRoutes["store-items"].path);
    dispatch(
      addQueueAction({
        message: `Successfully ${_isNew ? "saved new" : "updated"} product.`,
        options: {
          type: "success",
        },
      })
    );
  };

  const _onFormChangeHandle = ({ ...args }) => {
    dispatch(
      updateProductFormAction({
        body: { ...productForm.body, ...args },
      })
    );
  };

  useEffect(() => {
    if (productForm?.state == FormState.sumbmitted) {
      _navigateDoneEditingHandle({ redirect: true });
    } else {
      if (!productForm) {
        const searchId =
          id === undefined || id === "undefined" ? undefined : id;
        setIsNew(!searchId);
        dispatch(fetchProductDetailAction({ id: searchId }));
      } else if (productForm?.state === FormState.idle) {
        if (productForm.body) {
          Object.keys(productForm.body).forEach((attr) =>
            setValue(attr, productForm.body[attr], { shouldDirty: true })
          );
        }
      }
    }
  }, [productForm, dispatch]);

  return (
    <>
      <ProductDetailScreenHeader
        item={_isNew ? undefined : productForm?.body}
      />
      {(!productForm || productForm?.state === FormState.pending) && (
        <AppSpinner />
      )}
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {/* General information */}
          <ProductDetailGeneralInfoSection
            {...productForm?.body}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
            onGenerateId={_generateIdHandle}
          />
          {/* Category and variations */}
          <Spacer size={25} horizontal={false} />
          {/* <ItemDetailCategoryAndVariationSection /> */}
          {/* Pricing and discounts */}
          <Spacer size={25} horizontal={false} />
          <ProductDetailPricingAndDiscountSection
            {...productForm?.body}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
          />
          {/* Shortkeys */}
          <Spacer size={25} horizontal={false} />
          <ProductDetailShortkeySection
            {...productForm?.body}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
          />
        </ScrollView>
        <View style={[styles.formFooterContainer]}>
          <ChipButton
            disabled={productForm?.state === FormState.idle}
            onPress={handleSubmit(_saveFormHandle, _errorFormHandle)}
            containerStyle={styles.saveButtonContainer}
            labelStyle={styles.saveButtonLabel}
            label={
              productForm?.state === FormState.confirming
                ? "Tap again to confirm"
                : _isNew
                ? "Create"
                : "Update"
            }
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

export default ProductDetailScreen;
