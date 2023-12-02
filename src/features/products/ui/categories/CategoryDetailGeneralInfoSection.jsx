import React from "react";
import { StyleSheet, View } from "react-native";
import {
  SectionHeader,
  AppFormInput,
  ChipButton,
  IconButton,
} from "../../../../ui";
import { appColors, appSizes } from "../../../../themes";
import { commonStyles } from "../../styles";
import { useRouter } from "expo-router";
import { useStackRoutes } from "../../../../routes";

const CategoryDetailGeneralInfoSection = ({
  formControl,
  formErrors,
  categoryId,
  categoryName,
  categoryDescription,
  parentCategory = { id: 0, categoryName: "HAHA", categoryCode: "KKK" },
  onFormChange,
  onGenerateId = () => {},
}) => {
  const router = useRouter();
  const routes = useStackRoutes();
  const _onGenerateIdHandle = () => {
    onGenerateId();
  };

  const _openSelectParentCategoryHandle = () => {
    router.push(
      routes["categories-detail"].modals["detail-select-category"].path
    );
  };

  return (
    <View style={styles.container}>
      <SectionHeader
        titleSize={appSizes.Text.medium}
        containerStyle={styles.sectionHeaderContainer}
        title={"General Information"}
        titleColor={appColors.themeColor}
      />
      <View style={[styles.sectionContent]}>
        <AppFormInput
          control={formControl}
          name={"categoryId"}
          errors={formErrors?.categoryId}
          value={categoryId}
          icon="Category"
          label="Category ID"
          enabled={false}
          inputMode="numeric"
          required={true}
          labelStyle={styles.inputLabel}
        />
        <AppFormInput
          control={formControl}
          name={"categoryName"}
          errors={formErrors.categoryName}
          value={categoryName}
          onChange={(value) => onFormChange({ categoryName: value })}
          label="Category Name"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          required={true}
          labelStyle={styles.inputLabel}
        />
        <AppFormInput
          control={formControl}
          name={"categoryDescription"}
          value={categoryDescription}
          onChange={(value) => onFormChange({ categoryDescription: value })}
          label="Description"
          enabled={true}
          multiline={true}
          labelContainerStyle={styles.inputLabelContainer}
          labelStyle={styles.inputLabel}
        />
        <AppFormInput
          icon="Tag"
          value={parentCategory}
          inputType="select"
          valueKey={"categoryName"}
          control={formControl}
          name={"categoryParentId"}
          renderTextValue={(value, text) => `${text}(${value.categoryCode})`}
          errors={formErrors?.categoryCode}
          onChange={(value) => onFormChange({ categoryCode: value })}
          label="Parent Category"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          renderAction={() => (
            <ChipButton
              onPress={_openSelectParentCategoryHandle}
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

export default CategoryDetailGeneralInfoSection;
