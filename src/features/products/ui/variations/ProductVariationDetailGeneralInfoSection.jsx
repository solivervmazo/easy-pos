import React from "react";
import { StyleSheet, View } from "react-native";
import { SectionHeader, AppFormInput } from "../../../../ui";
import { appColors, appSizes } from "../../../../themes";
import { commonStyles } from "../../styles";
import { AppTextInput, AppSelectInput } from "../../../../ui";

const ProductVariationDetailGeneralInfoSection = ({
  formControl,
  formErrors,
  productVariationId,
  productVariationName,
  productVariationDescription,
  onFormChange,
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
        <AppFormInput
          control={formControl}
          name={"productVariationId"}
          errors={formErrors?.productVariationId}
          value={productVariationId}
          icon="Variant"
          label="Variation ID"
          enabled={false}
          inputMode="numeric"
          required={true}
          labelStyle={styles.inputLabel}
        />
        <AppTextInput
          control={formControl}
          name={"productVariationName"}
          errors={formErrors.productVariationName}
          value={productVariationName}
          onChange={(value) => onFormChange({ productVariationName: value })}
          label="Variation Name"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          required={true}
          labelStyle={styles.inputLabel}
        />
        <AppTextInput
          control={formControl}
          name={"productVariationDescription"}
          value={productVariationDescription}
          onChange={(value) =>
            onFormChange({ productVariationDescription: value })
          }
          label="Description"
          enabled={true}
          multiline={true}
          labelContainerStyle={styles.inputLabelContainer}
          labelStyle={styles.inputLabel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
});

export default ProductVariationDetailGeneralInfoSection;
