import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AppFormInputText,
  ChipButton,
  IconButton,
  SectionHeader,
} from "../../../ui";
import { commonStyles } from "../styles";
import { appColors } from "../../../themes";

const ItemDetailPricingAndDiscountSection = () => {
  return (
    <View style={[styles.container]}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={styles.sectionHeaderContainer}
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
          label={"Add Rule"}
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

export default ItemDetailPricingAndDiscountSection;
