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
import { AppTextInput, AppSelectInput } from "../../../../ui/";

const CategoryDetailGeneralInfoSection = ({
  formControl,
  formErrors,
  categoryId,
  categoryName,
  categoryDescription,
  categoryParent,
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
        <AppTextInput
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
        <AppTextInput
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
        <AppSelectInput
          control={formControl}
          icon="Tag"
          value={categoryParent}
          valueKey={"categoryName"}
          name={"categoryParent"}
          placeholder="Select Parent Category"
          renderTextValue={(value, text) =>
            text && value ? `${text}(${value.categoryId})` : ""
          }
          errors={formErrors?.categoryParent}
          onChange={(value) => onFormChange({ categoryParent: value })}
          label="Parent Category"
          enabled={true}
          labelContainerStyle={styles.inputLabelContainer}
          onSelectPress={_openSelectParentCategoryHandle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ...commonStyles,
});

export default CategoryDetailGeneralInfoSection;
