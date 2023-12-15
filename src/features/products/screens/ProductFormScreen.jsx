import React from "react";
import { StyleSheet, View } from "react-native";
import {
  AppFormInput,
  AppSelectInput,
  AppSpinner,
  ChipButton,
  IconButton,
  Icon,
} from "../../../ui";
import { appColors } from "../../../themes";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import productFormSchema from "../validator/productFormSchema";
import { useDrawerRoutes, useStackRoutes } from "../../../routes";
import FormState from "../../../enums/FormState";
import TabsScreenHeader from "../ui/TabsScreenHeader";
import { createFormFactory } from "../../../my-app";
import { commonStyles } from "../styles/styles";
import { productStore } from "../store";
import { t } from "../../../locale/localization";

const ProductFormComponent = createFormFactory();

const ProductFormScreen = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const drawerRoutes = useDrawerRoutes();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const productForm = useSelector((state) =>
    productStore.products.selectors.formSelector(state)
  );
  const { productShortkeyColor } = productForm?.body ?? {
    productShortkeyColor: undefined,
  };

  const generateNewId = () => {
    dispatch(productStore.products.actions.generateId({ random: true }));
  };
  const openSelectCategoryHandle = () => {
    router.push(
      routes["products-detail"].modals["detail-select-category"].path
    );
  };

  const openSelectShortkeyColorHandle = () => {
    router.push(
      routes["products-detail"].modals["detail-select-shortkey-color"].path
    );
  };
  return (
    <>
      <TabsScreenHeader
        renderTitle={(titleComposer) =>
          titleComposer(
            t("product", "phrase"),
            productForm?.body?.productId,
            !productForm?.body?.id
          )
        }
      />
      {(!productForm || productForm?.state === FormState.pending) && (
        <AppSpinner />
      )}
      <ProductFormComponent
        detailId={id}
        validatorSchema={productFormSchema}
        state={productForm}
        updateFormAction={productStore.products.actions.updateForm}
        redirectPath={drawerRoutes["units-products"].path}
        requestDetailAction={productStore.products.actions.fetchDetail}
        requestUpdateAction={productStore.products.actions.update}
        requestInsertAction={productStore.products.actions.insert}
        submitSuccessMessage={t("product")}
      >
        <ProductFormComponent.Section
          title={t("general information", "capitalize")}
        >
          <AppFormInput
            validate={true}
            inputName="productId"
            icon="Items"
            label={`${t("product", "phrase")} ${t("id", "ucase")}`}
            enabled={true}
            inputMode="numeric"
            renderAction={() => (
              <ChipButton
                onPress={generateNewId}
                containerStyle={styles.inputActionButtonContainer}
                label={t("generate", "phrase")}
              />
            )}
            required={true}
          />
          <AppFormInput
            validate={true}
            inputName="productName"
            label={t("product name", "phrase")}
            enabled={true}
            required={true}
          />
          <AppFormInput
            inputName={"productDescription"}
            label={t("description", "phrase")}
            enabled={true}
            multiline={true}
          />
          <AppSelectInput
            inputName={"productCategory"}
            icon="Tag"
            valueKey={"categoryName"}
            placeholder={t("select category", "phrase")}
            renderTextValue={(value, text) =>
              text && value ? `${text}(${value.categoryId})` : ""
            }
            label={t("category", "phrase")}
            enabled={true}
            onSelectPress={openSelectCategoryHandle}
          />
          <AppFormInput
            inputName={"productBarcode"}
            icon="Barcode"
            label={t("barcode", "phrase")}
            enabled={true}
            multiline={true}
            inputMode="numeric"
            renderAction={() => (
              <ChipButton
                containerStyle={styles.inputActionButtonContainer}
                label={t("camera", "phrase")}
              />
            )}
          />
          <AppFormInput
            inputName={"productSku"}
            label={t("sku", "ucase")}
            enabled={true}
            multiline={true}
            inputMode="numeric"
            renderAction={() => (
              <ChipButton
                containerStyle={styles.inputActionButtonContainer}
                label={t("camera", "phrase")}
              />
            )}
          />
        </ProductFormComponent.Section>
        <ProductFormComponent.Gap size={25} />
        <ProductFormComponent.Section
          title={t("pricing and discount", "phrase")}
        >
          <AppFormInput
            inputName={"productPrice"}
            icon="Tags"
            label={t("default price", "phrase")}
            enabled={true}
            inputMode="numeric"
            required={true}
            renderAction={() => (
              <ChipButton
                buttonRight={() => (
                  <IconButton
                    icon={"Down"}
                    color={appColors.lightText}
                    plain={true}
                    disabled={true}
                    size={appSizes.Icon.small}
                  />
                )}
                containerStyle={styles.inputActionButtonContainer}
                label={t("select", "phrase")}
              />
            )}
          />
          <ChipButton
            plain={true}
            label={t("add rule-coming soon", "phrase")}
            containerStyle={styles.addRuleButtonContainer}
          />
        </ProductFormComponent.Section>
        <ProductFormComponent.Gap size={25} />
        <ProductFormComponent.Section title={t("shortkeys", "capitalize")}>
          <AppFormInput
            inputName={"productCode"}
            icon="Shortkeys"
            label={t("product code", "phrase")}
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
                          productShortkeyColor || appColors.lightBgTertiary,
                      },
                    ]}
                  >
                    {!productShortkeyColor && (
                      <Icon.Slash
                        color={appColors.darkTextTertiary}
                        size={appSizes.Icon.large}
                      />
                    )}
                  </View>
                )}
                containerStyle={styles.inputActionButtonContainer}
                label={`${
                  productShortkeyColor
                    ? productShortkeyColor
                    : t("select color", "phrase")
                }`}
              />
            )}
          />
        </ProductFormComponent.Section>
      </ProductFormComponent>
    </>
  );
};

export default ProductFormScreen;

const styles = StyleSheet.create({
  ...commonStyles,
});
