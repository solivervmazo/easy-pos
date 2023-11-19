import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SectionHeader,
  IconButton,
  ChipButton,
  AppFormInputText,
} from "../../../ui/";
import {
  appColors,
  appFonts,
  appSizes,
  appSpacing,
  appStyles,
} from "../../../themes";
import { TextInput } from "react-native-gesture-handler";

const GeneralInformation = () => {
  return (
    <View style={{ flex: 1 }}>
      <SectionHeader
        title={"General Information"}
        titleColor={appColors.themeColor}
      />
      <AppFormInputText
        icon="Items"
        label="Product ID"
        enabled={true}
        inputMode="numeric"
        renderAction={() => (
          <ChipButton
            containerStyle={{ backgroundColor: appColors.lightPrimary }}
            label={`Custom`}
          />
        )}
      />
    </View>
  );
};

const ItemDetailScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        gap: 10,
        paddingHorizontal: appSpacing.screenPaddingLeft,
        paddingVertical: 10,
      }}
    >
      {/* General information */}
      <GeneralInformation />
      {/* Category and variations */}
      {/* Pricing and discounts */}
      {/* Shortkeys */}
      <Text>Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ItemDetailScreen;
