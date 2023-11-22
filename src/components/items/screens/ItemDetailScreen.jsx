import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Spacer } from "../../../ui/";
import { appSpacing } from "../../../themes";
import { ScrollView } from "react-native-gesture-handler";
import ItemDetailScreenHeader from "../ui/ItemDetailScreenHeader";
import ItemDetailGeneralInfoSection from "../ui/ItemDetailGeneralInfoSection";
import ItemDetailCategoryAndVariationSection from "../ui/ItemDetailCategoryAndVariationSection";
import ItemDetailPricingAndDiscountSection from "../ui/ItemDetailPricingAndDiscountSection";
import ItemDetailShortkeySection from "../ui/ItemDetailShortkeySection";

const ItemDetailScreen = () => {
  const [_sectionScrollYPositions, setSectionScrollYPositions] = useState({});
  const _addScrollYSectionHandle = (event, key) => {
    const layout = event.nativeEvent.layout;
    _sectionScrollYPositions[key] = layout.y;
    setSectionScrollYPositions(_sectionScrollYPositions);
  };

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
          <Spacer
            size={0}
            horizontal={false}
            onLayout={(event) =>
              _addScrollYSectionHandle(event, "general-info-section")
            }
          />
          <ItemDetailGeneralInfoSection />
          {/* Category and variations */}
          <Spacer
            size={25}
            horizontal={false}
            onLayout={(event) =>
              _addScrollYSectionHandle(event, "category-variation-section")
            }
          />
          <ItemDetailCategoryAndVariationSection />
          {/* Pricing and discounts */}
          <Spacer
            size={25}
            horizontal={false}
            onLayout={(event) =>
              _addScrollYSectionHandle(event, "pricing-discounts-section")
            }
          />
          <ItemDetailPricingAndDiscountSection />
          {/* Shortkeys */}
          <Spacer
            size={25}
            horizontal={false}
            onLayout={(event) =>
              _addScrollYSectionHandle(event, "shortkey-section")
            }
          />
          <ItemDetailShortkeySection />
        </ScrollView>
        <Text>Details</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default ItemDetailScreen;
