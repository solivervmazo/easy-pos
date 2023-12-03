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
  insertCategoryAction,
  fetchCategoryDetailAction,
  updateCategoryFormAction,
  // generateProjectIdAction,
  updateCategoryAction,
  categoryFormSelector,
} from "../../../store/slices/products/productSlice";
import { useDrawerRoutes } from "../../../routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormState from "../../../enums/FormState";
import { addQueueAction } from "../../../store/slices/toast/toastSlice";
import TabsScreenHeader from "../ui/TabsScreenHeader";
import categoryFormSchema from "../validator/categoryFormSchema";
import CategoryDetailGeneralInfoSection from "../ui/categories/CategoryDetailGeneralInfoSection";
import CategoryDetailShortkeySection from "../ui/categories/CategoryDetailShortkeySection";
const CategoryDetailScreen = () => {
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();

  const categoryForm = useSelector(categoryFormSelector);
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
    redirect && router.push(drawerRoutes["units-products"].path);
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
      <TabsScreenHeader
        renderTitle={(titleComposer) =>
          titleComposer("Category", categoryForm?.body?.categorId, _isNew)
        }
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
          <CategoryDetailGeneralInfoSection
            {...categoryForm?.body}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
          />
          {/* Category and variations */}
          <Spacer size={25} horizontal={false} />
          <CategoryDetailShortkeySection
            {...categoryForm?.body}
            formControl={formControl}
            formErrors={formErrors}
            onFormChange={_onFormChangeHandle}
          />
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
