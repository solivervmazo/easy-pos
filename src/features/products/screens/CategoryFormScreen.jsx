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
import { appColors, appSizes } from "../../../themes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useDrawerRoutes, useStackRoutes } from "../../../routes";
import FormState from "../../../enums/FormState";
import TabsScreenHeader from "../ui/TabsScreenHeader";
import categoryFormSchema from "../validator/categoryFormSchema";
import { createFormFactory } from "../../../my-app";
import { commonStyles } from "../styles/styles";
import { t } from "../../../locale/localization";
import { productStore } from "../store";

const CategoryFormComponent = createFormFactory();

const CategoryFormScreen = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const drawerRoutes = useDrawerRoutes();
  const { id } = useLocalSearchParams();
  const categoryForm = useSelector(
    productStore.categories.selectors.formSelector
  );

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
            t("category", "capitalize"),
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
        updateFormAction={productStore.categories.actions.updateForm}
        redirectPath={drawerRoutes["units-products"].path}
        requestDetailAction={productStore.categories.actions.fetchDetail}
        requestUpdateAction={productStore.categories.actions.update}
        requestInsertAction={productStore.categories.actions.insert}
        submitSuccessMessage={t("product category")}
      >
        <CategoryFormComponent.Section
          title={t("general information", "capitalize")}
        >
          <AppFormInput
            validate={true}
            inputName="categoryId"
            icon="Category"
            label={`${t("category", "phrase")} ${t("id", "ucase")}`}
            enabled={false}
            inputMode="numeric"
            required={true}
          />
          <AppTextInput
            validate={true}
            inputName="categoryName"
            label={t("category name", "phrase")}
            enabled={true}
            required={true}
            labelStyle={styles.inputLabel}
          />
          <AppTextInput
            inputName={"categoryDescription"}
            label={t("description", "phrase")}
            enabled={true}
            multiline={true}
            labelStyle={styles.inputLabel}
          />
          <AppSelectInput
            validate={true}
            inputName="categoryParent"
            valueKey={"categoryName"}
            icon="Tag"
            placeholder={t("select parent category", "phrase")}
            renderTextValue={(value, text) =>
              text && value ? `${text}(${value.categoryId})` : ""
            }
            label={t("parent category", "phrase")}
            enabled={true}
            onSelectPress={openSelectParentCategoryHandle}
          />
        </CategoryFormComponent.Section>
        <CategoryFormComponent.Gap size={25} />
        <CategoryFormComponent.Section title={t("shortkeys", "capitalize")}>
          <AppFormInput
            inputName="categoryCode"
            icon="Shortkeys"
            label={t("category code", "phrase")}
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
                  categoryShortkeyColor
                    ? categoryShortkeyColor
                    : t("select color", "phrase")
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
