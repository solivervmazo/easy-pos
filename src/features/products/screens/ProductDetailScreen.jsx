import React from "react";
import { StyleSheet } from "react-native";
import {
  AppFormInput,
  AppSelectInput,
  AppSpinner,
  ChipButton,
  IconButton,
  Spacer,
} from "../../../ui";
import { appColors } from "../../../themes";
import ProductDetailCategoryAndVariationSection from "../ui/ProductDetailCategoryAndVariationSection";
import ProductDetailPricingAndDiscountSection from "../ui/ProductDetailPricingAndDiscountSection";
import ProductDetailShortkeySection from "../ui/ProductDetailShortkeySection";
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
const ProductFormComponent = createFormFactory();

const ProductDetailScreen = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const drawerRoutes = useDrawerRoutes();
  const dispatch = useDispatch();
  const { id } = useLocalSearchParams();
  const productForm = useSelector((state) => state.products.productForm);
  const generateNewId = () => {
    dispatch(generateProjectIdAction({ random: true }));
  };
  const openSelectParentCategoryHandle = () => {
    router.push(
      routes["products-detail"].modals["detail-select-category"].path
    );
  };
  return (
    <>
      <TabsScreenHeader
        renderTitle={(titleComposer) =>
          titleComposer(
            "Product",
            productForm?.body?.productId,
            productForm?.body?.id
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
            onSelectPress={openSelectParentCategoryHandle}
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
      </ProductFormComponent>
    </>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  inputActionButtonContainer: {
    backgroundColor: appColors.lightPrimary,
  },
});
