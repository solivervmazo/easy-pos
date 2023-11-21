import React from "react";
import { StyleSheet, Text, View } from "react-native";
import commonStyles from "../styles";
import { AppFormInputText, SectionHeader } from "../../../ui";

const ItemDetailPricingAndDiscountSection = () => {
  return (
    <View style={[styles.container]}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={[styles.sectionHeaderContainer]}
        title={"Pricing and Discount"}
        titleColor={appColors.themeColor}
      />
      <View style={[styles.sectionContent]}>
        <AppFormInputText
          value={"0"}
          icon="Tags"
          label="Default Price"
          enabled={true}
          inputMode="numeric"
          required={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
});

export default ItemDetailPricingAndDiscountSection;
