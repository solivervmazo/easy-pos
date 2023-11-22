import React from "react";
import { StyleSheet, View } from "react-native";
import { ChipButton, Spacer } from "../../../ui/";
import { appColors, appSizes, appSpacing } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";
import ItemDetailScreenHeader from "../ui/ItemDetailScreenHeader";
import ItemDetailGeneralInfoSection from "../ui/ItemDetailGeneralInfoSection";
import ItemDetailCategoryAndVariationSection from "../ui/ItemDetailCategoryAndVariationSection";
import ItemDetailPricingAndDiscountSection from "../ui/ItemDetailPricingAndDiscountSection";
import ItemDetailShortkeySection from "../ui/ItemDetailShortkeySection";

const ItemDetailScreen = () => {
  return (
    <>
      <ItemDetailScreenHeader />
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {/* General information */}
          <ItemDetailGeneralInfoSection />
          {/* Category and variations */}
          <Spacer size={25} horizontal={false} />
          <ItemDetailCategoryAndVariationSection />
          {/* Pricing and discounts */}
          <Spacer size={25} horizontal={false} />
          <ItemDetailPricingAndDiscountSection />
          {/* Shortkeys */}
          <Spacer size={25} horizontal={false} />
          <ItemDetailShortkeySection />
        </ScrollView>
        <View>
          <ChipButton
            containerStyle={styles.saveButtonContainer}
            labelStyle={styles.saveButtonLabel}
            label={"Save"}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingVertical: 10,
  },
  saveButtonContainer: {
    backgroundColor: appColors.lightSuccess,
    paddingVertical: 15,
  },
  saveButtonLabel: {
    fontSize: appSizes.Text.regular,
  },
});

export default ItemDetailScreen;
