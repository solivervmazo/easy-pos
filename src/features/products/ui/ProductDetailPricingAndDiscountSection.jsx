import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AppFormInput,
  ChipButton,
  IconButton,
  SectionHeader,
} from "../../../ui";
import { commonStyles } from "../styles";
import { appColors } from "../../../themes";

const ProductDetailPricingAndDiscountSection = ({
  formControl,
  formErrors,
  productPrice,
  onFormChange,
}) => {
  return (
    <View style={[styles.container]}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={styles.sectionHeaderContainer}
        title={"Pricing and Discount"}
        titleColor={appColors.themeColor}
      />
      <View style={[styles.sectionContent]}>
        <AppFormInput
          value={productPrice?.toString()}
          control={formControl}
          inputName={"productPrice"}
          errors={formErrors?.productPrice}
          onChange={(value) => onFormChange({ productPrice: value })}
          icon="Tags"
          label="Default Price"
          enabled={true}
          inputMode="numeric"
          labelContainerStyle={styles.inputLabelContainer}
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
  addRuleButtonContainer: {
    marginHorizontal: 10,
    backgroundColor: appColors.lightPrimarySecondary,
  },
});

export default ProductDetailPricingAndDiscountSection;
