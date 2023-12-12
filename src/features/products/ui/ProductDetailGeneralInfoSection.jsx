import React from "react";
import { StyleSheet, View } from "react-native";
import {
  SectionHeader,
  ChipButton,
  AppFormInput,
  AppSelectInput,
} from "../../../ui";
import { appColors, appSizes } from "../../../themes";
import { commonStyles } from "../styles";
import { useRouter } from "expo-router/src/hooks";
import { useStackRoutes } from "../../../routes";

const ProductDetailGeneralInfoSection = ({
  formControl,
  formErrors,
  productId,
  productName,
  productDescription,
  productCategory,
  productBarcode,
  productSku,
  onFormChange,
  onGenerateId = () => {},
}) => {
  const router = useRouter();
  const routes = useStackRoutes();
  const onGenerateIdHandle = () => {
    onGenerateId();
  };

  const openSelectParentCategoryHandle = () => {
    router.push(
      routes["products-detail"].modals["detail-select-category"].path
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={styles.sectionHeaderContainer}
        title={"General Information"}
        titleColor={appColors.themeColor}
      />
      <View style={[styles.sectionContent]}>
        <AppFormInput
          control={formControl}
          inputName={"productId"}
          errors={formErrors?.productId}
          value={productId}
          onChange={(value) => onFormChange({ productId: value })}
          icon="Items"
          label="Product ID"
          enabled={true}
          inputMode="numeric"
          renderAction={() => (
            <ChipButton
              onPress={onGenerateIdHandle}
              containerStyle={styles.inputActionButtonContainer}
              label={`Generate`}
            />
          )}
          required={true}
        />
        <AppFormInput
          control={formControl}
          inputName={"productName"}
          errors={formErrors.productName}
          value={productName}
          onChange={(value) => onFormChange({ productName: value })}
          label="Product Name"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          required={true}
        />
        <AppFormInput
          control={formControl}
          inputName={"productDescription"}
          value={productDescription}
          onChange={(value) => onFormChange({ productDescription: value })}
          label="Description"
          enabled={true}
          multiline={true}
          labelContainerStyle={styles.inputLabelContainer}
        />
        <AppSelectInput
          control={formControl}
          icon="Tag"
          value={productCategory}
          valueKey={"categoryName"}
          name={"productCategory"}
          placeholder="Select Category"
          renderTextValue={(value, text) =>
            text && value ? `${text}(${value.categoryId})` : ""
          }
          errors={formErrors?.productCategory}
          onChange={(value) => onFormChange({ productCategory: value })}
          label="Category"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          onSelectPress={openSelectParentCategoryHandle}
        />
        <AppFormInput
          control={formControl}
          inputName={"productBarcode"}
          value={productBarcode}
          onChange={(value) => onFormChange({ productBarcode: value })}
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
          control={formControl}
          inputName={"productSku"}
          value={productSku}
          onChange={(value) => onFormChange({ productSku: value })}
          label="SKU"
          enabled={true}
          multiline={true}
          inputMode="numeric"
          labelContainerStyle={styles.inputLabelContainer}
          renderAction={() => (
            <ChipButton
              containerStyle={styles.inputActionButtonContainer}
              label={`Camera`}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
});

export default ProductDetailGeneralInfoSection;
