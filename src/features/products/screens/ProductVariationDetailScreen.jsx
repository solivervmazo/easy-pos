import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import {
  AppFormInput,
  AppSpinner,
  ChipButton,
  SectionHeader,
  Spacer,
} from "../../../ui";
import { appColors, appConstants, appSizes, appSpacing } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  insertProductVariationAction,
  fetchProductVariationDetailAction,
  updateProductVariationFormAction,
  // generateProjectIdAction,
  updateProductVariationAction,
  productVariationFormSelector,
} from "../../../store/slices/products/productSlice";
import { useDrawerRoutes } from "../../../routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormState from "../../../enums/FormState";
import { addQueueAction } from "../../../store/slices/toast/toastSlice";
import TabsScreenHeader from "../ui/TabsScreenHeader";
import productVariationFormSchema from "../validator/productVariationFormSchema";
import ProductVariationDetailGeneralInfoSection from "../ui/variations/ProductVariationDetailGeneralInfoSection";
const ProductVariationDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const productVariationForm = useSelector(productVariationFormSelector);
  const [_isNew, setIsNew] = useState(true);
  const router = useRouter();
  const drawerRoutes = useDrawerRoutes();

  const {
    control: formControl,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(productVariationFormSchema),
    defaultValues: productVariationForm?.body,
  });

  const _generateIdHandle = () => {
    dispatch(generateProjectIdAction({ random: true }));
  };

  const _saveFormHandle = () => {
    if (productVariationForm?.state === FormState.editing) {
      dispatch(
        updateProductVariationFormAction({
          state: FormState.confirming,
        })
      );
    } else if (productVariationForm?.state === FormState.confirming) {
      if (_isNew) {
        dispatch(insertProductVariationAction(productVariationForm.body));
      } else {
        dispatch(updateProductVariationAction(productVariationForm.body));
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
    redirect && router.push(drawerRoutes["units-products"].path);
    dispatch(
      addQueueAction({
        message: `Successfully ${
          _isNew ? "saved new" : "updated"
        } productVariation.`,
        options: {
          type: "success",
        },
      })
    );
  };

  const _onFormChangeHandle = ({ ...args }) => {
    dispatch(
      updateProductVariationFormAction({
        body: { ...productVariationForm.body, ...args },
      })
    );
  };

  useEffect(() => {
    if (productVariationForm?.state == FormState.sumbmitted) {
      _navigateDoneEditingHandle({ redirect: true });
    } else {
      if (!productVariationForm) {
        const searchId =
          id === undefined || id === "undefined" ? undefined : id;
        setIsNew(!searchId);
        dispatch(fetchProductVariationDetailAction({ id: searchId }));
      } else if (productVariationForm?.state === FormState.idle) {
        if (productVariationForm.body) {
          Object.keys(productVariationForm.body).forEach((attr) =>
            setValue(attr, productVariationForm.body[attr], {
              shouldDirty: true,
            })
          );
        }
      }
    }
  }, [productVariationForm, dispatch]);
  return (
    <>
      <TabsScreenHeader
        renderTitle={(titleComposer) =>
          titleComposer(
            "ProductVariation",
            productVariationForm?.body?.productVariaitonId,
            _isNew
          )
        }
      />
      {(!productVariationForm ||
        productVariationForm?.state === FormState.pending) && <AppSpinner />}
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {/* General information */}
          <ProductVariationDetailGeneralInfoSection
            {...productVariationForm?.body}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
          />
          {/* ProductVariation and variations */}
          <Spacer size={25} horizontal={false} />
        </ScrollView>
        <View style={[styles.formFooterContainer]}>
          <ChipButton
            disabled={productVariationForm?.state === FormState.idle}
            onPress={handleSubmit(_saveFormHandle, _errorFormHandle)}
            containerStyle={styles.saveButtonContainer}
            labelStyle={styles.saveButtonLabel}
            label={
              productVariationForm?.state === FormState.confirming
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

export default ProductVariationDetailScreen;
