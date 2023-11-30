import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppSpinner, ChipButton, Spacer } from "../../../ui/";
import { appColors, appConstants, appSizes, appSpacing } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";
import ItemDetailScreenHeader from "../ui/ItemDetailScreenHeader";
import ItemDetailGeneralInfoSection from "../ui/ItemDetailGeneralInfoSection";
import ItemDetailCategoryAndVariationSection from "../ui/ItemDetailCategoryAndVariationSection";
import ItemDetailPricingAndDiscountSection from "../ui/ItemDetailPricingAndDiscountSection";
import ItemDetailShortkeySection from "../ui/ItemDetailShortkeySection";
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

const ItemDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const formLoading = useSelector((state) => state.products.formLoading);
  const formActionState = useSelector(
    (state) => state.products.formActionState
  );
  const [_isNew, setIsNew] = useState(true);

  const router = useRouter();
  const drawerRoutes = useDrawerRoutes();

  const [_confirm, setConfirm] = useState(false);
  const { productDetail } = useSelector((state) => state.products);
  const {
    control: formControl,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(productFormSchema),
    defaultValues: productDetail,
  });
  getValues();

  const _generateIdHandle = () => {
    dispatch(generateProjectIdAction({ random: true }));
  };

  const _saveFormHandle = () => {
    if (!_confirm) {
      setConfirm(true);
      return;
    }
    if (_isNew) {
      dispatch(insertProductAction(productDetail));
    } else {
      dispatch(updateProductAction(productDetail));
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

  const _navigateDoneEditingHandle = () => {
    router.replace(drawerRoutes["store-items"].path);
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
    setConfirm(false);
    const updatedProductForm = {
      ...productDetail,
      ...args,
    };
    dispatch(
      updateProductFormAction({
        formState: FormState.editing,
        productDetail: updatedProductForm,
      })
    );
  };

  useEffect(() => {
    if (id != "undefined" && formActionState === FormState.fresh) {
      dispatch(updateProductFormAction({ formState: FormState.editing }));
      dispatch(fetchProductDetailAction({ args: { id: id } }));
      setIsNew(false);
    } else if (formActionState === FormState.fresh) {
      dispatch(generateProjectIdAction({ random: false }));
      setValue("productId", productDetail.productId, { shouldDirty: true });
      setIsNew(true);
    } else if (formActionState === FormState.editing) {
      setValue("productId", productDetail.productId, { shouldDirty: true });
    } else if (formActionState === FormState.sumbmitted) {
      _navigateDoneEditingHandle();
    }
  }, [formActionState, productDetail, id]);

  return (
    <>
      <ItemDetailScreenHeader item={_isNew ? undefined : productDetail} />
      {formLoading && <AppSpinner />}
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
            onGenerateId={_generateIdHandle}
          />
          {/* Category and variations */}
          <Spacer size={25} horizontal={false} />
          {/* <ItemDetailCategoryAndVariationSection /> */}
          {/* Pricing and discounts */}
          <Spacer size={25} horizontal={false} />
          <ItemDetailPricingAndDiscountSection
            {...productDetail}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
          />
          {/* Shortkeys */}
          <Spacer size={25} horizontal={false} />
          <ItemDetailShortkeySection
            {...productDetail}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
          />
        </ScrollView>
        <View style={[styles.formFooterContainer]}>
          <ChipButton
            onPress={handleSubmit(_saveFormHandle, _errorFormHandle)}
            containerStyle={styles.saveButtonContainer}
            labelStyle={styles.saveButtonLabel}
            label={
              _confirm ? "Tap again to confirm" : _isNew ? "Create" : "Update"
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

export default ItemDetailScreen;