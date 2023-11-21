import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  SectionHeader,
  IconButton,
  ChipButton,
  AppFormInputText,
  Spacer,
} from "../../../ui/";
import {
  appColors,
  appFonts,
  appSizes,
  appSpacing,
  appStyles,
} from "../../../themes";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Stack, useRouter } from "expo-router";
import { useStackRoutes } from "../../../routes";
import ItemDetailScreenHeader from "../ui/ItemDetailScreenHeader";
import ItemDetailCategoryAndVariationSection from "../ui/ItemDetailCategoryAndVariationSection";

const GeneralInformation = () => {
  return (
    <View style={{ flex: 1 }}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={{
          marginBottom: 15,
        }}
        title={"General Information"}
        titleColor={appColors.themeColor}
      />
      <View style={{ flex: 1, justifyContent: "flex-start", gap: 20 }}>
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
          required={true}
        />
        <AppFormInputText
          label="Product Name"
          enabled={true}
          labelContainerStyle={{
            marginStart: 10,
          }}
          required={true}
        />
        <AppFormInputText
          label="Description"
          enabled={true}
          multiline={true}
          labelContainerStyle={{
            marginStart: 10,
          }}
        />
        <AppFormInputText
          icon="Barcode"
          label="Barcode"
          enabled={true}
          multiline={true}
          inputMode="numeric"
          renderAction={() => (
            <ChipButton
              containerStyle={{ backgroundColor: appColors.lightPrimary }}
              label={`Camera`}
            />
          )}
        />
        <AppFormInputText
          label="SKU"
          enabled={true}
          multiline={true}
          inputMode="numeric"
          labelContainerStyle={{
            marginStart: 10,
          }}
          renderAction={() => (
            <ChipButton
              containerStyle={{ backgroundColor: appColors.lightPrimary }}
              label={`Camera`}
            />
          )}
        />
      </View>
    </View>
  );
};

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
          <GeneralInformation />
          <Spacer size={25} horizontal={false} />
          {/* Category and variations */}
          <ItemDetailCategoryAndVariationSection />
          {/* Pricing and discounts */}
          {/* Shortkeys */}
        </ScrollView>
        <Text>Details</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default ItemDetailScreen;
