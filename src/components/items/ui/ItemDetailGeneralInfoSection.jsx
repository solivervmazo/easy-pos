import React from "react";
import { StyleSheet, View } from "react-native";
import { SectionHeader, ChipButton, AppFormInputText } from "../../../ui";
import { appColors, appSizes } from "../../../themes";
import { commonStyles } from "../styles";

const ItemDetailGeneralInfoSection = ({
  productId,
  productName,
  productDescription,
  productBarcode,
  productSku,
  onProductIdChange,
  onProductNameChange,
  onProductDescriptionChange,
  onProductBarcodeChange,
  onProductSkuChange,
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={styles.sectionHeaderContainer}
        title={"General Information"}
        titleColor={appColors.themeColor}
      />
      <View style={[styles.sectionContent]}>
        <AppFormInputText
          value={productId}
          onChange={onProductIdChange}
          icon="Items"
          label="Product ID"
          enabled={true}
          inputMode="numeric"
          renderAction={() => (
            <ChipButton
              containerStyle={styles.inputActionButtonContainer}
              label={`Custom`}
            />
          )}
          required={true}
        />
        <AppFormInputText
          value={productName}
          onChange={onProductNameChange}
          label="Product Name"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          required={true}
        />
        <AppFormInputText
          value={productDescription}
          onChange={onProductDescriptionChange}
          label="Description"
          enabled={true}
          multiline={true}
          labelContainerStyle={styles.inputLabelContainer}
        />
        <AppFormInputText
          value={productBarcode}
          onChange={onProductBarcodeChange}
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
        <AppFormInputText
          value={productSku}
          onChange={onProductSkuChange}
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

export default ItemDetailGeneralInfoSection;
