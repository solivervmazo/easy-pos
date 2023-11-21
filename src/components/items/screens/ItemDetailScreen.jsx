import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SectionHeader,
  ChipButton,
  AppFormInputText,
  Spacer,
} from "../../../ui/";
import { appSpacing } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";
import ItemDetailScreenHeader from "../ui/ItemDetailScreenHeader";
import ItemDetailGeneralInfoSection from "../ui/ItemDetailGeneralInfoSection";
import ItemDetailCategoryAndVariationSection from "../ui/ItemDetailCategoryAndVariationSection";
import ItemDetailPricingAndDiscountSection from "../ui/ItemDetailPricingAndDiscountSection";

const ItemDetailScreen = () => {
  return (
    <>
      <ItemDetailScreenHeader />
      <View
        style={{
          flex: 1,
          gap: 10,
          paddingHorizontal: appSpacing.screenPaddingLeft,
          paddingVertical: 10,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* General information */}
          <ItemDetailGeneralInfoSection />
          <Spacer size={25} horizontal={false} />
          {/* Category and variations */}
          <ItemDetailCategoryAndVariationSection />
          <Spacer size={25} horizontal={false} />
          {/* Pricing and discounts */}
          <ItemDetailPricingAndDiscountSection />
          {/* Shortkeys */}
        </ScrollView>
        <Text>Details</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default ItemDetailScreen;
