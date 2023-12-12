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
import {
  insertProductAction,
  fetchProductDetailAction,
  updateProductFormAction,
  generateProjectIdAction,
  updateProductAction,
} from "../../../store/slices/products/productSlice";
import { useDrawerRoutes, useStackRoutes } from "../../../routes";
import FormState from "../../../enums/FormState";
import TabsScreenHeader from "../ui/TabsScreenHeader";
import { createFormFactory } from "../../../my-app";
import { commonStyles } from "../styles";

const ProductFormComponent = createFormFactory();

const ProductFormScreen = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const drawerRoutes = useDrawerRoutes();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const productForm = useSelector((state) => state.products.productForm);
  const { productShortkeyColor } = productForm?.body ?? {
    productShortkeyColor: undefined,
  };

  const generateNewId = () => {
    dispatch(generateProjectIdAction({ random: true }));
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
            "Product",
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
        updateFormAction={updateProductFormAction}
        redirectPath={drawerRoutes["units-products"].path}
        requestDetailAction={fetchProductDetailAction}
        requestUpdateAction={updateProductAction}
        requestInsertAction={insertProductAction}
        submitSuccessMessage="product"
      >
        <ProductFormComponent.Section title="General Information">
          <AppFormInput
            validate={true}
            inputName="productId"
            icon="Items"
            label="Product ID"
            enabled={true}
            inputMode="numeric"
            renderAction={() => (
              <ChipButton
                onPress={generateNewId}
                containerStyle={styles.inputActionButtonContainer}
                label={`Generate`}
              />
            )}
            required={true}
          />
          <AppFormInput
            validate={true}
            inputName="productName"
            label="Product Name"
            enabled={true}
            required={true}
          />
          <AppFormInput
            inputName={"productDescription"}
            label="Description"
            enabled={true}
            multiline={true}
          />
          <AppSelectInput
            inputName={"productCategory"}
            icon="Tag"
            valueKey={"categoryName"}
            placeholder="Select Category"
            renderTextValue={(value, text) =>
              text && value ? `${text}(${value.categoryId})` : ""
            }
            label="Category"
            enabled={true}
            onSelectPress={openSelectCategoryHandle}
          />
          <AppFormInput
            inputName={"productBarcode"}
            icon="Barcode"
            label="Barcode"
            enabled={true}
            multiline={true}
            inputMode="numeric"
            renderAction={() => (
              <ChipButton
                containerStyle={styles.inputActionButtonContainer}
                label={`Camera`}
              />
            )}
          />
          <AppFormInput
            inputName={"productSku"}
            label="SKU"
            enabled={true}
            multiline={true}
            inputMode="numeric"
            renderAction={() => (
              <ChipButton
                containerStyle={styles.inputActionButtonContainer}
                label={`Camera`}
              />
            )}
          />
        </ProductFormComponent.Section>
        <ProductFormComponent.Gap size={25} />
        <ProductFormComponent.Section title="Pricing and Discount">
          <AppFormInput
            inputName={"productPrice"}
            icon="Tags"
            label="Default Price"
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
                label={`Select`}
              />
            )}
          />
          <ChipButton
            plain={true}
            label={"Add Rule-Coming Soon"}
            containerStyle={styles.addRuleButtonContainer}
          />
        </ProductFormComponent.Section>
        <ProductFormComponent.Gap size={25} />
        <ProductFormComponent.Section title="Shortkeys">
          <AppFormInput
            inputName={"productCode"}
            icon="Shortkeys"
            label="Product Code"
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
                  productShortkeyColor ? productShortkeyColor : "Select color"
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
