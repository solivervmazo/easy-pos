import React from "react";
import { StyleSheet, View } from "react-native";
import {
  SectionHeader,
  IconButton,
  ChipButton,
  AppFormInput,
} from "../../../ui";
import { appColors, appSizes } from "../../../themes";
import { useRouter } from "expo-router";
import { useStackRoutes } from "../../../routes";
import { commonStyles } from "../styles";

const ProductDetailCategoryAndVariationSection = () => {
  const router = useRouter();
  const routes = useStackRoutes();
  const _selectCategoryHandle = () => {
    router.push(routes["items-detail"].modals["detail-select-category"].path);
  };
  return (
    <View style={[styles.container]}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={styles.sectionHeaderContainer}
        title={"Category and variations"}
        titleColor={appColors.themeColor}
      />
      <View style={[styles.sectionContent]}>
        <AppFormInput
          icon="Items"
          label="Category"
          enabled={true}
          inputMode="none"
          placeholder="Search category"
          onFocus={_selectCategoryHandle}
        />
        <AppFormInput
          label="New variations"
          placeholder="Select variation to add one"
          enabled={false}
          labelContainerStyle={styles.inputLabelContainer}
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
              containerStyle={styles.inputActionButtonContainer}
              label={`Select`}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
});

export default ProductDetailCategoryAndVariationSection;
