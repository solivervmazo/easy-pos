import React from "react";
import { StyleSheet, View } from "react-native";
import {
  AppFormInput,
  AppSelectInput,
  AppSpinner,
  AppTextInput,
  ChipButton,
  Icon,
} from "../../../ui";
import { appColors, appSizes, appSpacing } from "../../../themes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import {
  insertCategoryAction,
  fetchCategoryDetailAction,
  updateCategoryFormAction,
  updateCategoryAction,
  categoryFormSelector,
} from "../../../store/slices/products/productSlice";
import { useDrawerRoutes, useStackRoutes } from "../../../routes";
import FormState from "../../../enums/FormState";
import TabsScreenHeader from "../ui/TabsScreenHeader";
import categoryFormSchema from "../validator/categoryFormSchema";
import { createFormFactory } from "../../../my-app";
import { commonStyles } from "../styles";

const CategoryFormComponent = createFormFactory();

const CategoryFormScreen = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const drawerRoutes = useDrawerRoutes();
  const { id } = useLocalSearchParams();
  const categoryForm = useSelector(categoryFormSelector);
  const { categoryShortkeyColor } = categoryForm?.body ?? {
    categoryShortkeyColor: undefined,
  };

  const openSelectParentCategoryHandle = () => {
    router.push(
      routes["categories-detail"].modals["detail-select-category"].path
    );
  };

  const openSelectShortkeyColorHandle = () => {
    router.push(
      routes["categories-detail"].modals["detail-select-shortkey-color"].path
    );
  };

  return (
    <>
      <TabsScreenHeader
        renderTitle={(titleComposer) =>
          titleComposer(
            "Category",
            categoryForm?.body?.categorId,
            !categoryForm?.body?.id
          )
        }
      />
      {(!categoryForm || categoryForm?.state === FormState.pending) && (
        <AppSpinner />
      )}
      <CategoryFormComponent
        detailId={id}
        validatorSchema={categoryFormSchema}
        state={categoryForm}
        updateFormAction={updateCategoryFormAction}
        redirectPath={drawerRoutes["units-products"].path}
        requestDetailAction={fetchCategoryDetailAction}
        requestUpdateAction={updateCategoryAction}
        requestInsertAction={insertCategoryAction}
        submitSuccessMessage="product category"
      >
        <CategoryFormComponent.Section title="General Information">
          <AppFormInput
            validate={true}
            inputName="categoryId"
            icon="Category"
            label="Category ID"
            enabled={false}
            inputMode="numeric"
            required={true}
          />
          <AppTextInput
            validate={true}
            inputName="categoryName"
            label="Category Name"
            enabled={true}
            required={true}
            labelStyle={styles.inputLabel}
          />
          <AppTextInput
            inputName={"categoryDescription"}
            label="Description"
            enabled={true}
            multiline={true}
            labelStyle={styles.inputLabel}
          />
          <AppSelectInput
            validate={true}
            inputName="categoryParent"
            icon="Tag"
            placeholder="Select Parent Category"
            renderTextValue={(value, text) =>
              text && value ? `${text}(${value.categoryId})` : ""
            }
            label="Parent Category"
            enabled={true}
            onSelectPress={openSelectParentCategoryHandle}
          />
        </CategoryFormComponent.Section>
        <CategoryFormComponent.Gap size={25} />
        <CategoryFormComponent.Section title="Shortkeys">
          <AppFormInput
            inputName="categoryCode"
            icon="Shortkeys"
            label="Category Code"
            enabled={true}
            renderAction={() => (
              <ChipButton
                onPress={openSelectShortkeyColorHandle}
                buttonRight={() => (
                  <View
                    style={[
                      styles.shortkeyBtn,
                      {
                        backgroundColor:
                          categoryShortkeyColor || appColors.lightBgTertiary,
                      },
                    ]}
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
                  categoryShortkeyColor ? categoryShortkeyColor : "Select color"
                }`}
              />
            )}
          />
        </CategoryFormComponent.Section>
      </CategoryFormComponent>
    </>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
});

export default CategoryFormScreen;
