import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { AppSpinner, ChipButton, Spacer } from "../../../ui";
import { appColors, appConstants, appSizes, appSpacing } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";
import CategoryDetailScreenHeader from "../ui/CategoryDetailScreenHeader";
import CategoryDetailGeneralInfoSection from "../ui/CategoryDetailGeneralInfoSection";
import CategoryDetailCategoryAndVariationSection from "../ui/CategoryDetailCategoryAndVariationSection";
import CategoryDetailPricingAndDiscountSection from "../ui/CategoryDetailPricingAndDiscountSection";
import CategoryDetailShortkeySection from "../ui/CategoryDetailShortkeySection";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  insertCategoryAction,
  fetchCategoryDetailAction,
  updateCategoryFormAction,
  categoryFormSchema,
  generateProjectIdAction,
  updateCategoryAction,
} from "../../../store/slices/categories/categorySlice";
import { useDrawerRoutes } from "../../../routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormState from "../../../enums/FormState";
import { addQueueAction } from "../../../store/slices/toast/toastSlice";
import { commonStyles } from "../styles";

const CategoryDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const categoryForm = useSelector((state) => state.categories.categoryForm);
  const [_isNew, setIsNew] = useState(true);
  const [_tableLoading, setTableLoading] = useState(!categoryForm);

  const router = useRouter();
  const drawerRoutes = useDrawerRoutes();

  const {
    control: formControl,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(categoryFormSchema),
    defaultValues: categoryForm?.body,
  });

  const _generateIdHandle = () => {
    dispatch(generateProjectIdAction({ random: true }));
  };

  const _saveFormHandle = () => {
    if (categoryForm?.state === FormState.editing) {
      dispatch(
        updateCategoryFormAction({
          state: FormState.confirming,
        })
      );
    } else if (categoryForm?.state === FormState.confirming) {
      if (_isNew) {
        dispatch(insertCategoryAction(categoryForm.body));
      } else {
        dispatch(updateCategoryAction(categoryForm.body));
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
        message: `Successfully ${_isNew ? "saved new" : "updated"} category.`,
        options: {
          type: "success",
        },
      })
    );
  };

  const _onFormChangeHandle = ({ ...args }) => {
    dispatch(
      updateCategoryFormAction({
        body: { ...categoryForm.body, ...args },
      })
    );
  };

  useEffect(() => {
    if (categoryForm?.state == FormState.sumbmitted) {
      _navigateDoneEditingHandle({ redirect: true });
    } else {
      if (!categoryForm) {
        const searchId =
          id === undefined || id === "undefined" ? undefined : id;
        setIsNew(!searchId);
        dispatch(fetchCategoryDetailAction({ id: searchId }));
      } else if (categoryForm?.state === FormState.idle) {
        if (categoryForm.body) {
          Object.keys(categoryForm.body).forEach((attr) =>
            setValue(attr, categoryForm.body[attr], { shouldDirty: true })
          );
        }
      }
    }
  }, [categoryForm, dispatch]);

  return (
    <>
      <CategoryDetailScreenHeader
        item={_isNew ? undefined : categoryForm?.body}
      />
      {(!categoryForm || categoryForm?.state === FormState.pending) && (
        <AppSpinner />
      )}
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {/* General information */}
          <SectionHeader
            titleSize={appSizes.Text.medium}
            containerStyle={styles.sectionHeaderContainer}
            title={"General Information"}
            titleColor={appColors.themeColor}
          />
          {/* Category and variations */}
          <Spacer size={25} horizontal={false} />
          <SectionHeader
            titleSize={appSizes.Text.medium}
            containerStyle={styles.sectionHeaderContainer}
            title={"Shortkey"}
            titleColor={appColors.themeColor}
          />
          <View style={[styles.sectionContent]}>
            <AppFormInputText
              icon="Shortkeys"
              value={categoryCode?.toString()}
              control={formControl}
              name={"categoryCode"}
              errors={formErrors?.categoryCode}
              onChange={(value) => onFormChange({ categoryCode: value })}
              label="Category Code"
              enabled={true}
              labelContainerStyle={styles.inputLabelContainer}
              renderAction={() => (
                <ChipButton
                  onPress={_selectShortkeyColorHandle}
                  buttonRight={() => (
                    <View
                      style={{
                        height: appSizes.Icon.large,
                        width: appSizes.Icon.large,
                        borderWidth: 0.5,
                        borderColor: appColors.lightBgSecondary,
                        overflow: "hidden",
                        backgroundColor:
                          categoryShortkeyColor || appColors.lightBgTertiary,
                      }}
                    >
                      {!categoryShortkeyColor && (
                        <Icon.Slash
                          color={appColors.darkTextTertiary}
                          size={appSizes.Icon.large}
                        />
                      )}
                    </View>
                  )}
                  containerStyle={styles.inputActionButtonContainer}
                  label={`${
                    categoryShortkeyColor
                      ? categoryShortkeyColor
                      : "Select color"
                  }`}
                />
              )}
            />
          </View>
        </ScrollView>
        <View style={[styles.formFooterContainer]}>
          <ChipButton
            disabled={categoryForm?.state === FormState.idle}
            onPress={handleSubmit(_saveFormHandle, _errorFormHandle)}
            containerStyle={styles.saveButtonContainer}
            labelStyle={styles.saveButtonLabel}
            label={
              categoryForm?.state === FormState.confirming
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
  ...commonStyles,
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

export default CategoryDetailScreen;
