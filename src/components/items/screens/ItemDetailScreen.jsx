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

const CategoryAndVariation = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const _selectCategoryHandle = () => {
    router.push(routes["items-detail"].modals["detail-select-category"].path);
  };
  return (
    <View style={{ flex: 1 }}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={{
          marginBottom: 15,
        }}
        title={"Category and variations"}
        titleColor={appColors.themeColor}
      />
      <View style={{ flex: 1, justifyContent: "flex-start", gap: 20 }}>
        <AppFormInputText
          icon="Items"
          label="Category"
          enabled={true}
          inputMode="none"
          placeholder="Search category"
          onFocus={_selectCategoryHandle}
        />
        <AppFormInputText
          label="New variations"
          placeholder="Select variation to add one"
          enabled={false}
          labelContainerStyle={{
            marginStart: 10,
          }}
          renderAction={() => (
            <ChipButton
              onPress={_selectCategoryHandle}
              buttonRight={() => (
                <IconButton
                  icon={"Down"}
                  color={appColors.lightText}
                  plain={true}
                  disabled={true}
                  size={appSizes.Icon.small}
                />
              )}
              containerStyle={{
                backgroundColor: appColors.lightPrimary,
              }}
              label={`Select`}
            />
          )}
        />
      </View>
    </View>
  );
};

const ScreenHeader = () => (
  <Stack.Screen
    options={{
      title: "New Product",
      headerShown: true,
    }}
  />
);

const ItemDetailScreen = () => {
  return (
    <>
      <ScreenHeader />
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
          <CategoryAndVariation />
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
