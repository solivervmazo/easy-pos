import React from "react";
import { StyleSheet, View } from "react-native";
import { SectionHeader, ChipButton, AppFormInputText } from "../../../ui";
import { appColors, appSizes } from "../../../themes";
import { commonStyles } from "../styles";

const ItemDetailGeneralInfoSection = ({
  formControl,
  formErrors,
  productId,
  productName,
  productDescription,
  productBarcode,
  productSku,
  onFormChange,
  onGenerateId = () => {},
}) => {
  const _onGenerateIdHandle = () => {
    onGenerateId();
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
        <AppFormInputText
          control={formControl}
          name={"productId"}
          errors={formErrors?.productId}
          value={productId}
          onChange={(value) => onFormChange({ productId: value })}
          icon="Items"
          label="Product ID"
          enabled={true}
          inputMode="numeric"
          renderAction={() => (
            <ChipButton
              onPress={_onGenerateIdHandle}
              containerStyle={styles.inputActionButtonContainer}
              label={`Generate`}
            />
          )}
          required={true}
        />
        <AppFormInputText
          control={formControl}
          name={"productName"}
          errors={formErrors.productName}
          value={productName}
          onChange={(value) => onFormChange({ productName: value })}
          label="Product Name"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          required={true}
        />
        <AppFormInputText
          control={formControl}
          name={"productDescription"}
          value={productDescription}
          onChange={(value) => onFormChange({ productDescription: value })}
          label="Description"
          enabled={true}
          multiline={true}
          labelContainerStyle={styles.inputLabelContainer}
        />
        <AppFormInputText
          control={formControl}
          name={"productBarcode"}
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
        <AppFormInputText
          control={formControl}
          name={"productSku"}
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

export default ItemDetailGeneralInfoSection;
