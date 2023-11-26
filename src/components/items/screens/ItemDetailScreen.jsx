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
  generateProjectIdAction,
  updateProductAction,
} from "../../../store/slices/products/productSlice";
import { useDrawerRoutes } from "../../../routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormSate from "../../../enums/FormState";

const ItemDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const { formLoading, formActionState } = useSelector((state) => state.items);
  const [_isNew, setIsNew] = useState(true);
  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(restartFormAction());
      };
    }, [])
  );

  const router = useRouter();
  const drawerRoutes = useDrawerRoutes();

  const [_confirm, setConfirm] = useState(false);
  const { productDetail } = useSelector((state) => state.items);
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

  const _generateIdHandle = () => {
    dispatch(generateProjectIdAction({ random: true }));
  };

  const _saveFormHandle = () => {
    console.log("productDetail", productDetail);
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

  const _navigateDoneEditingHandle = () => {
    router.replace(drawerRoutes["store-items"].path);
  };

  const _onFormChangeHandle = ({ ...args }) => {
    const updatedProductForm = {
      ...productDetail,
      ...args,
    };
    dispatch(
      updateFormAction({
        formState: FormSate.editing,
        productDetail: updatedProductForm,
      })
    );
  };

  useEffect(() => {
    if (id != "undefined" && formActionState === FormSate.fresh) {
      dispatch(updateFormAction({ formState: FormSate.editing }));
      dispatch(fetchProductDetailAction({ args: { id: id } }));
      setIsNew(false);
    } else if (formActionState === FormSate.fresh) {
      dispatch(generateProjectIdAction({ random: false }));
      setValue("productId", productDetail.productId, { shouldDirty: true });
      setIsNew(true);
    } else if (formActionState === FormSate.editing) {
      setValue("productId", productDetail.productId, { shouldDirty: true });
    } else if (formActionState === FormSate.sumbmitted) {
      _navigateDoneEditingHandle();
    }
  }, [formActionState, productDetail, id]);

  return (
    <>
      {formLoading && <AppSpinner />}
      <ItemDetailScreenHeader item={_isNew ? undefined : productDetail} />
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
            onPress={handleSubmit(_saveFormHandle)}
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
